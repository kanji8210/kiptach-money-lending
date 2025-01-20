// src/components/_layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout: React.FC = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default Layout;
