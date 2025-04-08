import axios from 'axios';
import { WIT_API_KEY } from '@env';

const WIT_API_URL = 'https://api.wit.ai/message';

interface MedicineAnalysis {
  name: string;
  ingredients: string[];
  effects: string[];
  interactions: string[];
  dosage: string;
  warnings: string[];
}

export const analyzeMedicine = async (text: string): Promise<MedicineAnalysis> => {
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

    // Extract entities from Wit.ai response
    const entities = response.data.entities || {};
    
    // Process the entities to create a structured analysis
    const analysis: MedicineAnalysis = {
      name: entities.medicine_name?.[0]?.value || text,
      ingredients: entities.ingredient?.map((i: any) => i.value) || [],
      effects: entities.effect?.map((e: any) => e.value) || [],
      interactions: entities.interaction?.map((i: any) => i.value) || [],
      dosage: entities.dosage?.[0]?.value || 'Not specified',
      warnings: entities.warning?.map((w: any) => w.value) || [],
    };

    return analysis;
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
    // Analyze each medicine
    const chineseAnalysis = await analyzeMedicine(chineseMedicine);
    const westernAnalysis = await analyzeMedicine(westernMedicine);

    // Compare ingredients for potential conflicts
    const ingredientConflicts = findIngredientConflicts(
      chineseAnalysis.ingredients,
      westernAnalysis.ingredients
    );

    // Compare effects for potential interactions
    const effectInteractions = findEffectInteractions(
      chineseAnalysis.effects,
      westernAnalysis.effects
    );

    // Generate warnings based on analysis
    const warnings = generateWarnings(
      chineseAnalysis,
      westernAnalysis,
      ingredientConflicts,
      effectInteractions
    );

    return {
      chineseAnalysis,
      westernAnalysis,
      comparison: {
        ingredientConflicts,
        effectInteractions,
        warnings,
        recommendations: generateRecommendations(warnings),
      },
    };
  } catch (error) {
    console.error('Error comparing medicines:', error);
    throw error;
  }
};

// Helper functions for comparison logic
const findIngredientConflicts = (
  chineseIngredients: string[],
  westernIngredients: string[]
): string[] => {
  const conflicts: string[] = [];
  
  // This is a simplified example - in a real app, you would have a database
  // of known ingredient interactions
  const knownConflicts = {
    'ginseng': ['warfarin', 'aspirin'],
    'licorice': ['digoxin', 'diuretics'],
    'ginkgo': ['blood thinners'],
  };

  chineseIngredients.forEach(chineseIngredient => {
    westernIngredients.forEach(westernIngredient => {
      if (knownConflicts[chineseIngredient.toLowerCase()]?.includes(westernIngredient.toLowerCase())) {
        conflicts.push(`${chineseIngredient} may interact with ${westernIngredient}`);
      }
    });
  });

  return conflicts;
};

const findEffectInteractions = (
  chineseEffects: string[],
  westernEffects: string[]
): string[] => {
  const interactions: string[] = [];
  
  // This is a simplified example - in a real app, you would have a database
  // of known effect interactions
  const knownInteractions = {
    'blood thinning': ['increased bleeding risk'],
    'sedation': ['enhanced sedation'],
    'blood pressure': ['blood pressure changes'],
  };

  chineseEffects.forEach(chineseEffect => {
    westernEffects.forEach(westernEffect => {
      if (knownInteractions[chineseEffect.toLowerCase()]?.includes(westernEffect.toLowerCase())) {
        interactions.push(`${chineseEffect} may enhance ${westernEffect}`);
      }
    });
  });

  return interactions;
};

const generateWarnings = (
  chineseAnalysis: MedicineAnalysis,
  westernAnalysis: MedicineAnalysis,
  ingredientConflicts: string[],
  effectInteractions: string[]
): string[] => {
  const warnings: string[] = [];

  // Add ingredient conflict warnings
  warnings.push(...ingredientConflicts);

  // Add effect interaction warnings
  warnings.push(...effectInteractions);

  // Add dosage warnings if both medicines have specified dosages
  if (chineseAnalysis.dosage !== 'Not specified' && westernAnalysis.dosage !== 'Not specified') {
    warnings.push('Both medicines have specified dosages - consult a healthcare provider for proper dosing');
  }

  // Add general warnings from both medicines
  warnings.push(...chineseAnalysis.warnings);
  warnings.push(...westernAnalysis.warnings);

  return warnings;
};

const generateRecommendations = (warnings: string[]): string[] => {
  const recommendations: string[] = [];

  if (warnings.length > 0) {
    recommendations.push('Consult a healthcare provider before taking these medicines together');
    recommendations.push('Monitor for any adverse effects');
    recommendations.push('Consider alternative medicines if possible');
  } else {
    recommendations.push('No known major interactions detected');
    recommendations.push('Still, consult a healthcare provider for personalized advice');
  }

  return recommendations;
}; 