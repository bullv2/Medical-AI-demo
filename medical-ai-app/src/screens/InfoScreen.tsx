import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const InfoScreen = () => {
  const medicineConflicts = [
    {
      title: '人参 vs 降压药',
      description: '人参具有升高血压的作用，与降压药同时使用可能影响药效',
      tips: '建议间隔2小时服用，或在医生指导下调整用药方案'
    },
    {
      title: '银杏叶 vs 抗凝药',
      description: '银杏叶具有抗血小板聚集作用，与抗凝药合用可能增加出血风险',
      tips: '需要密切监测凝血功能，必要时调整药物剂量'
    },
    {
      title: '甘草 vs 利尿剂',
      description: '甘草可能导致水钠潴留，与利尿剂作用相拮抗',
      tips: '建议在医生指导下使用，注意监测血压和电解质'
    },
    {
      title: '当归 vs 抗抑郁药',
      description: '当归可能增强抗抑郁药的作用，增加不良反应风险',
      tips: '需要调整药物剂量，并密切观察精神状态'
    }
  ];

  const healthTips = [
    {
      title: '用药时间',
      description: '中西药服用时间应间隔2小时以上，避免相互作用'
    },
    {
      title: '饮食注意',
      description: '服药期间避免辛辣、油腻食物，保持清淡饮食'
    },
    {
      title: '定期监测',
      description: '定期检查肝肾功能，观察药物不良反应'
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f8f9fa', '#e9ecef']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>常见药物冲突</Text>
            {medicineConflicts.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <View style={styles.tipContainer}>
                  <Text style={styles.tipLabel}>健康建议：</Text>
                  <Text style={styles.tipText}>{item.tips}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>健康小贴士</Text>
            {healthTips.map((item, index) => (
              <View key={index} style={styles.tipCard}>
                <Text style={styles.tipCardTitle}>{item.title}</Text>
                <Text style={styles.tipCardDescription}>{item.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              免责声明：以上信息仅供参考，具体用药请遵医嘱
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 12,
    lineHeight: 22,
  },
  tipContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  tipLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  tipCardDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  disclaimer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default InfoScreen; 