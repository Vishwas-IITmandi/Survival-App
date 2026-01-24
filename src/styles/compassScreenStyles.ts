import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './globalStyles';

export const compassScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  degreeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeDisplay,
    fontWeight: typography.fontWeightLight,
    fontVariant: ['tabular-nums'],
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: spacing.sm,
  },
});
