// src/pages/RegisterPage.js
import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Layout from '../components/_Layout'

const RegisterPage = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
        <Pressable style={styles.button} onPress={() => { /* Handle registration */ }}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#08a063',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterPage;
