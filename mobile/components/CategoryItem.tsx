import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ICategory } from '@/types/ICategory';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
	category?: ICategory;
	lightColor?: string;
	darkColor?: string;

	isActive?: boolean;
	uncategorized?: boolean; // used this to show no category is selected for a specific entry
	noBorder?: boolean;
	onPress?: () => void;
};

const CategoryItem = ({
	category,
	darkColor,
	lightColor,
	isActive,
	uncategorized,
	noBorder,
	onPress = () => null,
}: Props) => {
	const colorDark = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'text',
		'dark'
	);
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const background = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'buttonPrimaryBackground'
	);

	const [width, setWidth] = useState<number | null>(null);

	const onLayout = (event: any) => {
		const { width } = event.nativeEvent.layout;
		setWidth(width);
	};

	const getTextColor = () => (isActive ? colorDark : color);
	const getBgColor = () => (isActive ? background : 'transparent');
	const getBorderColor = () => (isActive ? background : color);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={{
					height: 36,
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<View
					style={[
						styles.container,
						{
							padding: 5,
							paddingHorizontal: noBorder ? 5 : 15,
							borderWidth: noBorder ? 0 : 1.2,
							borderColor: getBorderColor(),
							backgroundColor: getBgColor(),
							width,
							height: 36,
							alignSelf: 'flex-start',
						},
					]}
					onLayout={onLayout}
				>
					<Ionicons
						name={
							uncategorized
								? 'close-circle-outline'
								: category
								? (category.icon as any)
								: 'close-circle-outline'
						}
						color={getTextColor()}
						size={noBorder ? 20 : 15}
					/>

					<ThemedText
						style={{
							color: getTextColor(),
							fontWeight: noBorder ? '500' : '400',
						}}
					>
						{uncategorized
							? 'Uncategorized'
							: category
							? category.name
							: '--'}
					</ThemedText>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CategoryItem;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 5,
		borderRadius: 30,
	},
});
