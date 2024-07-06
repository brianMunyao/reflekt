import { StyleSheet, View } from 'react-native';
import React from 'react';

import { getGreetingUtil } from '@/utils/getGreetingUtil';
import { ThemedText } from './ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { PAGE_PADDING } from '@/constants/Dimensions';

type Props = {
	textAlign?: 'center' | 'left';
	fontSize?: number;
};

const GreetingCard = ({ textAlign, fontSize = 20 }: Props) => {
	const { user } = useAuth();

	return (
		<View style={styles.container}>
			<ThemedText type="defaultSemiBold" style={{ textAlign, fontSize }}>
				{getGreetingUtil() + ', ' + user?.username + '!'}
			</ThemedText>
		</View>
	);
};

export default GreetingCard;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: PAGE_PADDING,
	},
});
