import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: '',
    password: '',
    confirmPassword: '',
    refereeId: '', // Changed from refereesID to match backend
    role: 'borrower', // Default role
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.fullName.trim()) return 'Full Name is required';
    if (!form.email.includes('@')) return 'Invalid email address';
    if (form.phone.length < 10) return 'Phone number must be at least 10 digits';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      Alert.alert('Validation Error', validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.100.4:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          county: form.county,
          password: form.password,
          referee_id: form.refereeId || null, // Match backend field name
          role: form.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
        router.push('/login');
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={form.fullName}
          onChangeText={(value) => handleChange('fullName', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(value) => handleChange('email', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(value) => handleChange('phone', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="County"
          value={form.county}
          onChangeText={(value) => handleChange('county', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Referee ID (optional)"
          keyboardType="numeric"
          value={form.refereeId}
          onChangeText={(value) => handleChange('refereeId', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleChange('password', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
        />

        <Pressable
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Registering...' : 'Register'}
          </Text>
        </Pressable>

        <Text style={styles.termsText}>
          By registering, you agree to our{' '}
          <Text style={styles.link} onPress={() => Alert.alert('Terms & Conditions', 'Link to terms will be added here.')}>
            Terms and Conditions
          </Text>.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#08a063',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#08a063',
    textDecorationLine: 'underline',
  },
});

export default RegisterPage;