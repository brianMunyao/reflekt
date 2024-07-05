import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedPage } from '@/components/ThemedPage';
import SettingsItem from '@/components/SettingsItem';
import { ThemedButton } from '@/components/ThemedButton';
import { useAuth } from '@/contexts/AuthContext';
import { PAGE_PADDING } from '@/constants/Dimensions';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Divider from '@/components/Divider';

const SettingsScreen = () => {
	const { user, logout } = useAuth();
	const greyText = useThemeColor({}, 'secondaryButtonText');
	const greyBg = useThemeColor({}, 'secondaryButtonBackground');

	return (
		<ThemedPage pageTitle="Settings" style={styles.container}>
			<View style={styles.innerContainer}>
				<View
					style={[styles.userInfoContainer, styles.horizontalPadded]}
				>
					<View
						style={[
							styles.userInfoIcon,
							{ backgroundColor: greyBg },
						]}
					>
						<Ionicons
							name="person-outline"
							size={30}
							color={greyText}
						/>
					</View>
					<View style={styles.userInfo}>
						<ThemedText style={styles.username}>
							{user?.username || '--'}
						</ThemedText>

						<ThemedText style={styles.email}>
							{user?.email || ''}
						</ThemedText>
					</View>
				</View>

				<Divider style={{ marginHorizontal: PAGE_PADDING }} />

				<SettingsItem
					icon="person"
					title="Update Your Information"
					subTitle="Change your username and password"
					type="titleSub"
					onPress={() => router.push('/update-user')}
				/>
				{/* </SettingsCard> */}

				<View style={styles.horizontalPadded}>
					<ThemedButton
						label="Logout"
						variant="danger"
						onPress={logout}
					/>
				</View>
			</View>
		</ThemedPage>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 20,
		paddingTop: 40,
	},
	innerContainer: {
		paddingTop: 0,
		gap: 25,
	},
	horizontalPadded: {
		paddingHorizontal: PAGE_PADDING,
	},
	userInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
	},
	userInfoIcon: {
		width: 60,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
	},
	userInfo: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
	username: {
		fontSize: 22,
		fontWeight: 700,
	},
	email: {},
});

export default SettingsScreen;
