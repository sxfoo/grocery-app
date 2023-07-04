import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ResetPasswordScreen = () => {
	const [code, setCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	
	const navigation = useNavigation()

	const onSignInPressed = () => {
		navigation.navigate('SignIn');
		console.warn("SignInPressd");
	};

	const onSubmitPressed = () => {
		console.warn("onSubmitPressed");
	};
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Reset your password</Text>

				<CustomInput placeholder="Code" value={code} setValue={setCode} />

				<CustomInput
					placeholder="Enter your new password"
					value={newPassword}
					setValue={setNewPassword}
				/>

				<CustomButton text="Submit" onPress={onSubmitPressed} />

				{/*<CustomButton
					text="Back to Sign in"
					onPress={onSignInPressed}
					type="TERTIARY"
				/>*/}
			</View>
		</ScrollView>
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
		color: "#051C60",
		margin: 10,
	},

	text: {
		color: "gray",
		marginVertical: 10,
	},

	link: {
		color: "#FD8075",
	},
});

export default ResetPasswordScreen;
