export function normalizeText(text: string): string {
    // Convert to lowercase
    let normalizedText = text.toLowerCase();
  
    // Remove spaces, dashes, dots, and underscores
    normalizedText = normalizedText.replace(/[\s\.\-_]/g, "");
  
    // Replace special characters with their equivalent default characters
    const replacements: {[key: string]: string} = {
      "á": "a",
      "à": "a",
      "ã": "a",
      "â": "a",
      "é": "e",
      "è": "e",
      "ê": "e",
      "í": "i",
      "ì": "i",
      "î": "i",
      "ó": "o",
      "ò": "o",
      "õ": "o",
      "ô": "o",
      "ú": "u",
      "ù": "u",
      "û": "u",
      "ç": "c",
      "ñ": "n",
      "ä": "a",
      "ë": "e",
      "ï": "i",
      "ö": "o",
      "ü": "u",
      "ÿ": "y",
      "ß": "ss",
      "æ": "ae",
      "œ": "oe",
      // Add more replacements as needed
    };
  
    Object.keys(replacements).forEach(key => {
      const regex = new RegExp(key, "g");
      normalizedText = normalizedText.replace(regex, replacements[key]);
    });
  
    return normalizedText;
  }