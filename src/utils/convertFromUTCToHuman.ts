/**
 * Converts a UTC timestamp to a human-readable date string.
 * 
 * @param {string} timestamp - The UTC timestamp to convert.
 * @param {string} [locale] - The locale to use for formatting the date. Defaults to 'en-US' if not provided.
 * @returns {string} The human-readable date string. If the timestamp is invalid, an empty string is returned.
 */
export const convertFromUTCToHuman = (timestamp: string, locale?: string) => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // If the timestamp is invalid, return an empty string
  if (date.toString() === 'Invalid Date') return '';
  
  // Define the options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric', // Day of the month, 2 digits with leading zeros
    month: 'short', // Abbreviated month name
    year: 'numeric', // 4-digit year
  };

  // Format the date using the specified locale and options
  return date.toLocaleDateString(locale || 'en-US', options);
}
