import Modal from 'react-native-modal';
import {styles} from './styles';
import {View} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Colors } from '../../../consts';


type DrawerProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};
/**
 * BottomDrawer component is a customizable modal that slides up from the bottom of the screen.
 * It is used to display additional information or options to the user.
 *
 * @param {boolean} isOpen - a boolean indicating whether the modal is open or not
 * @param {() => void} closeModal - a function to close the modal
 * @param {React.ReactNode} children - the content to be displayed inside the modal
 * @return {React.ReactElement} - the rendered modal component
 */
const BottomDrawer: React.FC<DrawerProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  // Get the current theme from the theme context
  const currentTheme = useTheme();

  return (
    // Render the modal component with the specified props
    <Modal
      // When the backdrop or the back button is pressed, call the closeModal function
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      // Set the visibility of the modal based on the isOpen prop
      isVisible={isOpen}
      // Allow the modal to be swiped down to close it
      swipeDirection="down"
      // When the modal is swiped down, call the closeModal function
      onSwipeComplete={closeModal}
      // Set the animation for opening the modal
      animationIn="bounceInUp"
      // Set the animation for closing the modal
      animationOut="bounceOutDown"
      // Set the duration of the animation for opening the modal
      animationInTiming={400}
      // Set the duration of the animation for closing the modal
      animationOutTiming={500}
      // Set the duration of the transition for the backdrop
      backdropTransitionInTiming={1000}
      // Set the duration of the transition for the backdrop
      backdropTransitionOutTiming={500}
      // Apply the styles for the modal
      style={styles.modal}
    >
      {/* Render the main content of the modal */}
      <View style={[styles.modalContent, {backgroundColor: Colors[currentTheme].background}]}>
        {/* Render a centered bar icon */}
        <View style={styles.center}>
          <View style={[styles.barIcon, {backgroundColor: Colors[currentTheme].text}]} />
        </View>
        {/* Render the children components passed to the BottomDrawer */}
        {children}
      </View>
    </Modal>
  );
};

export default BottomDrawer;
