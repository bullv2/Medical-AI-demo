import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { compareMedicines } from '../services/witService';

type MedicineComparisonScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MedicineComparison'>;
};

const MedicineComparisonScreen: React.FC<MedicineComparisonScreenProps> = ({
  navigation,
}) => {
  const [chineseMedicine, setChineseMedicine] = useState('');
  const [westernMedicine, setWesternMedicine] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!chineseMedicine.trim() || !westernMedicine.trim()) {
      Alert.alert('Error', 'Please enter both Chinese and Western medicine details');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await compareMedicines(chineseMedicine, westernMedicine);
      
      navigation.navigate('Results', {
        chineseMedicine,
        westernMedicine,
        analysis: JSON.stringify(result, null, 2),
      });
    } catch (err) {
      setError('Failed to analyze medicines. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.instructions}>
        Enter the details of both medicines to compare their ingredients and potential interactions.
        Include as much information as possible about ingredients, effects, and dosage.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chinese Medicine</Text>
        <TextInput
          style={styles.input}
          value={chineseMedicine}
          onChangeText={setChineseMedicine}
          placeholder="Enter Chinese medicine name, ingredients, effects, and dosage"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Western Medicine</Text>
        <TextInput
          style={styles.input}
          value={westernMedicine}
          onChangeText={setWesternMedicine}
          placeholder="Enter Western medicine name, ingredients, effects, and dosage"
          multiline
          numberOfLines={4}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[
          styles.button,
          (!chineseMedicine.trim() || !westernMedicine.trim() || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleCompare}
        disabled={!chineseMedicine.trim() || !westernMedicine.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Compare Medicines</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MedicineComparisonScreen; 