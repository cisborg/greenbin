import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../../components/Input';
import Select from '../../components/Select';

function SignUp({ navigation }) {
    const [formValues, setFormValues] = useState({
        email: { value: '', log: '' },
        phone: { value: '', log: '' },
        role: { value: '', log: '' },
        username: { value: '', log: '' },
        password: { value: '', log: '' },
        confirm_password: { value: '', log: '' }
    });
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        // Check if all fields are filled to enable/disable the button
        const allFieldsFilled = Object.values(formValues).every(field => field.value.trim() !== '');
        setIsButtonEnabled(allFieldsFilled);
    }, [formValues]);

    function handleChange(name, value) {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: {
                ...prevValues[name],
                value: value
            }
        }));
    }

    function handleSignup() {
        //const errors = validateSignUpForm(formValues);
        setFormSubmitted(true);

        // Proceed if no errors
        if (Object.keys(errors).length === 0) {
            console.log('Sign-up successful');
            navigation.navigate('Main');
        }
    }

    const roleOptions = [
        { label: "Select Role", value: "" },
        { label: "DJ", value: "dj" },
        { label: "Audience", value: "audience" },
        { label: "Organiser", value: "organiser" }
    ];

    return (
        <View style={styles.container}>
            <Select options={roleOptions} name="role" currentValue={formValues.role.value} label="Role" onValueChange={handleChange} />
            <Input inputValue={formValues.email.value} label='E-mail' name='email' onChange={handleChange} log={formValues.email.log} />
            <Input inputValue={formValues.phone.value} label='Phone' name='phone' onChange={handleChange} log={formValues.phone.log} />
            <Input inputValue={formValues.username.value} label='Username' name='username' onChange={handleChange} log={formValues.username.log} />
            <Input inputValue={formValues.password.value} label='Password' name='password' onChange={handleChange} log={formValues.password.log} />
            <Input inputValue={formValues.confirm_password.value} label='Confirm Password' name='confirm_password' onChange={handleChange} log={formValues.confirm_password.log} />

            <Button title="Sign Up" onPress={handleSignup} disabled={!isButtonEnabled} />

            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.loginText}>Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    loginText: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    }
});

export default SignUp;
