import {StatusBar, useColorScheme, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../consts';
import React from 'react';
import {useTheme} from '../hooks/useTheme';

/**
 * Wrapper component that wraps the entire application.
 * It sets the background color and status bar style based on the current theme.
 *
 * @param {React.ReactNode} children - The child components to be wrapped.
 * @return {React.ReactElement} The wrapped component.
 */
const Wrapper = ({children}: {children: React.ReactNode}): React.ReactElement => {
  // Get the current theme from the useTheme hook
  const currentTheme = useTheme();

  // Set the background style based on the current theme
  const backgroundStyle = {
    backgroundColor: Colors[currentTheme].background,
  };

  return (
    // SafeAreaView is used to ensure that the content is not clipped by the notches or rounded corners of devices
    <SafeAreaView style={backgroundStyle}>
      {/* StatusBar is used to customize the appearance of the status bar */}
      <StatusBar
        // Set the bar style based on the current theme
        barStyle={`${currentTheme}-content`}
        // Set the background color of the status bar to match the background color of the wrapper
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* View wraps the children components and provides padding and margin */}
      <View style={{height: '100%', marginHorizontal: 16, paddingVertical: 16}}>{children}</View>
    </SafeAreaView>
  );
};
export default Wrapper;
