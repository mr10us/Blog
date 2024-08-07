import type {UserType} from '../types/UserType';


/**
 * Retrieves the full name of a user.
 *
 * @param {UserType | null} user - The user object containing the user's information.
 * @return {string} The full name of the user.
 */
export const getFullName = (user: UserType | null): string => {
  // If the user object is null, return an empty string.
  if (!user) {
    return '';
  }

  // Retrieve the name and secondName properties from the user object.
  // If the properties are undefined, assign an empty string to them.
  const name = user?.name || "";
  const secondName = user?.secondName || "";

  // Retrieve the fullName property from the user object.
  const fullName = user?.fullName;

  // If the fullName property is defined, return it.
  // Otherwise, concatenate the name and secondName with a space in between
  // and remove any leading or trailing whitespace.
  if (fullName) {
    return fullName;
  }
  return `${name} ${secondName}`.trim();
};
