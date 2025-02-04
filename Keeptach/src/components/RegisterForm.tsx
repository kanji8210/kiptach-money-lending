import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  referralCode: string; // Updated field name
  password: string;
  confirm_password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    county: "",
    referralCode: "", // Updated field name
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(07\d{8}|01\d{8})$/.test(formData.phone)) {
      newErrors.phone = "Invalid Kenyan phone number. Use 07xxxxxxxx or 01xxxxxxxx format";
    }
    if (!formData.county.trim()) newErrors.county = "County is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm password is required";
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://172.20.10.2:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          county: formData.county,
          referralCode: formData.referralCode || null, // Updated field
          password: formData.password,
          role: "borrower",
          is_active: true,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Registration successful!");
        router.push("/login");
      } else {
        Alert.alert("Error", data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TextInput
              style={[styles.input, errors.fullName && styles.errorInput]}
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={[styles.input, errors.phone && styles.errorInput]}
              placeholder="Phone (07xxxxxxxx or 01xxxxxxxx)"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <TextInput
              style={[styles.input, errors.county && styles.errorInput]}
              placeholder="County"
              value={formData.county}
              onChangeText={(text) => handleChange("county", text)}
            />
            {errors.county && <Text style={styles.errorText}>{errors.county}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Referral Code (optional)"
              value={formData.referralCode}
              onChangeText={(text) => handleChange("referralCode", text)}
            />

            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              style={[styles.input, errors.confirm_password && styles.errorInput]}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirm_password}
              onChangeText={(text) => handleChange("confirm_password", text)}
            />
            {errors.confirm_password && (
              <Text style={styles.errorText}>{errors.confirm_password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By registering, you agree to our{" "}
              <Text style={styles.link} onPress={() => Linking.openURL("https://www.example.com/terms-of-service")}>
                Terms of Service
              </Text>
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: 20, justifyContent: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  termsText: { marginTop: 20, textAlign: "center", color: "#666" },
  link: { color: "#007bff", textDecorationLine: "underline" },
});
