import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Select = ({ options, name, currentValue, label, onValueChange }) => {
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{/*label*/}</Text>
            <Picker
                selectedValue={currentValue}
                onValueChange={(itemValue) => onValueChange(name, itemValue)}
                style={styles.input}
            >
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        position: 'relative',
        width: '100%',
        minHeight: 44,
        marginTop: 20,
        backgroundColor: 'none',
    },
    inputFieldLog: {
        borderColor:'red'
    },
    label: {
        position: 'absolute',
        top: 12,
        left: 8,
        color: 'gray', // You can replace this with your custom color
        fontSize: 16, // Adjust the font size as needed
        transition: '0.2s all',
    },
    labelFocused: {
        top: -10,
        fontSize: 12,
        color: 'black', // You can replace this with your custom color
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 8,
        fontSize: 16,
        color: 'black',
        outlineStyle:'none'
    },
});

export default Select;
