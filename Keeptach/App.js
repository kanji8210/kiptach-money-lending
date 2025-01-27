import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/HomePage';
import ClientPage from './src/pages/ClientPage';
import AppraiserPage from './src/pages/AppraiserPage';
import SupervisorPage from './src/pages/SupervisorPage';
import GetLoanPage from './src/pages/GetLoanPage';
import PaymentPage from './src/pages/PaymentPage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import Loader from './src/components/Loader';
import Dashboard from './src/pages/Dashboard';
import NavBar from './src/components/NavBar';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Client" component={ClientPage} />
            <Stack.Screen name="Appraiser" component={AppraiserPage} />
            <Stack.Screen name="Supervisor" component={SupervisorPage} />
            <Stack.Screen name="Loan" component={GetLoanPage} />
            <Stack.Screen name="Payment" component={PaymentPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </Stack.Navigator>
         
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
