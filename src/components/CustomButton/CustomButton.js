import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
	onPress,
	text,
	type = "PRIMARY",
	bgColor,
	fgColor,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.container,
				styles[`container_${type}`],
				bgColor ? { backgroundColor: bgColor } : {},
			]}
		>
			<Text
				style={[
					styles.text,
					styles[`text_${type}`],
					fgColor ? { color: fgColor } : {},
				]}
			>
				{text}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",

		padding: 15,
		marginVertical: 5,

		alignItems: "center",
		borderRadius: 5,
		justifyContent: 'center',
	},

	container_PRIMARY: {
		backgroundColor: "#3B71F3",
	},

	container_SECONDARY: {
		borderColor: "#3B71F3",
		borderWidth: 2,
	},

	container_TERTIARY: {
		padding: 8,
		borderColor: "gray",
		borderWidth: 0.5,
		marginTop: 5,
	},

	text: {
		fontWeight: "bold",
		color: "white",
	},

	text_SECONDARY: {
		color: "#3B71F3",
	},
	
	text_TERTIARY: {
		color: "gray",
	},
});
export default CustomButton;
