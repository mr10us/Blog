import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from '../../../hooks/useTheme';
import { Colors } from '../../../consts';

type ErrorProps = {
  error: string;
};

/**
 * Error component is responsible for rendering an error message and a button to navigate back to the home screen.
 *
 * @param {ErrorProps} props - The component props containing the error message.
 * @return {React.ReactElement | null} The rendered error component or null if there is no error.
 */
const Error: React.FC<ErrorProps> = ({ error }) => {
  // If there is no error, return null to indicate that no component should be rendered.
  if (!error) return null;

  // Get the navigation object from the useNavigation hook.
  const navigation = useNavigation();

  // Get the current theme from the useTheme hook.
  const currentTheme = useTheme();

  /**
   * Navigates to the Home screen when the button is pressed.
   */
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    // Wrap the error component in a View to provide a background color and padding.
    <View
      style={[styles.container, { backgroundColor: Colors[currentTheme].background }]}
    >
      {/* Wrap the error message and button in a separate View to provide background color and padding. */}
      <View
        style={[styles.separate, { backgroundColor: Colors[currentTheme].card }]}
      >
        {/* Display the error message. */}
        <Text
          style={[styles.message, { color: Colors[currentTheme].text }]}
        >
          {error}
        </Text>
        {/* Display a button to navigate back to the home screen. */}
        <Button
          title="Navigate Home"
          onPress={navigateToHome}
        />
      </View>
    </View>
  );
};

export default Error;
