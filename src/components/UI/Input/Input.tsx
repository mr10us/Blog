import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './styles';
import { useTheme } from '../../../hooks/useTheme';
import { Colors } from '../../../consts';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
} & React.ComponentProps<typeof TextInput>;

/**
 * A customizable input component.
 *
 * @param {InputProps} props - The props for the Input component.
 * @param {string} props.value - The value of the input.
 * @param {(text: string) => void} props.onChangeText - The callback function to handle text change.
 * @param {string} [props.label] - The label for the input.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {React.ComponentProps<typeof TextInput>} props.rest - The rest of the props for TextInput component.
 * @returns {React.ReactElement} The rendered Input component.
 */
export default function Input({...props}: InputProps) {
  // Get the current theme from the useTheme hook
  const currentTheme = useTheme();

  // Create the styles for the input based on the current theme
  const inputStyles = [
    styles.input,
    {
      borderColor: Colors[currentTheme].text, // Set the border color based on the text color
      color: Colors[currentTheme].text, // Set the text color based on the text color
      height: props.multiline ? 100 : 40, // Set the height based on whether the input is multiline
      textAlignVertical: props.multiline ? 'top' : 'center', // Set the text alignment based on whether the input is multiline
    },
  ];

  return (
    <View style={[styles.inputContainer, {backgroundColor: Colors[currentTheme].card}]}>
      {/* Render the label for the input */}
      <Text style={[styles.inputLabel, {color: Colors[currentTheme].text}]}>{props.label}</Text>
      {/* Render the TextInput component */}
      <TextInput
        multiline={props.multiline}
        style={inputStyles}
        placeholderTextColor={Colors[currentTheme].text} // Set the placeholder text color based on the text color
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
      />
    </View>
  );
}
