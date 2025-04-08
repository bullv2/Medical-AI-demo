import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type ResultsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route }) => {
  const { chineseMedicine, westernMedicine, analysis } = route.params;
  const parsedAnalysis = JSON.parse(analysis);

  const renderList = (items: string[], emptyMessage: string) => {
    if (!items || items.length === 0) {
      return <Text style={styles.emptyText}>{emptyMessage}</Text>;
    }
    return items.map((item, index) => (
      <Text key={index} style={styles.listItem}>• {item}</Text>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>中药分析</Text>
        <Text style={styles.subtitle}>名称: {parsedAnalysis.chineseAnalysis.name}</Text>
        <Text style={styles.subtitle}>成分:</Text>
        {renderList(parsedAnalysis.chineseAnalysis.ingredients, '未指定成分')}
        <Text style={styles.subtitle}>功效:</Text>
        {renderList(parsedAnalysis.chineseAnalysis.effects, '未指定功效')}
        <Text style={styles.subtitle}>用量: {parsedAnalysis.chineseAnalysis.dosage}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>西药分析</Text>
        <Text style={styles.subtitle}>名称: {parsedAnalysis.westernAnalysis.name}</Text>
        <Text style={styles.subtitle}>成分:</Text>
        {renderList(parsedAnalysis.westernAnalysis.ingredients, '未指定成分')}
        <Text style={styles.subtitle}>功效:</Text>
        {renderList(parsedAnalysis.westernAnalysis.effects, '未指定功效')}
        <Text style={styles.subtitle}>用量: {parsedAnalysis.westernAnalysis.dosage}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>对比结果</Text>
        
        <Text style={styles.subtitle}>成分冲突:</Text>
        {renderList(parsedAnalysis.comparison.ingredientConflicts, '未检测到成分冲突')}
        
        <Text style={styles.subtitle}>功效相互作用:</Text>
        {renderList(parsedAnalysis.comparison.effectInteractions, '未检测到功效相互作用')}
        
        <Text style={styles.subtitle}>警告:</Text>
        {renderList(parsedAnalysis.comparison.warnings, '无警告')}
        
        <Text style={styles.subtitle}>建议:</Text>
        {renderList(parsedAnalysis.comparison.recommendations, '无建议')}
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
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#444',
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
    marginBottom: 5,
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
    marginLeft: 10,
  },
});

export default ResultsScreen; 