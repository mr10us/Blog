import {Pressable, StyleSheet, Text} from 'react-native';
import {defaultButtonStyle, handleButtonType, buttonThemes} from './helper';

export type AllowedButtonTypes =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'ghost';

type CustomButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  type?: AllowedButtonTypes;
};
/**
 * CustomButton component
 *
 * This component represents a customizable button with different types and styles.
 * It uses the `Pressable` component from React Native and applies the styles
 * based on the provided `type`.
 *
 * @param {CustomButtonProps} props - The props object containing the following properties:
 *   - `children` (ReactNode): The content of the button.
 *   - `onPress` (() => void): The function to call when the button is pressed.
 *   - `style` (object): Additional styles to apply to the button.
 *   - `type` (AllowedButtonTypes): The type of the button (default: 'primary').
 * @returns {ReactElement} The rendered custom button.
 */
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onPress,
  type = 'primary',
  style,
}) => {
  // Handle the button type by defaulting to 'primary' if not provided
  const usingType = handleButtonType(type);

  // Create the button style based on the provided type
  const buttonStyle = StyleSheet.create({
    [usingType]: {
      backgroundColor:
        buttonThemes[usingType]?.background || 'transparent',
      color: buttonThemes[usingType]?.color || 'black',
    },
  });

  // Render the button with the provided children and onPress function
  return (
    <Pressable
      style={[buttonStyle[usingType], defaultButtonStyle, style]}
      onPress={onPress}
    >
      {/* Render the button content with the appropriate styles */}
      <Text style={[buttonStyle[usingType], {fontSize: 16}]}>
        {children}
      </Text>
    </Pressable>
  );
};
export default CustomButton;
