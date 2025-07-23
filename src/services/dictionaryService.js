// Dictionary service for validating words in Scrabble
// This service uses a free dictionary API to validate words

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

/**
 * Validates if a word exists in the dictionary
 * @param {string} word - The word to validate
 * @returns {Promise<boolean>} - True if the word is valid, false otherwise
 */
const validateWord = async (word) => {
  try {
    // Convert to lowercase for API call
    const formattedWord = word.toLowerCase();
    
    // Make API request to check if word exists
    const response = await fetch(`${API_URL}${formattedWord}`);
    
    // If response is ok (status 200), the word exists
    return response.ok;
  } catch (error) {
    console.error('Error validating word:', error);
    return false;
  }
};

export { validateWord };