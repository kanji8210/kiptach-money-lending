import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    { name: 'Account', icon: 'user', path: '/client' },
    { name: 'Settings', icon: 'cog', path: '/settings' },
    { name: 'Credits', icon: 'credit-card', path: '/credits' },
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  ];

  return (
    <View style={styles.navBar}>
      {routes.map((route, index) => {
        //show page title if it is active
        const isActive = pathname === route.path;
        
        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(route.path)}
            style={styles.navItem}
          >
            <FontAwesome
              name={route.icon as any}
              size={24}
              color={isActive ? '#08a063' : '#dbdada'}
            />
            {isActive && (
              <Text style={styles.navText}>{route.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#cc3910',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navText: {
    color: '#08a063',
    marginTop: 5,
    fontSize: 12,
  },
});

export default NavBar;