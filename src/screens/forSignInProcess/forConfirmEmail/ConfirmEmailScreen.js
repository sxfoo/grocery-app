import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
	const [code, setCode] = useState("");
	const navigation = useNavigation()
	const onConfirmPressed = () => {
		console.warn("onConfirmPressed");
	};

	const onSignInPressed = () => {
		console.warn("Sign in");
		navigation.navigate('SignInScreen');
	};
	
	const onResendCodePressed = () => {
		console.warn("onResendCodePressed");
	};
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Confirm your email</Text>

				<CustomInput
					placeholder="Enter your confirmation code"
					value={code}
					setValue={setCode}
				/>

				<CustomButton text="Confirm" onPress={onConfirmPressed} />

				<CustomButton
					text="Resend code"
					onPress={onResendCodePressed}
					type="SECONDARY"
				/>
				<CustomButton
					text="Back to Sign In"
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

export default ConfirmEmailScreen;
