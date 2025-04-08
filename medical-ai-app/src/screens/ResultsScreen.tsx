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
        <Text style={styles.sectionTitle}>Chinese Medicine Analysis</Text>
        <Text style={styles.subtitle}>Name: {parsedAnalysis.chineseAnalysis.name}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {renderList(parsedAnalysis.chineseAnalysis.ingredients, 'No ingredients specified')}
        <Text style={styles.subtitle}>Effects:</Text>
        {renderList(parsedAnalysis.chineseAnalysis.effects, 'No effects specified')}
        <Text style={styles.subtitle}>Dosage: {parsedAnalysis.chineseAnalysis.dosage}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Western Medicine Analysis</Text>
        <Text style={styles.subtitle}>Name: {parsedAnalysis.westernAnalysis.name}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {renderList(parsedAnalysis.westernAnalysis.ingredients, 'No ingredients specified')}
        <Text style={styles.subtitle}>Effects:</Text>
        {renderList(parsedAnalysis.westernAnalysis.effects, 'No effects specified')}
        <Text style={styles.subtitle}>Dosage: {parsedAnalysis.westernAnalysis.dosage}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comparison Results</Text>
        
        <Text style={styles.subtitle}>Ingredient Conflicts:</Text>
        {renderList(parsedAnalysis.comparison.ingredientConflicts, 'No ingredient conflicts detected')}
        
        <Text style={styles.subtitle}>Effect Interactions:</Text>
        {renderList(parsedAnalysis.comparison.effectInteractions, 'No effect interactions detected')}
        
        <Text style={styles.subtitle}>Warnings:</Text>
        {renderList(parsedAnalysis.comparison.warnings, 'No warnings')}
        
        <Text style={styles.subtitle}>Recommendations:</Text>
        {renderList(parsedAnalysis.comparison.recommendations, 'No recommendations')}
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