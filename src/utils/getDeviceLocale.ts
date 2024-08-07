import {Platform, NativeModules} from 'react-native';


/**
 * Returns the locale identifier for the device's current language settings.
 * 
 * @returns {string} The locale identifier, formatted as a string in the format language-region.
 *                  For example, 'en-US' for English (United States).
 */
export const getDeviceLocale = (): string => {
  // Get the current platform
  const platform: string = Platform.OS;

  // Define the locale based on the platform
  let locale: string;
  if (platform === 'ios') {
    // For iOS, use the AppleLocale or the first language in AppleLanguages
    locale = NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
  } else {
    // For Android, use the localeIdentifier
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  // Replace underscores with hyphens in the locale and return the result
  return locale.replace('_', '-');
};
