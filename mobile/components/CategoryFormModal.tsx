import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from 'react-native-ui-datepicker';
import { Dayjs } from 'dayjs';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { ThemedView } from './ThemedView';
import { PAGE_PADDING } from '@/constants/Dimensions';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ICategory, ICategoryNew, ICategoryUpdate } from '@/types/ICategory';
import { ThemedTextInput } from './ThemedTextInput';
import { ThemedText } from './ThemedText';
import { ThemedButton } from './ThemedButton';
import Spacer from './Spacer';
import PlainCategoryIcon from './PlainCategoryIcon';

type Props = {
	mode?: 'new' | 'edit'; // to be exposed in future
	isVisible: boolean;
	onClose: () => void;
	onSubmit: (value: ICategoryNew | ICategoryUpdate) => void;
	formValues?: ICategory;
};

const AVAILABLE_ICONS = [
	'accessibility-outline',
	'fast-food-outline',
	'briefcase-outline',
	'bus-outline',
	'business-outline',
	'barbell-outline',
	'book-outline',
	'diamond-outline',
];

const CategoryFormModal = ({
	mode = 'new',
	formValues,
	isVisible,
	onClose,
	onSubmit,
}: Props) => {
	const insets = useSafeAreaInsets();
	const background = useThemeColor({}, 'buttonPrimaryBackground');

	const [isLoading, setIsLoading] = useState(false);

	const initialValues = useMemo(() => {
		return formValues
			? formValues
			: {
					name: '',
					icon: '',
			  };
	}, [formValues]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string().required('Category Name is required'),
			icon: Yup.string().required('An Icon is required'),
		}),
		onSubmit: async (values) => {
			setIsLoading(true);
			onSubmit(values);
			setIsLoading(false);
		},
	});

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
					<ThemedText style={styles.title}>
						{mode === 'edit' ? 'Update Category' : 'New Category'}
					</ThemedText>

					<Spacer h={14} />

					<ThemedTextInput
						label="Category Name"
						placeholder="Enter your category name"
						value={formik.values.name}
						error={formik.errors.name}
						touched={formik.touched.name}
						onChangeText={formik.handleChange('name')}
					/>

					<Spacer h={20} />

					<ThemedText>Category Icon</ThemedText>

					<View style={styles.iconsContainer}>
						<FlatList
							numColumns={5}
							data={AVAILABLE_ICONS}
							renderItem={({ item }) => (
								<View style={{ paddingHorizontal: 5 }}>
									<PlainCategoryIcon
										name={item}
										onPress={() => {
											formik.setFieldValue('icon', item);
										}}
										isActive={item === formik.values.icon}
									/>
								</View>
							)}
							keyExtractor={(item) => item.toString()}
							ItemSeparatorComponent={() => <Spacer h={5} />}
						/>
					</View>

					{formik.errors.icon && formik.touched.icon && (
						<ThemedText type="error">
							{formik.errors.icon}
						</ThemedText>
					)}

					<ThemedButton
						label="Save"
						onPress={() => formik.handleSubmit()}
						loading={isLoading}
					/>
				</ThemedView>
			</View>
		</Modal>
	);
};

export default CategoryFormModal;

const styles = StyleSheet.create({
	modal: {
		margin: 0,
	},
	innerContainer: {
		padding: 20,
		borderRadius: 12,
		width: 300,
	},
	title: {
		fontWeight: 600,
		fontSize: 23,
	},
	container: {
		flex: 1,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconsContainer: {
		height: 100,
	},
});
