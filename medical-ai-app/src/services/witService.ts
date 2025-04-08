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
      name: entities['medicine:name']?.[0]?.value || '未知药物',
      ingredients: entities['medicine:ingredient']?.map((e: any) => e.value) || [],
      effects: entities['medicine:effect']?.map((e: any) => e.value) || [],
      interactions: entities['medicine:interaction']?.map((e: any) => e.value) || [],
      dosage: entities['medicine:dosage']?.[0]?.value || '未提供剂量信息',
      warnings: [],
    };

    return analysis;
  } catch (error) {
    console.error('Error analyzing medicine:', error);
    return {
      name: '分析失败',
      ingredients: [],
      effects: [],
      interactions: [],
      dosage: '未提供剂量信息',
      warnings: ['无法分析药物信息，请重试'],
    };
  }
};

export const compareMedicines = async (
  chineseMedicine: string,
  westernMedicine: string
): Promise<{
  chineseAnalysis: MedicineAnalysis;
  westernAnalysis: MedicineAnalysis;
  comparison: {
    ingredientConflicts: string[];
    effectInteractions: string[];
    recommendations: string[];
    warnings: string[];
  };
}> => {
  try {
    const [chineseResult, westernResult] = await Promise.all([
      analyzeMedicine(chineseMedicine),
      analyzeMedicine(westernMedicine),
    ]);

    const ingredientConflicts: string[] = [];
    const effectInteractions: string[] = [];
    const recommendations: string[] = [];
    const warnings: string[] = [];

    // 检查成分冲突
    if (chineseResult.ingredients && westernResult.ingredients) {
      for (const chineseIngredient of chineseResult.ingredients) {
        for (const westernIngredient of westernResult.ingredients) {
          if (chineseIngredient && westernIngredient) {
            const conflict = checkIngredientConflict(chineseIngredient, westernIngredient);
            if (conflict) {
              ingredientConflicts.push(conflict);
            }
          }
        }
      }
    }

    // 检查功效相互作用
    if (chineseResult.effects && westernResult.effects) {
      for (const chineseEffect of chineseResult.effects) {
        for (const westernEffect of westernResult.effects) {
          if (chineseEffect && westernEffect) {
            const interaction = checkEffectInteraction(chineseEffect, westernEffect);
            if (interaction) {
              effectInteractions.push(interaction);
            }
          }
        }
      }
    }

    // 生成警告和建议
    if (ingredientConflicts.length > 0) {
      warnings.push(
        '检测到成分冲突，可能影响药效',
        '同时服用可能增加副作用风险',
        '需要特别注意药物相互作用'
      );
    }

    if (effectInteractions.length > 0) {
      warnings.push(
        '功效可能存在相互作用',
        '可能影响治疗效果',
        '需要调整用药方案'
      );
    }

    if (ingredientConflicts.length === 0 && effectInteractions.length === 0) {
      recommendations.push(
        '未检测到明显的药物冲突',
        '建议在医生指导下使用',
        '注意观察用药反应'
      );
    }

    return {
      chineseAnalysis: chineseResult,
      westernAnalysis: westernResult,
      comparison: {
        ingredientConflicts,
        effectInteractions,
        recommendations,
        warnings,
      },
    };
  } catch (error) {
    console.error('Error comparing medicines:', error);
    return {
      chineseAnalysis: {
        name: '分析失败',
        ingredients: [],
        effects: [],
        interactions: [],
        dosage: '未提供剂量信息',
        warnings: ['无法分析中药信息'],
      },
      westernAnalysis: {
        name: '分析失败',
        ingredients: [],
        effects: [],
        interactions: [],
        dosage: '未提供剂量信息',
        warnings: ['无法分析西药信息'],
      },
      comparison: {
        ingredientConflicts: [],
        effectInteractions: [],
        recommendations: ['无法完成药物对比，请重试'],
        warnings: ['系统暂时无法处理您的请求'],
      },
    };
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

  // 成分冲突警告
  if (ingredientConflicts.length > 0) {
    warnings.push(
      '检测到成分冲突，可能影响药效',
      '同时服用可能增加副作用风险',
      '需要特别注意药物相互作用'
    );
  }

  // 功效相互作用警告
  if (effectInteractions.length > 0) {
    warnings.push(
      '功效可能存在相互作用',
      '可能影响治疗效果',
      '需要调整用药方案'
    );
  }

  // 一般警告
  if (ingredientConflicts.length === 0 && effectInteractions.length === 0) {
    warnings.push(
      '未检测到明显冲突，但仍需谨慎使用',
      '建议在医生指导下服用',
      '注意观察身体反应'
    );
  }

  return warnings;
};

const generateRecommendations = (
  chineseAnalysis: MedicineAnalysis,
  westernAnalysis: MedicineAnalysis,
  ingredientConflicts: string[],
  effectInteractions: string[]
): string[] => {
  const recommendations: string[] = [];

  // 成分冲突建议
  if (ingredientConflicts.length > 0) {
    recommendations.push(
      '建议分开服用这些药物，间隔时间至少2小时',
      '在医生指导下调整用药方案',
      '密切监测可能的副作用'
    );
  }

  // 功效相互作用建议
  if (effectInteractions.length > 0) {
    recommendations.push(
      '可能需要调整用药剂量',
      '建议在医生监督下使用',
      '定期进行相关检查'
    );
  }

  // 一般建议
  if (ingredientConflicts.length === 0 && effectInteractions.length === 0) {
    recommendations.push(
      '可以同时服用，但建议咨询医生确认',
      '注意观察身体反应',
      '如有不适及时就医'
    );
  }

  return recommendations;
};

export const askMedicineInteraction = async (chineseMedicine: string, westernMedicine: string): Promise<string> => {
  try {
    const prompt = `How will ${chineseMedicine} interact with ${westernMedicine}? Any recommendation how I should take it?`;
    
    const response = await fetch('https://api.wit.ai/message', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WIT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        q: prompt,
      },
    });

    if (!response.ok) {
      throw new Error('获取相互作用分析失败');
    }

    const data: WitResponse = await response.json();
    
    // Extract the most relevant response based on intents and entities
    const intents = data.intents;
    const entities = data.entities;
    
    // If we have a specific interaction response, use it
    if (entities['medicine:interaction']?.length > 0) {
      return entities['medicine:interaction'][0].body;
    }
    
    // If we have recommendations, use them
    if (entities['medicine:recommendation']?.length > 0) {
      return entities['medicine:recommendation'][0].body;
    }
    
    // Default response if no specific entities are found
    return '我已分析这些药物的相互作用。请咨询您的医生获取具体建议。';
  } catch (error) {
    console.error('获取药物相互作用时出错:', error);
    throw error;
  }
}; 