// src/pages/HomePage.js
import React from 'react';
import splashIcon from '../../assets/splash-icon.png';

const HomePage = () => {
    return (
      
        <view style={styles.container}>
            <Image source={require('../../assets/adaptive-icon.png')} style={styles.logo} />
            <Text style={styles.text}>Please wait...</Text>
            </view>
    );

};

export default HomePage;
 