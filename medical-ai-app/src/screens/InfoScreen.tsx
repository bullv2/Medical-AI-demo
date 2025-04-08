import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type InfoScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Info'>;
};

const InfoScreen: React.FC<InfoScreenProps> = () => {
  const medicineConflicts = [
    {
      title: '人参 vs 降压药',
      description: '人参具有升高血压的作用，与降压药同时服用可能影响药效。',
      tips: [
        '建议间隔2小时以上服用',
        '定期监测血压变化',
        '在医生指导下调整用药方案'
      ]
    },
    {
      title: '银杏 vs 抗凝血药',
      description: '银杏具有抗凝血作用，与华法林等抗凝血药同服可能增加出血风险。',
      tips: [
        '避免同时服用',
        '如需使用，需在医生严格监控下',
        '定期检查凝血功能'
      ]
    },
    {
      title: '甘草 vs 利尿剂',
      description: '甘草可能导致水钠潴留，与利尿剂作用相抵消。',
      tips: [
        '建议分开服用',
        '注意监测电解质水平',
        '观察水肿情况'
      ]
    },
    {
      title: '当归 vs 抗抑郁药',
      description: '当归可能影响抗抑郁药的代谢，导致药效增强或减弱。',
      tips: [
        '在医生指导下调整剂量',
        '注意观察情绪变化',
        '定期复诊评估'
      ]
    }
  ];

  const healthTips = [
    {
      title: '用药时间',
      tips: [
        '中药和西药最好间隔2小时以上服用',
        '饭前或饭后服用需遵医嘱',
        '固定时间服药有助于维持血药浓度'
      ]
    },
    {
      title: '饮食注意',
      tips: [
        '服药期间避免饮酒',
        '注意饮食清淡，避免辛辣刺激',
        '某些药物需避免与特定食物同服'
      ]
    },
    {
      title: '日常监测',
      tips: [
        '定期监测相关指标',
        '记录用药反应和副作用',
        '及时向医生反馈身体变化'
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>常见药物相互作用</Text>
      
      {medicineConflicts.map((conflict, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{conflict.title}</Text>
          <Text style={styles.description}>{conflict.description}</Text>
          <View style={styles.tipsContainer}>
            {conflict.tips.map((tip, tipIndex) => (
              <Text key={tipIndex} style={styles.tip}>• {tip}</Text>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.header}>健康小贴士</Text>
      
      {healthTips.map((section, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{section.title}</Text>
          <View style={styles.tipsContainer}>
            {section.tips.map((tip, tipIndex) => (
              <Text key={tipIndex} style={styles.tip}>• {tip}</Text>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          注意：以上信息仅供参考，具体用药请遵医嘱。如有不适，请及时就医。
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 10,
  },
  tipsContainer: {
    marginTop: 10,
  },
  tip: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 5,
  },
  disclaimer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});

export default InfoScreen; 