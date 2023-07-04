import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebaseConfig";
import { sendPasswordResetEmail } from "@firebase/auth";

const ResetPasswordScreen = () => {
	const [email, setEmail] = useState("");

	const navigation = useNavigation();

	const handleResetPassword = () => {
		console.warn("onSubmitPressed");
		
		sendPasswordResetEmail(auth, email)
		.then(() => {
			Alert.alert(
				"Password reset sent to your email address. \n Please check your email for further instructions."
			);
		})
		.catch((error) => {
			Alert.alert("Error", error.message);
		});
};


	return (
		<View>
			<View style={styles.root}>
				<Text style={styles.title}>Reset your password</Text>

				<Text style={styles.text}>Enter your email to receive instructions on how to reset your password.</Text>

				<CustomInput
					placeholder="Enter your email"
					value={email}
					setValue={setEmail}
				/>

				<CustomButton text="Submit" onPress={handleResetPassword} />

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

export default ResetPasswordScreen;
