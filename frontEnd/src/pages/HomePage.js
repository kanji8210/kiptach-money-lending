// src/pages/HomePage.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const HomePage = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.header}>
      <Image source={require('../../assets/adaptive-icon.png')} style={styles.logo} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={[{ key: '1' }]}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
      />
      <Text style={styles.text}>Welcome to the Home Page!</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomePage;
