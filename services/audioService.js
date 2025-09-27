import axios from 'axios';

// Your backend's base URL
const API_URL = 'http://10.78.191.172:8000';

/**
 * [HELPER FUNCTION] Creates a new journal entry in the database.
 * @param {object} journalData - The data for the new journal (e.g., { title, note, analysisReport }).
 * @param {string} token - The user's authentication token.
 * @returns {Promise<object>} The newly created journal entry.
 */
export const createJournal = async (journalData, token) => {
  try {
    const response = await axios.post(`${API_URL}/api/journals`, journalData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating journal:', error.response?.data);
    throw error;
  }
};

/**
 * [WORKFLOW] Analyzes an audio file and then creates a journal entry with the results.
 * @param {string} title - The title for the new journal.
 * @param {string} note - The note/transcription for the new journal.
 * @param {string} uri - The local URI of the audio file.
 * @param {string} token - The user's auth token.
 * @returns {Promise<object>} The newly created journal entry.
 */
export const createJournalFromAudio = async (title, note, uri, token) => {
  // --- Step 1: Analyze the Audio ---
  const formData = new FormData();
  formData.append('file', {
    uri,
    name: 'recording.m4a',
    type: 'audio/m4a',
  });
  
  try {
    console.log("Step 1: Analyzing audio...");
    const analysisResponse = await axios.post(`${API_URL}/analyze`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    // --- Step 2: Create the Journal with the Analysis Report ---
    console.log("Step 2: Creating journal with analysis report...");
    const journalPayload = {
      title,
      note, // You can use the transcription from analysisResponse.data.transcript if you prefer
      analysisReport: analysisResponse.data, // Nest the entire report
    };

    const newJournal = await createJournal(journalPayload, token);
    return newJournal;

  } catch (error) {
    console.error('Error in createJournalFromAudio workflow:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * [WORKFLOW] Analyzes text and then creates a journal entry with the results.
 * @param {string} title - The title for the new journal.
 * @param {string} note - The note text to be analyzed.
 * @param {string} token - The user's auth token.
 * @returns {Promise<object>} The newly created journal entry.
 */
export const createJournalFromText = async (title, note, token) => {
  try {
    // --- Step 1: Analyze the Text ---
    console.log("Step 1: Analyzing text...");
    const analysisResponse = await axios.post(
      `${API_URL}/analyze-text`, // Assuming this is your text analysis endpoint
      { text: note }, 
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );

    // --- Step 2: Create the Journal with the Analysis Report ---
    console.log("Step 2: Creating journal with analysis report...");
    const journalPayload = {
      title,
      note,
      analysisReport: analysisResponse.data, // Nest the entire report
    };
    
    const newJournal = await createJournal(journalPayload, token);
    return newJournal;

  } catch (error) {
    console.error('Error in createJournalFromText workflow:', error.response?.data || error.message);
    throw error;
  }
};

