// Still a work in progress 


import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState} from "react";

const Checkbox = ({onToggle}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setIsChecked(!isChecked);
        onToggle(!isChecked);
    };
    
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCheckboxToggle}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
        marginVertical: 20,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 2,
		borderColor: "gray",
		borderRadius: 3,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	checkboxChecked: {
		backgroundColor: "gray",
	},
	checkmark: {
		color: "white",
    },
});

export default Checkbox;
