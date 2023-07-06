import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebaseConfig";
import { deleteUser} from "@firebase/auth"; 
import SignUpScreen from "../forSignUp/SignUpScreen";
import { Checkbox } from "react-native-paper";

const AccountDeletionScreen = () => {
	const navigation = useNavigation();

	const [isChecked, setIsChecked] = useState(false);

	const handleCheckbox = () => {
		setIsChecked(!isChecked)
	}

	const handleDeleteAccount = () => {
		if (isChecked){
			deleteUser(auth.currentUser)
			.then(() => {
				Alert.alert(
					"Account has been deleted. "
				);
			})
			.catch((error) => {
				Alert.alert("Error", error.message);
			});
		}
		else {
			Alert.alert("Please check the box before pressing delete button.")
		}
		// Add navigation to forward to sign up screen
};


	return (
		<View>
			<View style={styles.root}>
				<Text style={styles.title}>Delete your account</Text>

				<Checkbox.Item
					label={"Are you sure you want to delete your account? All your data will be lost. \n(Click here to agree)"}
					status={isChecked ? "checked" : "unchecked"}
					onPress={handleCheckbox}
				/>

				<CustomButton text="Delete" onPress={handleDeleteAccount} />
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
