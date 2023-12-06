namespace TranslationProject.Server.Models
{
    public class TranslationEntryDTO
    {
        public string SourceLanguage { get; set; } = string.Empty;
        public List<string> TargetLanguages { get; set; } = new List<string>();
        public string SourceText { get; set; } = string.Empty;
    }
}
