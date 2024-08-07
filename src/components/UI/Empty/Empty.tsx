import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import { useTheme } from '../../../hooks/useTheme';
import { Colors } from '../../../consts';

type EmptyProps = {
  message?: string;
};

/**
 * Empty component displays a message when there is no data to display.
 * It uses the current theme to style the background and text color.
 *
 * @param {string} message - The message to display. Default is "Empty".
 * @return {React.ReactElement} The Empty component.
 */
const Empty: React.FC<EmptyProps> = ({message = "Empty"}) => {
  // Get the current theme from the useTheme hook
  const currentTheme = useTheme();

  // Render the Empty component
  return (
    // View container with a background color based on the current theme
    <View style={[styles.container, {backgroundColor: Colors[currentTheme].background}]}>
      {/* Text component to display the message */}
      <Text style={[styles.message, {color: Colors[currentTheme].text}]}>{message}</Text>
    </View>
  );
};

export default Empty;
