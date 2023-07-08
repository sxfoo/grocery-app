import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";


const ProfilePictureModal = ({
	modalVisible,
	closeModal,
	handleSelectPicture,
	handleCapturePhoto,
}) => {
    const theme = useTheme()
    const handleOverlayPress = () => {
        closeModal()
    }
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={closeModal}
		>
			<TouchableWithoutFeedback onPress={handleOverlayPress}>
				<View style={[styles.modalContainer]}>
					<View style={[styles.modalContent, {backgroundColor: theme.colors.inverseOnSurface}]}>
						<TouchableOpacity
							style={styles.modalOption}
							onPress={handleSelectPicture}
						>
							<Text
								style={[
									styles.modalOptionText,
									{ color: theme.colors.inverseSurface },
								]}
							>
								Choose Picture
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalOption}
							onPress={handleCapturePhoto}
						>
							<Text
								style={[
									styles.modalOptionText,
									{ color: theme.colors.inverseSurface },
								]}
							>
								Take Picture
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalOption} onPress={closeModal}>
							<Text
								style={[
									styles.modalOptionText,
									{ color: theme.colors.inverseSurface },
								]}
							>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "100%",
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	modalOption: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	modalOptionText: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default ProfilePictureModal;
