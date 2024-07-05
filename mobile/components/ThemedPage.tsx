import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { PAGE_PADDING } from '@/constants/Dimensions';

export type ThemedPageProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;

	pageTitle?: string;
};

export function ThemedPage({
	style,
	lightColor,
	darkColor,
	pageTitle,
	children,
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
		>
			{pageTitle && (
				<ThemedText
					type="title"
					style={{
						paddingTop: PAGE_PADDING,
						paddingHorizontal: PAGE_PADDING,
					}}
				>
					{pageTitle}
				</ThemedText>
			)}

			{children}
		</View>
	);
}
