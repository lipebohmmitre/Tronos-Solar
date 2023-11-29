using System.Text.RegularExpressions;

namespace tronos_backend.Utils
{
    public static class StringHelper
    {
        public static string NormalizeText(string text)
        {
            // Convert to lowercase
            string normalizedText = text.ToLower();

            // Remove spaces, dashes, dots, and underscores
            normalizedText = Regex.Replace(normalizedText, @"[\s\.\-_]", "");

            // Replace special characters with their equivalent default characters
            Dictionary<string, string> replacements = new Dictionary<string, string>
            {
                { "á", "a" },
                { "à", "a" },
                { "ã", "a" },
                { "â", "a" },
                { "é", "e" },
                { "è", "e" },
                { "ê", "e" },
                { "í", "i" },
                { "ì", "i" },
                { "î", "i" },
                { "ó", "o" },
                { "ò", "o" },
                { "õ", "o" },
                { "ô", "o" },
                { "ú", "u" },
                { "ù", "u" },
                { "û", "u" },
                { "ç", "c" },
                { "ñ", "n" },
                { "ä", "a" },
                { "ë", "e" },
                { "ï", "i" },
                { "ö", "o" },
                { "ü", "u" },
                { "ÿ", "y" },
                { "ß", "ss" },
                { "æ", "ae" },
                { "œ", "oe" },
                // Add more replacements as needed
            };

            foreach (var kvp in replacements)
            {
                string key = kvp.Key;
                string value = kvp.Value;
                Regex regex = new Regex(key);
                normalizedText = regex.Replace(normalizedText, value);
            }

            return normalizedText;
        }
    }
}
