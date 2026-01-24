import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from './globalStyles';

export const modelScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  header: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeHuge,
    fontWeight: typography.fontWeightLight,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeLg,
  },
  modelList: {
    gap: spacing.lg,
  },
  modelCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modelCardActive: {
    borderColor: colors.success,
    borderWidth: 2,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modelName: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightSemibold,
  },
  modelSize: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeSm,
    fontFamily: 'monospace',
  },
  modelRepo: {
    color: colors.textTertiary,
    fontSize: typography.fontSizeXs,
    marginBottom: spacing.md,
  },
  downloadedText: {
    color: colors.success,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightSemibold,
    marginTop: spacing.sm,
  },
  downloadPrompt: {
    color: colors.accent,
    fontSize: typography.fontSizeSm,
    marginTop: spacing.sm,
  },
});
