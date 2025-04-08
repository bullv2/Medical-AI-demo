import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import MedicineComparisonScreen from '../screens/MedicineComparisonScreen';
import ResultsScreen from '../screens/ResultsScreen';
import InfoScreen from '../screens/InfoScreen';

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
          options={{ title: '中医AI对比系统' }}
        />
        <Stack.Screen 
          name="MedicineComparison" 
          component={MedicineComparisonScreen}
          options={{ title: '药物对比' }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{ title: '分析结果' }}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: '用药指南' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 