import {
	View,
	Text,
	Image,
	StyleSheet,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/shoppingcart.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

const SignInScreen = () => {
	const [username, setUsername] = useState(""); 
	const [password, setPassword] = useState("");
	const auth = getAuth();
	const navigation = useNavigation();

	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, username, password)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log('User signed in' )
		})
		.catch((error) => {
			alert(error.message);
		});
	}

	const { height } = useWindowDimensions();

	const onForgotPasswordPressed = () => {
		console.warn("onForgotPasswordPressed");
		navigation.navigate("ForgotPassword")
	};

	const onSignUpPressed = () => {
		navigation.navigate("SignUp")
	};

	return (
		<View>
			<View style={styles.root}>
				<Image
					source={Logo}
					style={[styles.logo, { height: height * 0.3 }]}
					resizeMode="contain"
				/>

				<Text style={styles.title}>
					Grocery App
				</Text>


				<CustomInput
					placeholder="Email" /* Changed from username to email to use firebase function*/
					value={username}
					setValue={setUsername}
				/>

				<CustomInput
					placeholder="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry
				/>

				<CustomButton text="Sign In" onPress={handleSignIn} />

				<CustomButton
					text="Forgot password?"
					onPress={onForgotPasswordPressed}
					type="TERTIARY"
				/>

				{/* <SocialSignInButtons /> */}

				<CustomButton
					text="Don't have an account? Create one"
					onPress={onSignUpPressed}
					type="TERTIARY"
				/>
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

	logo: {
		width: "70%",
		maxWidth: 300,
		maxHeight: 200,
	},
	
	title: {
		color:"white",
		fontSize: 40,
		fontWeight: "bold",
		paddingBottom: 10,
	}
});

export default SignInScreen;
