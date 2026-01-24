import { StyleSheet } from 'react-native';

/**
 * Global styles used across the entire application
 */
export const colors = {
  // Background colors (whisper-inspired dark palette)
  background: '#1A1A1D',
  surface: '#242428',
  surfaceLight: '#2D2D30',
  surfaceDark: '#0D0D0F',

  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A5',
  textTertiary: '#6B6B70',

  // Accent colors (warm sunset orange)
  primary: '#F4A261',
  primaryLight: '#F4B183',
  primaryDark: '#E76F51',
  accent: '#F4A261', // alias for backward compatibility
  success: '#4CAF50',

  // UI colors
  border: '#2D2D30',
  borderLight: '#242428',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 30,
};

export const typography = {
  fontSizeXs: 12,
  fontSizeSm: 14,
  fontSizeMd: 15,
  fontSizeLg: 16,
  fontSizeXl: 20,
  fontSizeXxl: 28,
  fontSizeHuge: 32,
  fontSizeDisplay: 56,

  fontWeightLight: '200' as const,
  fontWeightRegular: '400' as const,
  fontWeightSemibold: '600' as const,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const globalStyles = StyleSheet.create({
  // Common container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Text styles
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeXxl,
    fontWeight: typography.fontWeightLight,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeLg,
  },

  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },

  // Button styles
  button: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: 10,
  },

  buttonText: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeightSemibold,
  },

  buttonDisabled: {
    backgroundColor: colors.textSecondary,
  },
});
