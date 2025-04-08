import axios from 'axios';
import { WIT_API_KEY } from '@env';

const WIT_API_URL = 'https://api.wit.ai/message';

export const analyzeMedicine = async (text: string) => {
  try {
    const response = await axios.get(WIT_API_URL, {
      params: {
        q: text,
      },
      headers: {
        Authorization: `Bearer ${WIT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing medicine:', error);
    throw error;
  }
};

export const compareMedicines = async (
  chineseMedicine: string,
  westernMedicine: string
) => {
  try {
    // First, analyze each medicine separately
    const chineseAnalysis = await analyzeMedicine(chineseMedicine);
    const westernAnalysis = await analyzeMedicine(westernMedicine);

    // TODO: Implement comparison logic based on the analysis results
    // This is where you would add your specific comparison logic
    // based on the entities and intents returned by Wit.ai

    return {
      chineseAnalysis,
      westernAnalysis,
      comparison: 'Comparison results will be implemented here',
    };
  } catch (error) {
    console.error('Error comparing medicines:', error);
    throw error;
  }
}; 