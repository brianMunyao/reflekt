import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from 'react-native-ui-datepicker';
import { Dayjs } from 'dayjs';

import { ThemedView } from './ThemedView';
import { PAGE_PADDING } from '@/constants/Dimensions';
import { useThemeColor } from '@/hooks/useThemeColor';
import dayJsUTC from '@/utils/dayjs';

type Props = {
	// mode?: 'single' | 'range'; // to be exposed in future
	isVisible: boolean;
	onClose: () => void;
	onSelect: (value: any) => void;
	selectedDate?: Dayjs;
	startDate?: Dayjs;
	endDate?: Dayjs;
	minDate?: Dayjs;
	maxDate?: Dayjs;
};

const DatePickerModal = ({
	isVisible,
	onClose,
	onSelect,
	selectedDate,
	startDate,
	endDate,
	minDate,
	maxDate,
}: Props) => {
	const insets = useSafeAreaInsets();
	const background = useThemeColor({}, 'buttonPrimaryBackground');

	const handleChange = (value: any) => {
		const newDate = dayJsUTC(value.date).add(1, 'day').toISOString();
		onSelect({ date: newDate });
	};

	return (
		<Modal
			deviceHeight={Dimensions.get('screen').height}
			isVisible={isVisible}
			statusBarTranslucent
			useNativeDriver
			useNativeDriverForBackdrop
			onBackButtonPress={onClose}
			onBackdropPress={onClose}
			style={styles.modal}
		>
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<ThemedView style={styles.innerContainer}>
					<DateTimePicker
						minDate={minDate}
						maxDate={maxDate}
						mode={'single'}
						date={selectedDate}
						startDate={startDate}
						endDate={endDate}
						onChange={handleChange}
						selectedItemColor={background}
					/>
				</ThemedView>
			</View>
		</Modal>
	);
};

export default DatePickerModal;

const styles = StyleSheet.create({
	modal: {
		margin: 0,
	},
	innerContainer: {
		margin: PAGE_PADDING,
		padding: 8,
		borderRadius: 12,
	},
	container: {
		flex: 1,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
