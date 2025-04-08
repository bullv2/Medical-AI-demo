import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import MedicineComparisonScreen from './src/screens/MedicineComparisonScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import InfoScreen from './src/screens/InfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#4c669f' }}>
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
              contentStyle: {
                backgroundColor: '#fff',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                title: '中医AI对比系统',
                headerShown: false,
              }}
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
