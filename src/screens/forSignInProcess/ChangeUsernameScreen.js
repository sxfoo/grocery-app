import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";
import { useTheme } from "react-native-paper";
import { updateProfile } from "@firebase/auth";
import { getDatabase, ref, update } from "firebase/database";

const ChangeUsernameScreen = () => {
	const theme = useTheme()
	const navigation = useNavigation()

	const [username, setUsername] = useState("");
	const handleUsernameChange = (newUsername) => {
		setUsername(newUsername)
	}

	// Function to change username. This does not store it in the database, only updating the user account's displayname.
	const ChangeUsername = () => {
		const user = auth.currentUser
		const userId = user.uid

		const db = getDatabase()
		const userRef = ref(db, `user_node/User ID: ${userId}`)
		
		update(userRef, { username: username})
		.then ( () => {
			console.log ("Username updated successfully")
			navigation.navigate("Settings")
		})
		.catch ((error) => {
			console.error("Error updating username", error)
		})
	}

	const handleSubmit = () => {
		ChangeUsername(username)
	}

	return (
		<View>
			<View style={styles.root}>
				<Text style={[styles.text, {color: theme.colors.inverseSurface}]}>Enter your desired username.</Text>

				<CustomInput
					placeholder="Enter your new username"
					value={username}
					setValue={handleUsernameChange}
				/>

				<CustomButton text="Submit" onPress={handleSubmit} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: "center",
		padding: 20,
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 10,
	},

	text: {
		marginVertical: 10,
		fontSize: 15,
	},
});

export default ChangeUsernameScreen;
