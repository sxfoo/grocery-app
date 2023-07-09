import React, { useState } from "react";
import {
	Text,
	View,
	Modal,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";
import { useTheme } from "react-native-paper";
import { getDatabase, ref, update } from "firebase/database";
import { auth } from "../../firebaseConfig";

const BudgetModal = ({ visible, onClose, onSubmit }) => {
	const theme = useTheme();
	const [budget, setBudget] = useState(0);

	const handleBudgetSubmit = () => {
		const userId = auth.currentUser.uid;
		const userRef = ref(getDatabase(), `user_node/User UID: ${userId}`);
		update(userRef, { budget: budget })
			.then(() => {
				console.log("Budget updated successfully");
			})
			.catch((error) => {
				console.error("Error updating budget:", error);
			});

		// Close the modal and pass the budget value to the onSubmit callback
		onClose();
		onSubmit(budget);
	};

	const handleCancel = () => {
		// Close the modal without submitting
		onClose();
	};

	const handleTapOutside = () => {
		// Dismiss the keyboard
		Keyboard.dismiss();
	};

	return (
		<Modal visible={visible} onRequestClose={onClose} animationType="slide" transparent={false}>
			{/* Content of the modal */}
			<TouchableWithoutFeedback onPress={handleTapOutside}>
				<View style={[styles.container]}>
					<Text style = {{paddingBottom: 20, fontSize: 20}}> Update your desired budget</Text>

					{/* Text input for the budget */}
					<TextInput
						style={[styles.input]}
						placeholder="For eg. 500"
						value={budget}
						onChangeText={setBudget}
						onSubmitEditing={handleBudgetSubmit}
						autoFocus={true}
						keyboardType="numeric"

					/>

					<View style={styles.buttonsContainer}>
						{/* Submit button */}
						<TouchableOpacity
							style={[styles.button]}
							onPress={handleBudgetSubmit}
						>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>

						{/* Cancel button */}
						<TouchableOpacity style={[styles.button]} onPress={handleCancel}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
        backgroundColor:"gray"
	},
	input: {
		width: "100%",
		height: 40,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
        backgroundColor: "#00000010"
	},
	buttonsContainer: {
		paddingTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		flex: 1,
		height: 40,
		alignItems: "center",
        backgroundColor: "#00000080"
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
export default BudgetModal;
