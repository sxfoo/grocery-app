import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import SocialSignInButtons from "../../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";

const SignUpScreen = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const navigation = useNavigation();
	

	
	const handleSignUp = () => {
		if (email.length == 0 || password.length == 0){
			alert('Missing fields.');
			return;
		}
		else if (password !== passwordRepeat){
			alert('Passwords do not match.');
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredentials) =>{
			const user = userCredentials.user;
			console.log('New user signed up:');
			/*sends verification email*/
			sendEmailVerification(auth.currentUser)
			.then(() => {
				// Verification email sent successfully
				console.log('Verification email sent');
			  })
			  .catch((error) => {
				// An error occurred while sending the verification email
				console.error('Error sending verification email:', error);
			/*navigation.navigate('ConfirmEmail');*/
		});
	})
		.catch(error => alert(error.message))
	};
	
	

	/*const onRegisterPressed = () => {
		console.warn("Sign in");
		navigation.navigate("ConfirmEmail")
	};*/

	const onSignInPressed = () => {
		navigation.navigate("SignIn");
		console.warn("SignInPressed");
	};

	const onTermsOfUsePressed = () => {
		console.warn("onTermsOfUsePressed")
	}

	const onPrivacyPolicyPressed = () => {
		console.warn("onPrivacyPolicyPressed")
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.root}>
				<Text style={styles.title}>Create an account</Text>


				{/* I commented this out temporarily because I have not found a way to store in firebase */}
				{/*<CustomInput
					placeholder="Username"
					value={username}
					setValue={setUsername}
				/>*/}

				<CustomInput placeholder="Email" value={email} setValue={setEmail} />

				<CustomInput
					placeholder="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry
				/>

				<CustomInput
					placeholder="Repeat Password"
					value={passwordRepeat}
					setValue={setPasswordRepeat}
					secureTextEntry
				/>

				<CustomButton text="Register" onPress={handleSignUp} />

				<Text style={styles.text}>
					By registering, you confirm that you accept our {' '}
					<Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use </Text>
					and {' '}
					<Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
				</Text>

				<SocialSignInButtons />

				<CustomButton
				text="Have an account? Sign in"
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

export default SignUpScreen;
