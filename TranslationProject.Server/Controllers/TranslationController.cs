using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;
using TranslationProject.Server.Models;
using System.Numerics;
using System.Net;
using Newtonsoft.Json.Linq;
using TranslationProject.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace TranslationProject.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TranslationController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<TranslationController> _logger;
        private readonly IConfiguration _configuration;
        private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com";
        private static readonly string location = "canadacentral";
        private readonly string _azureApiKey;

        public TranslationController(ILogger<TranslationController> logger, IConfiguration configuration, DataContext dataContext)
        {
            this._dataContext = dataContext;
            this._configuration = configuration;
            this._logger = logger;
            this._azureApiKey = _configuration["AzureAPIKey"] ?? throw new InvalidOperationException("AzureAPIKey is not configured");
        }

        /// <summary>
        /// Translate performs translation of a text from the source language to multiple target languages.
        /// </summary>
        /// <param name="translationEntryDTO">The data transfer object containing translation information.</param>
        /// <returns>
        /// <para>Returns 200 OK with the translated result if the translation is successful.</para>
        /// <para>Returns 400 Bad Request with an error response if the translation request is invalid or encounters an error.</para>
        /// </returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<List<TranslationResult>>> Translate(TranslationEntryDTO translationEntryDTO)
        {
            // _logger.LogInformation($"Key: {this._azureApiKey}");

            string route = "/translate?api-version=3.0";

            if (!string.IsNullOrEmpty(translationEntryDTO.SourceLanguage))
            {
                route += $"&from={translationEntryDTO.SourceLanguage}";
            }

            foreach (string language in translationEntryDTO.TargetLanguages)
            {
                route += $"&to={language}";
            }

            _logger.LogInformation($"Route: {route}");

            object[] body = new object[] { new { Text = translationEntryDTO.SourceText } };
            var requestBody = JsonConvert.SerializeObject(body);

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                // Build the request.
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri(endpoint + route);
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", this._azureApiKey);
                request.Headers.Add("Ocp-Apim-Subscription-Region", location);

                // Send the request and get response.
                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                // Read response as a string.
                string result = await response.Content.ReadAsStringAsync();

                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var translationResult = JsonConvert.DeserializeObject<List<TranslationResult>>(result)[0];
                    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    if (userId != null)
                    {
                        if (translationResult.DetectedLanguage != null)
                        {
                            foreach (var translation in translationResult.Translations)
                            {
                                var entry = new TranslationEntry
                                {
                                    UserId = userId,
                                    SourceLanguage = translationResult.DetectedLanguage.Language,
                                    TargetLanguage = translation.To,
                                    SourceText = translationEntryDTO.SourceText,
                                    TranslatedText = translation.Text,
                                };
                                _dataContext.TranslationEntries.Add(entry);
                            }
                            await _dataContext.SaveChangesAsync();
                        }
                        else
                        {
                            foreach (var translation in translationResult.Translations)
                            {
                                var entry = new TranslationEntry
                                {
                                    UserId = userId,
                                    SourceLanguage = translationEntryDTO.SourceLanguage,
                                    TargetLanguage = translation.To,
                                    SourceText = translationEntryDTO.SourceText,
                                    TranslatedText = translation.Text,
                                };
                                _dataContext.TranslationEntries.Add(entry);
                            }
                            await _dataContext.SaveChangesAsync();
                        }
                    }
                    return Ok(translationResult);
                }
                else
                {
                    return BadRequest(JsonConvert.DeserializeObject<ErrorResponse>(result));
                }
            }
        }

        /// <summary>
        /// UpdateTranslationEntry updates the favorite status of a translation entry.
        /// </summary>
        /// <param name="id">The ID of the translation entry to be updated.</param>
        /// <param name="isFavorite">The new favorite status for the translation entry.</param>
        /// <returns>
        /// <para>Returns 200 OK if the update is successful.</para>
        /// <para>Returns 401 Unauthorized if the logged-in user does not have permission to update the specified translation entry.</para>
        /// <para>Returns 404 Not Found if the specified translation entry is not found.</para>
        /// <para>Returns 500 Internal Server Error if an unexpected error occurs during the update process.</para>
        /// </returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateTranslationEntry(int id, bool isFavorite)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var translationEntry = await _dataContext.TranslationEntries.FindAsync(id);

            if (translationEntry == null)
            {
                return NotFound(new { error = "Translation entry not found." });
            }

            if (translationEntry.UserId != userId)
            {
                return Unauthorized(new { error = "This translation entry does not correspond to the current logged-in user." });
            }

            translationEntry.isFavorite = isFavorite;

            try
            {
                await _dataContext.SaveChangesAsync();
                return Ok(new { success = "Translation entry updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing the request : {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<TranslationResult>>> Translate()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != null)
            {
                var history = _dataContext.TranslationEntries.Where<TranslationEntry>(a => a.UserId == userId);
                return Ok(history);
            }

            return BadRequest();
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> Delete()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != null)
            {

                var history = _dataContext.TranslationEntries.Where<TranslationEntry>(a => a.UserId == userId);

                foreach (var item in history)
                {
                    _dataContext.TranslationEntries.Remove(item);
                }
                await _dataContext.SaveChangesAsync();

                return Ok("History deleted");
            }

            return BadRequest();
        }
    }
}
