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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chinese Medicine</Text>
        <Text style={styles.content}>{chineseMedicine}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Western Medicine</Text>
        <Text style={styles.content}>{westernMedicine}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analysis Results</Text>
        <Text style={styles.content}>{analysis}</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});

export default ResultsScreen; 