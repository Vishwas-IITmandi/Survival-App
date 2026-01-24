# Styles Structure

This directory contains all the styling files for the application, organized in a modular way.

## File Organization

### `globalStyles.ts`
Contains shared design tokens and common styles used across the entire application:
- **Colors**: Background, text, accent, and UI colors
- **Spacing**: Consistent spacing values (xs, sm, md, lg, xl, xxl)
- **Typography**: Font sizes and weights
- **Border Radius**: Standardized border radius values
- **Global Styles**: Reusable component styles (buttons, cards, etc.)

### Screen-specific Style Files
Each screen has its own dedicated style file:
- `chatScreenStyles.ts` - Styles for ChatScreen
- `modelScreenStyles.ts` - Styles for ModelScreen
- `compassScreenStyles.ts` - Styles for CompassScreen

## Usage

Import the styles you need in your component:

```typescript
// Import global styles
import { colors, spacing, typography, globalStyles } from '../styles/globalStyles';

// Import screen-specific styles
import { chatScreenStyles as styles } from '../styles/chatScreenStyles';
```

## Benefits of This Structure

1. **Maintainability**: Styles are organized and easy to find
2. **Consistency**: Global design tokens ensure consistent look and feel
3. **Reusability**: Common styles can be imported anywhere
4. **Scalability**: Easy to add new screen styles or modify existing ones
5. **Type Safety**: TypeScript provides autocomplete and type checking

## Adding New Styles

To add a new screen:
1. Create a new file `[screenName]Styles.ts`
2. Import design tokens from `globalStyles`
3. Export a StyleSheet with your screen-specific styles
4. Import and use in your screen component
