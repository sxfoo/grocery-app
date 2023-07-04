import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebaseConfig";
import { deleteUser} from "@firebase/auth"; 
import SignUpScreen from "../forSignUp/SignUpScreen";
import Checkbox from "../../../components/Checkbox/Checkbox";

const AccountDeletionScreen = () => {
	const navigation = useNavigation();

	// const [isChecked, setIsChecked] = useState(false);
	
	// const handleCheckboxToggle = (checked) => {
    // 	setIsChecked(checked);
  	// };	

	const handleDeleteAccount = () => {
		console.warn("onDeletePressed");
		
		// To be added:
		// Check if checkbox is checked, then proceed with deletion
		// Currently deletes upon pressing delete button, with or without permission
		deleteUser(auth.currentUser)
		.then(() => {
			Alert.alert(
				"Account has been deleted. "
			);
		})
		.catch((error) => {
			Alert.alert("Error", error.message);
		});

		// Add navigation to forward to sign up screen
};


	return (
		<View>
			<View style={styles.root}>
				<Text style={styles.title}>Delete your account</Text>

				<Text style={styles.text}>
					Are you sure you want to delete your account?{"\n"}All your data will
					be lost.
				</Text>
				{/* <Checkbox onToggle={handleCheckboxToggle}/> */}
				<CustomButton text="Delete" onPress={handleDeleteAccount} />

				{/*<CustomButton
					text="Back to Sign in"
					onPress={onSignInPressed}
					type="TERTIARY"
				/>*/}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		paddingVertical: 50,
		alignItems: "center",
		padding: 20,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: 'white',
		margin: 10,
	},

	text: {
		color: "gray",
		marginVertical: 10,
		fontSize: 15,
	},
});

export default AccountDeletionScreen;
