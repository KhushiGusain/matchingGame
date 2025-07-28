import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';

const GAME_SCORES_COLLECTION = 'gameScores';

export const saveGameScore = async (gameData) => {
  try {
    const docData = {
      totalScore: gameData.totalScore,
      timeTaken: gameData.timeTaken
    };
    
    const docRef = await addDoc(collection(db, GAME_SCORES_COLLECTION), docData);
    
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

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
    throw error;
  }
};

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
    throw error;
  }
}; 