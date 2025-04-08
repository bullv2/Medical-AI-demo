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

  const renderList = (items: string[] | undefined, emptyMessage: string) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
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
        <Text style={styles.subtitle}>名称: {parsedAnalysis.chineseAnalysis?.name || '未知'}</Text>
        <Text style={styles.subtitle}>成分:</Text>
        {renderList(parsedAnalysis.chineseAnalysis?.ingredients, '未提供成分信息')}
        <Text style={styles.subtitle}>功效:</Text>
        {renderList(parsedAnalysis.chineseAnalysis?.effects, '未提供功效信息')}
        <Text style={styles.subtitle}>剂量: {parsedAnalysis.chineseAnalysis?.dosage || '未提供剂量信息'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>西药分析</Text>
        <Text style={styles.subtitle}>名称: {parsedAnalysis.westernAnalysis?.name || '未知'}</Text>
        <Text style={styles.subtitle}>成分:</Text>
        {renderList(parsedAnalysis.westernAnalysis?.ingredients, '未提供成分信息')}
        <Text style={styles.subtitle}>功效:</Text>
        {renderList(parsedAnalysis.westernAnalysis?.effects, '未提供功效信息')}
        <Text style={styles.subtitle}>剂量: {parsedAnalysis.westernAnalysis?.dosage || '未提供剂量信息'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>对比结果</Text>
        <Text style={styles.subtitle}>成分冲突:</Text>
        {renderList(parsedAnalysis.comparison?.ingredientConflicts, '未检测到成分冲突')}
        <Text style={styles.subtitle}>功效相互作用:</Text>
        {renderList(parsedAnalysis.comparison?.effectInteractions, '未检测到功效相互作用')}
        <Text style={styles.subtitle}>建议:</Text>
        {renderList(parsedAnalysis.comparison?.recommendations, '暂无建议')}
        <Text style={styles.subtitle}>警告:</Text>
        {renderList(parsedAnalysis.comparison?.warnings, '暂无警告')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#666',
  },
  listItem: {
    fontSize: 14,
    marginLeft: 16,
    marginTop: 4,
    color: '#444',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginLeft: 16,
    marginTop: 4,
  },
});

export default ResultsScreen; 