import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './ThemedText';

interface Props {
	title: string;
	children: ReactNode;
}

const SettingsCard = ({ title, children }: Props) => {
	return (
		<View style={styles.container}>
			<ThemedText type="defaultSemiBold" style={styles.title}>
				{title}
			</ThemedText>
			<View>{children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	title: {
		fontSize: 15,
		letterSpacing: 0.3,
		paddingHorizontal: 20,
	},
});

export default SettingsCard;
