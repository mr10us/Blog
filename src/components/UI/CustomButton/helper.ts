import {Colors} from '../../../consts';
import {useTheme} from '../../../hooks/useTheme';
import type {AllowedButtonTypes} from './CustomButton';

export const handleButtonType = (
  type: AllowedButtonTypes | undefined,
): AllowedButtonTypes => {
  if (!type) return 'primary';

  if (type === 'success') return 'success';
  if (type === 'danger') return 'danger';
  if (type === 'warning') return 'warning';
  if (type === 'info') return 'info';
  if (type === 'ghost') return 'ghost';

  return 'primary';
};

export const defaultButtonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  borderRadius: 15,
  height: 50,
};

export const buttonThemes = {
  primary: {background: '#1f1f1f', color: '#f3f3f3'},
  success: {background: '#20725e', color: '#f3f3f3'},
  danger: {background: '#fd4e5d', color: '#f3f3f3'},
  warning: {background: '#fbc756', color: '#f3f3f3'},
  info: {background: '#116acc', color: '#f3f3f3'},
  ghost: {background: 'transparent', color: '#f3f3f3'},
};
