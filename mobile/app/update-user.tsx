import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { router } from 'expo-router';

import { ThemedPage } from '@/components/ThemedPage';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { PAGE_PADDING } from '@/constants/Dimensions';
import BackIcon from '@/components/BackIcon';
import showToastsUtil from '@/utils/showToastsUtil';

type Props = {};

const UpdateUserScreen = ({}: Props) => {
	const { user, updateUserInfo } = useAuth();

	const [formError, setFormError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: user?.email || '',
			username: user?.username || '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Username is required'),
			password: Yup.string()
				.min(8, 'Should have a minimum of 8 characters')
				.required('Password is required'),
		}),
		onSubmit: async (values) => {
			setIsLoading(true);

			const response = await updateUserInfo(values);

			if (!response.success) {
				setFormError(response?.message || 'Error occured. Try Again.');
			} else {
				showToastsUtil.success('Information updated');
				router.back();
			}

			setIsLoading(false);
		},
	});

	return (
		<ThemedPage style={styles.container}>
			<BackIcon />

			<ThemedText type="title">Update Information</ThemedText>

			{formError && (
				<ThemedText type="error" style={styles.formError}>
					{formError}
				</ThemedText>
			)}

			<ThemedView style={styles.inputsContainer}>
				<ThemedTextInput
					label="Email"
					placeholder="Enter your email"
					value={formik.values.email}
					error={formik.errors.email}
					touched={formik.touched.email}
					onChangeText={formik.handleChange('email')}
					keyboardType="email-address"
					autoCapitalize="none"
					editable={false}
				/>
				<ThemedTextInput
					label="Username"
					placeholder="Enter your username"
					value={formik.values.username}
					error={formik.errors.username}
					touched={formik.touched.username}
					onChangeText={formik.handleChange('username')}
					autoCapitalize="none"
				/>
				<ThemedTextInput
					label="Password"
					placeholder="Enter your password"
					value={formik.values.password}
					error={formik.errors.password}
					touched={formik.touched.password}
					onChangeText={formik.handleChange('password')}
					textContentType="password"
					secureTextEntry
					autoCapitalize="none"
				/>
			</ThemedView>

			<ThemedButton
				label="Save"
				onPress={() => formik.handleSubmit()}
				loading={isLoading}
			/>
		</ThemedPage>
	);
};

export default UpdateUserScreen;

const styles = StyleSheet.create({
	container: {
		gap: 25,
		padding: PAGE_PADDING,
		paddingTop: 50,
	},
	title: {},
	extra: {
		textAlign: 'center',
	},
	inputsContainer: {
		gap: 10,
	},
	formError: {
		textAlign: 'center',
	},
});
