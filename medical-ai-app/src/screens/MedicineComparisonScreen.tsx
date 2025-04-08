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
      Alert.alert('错误', '请输入中药和西药的详细信息');
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
      setError('分析失败，请重试');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.instructions}>
        请输入两种药物的详细信息以比较其成分和潜在相互作用。
        请尽可能详细地提供成分、功效和用量信息。
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>中药</Text>
        <TextInput
          style={styles.input}
          value={chineseMedicine}
          onChangeText={setChineseMedicine}
          placeholder="请输入中药名称、成分、功效和用量"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>西药</Text>
        <TextInput
          style={styles.input}
          value={westernMedicine}
          onChangeText={setWesternMedicine}
          placeholder="请输入西药名称、成分、功效和用量"
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
          <Text style={styles.buttonText}>对比药物</Text>
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