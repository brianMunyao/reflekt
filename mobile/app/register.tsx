import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPage } from '@/components/ThemedPage';
import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function RegisterScreen() {
	const { register } = useAuth();
	const [formError, setFormError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Invalid email')
				.required('Email is required'),
			username: Yup.string().required('Username is required'),
			password: Yup.string()
				.min(8, 'Should have a minimum of 8 characters')
				.required('Password is required'),
		}),
		onSubmit: async (values) => {
			setIsLoading(true);
			const response = await register(values);

			if (!response.success) {
				setFormError(response?.message || 'Error occured. Try Again.');
			} else {
				router.replace('/');
			}

			setIsLoading(false);
		},
	});

	return (
		<ThemedPage style={styles.container}>
			<ThemedText type="title" style={styles.title}>
				Create Account
			</ThemedText>

			{formError && (
				<ThemedText type="error" style={styles.formError}>
					{formError}
				</ThemedText>
			)}

			<ThemedView style={styles.inputsContainer}>
				<ThemedTextInput
					label="Email"
					placeholder="Enter your email"
					error={formik.errors.email}
					touched={formik.touched.email}
					onChangeText={formik.handleChange('email')}
					keyboardType="email-address"
					autoCapitalize="none"
				/>
				<ThemedTextInput
					label="Username"
					placeholder="Enter your username"
					error={formik.errors.username}
					touched={formik.touched.username}
					onChangeText={formik.handleChange('username')}
					autoCapitalize="none"
				/>
				<ThemedTextInput
					label="Password"
					placeholder="Enter your password"
					error={formik.errors.password}
					touched={formik.touched.password}
					onChangeText={formik.handleChange('password')}
					textContentType="password"
					secureTextEntry
					autoCapitalize="none"
				/>
			</ThemedView>

			<ThemedButton
				label="Register"
				onPress={() => formik.handleSubmit()}
				loading={isLoading}
			/>

			<ThemedText style={styles.extra}>
				Already have an account?{' '}
				<ThemedText type="link">
					<Link href="/login">Login</Link>
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
