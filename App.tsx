import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {Colors, screens} from './src/consts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

// TODO: Move all screens to separate files
// TODO: Make all screens to be typed
const Stack = createNativeStackNavigator();

/**
 * The main App component.
 *
 * This component sets up the Redux store, initializes the navigation stack,
 * and renders the navigation container with the appropriate screens.
 *
 * @returns {React.JSX.Element} The rendered App component.
 */
function App(): React.JSX.Element {
  // Determine the color scheme based on the device's current settings
  const colorScheme = useColorScheme();

  // Set the background and text colors based on the color scheme
  // for some reason works reversed on Android
  const backgroundColor = colorScheme === 'dark'
    ? Colors.dark.background
    : Colors.light.background;
  const textColor = colorScheme === 'dark'
    ? Colors.dark.text
    : Colors.light.text;
    
  return (
    // Wrap the entire app in the Redux provider component
    <Provider store={store}>
      {/* Initialize the navigation container */}
      <NavigationContainer>
        {/* Create the stack navigator with the appropriate screens */}
        <Stack.Navigator
          initialRouteName='PostsList'
          screenOptions={{
            // Show the header on each screen
            headerShown: true,
            // Set the background color and text color for the header
            headerStyle: {backgroundColor: backgroundColor},
            headerTintColor: textColor,
          }}
        >
          {/* Map over the screens array and render each screen */}
          {screens.map(screen => (
            <Stack.Screen
              name={screen.name}
              component={screen.component}
              key={screen.name}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
