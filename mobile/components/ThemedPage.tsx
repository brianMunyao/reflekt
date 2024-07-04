import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPageProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedPage({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedPageProps) {
	const insets = useSafeAreaInsets();

	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background'
	);

	return (
		<View
			style={[
				{ backgroundColor, flex: 1, paddingTop: insets.top },
				style,
			]}
			{...otherProps}
		/>
	);
}
