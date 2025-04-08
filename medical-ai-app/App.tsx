import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import MedicineComparisonScreen from './src/screens/MedicineComparisonScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
