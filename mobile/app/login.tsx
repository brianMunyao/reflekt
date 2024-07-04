import { useState } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPage } from '@/components/ThemedPage';
import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function LoginScreen() {
	const { login } = useAuth();
	const [formError, setFormError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Username is required'),
			password: Yup.string().required('Password is required'),
		}),
		onSubmit: async (values) => {
			setIsLoading(true);
			const response = await login(values);

			if (!response.success) {
				setFormError(response?.message || 'Error occured. Try Again.');
			} else {
				router.replace('/');
			}

			setIsLoading(true);
		},
	});

	return (
		<ThemedPage style={styles.container}>
			<ThemedText type="title" style={styles.title}>
				Login
			</ThemedText>

			{formError && (
				<ThemedText type="error" style={styles.formError}>
					{formError}
				</ThemedText>
			)}

			<ThemedView style={styles.inputsContainer}>
				<ThemedTextInput
					label="Username"
					placeholder="Enter your username"
					error={formik.errors.username}
					touched={formik.touched.username}
					onChangeText={formik.handleChange('username')}
				/>
				<ThemedTextInput
					label="Password"
					placeholder="Enter your password"
					error={formik.errors.password}
					touched={formik.touched.password}
					onChangeText={formik.handleChange('password')}
					textContentType="password"
					secureTextEntry
				/>
			</ThemedView>

			<ThemedButton
				label="Login"
				onPress={() => formik.handleSubmit()}
				loading={isLoading}
			/>

			<ThemedText style={styles.extra}>
				Don't have an account?{' '}
				<ThemedText type="link">
					<Link href="/register">Create Account</Link>
				</ThemedText>
			</ThemedText>
		</ThemedPage>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 25,
		padding: 20,
		display: 'flex',
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
	},
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
