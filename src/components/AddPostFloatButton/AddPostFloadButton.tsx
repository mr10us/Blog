import {Pressable, Text} from 'react-native';
import {styles} from './styles';
import { useTheme } from '../../hooks/useTheme';
import { Colors } from '../../consts';

type AddPostFloadButtonProps = {
  onPress: () => void;
};

/**
 * AddPostFloadButton component
 * Renders a floating action button for adding a new post.
 *
 * @param {AddPostFloadButtonProps} props - Component props
 * @param {() => void} props.onPress - Function to be called when the button is pressed
 * @return {ReactElement} The rendered component
 */
const AddPostFloadButton: React.FC<AddPostFloadButtonProps> = ({
  onPress,
}) => {
  // Get the current theme from the useTheme hook
  const currentTheme = useTheme();

  // Render the AddPostFloadButton component
  return (
    // Wrap the button in a Pressable component for touch feedback
    <Pressable
      // Apply the container style and customize the background color and shadow based on the current theme
      style={[
        styles.container,
        {
          backgroundColor: Colors[currentTheme].card,
          shadowColor: Colors[currentTheme].shadow,
        },
      ]}
      // Call the onPress function when the button is pressed
      onPress={onPress}
    >
      {/* Render the plus sign icon */}
      <Text
        // Apply the plus style and customize the text color based on the current theme
        style={[
          styles.plus,
          {
            color: Colors[currentTheme].text,
          },
        ]}
      >
        +
      </Text>
    </Pressable>
  );
};

export default AddPostFloadButton;