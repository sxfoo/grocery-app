import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
	const [code, setCode] = useState("");
	const [username, setUsername] = useState('');

	const navigation = useNavigation()

	const onSignInPressed = () => {
		console.warn("onSignInPressed");
		navigation.navigate("SignInScreen")
	};

	const onSendPressed = () => {
		console.warn("onResendCodePressed");
		navigation.navigate("ResetPassword")
	};
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Reset your password</Text>

				<CustomInput
					placeholder="Username"
					value={username}
					setValue={setUsername}
				/>

				<CustomButton text="Send" onPress={onSendPressed} />

				<CustomButton
					text="Back to Sign in"
					onPress={onSignInPressed}
					type="TERTIARY"
				/>
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

	text:{
		color: 'gray',
		marginVertical: 10,
	},

	link: {
		color: '#FD8075',
	},
});

export default ForgotPasswordScreen;
