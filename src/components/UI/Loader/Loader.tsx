import React, {useEffect, useState} from 'react';
import {Image, View, ActivityIndicator, Text} from 'react-native';
import {styles} from './styles';
import {useTheme} from '../../../hooks/useTheme';
import {Colors} from '../../../consts';

/**
 * Loader component is responsible for displaying a loading indicator.
 * If the loading takes more than 10 seconds, it displays an error message.
 */
const Loader: React.FC = () => {
  // State to track if an error has occurred
  const [isError, setIsError] = useState(false);

  // Get the current theme from the useTheme hook
  const currentTheme = useTheme();

  // Set a timeout of 10 seconds and set isError to true
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Render the loading indicator or error message
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: Colors[currentTheme].background},
      ]}>
      {isError ? (
        <>
          {/* Display an error message if loading takes too long */}
          <Text style={{color: Colors[currentTheme].text}}>
            Looks like something went wrong.
          </Text>
          <Text style={{color: Colors[currentTheme].text}}>
            Please try again or contact support
          </Text>
        </>
      ) : (
        <ActivityIndicator
          size="large"
          color={Colors[currentTheme].text}
        />
      )}
    </View>
  );
};

export default Loader;
