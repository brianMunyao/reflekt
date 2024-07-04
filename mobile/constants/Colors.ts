/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
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

		buttonPrimaryBackground: '#6B9773',
		buttonPrimaryText: '#ECEDEE',
		buttonDisabledBackground: '#393937',
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

		buttonPrimaryBackground: '#6B9773',
		buttonPrimaryText: '#ECEDEE',
		buttonDisabledBackground: '#393937',
	},
};
