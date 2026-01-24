import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, borderRadius } from './globalStyles';

export const chatScreenStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: 8,
  },

  // Header - Clean and minimal
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightSemibold,
  },
  modelInfo: {
    color: colors.textTertiary,
    fontSize: typography.fontSizeXs,
    marginTop: 2,
  },

  // Message Bubbles - Rounded pills with modern feel
  messageBubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 6,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  messageContent: {
    fontSize: typography.fontSizeSm,
    lineHeight: 20,
  },
  userMessageContent: {
    color: colors.surfaceDark,
  },
  assistantMessageContent: {
    color: colors.textPrimary,
  },

  // Loading states
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  loadingText: {
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    fontSize: typography.fontSizeSm,
  },

  // Typing indicator
  typingBubble: {
    paddingVertical: spacing.md,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    color: colors.primary,
    fontSize: 18,
    lineHeight: 18,
    opacity: 0.4,
  },
  typingDotDelay1: {
    opacity: 0.6,
  },
  typingDotDelay2: {
    opacity: 0.9,
  },

  // Input Bar - Pill-shaped modern design
  inputContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? spacing.sm : spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSizeSm,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
    maxHeight: 100,
    marginBottom: Platform.OS === 'ios' ? 0 : 2,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.textTertiary,
  },
  sendButtonText: {
    color: colors.surfaceDark,
    fontWeight: typography.fontWeightSemibold,
    fontSize: typography.fontSizeSm,
  },
  stopButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    marginRight: spacing.sm,
    alignSelf: 'flex-end',
  },
  stopButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.fontWeightSemibold,
    fontSize: typography.fontSizeXs,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyText: {
    color: colors.textTertiary,
    fontSize: typography.fontSizeMd,
    textAlign: 'center',
  },

  // Deprecated styles kept for compatibility
  messageRole: {
    display: 'none', // Hide role labels for cleaner look
  },
});
