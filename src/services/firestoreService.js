import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';

// Collection name for game scores
const GAME_SCORES_COLLECTION = 'gameScores';

/**
 * Save game score to Firestore
 * @param {Object} gameData - Game data to save
 * @param {number} gameData.totalScore - Total score achieved
 * @param {number} gameData.timeTaken - Time taken in seconds
 * @param {Array} gameData.levelScores - Array of scores for each level
 * @param {Array} gameData.matches - Array of match details (correct/incorrect)
 * @param {string} gameData.playerName - Player name (optional)
 */
export const saveGameScore = async (gameData) => {
  try {
    console.log('Starting to save game score...');
    console.log('Firestore db object:', db);
    console.log('Collection name:', GAME_SCORES_COLLECTION);
    
    const docData = {
      ...gameData,
      timestamp: new Date(),
      createdAt: new Date().toISOString()
    };
    
    console.log('Document data to save:', docData);
    
    const docRef = await addDoc(collection(db, GAME_SCORES_COLLECTION), docData);
    
    console.log('Game score saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving game score:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error object:', error);
    throw error;
  }
};

/**
 * Get top scores from Firestore
 * @param {number} limit - Number of top scores to retrieve (default: 10)
 * @returns {Array} Array of top scores
 */
export const getTopScores = async (limitCount = 10) => {
  try {
    const q = query(
      collection(db, GAME_SCORES_COLLECTION),
      orderBy('totalScore', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return scores;
  } catch (error) {
    console.error('Error getting top scores:', error);
    throw error;
  }
};

/**
 * Get all game scores
 * @returns {Array} Array of all game scores
 */
export const getAllScores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, GAME_SCORES_COLLECTION));
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return scores;
  } catch (error) {
    console.error('Error getting all scores:', error);
    throw error;
  }
}; 