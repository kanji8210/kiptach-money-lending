import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/_Layout';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.header}>
        <Image source={require('../../assets/adaptive-icon.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <Text style={styles.suptitle}>About _</Text>
        <Text style={styles.text}>
          Kiptach is a Kenya-based money lending app regulated by the Central Bank of Kenya.
          Our operations strictly comply with the laws of Kenya.
          While some processes are automated, we rely on applicants'
          information provided in good faith. Any personal data collected is solely used
          for processing loan applications and their recovery. This information will not be
          shared with external entities or used for any other purposes, except in cases of
          default, where authorized recovery parties may be involved in accordance with the law.
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  suptitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    alignSelf: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    
  },
  button: {
    backgroundColor: '#08a063',
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
