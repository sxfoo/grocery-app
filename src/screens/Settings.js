import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Alert} from "react-native";
import { Image } from "react-native-ui-lib";
import { View, TouchableOpacity, Icon } from "react-native-ui-lib";
import { IconButton, Text, useTheme} from "react-native-paper";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute} from "@react-navigation/native";
import { signOut, getAuth} from "@firebase/auth";
import ThemeContext  from "../themeContext"
import ProfilePictureModal from "../components/ProfilePictureModal";
import { useOrientation } from "react-native-ui-lib/src/hooks";
import { getDatabase, ref, onValue } from "firebase/database";
import BudgetModal from "../components/BudgetModal";

/* Settings page, specify the individual settings, icons and type of change*/
const customisation = [
	{
		header: "General",
		items: [
			{
				id: "Budget",
				icon: "hand-coin",
				label: "Set budget",
				type: "link",
				nav: "Change Budget",
			},
			{
				id: "darkMode",
				icon: "theme-light-dark",
				label: "Dark Mode",
				type: "toggle",
			},
		],
	},
	{
		header: "Notification",
		items: [
			{
				id: "Notification",
				icon: "bell-alert",
				label: "Enable push-notification",
				type: "toggle",
			},
		],
	},
	{
		header: "Account",
		items: [
			{
				id: "Username",
				icon: "account-box",
				label: "Change Username",
				type: "link",
				nav: "Change Username",
			},
			{
				id: "Password",
				icon: "lock",
				label: "Change Password",
				type: "link",
				nav: "Reset Password",
			},
			{
				id: "Delete",
				icon: "delete",
				label: "Delete account",
				type: "link",
				nav: "Delete Account",
			},
			{
				id: "logout",
				icon: "logout",
				label: "Log out",
				type: "link",
				nav: "Sign In",
			},
		],
	},
];

/*temp profile pic from Monsters Inc */
const PROFILE_PIC =
	"https://static.wikia.nocookie.net/disney/images/3/3c/Profile_-_Sulley.jpg/revision/latest?cb=20200817112818";

const Settings = () => {
	const { isDarkTheme, toggleDarkMode } = useContext(ThemeContext);

	const [isNotificationEnabled, setNotificationEnabled] = useState(false);
	const [username, setUsername] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const [profileModalVisible, setProfileModalVisible] = useState(false);
	const [budgetModalVisible, setBudgetModalVisible] = useState(false);
	const [budget, setBudget] = useState(0)

	const handleBudgetSubmit = (newBudget) => {
		setBudget(newBudget)
		Alert.alert(`Budget of $${newBudget} successfully set.`)
		setBudgetModalVisible(false)
	}

	const handleSelectPicture = () => {
		setProfileModalVisible(false);
	};

	const handleCapturePhoto = () => {
		setProfileModalVisible(false);
	};

	const closeModal = () => {
		setProfileModalVisible(false);
	};

	useEffect(() => {
		const userId = auth.currentUser.uid;
		const userRef = ref(getDatabase(), `user_node/User UID: ${userId}`);
		const listener = onValue(userRef, (snapshot) => {
			const userData = snapshot.val();
			setUsername(userData?.username || "");
			setBudget(userData?.budget || "0")
		});

		return () => {
			listener();
		};
	}, []);

	const navigation = useNavigation();
	const route = useRoute();
	const theme = useTheme();
	const insets = useSafeAreaInsets();

	const auth = getAuth();
	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("user signed out");
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<SafeAreaProvider>
			<ScrollView>
				<View
					style={[
						styles.profile,
						{
							paddingLeft: insets.left,
							paddingRight: insets.right,
						},
					]}
				>
					{/* Profile picture*/}
					<TouchableOpacity onPress={() => setProfileModalVisible(true)}>
						<View style={styles.avatar}>
							<Image
								alt="Profile Picture"
								source={{ uri: PROFILE_PIC }}
								style={styles.profile_avatar}
							/>
						</View>

						<View style={styles.profile_write}>
							<FeatherIcon name="edit-3" size={15} color="#fff" />
						</View>
					</TouchableOpacity>
					<ProfilePictureModal
						modalVisible={profileModalVisible}
						closeModal={closeModal}
						handleSelectPicture={handleSelectPicture}
						handleCapturePhoto={handleCapturePhoto}
					/>
					<BudgetModal 
						visible={budgetModalVisible}
						onClose={()=> setBudgetModalVisible(false)}
						onSubmit={handleBudgetSubmit}
					/>
					<Text
						style={[
							styles.profile_name,
							{ color: theme.colors.inverseSurface },
						]}
					>
						{username}
					</Text>
					<Text style={styles.profile_email}> {auth.currentUser.email}</Text>
				</View>

				{/* it's basically a loop to map the header and the text*/}
				{customisation.map(({ header, items }) => (
					<View key={header} style={styles.header}>
						<Text style={styles.headertext}>{header} </Text>
						<View>
							{/* Another loop, in the row, continue to load the icon and the chevron/toggle*/}
							{items.map(({ label, id, type, icon, nav }) => (
								<View key={id}>
									<TouchableOpacity
										onPress={() => {
											if (nav === "Sign In") {
												console.log("Successful sign out");
												handleSignOut();
												return;
											}

											if (nav == "Change Budget") {
												setBudgetModalVisible(true);
											} else if (nav) {
												console.log("Screen page:" + nav);
												navigation.navigate(nav);
											}
										}}
									>
										<View
											style={[
												styles.row,
												{ backgroundColor: theme.colors.inverseOnSurface },
											]}
										>
											<View style={styles.icon}>
												<IconButton icon={icon} />
											</View>
											<Text style={styles.label}>{label}</Text>
											<View style={{ flex: 1 }} />
											{/*takes up the available space*/}
											{type === "toggle" && id === "darkMode" && (
												<Switch
													value={isDarkTheme}
													onValueChange={() => toggleDarkMode()}
												/>
											)}
											{type === "toggle" && id === "Notification" && (
												<Switch
													value={isNotificationEnabled}
													onValueChange={(value) => setNotificationEnabled()}
												/>
											)}
											{type === "link" && <IconButton icon="chevron-right" />}
										</View>
									</TouchableOpacity>
								</View>
							))}
						</View>
					</View>
				))}
			</ScrollView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	headertext: {
		fontSize: 14,
		fontWeight: "bold",
		color: "grey",
		textTransform: "uppercase",
		letterSpacing: 1.1,
		marginBottom: 4,
	},
	header: {
		marginBottom: 12,
		paddingHorizontal: 10,
	},
	profile: {
		justifyContent: "center",
		alignItems: "center",
	},
	avatar: {
		position: "relative",
	},
	profile_write: {
		width: 30,
		height: 30,
		borderRadius: 9999,
		backgroundColor: "#4080ed",
		position: "absolute" /*refer to parent element*/,
		alignItems: "center",
		justifyContent: "center",
		right: -4,
		bottom: -10,
	},
	profile_avatar: {
		width: 72,
		height: 72,
		borderRadius: 9999,
	},
	profile_name: {
		fontSize: 20,
		marginTop: 15,
		fontWeight: "600",
	},

	profile_email: {
		fontSize: 16,
		fontWeight: "500",
		color: "grey",
		marginBottom: 15,
	},

	row: {
		flexDirection: "row",
		alignItems:
			"center" /*items in this view container will be aligned in center vertically*/,
		justifyContent: "flex-start",
		/*backgroundColor: '#6b7a87',*/
		height: 60,
		marginBottom: 10,
		paddingHorizontal: 6,
		borderRadius: 15,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
	},

	modal: {
		backgroundColor: "transparent",
	},
});

export default Settings;