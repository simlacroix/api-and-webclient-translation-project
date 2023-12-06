namespace TranslationProject.Server.Models
{
    public class TranslationResult
    {
        public DetectedLanguage? DetectedLanguage { get; set; }
        public List<TranslationItem> Translations { get; set; } = new();
    }

    public class DetectedLanguage
    {
        public string Language { get; set; } = string.Empty;
        public double Score { get; set; } = new();
    }

    public class TranslationItem
    {
        public string Text { get; set; } = string.Empty;
        public string To { get; set; } = string.Empty;
    }

    public class ErrorResponse
    {
        public Error? Error { get; set; }
    }

    public class Error
    {
        public int Code { get; set; }
        public string Message { get; set; } = string.Empty;
    }


}
