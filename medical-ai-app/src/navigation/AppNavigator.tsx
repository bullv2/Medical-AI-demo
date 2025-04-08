import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import MedicineComparisonScreen from '../screens/MedicineComparisonScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Medical AI Comparison' }}
        />
        <Stack.Screen 
          name="MedicineComparison" 
          component={MedicineComparisonScreen}
          options={{ title: 'Compare Medicines' }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{ title: 'Analysis Results' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 