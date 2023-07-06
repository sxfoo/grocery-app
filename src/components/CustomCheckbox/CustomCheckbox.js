import React, {useState} from "react";
import { View } from "react-native";
import { Checkbox } from "react-native-paper";

const CustomCheckbox = ({label}) => {
	const [checked, setChecked] = useState(false);

	const handleCheckboxToggle = () => {
		setChecked(!checked);
	}

	return (
      <View style={{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
      }}>
        <Checkbox.Item
            label={label}
            status={checked ? 'checked' : 'unchecked'}
            onPress={handleCheckboxToggle}
            color = "white"
          />
          </View>
  );
}

export default CustomCheckbox;
