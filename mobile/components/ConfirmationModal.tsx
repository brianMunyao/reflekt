import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Spacer from './Spacer';
import { ThemedButton } from './ThemedButton';
import { IBtnVariant } from '@/types/IBtnVariant';

type Props = {
	isVisible: boolean;
	onClose: () => void;
	title: string;
	description: string;
	onConfirm: () => void;
	onCancel: () => void;

	confirmBtnText?: string;
	confirmBtnVariant?: IBtnVariant;
	cancelBtnText?: string;
	cancelBtnVariant?: IBtnVariant;
};

const ConfirmationModal = ({
	isVisible,
	onClose,
	title,
	description,
	onConfirm,
	onCancel = onClose,

	confirmBtnText = 'Confirm',
	confirmBtnVariant = 'primary',
	cancelBtnText = 'Cancel',
	cancelBtnVariant = 'secondary',
}: Props) => {
	const insets = useSafeAreaInsets();

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
					<ThemedText style={styles.title}>{title}</ThemedText>

					<ThemedText style={styles.description}>
						{description}
					</ThemedText>

					<Spacer h={10} />

					<View style={styles.btnsContainer}>
						<ThemedButton
							label={cancelBtnText}
							variant={cancelBtnVariant}
							onPress={onCancel}
						/>
						<ThemedButton
							label={confirmBtnText}
							variant={confirmBtnVariant}
							onPress={onConfirm}
						/>
					</View>
				</ThemedView>
			</View>
		</Modal>
	);
};

export default ConfirmationModal;

const styles = StyleSheet.create({
	modal: {
		margin: 0,
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		minWidth: 300,
		padding: 25,
		borderRadius: 12,
		gap: 10,
	},
	title: {
		textAlign: 'center',
		fontWeight: 600,
		fontSize: 23,
	},
	description: {
		textAlign: 'center',
	},
	btnsContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 10,
	},
});
