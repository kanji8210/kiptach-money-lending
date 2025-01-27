// src/components/NavBar.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/FontAwesome';
import HomePage from './HomePage';
import ClientPage from './ClientPage';


const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = 'home';
            } else if (route.name === 'GetLoan') {
              iconName = 'money';
            } else if (route.name === 'ClientPage') {
              iconName = 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#08a063',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={HomePage} />
        <Tab.Screen name="GetLoan" component={LoanPage} />
        <Tab.Screen name="MyAccount" component={ClientPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavBar;
