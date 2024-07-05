/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#6B9773';
const tintColorDark = '#fff';

export const Colors = {
	light: {
		text: '#11181C',
		background: '#fff',
		tint: tintColorLight,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: tintColorLight,

		inputBackground: '#F2F2F2',
		inputText: '#11181C',
		inputDisabledBackground: '#E0E0E0',

		buttonPrimaryBackground: '#6B9773',
		buttonPrimaryText: '#ECEDEE',
		buttonDisabledBackground: '#B0B0B0',

		dangerButtonBackground: '#FFCDD2',
		dangerButtonText: '#D32F2F',

		secondaryButtonBackground: '#E0E0E0',
		secondaryButtonText: '#333333',

		accent: '#1DE9B6',
		buttonBackground: '#F1F3F5',
		cardBackground: '#F8F9FA',
		divider: '#E1E4E8',
	},
	dark: {
		text: '#ECEDEE',
		background: '#151718',
		tint: tintColorDark,
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: tintColorDark,

		inputBackground: '#2F2F2F',
		inputText: '#fff',
		inputDisabledBackground: '#4F4F4F',

		buttonPrimaryBackground: '#5F7D6B',
		buttonPrimaryText: '#ECEDEE',
		buttonDisabledBackground: '#393937',

		dangerButtonBackground: '#EF9A9A',
		dangerButtonText: '#B71C1C',

		secondaryButtonBackground: '#616161',
		secondaryButtonText: '#FFFFFF',

		accent: '#1DE9B6',
		buttonBackground: '#1C1C1C',
		cardBackground: '#1E1E1E',
		divider: '#2C2C2C',
	},
};
