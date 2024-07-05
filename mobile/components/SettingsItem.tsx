import React from 'react';
import {
	StyleSheet,
	Switch,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { PAGE_PADDING } from '@/constants/Dimensions';

interface Props {
	icon?: string;
	title: string;
	subTitle?: string;
	type?: 'titleSub' | 'switch';
	switchValue?: boolean;
	onSwitchChange?: (value: boolean) => void;
	onPress: (value?: any) => void;
}

const SettingsItem = ({
	icon,
	title,
	subTitle,
	type,
	switchValue,
	onSwitchChange,
	onPress,
}: Props) => {
	if (!type) {
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View style={styles.container}>
					{icon && (
						<View style={styles.icon}>
							<Ionicons
								name={`${icon}-outline` as any}
								size={25}
							/>
						</View>
					)}
					<View style={styles.info}>
						<ThemedText type="defaultSemiBold" style={styles.title}>
							{title}
						</ThemedText>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
	} else if (type === 'titleSub') {
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View style={styles.container}>
					{icon && (
						<View style={styles.icon}>
							<Ionicons
								name={`${icon}-outline` as any}
								size={25}
							/>
						</View>
					)}

					<View style={styles.info}>
						<ThemedText type="defaultSemiBold" style={styles.title}>
							{title}
						</ThemedText>

						<ThemedText style={styles.subTitle}>
							{subTitle}
						</ThemedText>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
	} else if (type === 'switch') {
		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View style={styles.container}>
					{icon && (
						<View style={styles.icon}>
							<Ionicons
								name={`${icon}-outline` as any}
								size={25}
							/>
						</View>
					)}

					<View
						style={[
							styles.info,
							{
								justifyContent: switchValue
									? 'space-between'
									: 'center',
							},
						]}
					>
						<ThemedText type="defaultSemiBold" style={styles.title}>
							{title}
						</ThemedText>
						{switchValue && (
							<ThemedText style={styles.subTitle}>
								{subTitle}
							</ThemedText>
						)}
					</View>

					<View style={styles.right}>
						<Switch
							value={switchValue}
							onValueChange={onSwitchChange}
							style={styles.switch}
						/>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		height: 75,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: PAGE_PADDING,
	},
	icon: {
		width: 40,
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.7,
	},
	info: {
		position: 'relative',
		flex: 1,
		display: 'flex',
		justifyContent: 'space-evenly',
		flexDirection: 'column',

		paddingVertical: 7,
		paddingRight: 5,
	},
	title: {},
	subTitle: {
		opacity: 0.5,
	},
	right: {
		width: 60,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	switch: {
		marginRight: 'auto',
		flex: 1,
	},
});

export default SettingsItem;
