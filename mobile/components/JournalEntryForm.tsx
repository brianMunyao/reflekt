import { useState } from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPage } from '@/components/ThemedPage';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import {
	IJournalEntry,
	IJournalEntryNew,
	IJournalEntryUpdate,
} from '@/types/IJournalEntry';
import { PlainTextInput } from './PlainTextInput';
import BackIcon from './BackIcon';
import Spacer from './Spacer';
import SelectCategoryModal from './SelectCategoryModal';
import CategoryItem from './CategoryItem';
import { useAppSelector } from '@/store/hooks';
import { ThemedCard } from './ThemedCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import DatePickerModal from './DatePickerModal';

type Props = {
	mode?: 'new' | 'edit' | 'view';
	formError?: string;
	handleSubmit?: (values: IJournalEntryNew | IJournalEntryUpdate) => void;
	formValues?: IJournalEntry;
};

const JournalEntryForm = ({
	mode = 'new',
	formError,
	handleSubmit,
	formValues,
}: Props) => {
	const color = useThemeColor({}, 'text');

	const [isLoading, setIsLoading] = useState(false);
	const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] = useState(
		mode === 'new' ? true : false
	);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const { categories } = useAppSelector((state) => state.category);

	const initialValues = formValues
		? formValues
		: {
				title: '',
				content: '',
				entry_date: dayjs().toISOString(),
				category_id: undefined,
		  };

	const formik = useFormik<IJournalEntryNew>({
		enableReinitialize: true, // allows us to update values in /edit mode
		initialValues,
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required'),
			entry_date: Yup.string().required('Password is required'),
		}),
		onSubmit: async (values) => {
			setIsLoading(true);

			if (handleSubmit) {
				handleSubmit(values);
			}

			setIsLoading(false);
		},
	});

	// Category functions

	const openSelectCategoryModal = () => {
		setIsSelectCategoryModalOpen(true);
	};
	const onCategorySelect = (categoryId?: number) => {
		formik.setFieldValue('category_id', categoryId);

		setIsSelectCategoryModalOpen(false);
	};
	const closeSelectCategoryModal = () => {
		setIsSelectCategoryModalOpen(false);
	};

	// Date picker functions

	const openDatePickerModal = () => {
		setIsDatePickerOpen(true);
	};
	const handleDateChange = (value: any) => {
		formik.setFieldValue('entry_date', value.date);
		setIsDatePickerOpen(false);
	};
	const closeDatePickerModal = () => {
		setIsDatePickerOpen(false);
	};

	return (
		<>
			<ThemedPage style={styles.container}>
				<BackIcon />

				{formError && (
					<ThemedText type="error" style={styles.formError}>
						{formError}
					</ThemedText>
				)}

				<ThemedView style={styles.inputsContainer}>
					<PlainTextInput
						value={formik.values.title}
						placeholder="Enter your title"
						error={formik.errors.title}
						touched={formik.touched.title}
						onChangeText={formik.handleChange('title')}
						fontSize={25}
						fontWeight="500"
						multiline
						maxLength={60}
					/>

					<Spacer h={10} />

					<TouchableNativeFeedback onPress={openDatePickerModal}>
						<ThemedCard style={styles.dateContainer}>
							<Ionicons
								name="calendar-outline"
								size={20}
								color={color}
							/>

							<ThemedText>
								{dayjs(formik.values.entry_date).format(
									'dddd, MMM D, YYYY'
								)}
							</ThemedText>
						</ThemedCard>
					</TouchableNativeFeedback>

					<Spacer h={10} />

					<View>
						<CategoryItem
							noBorder
							uncategorized={!Boolean(formik.values.category_id)}
							category={categories.find(
								(cat) =>
									cat.category_id ===
									formik.values.category_id
							)}
							onPress={openSelectCategoryModal}
						/>
					</View>

					<ThemedTextInput
						label="Content"
						placeholder="Enter your content here..."
						value={formik.values.content}
						error={formik.errors.content}
						touched={formik.touched.content}
						onChangeText={formik.handleChange('content')}
						multiline
						style={{ flex: 1 }}
					/>
				</ThemedView>

				<ThemedButton
					label="Save"
					onPress={() => formik.handleSubmit()}
					loading={isLoading}
				/>
			</ThemedPage>

			<SelectCategoryModal
				isVisible={isSelectCategoryModalOpen}
				onClose={closeSelectCategoryModal}
				onSelect={onCategorySelect}
				selectedCategory={formik.values.category_id}
			/>
			<DatePickerModal
				isVisible={isDatePickerOpen}
				onClose={closeDatePickerModal}
				onSelect={handleDateChange}
				selectedDate={dayjs(formik.values.entry_date)}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 25,
		padding: 20,
		paddingTop: 50,
	},
	title: {
		// textAlign: 'center',
	},
	dateContainer: {
		padding: 15,
		borderRadius: 12,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	inputsContainer: {
		gap: 10,
		flex: 1,
	},
	formError: {
		// textAlign: 'center',
	},
});

export default JournalEntryForm;
