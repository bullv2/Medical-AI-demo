import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, MaShanZheng_400Regular } from '@expo-google-fonts/ma-shan-zheng';
import { ZCOOLXiaoWei_400Regular } from '@expo-google-fonts/zcool-xiaowei';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    MaShanZheng_400Regular,
    ZCOOLXiaoWei_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontFamily: 'MaShanZheng_400Regular' }]}>中医</Text>
            <Text style={[styles.title, { fontFamily: 'ZCOOLXiaoWei_400Regular' }]}>AI</Text>
            <Text style={[styles.title, { fontFamily: 'MaShanZheng_400Regular' }]}>对比系统</Text>
          </View>
          <Text style={[styles.subtitle, { fontFamily: 'MaShanZheng_400Regular' }]}>对比中西药成分，识别潜在冲突</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('MedicineComparison')}
            >
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>开始对比</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('Info')}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>用药指南</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sloganContainer}>
            <Text style={[styles.sloganText, { fontFamily: 'MaShanZheng_400Regular' }]}>守护健康</Text>
            <Text style={[styles.sloganSubtext, { fontFamily: 'MaShanZheng_400Regular' }]}>从这里开始</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#f4511e',
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextPrimary: {
    color: '#4c669f',
  },
  buttonTextSecondary: {
    color: '#fff',
  },
  sloganContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sloganText: {
    fontSize: 36,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  sloganSubtext: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.8,
    letterSpacing: 1,
  },
});

export default HomeScreen; 