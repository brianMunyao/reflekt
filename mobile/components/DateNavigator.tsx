import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { IFilterMode } from '@/types/IFilterMode';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import SelectTimeIntervalModal from './SelectTimeIntervalModal';
import dayJsUTC from '@/utils/dayjs';

type Props = {
	filterMode: IFilterMode;
	selectedDates: { startDate?: string; endDate?: string };
	onFilterModeChange?: (filterMode: IFilterMode) => void;
	onDateChange?: (params: { startDate?: string; endDate?: string }) => void;
};

const DateNavigator = ({
	filterMode,
	selectedDates,
	onFilterModeChange,
	onDateChange,
}: Props) => {
	const color = useThemeColor({}, 'text');

	const [isTimeIntervaModalOpen, setIsTimeIntervaModalOpen] = useState(false);

	const getLabel = () => {
		const dayjsDate = dayJsUTC(selectedDates.startDate);

		switch (filterMode) {
			case 'all':
				return 'All';
			case 'custom':
				return (
					dayJsUTC(selectedDates.startDate).format('DD/MM/YYYY') +
					' - ' +
					dayJsUTC(selectedDates.endDate).format('DD/MM/YYYY')
				);
			case 'weekly':
				return (
					dayjsDate.startOf('week').format('DD') +
					' - ' +
					dayjsDate.endOf('week').format('DD MMMM YYYY')
				);

			case 'monthly':
				return dayjsDate.format('MMM YYYY');

			case 'daily':
			default:
				return dayjsDate.format('D MMM YYYY');
		}
	};

	const handleSetPrevious = () => {
		const dayjsDate = dayJsUTC(selectedDates.startDate);
		let newDate = dayjsDate;

		switch (filterMode) {
			case 'all':
			case 'custom':
				break;
			case 'weekly':
				newDate = dayjsDate.subtract(1, 'week');
				onDateChange &&
					onDateChange({
						startDate: newDate.startOf('week').toISOString(),
						endDate: newDate.endOf('week').toISOString(),
					});
				break;

			case 'monthly':
				newDate = dayjsDate.subtract(1, 'month');
				onDateChange &&
					onDateChange({
						startDate: newDate.startOf('month').toISOString(),
						endDate: newDate.endOf('month').toISOString(),
					});
				break;

			case 'daily':
			default:
				newDate = dayjsDate.subtract(1, 'day');
				onDateChange &&
					onDateChange({
						startDate: newDate.startOf('day').toISOString(),
						endDate: newDate.endOf('day').toISOString(),
					});
				break;
		}
	};

	const handleSetNext = () => {
		const dayjsDate = dayJsUTC(selectedDates.startDate);
		let newDate = dayjsDate;

		switch (filterMode) {
			case 'all':
			case 'custom':
				break;
			case 'weekly':
				newDate = dayjsDate.add(1, 'week');
				onDateChange &&
					onDateChange({
						startDate: newDate.startOf('week').toISOString(),
						endDate: newDate.endOf('week').toISOString(),
					});
				break;

			case 'monthly':
				newDate = dayjsDate.add(1, 'month');
				onDateChange &&
					onDateChange({
						startDate: newDate.startOf('month').toISOString(),
						endDate: newDate.endOf('month').toISOString(),
					});
				break;

			case 'daily':
			default:
				newDate = dayjsDate.add(1, 'day');
				onDateChange &&
					onDateChange({
						startDate: newDate.startOf('day').toISOString(),
						endDate: newDate.endOf('day').toISOString(),
					});
				break;
		}
	};

	const openTimeIntervalModal = () => {
		setIsTimeIntervaModalOpen(true);
	};

	const onTimeIntervalSelect = (params: {
		mode: IFilterMode;
		startDate?: string;
		endDate?: string;
	}) => {
		onFilterModeChange && onFilterModeChange(params.mode);

		onDateChange &&
			onDateChange({
				startDate: params.startDate,
				endDate: params.endDate,
			});

		setIsTimeIntervaModalOpen(false);
	};

	const closeTimeIntervalModal = () => {
		setIsTimeIntervaModalOpen(false);
	};

	return (
		<>
			<View style={styles.container}>
				<TouchableNativeFeedback onPress={handleSetPrevious}>
					<Ionicons name="arrow-back" color={color} size={20} />
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={openTimeIntervalModal}>
					<ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
						{getLabel()}
					</ThemedText>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={handleSetNext}>
					<Ionicons name="arrow-forward" color={color} size={20} />
				</TouchableNativeFeedback>
			</View>

			<SelectTimeIntervalModal
				filterMode={filterMode}
				isVisible={isTimeIntervaModalOpen}
				onClose={closeTimeIntervalModal}
				onSelect={onTimeIntervalSelect}
			/>
		</>
	);
};

export default DateNavigator;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingVertical: 14,
	},
});
