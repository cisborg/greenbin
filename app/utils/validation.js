
export function validateSignUpForm(formValues) {
    let errors = {};

    if (!validateEmail(formValues.email.value)) {
        errors.email = 'Invalid email address';
    }

    if (!validatePhone(formValues.phone.value)) {
        errors.phone = 'Invalid phone number';
    }

    if (!validateRole(formValues.role.value)) {
        errors.role = 'Invalid role selected';
    }

    if (!validateUsername(formValues.username.value)) {
        errors.username = 'Username already taken';
    }

    if (!validatePassword(formValues.password.value)) {
        errors.password = 'Password does not meet criteria';
    }

    if (formValues.password.value !== formValues.confirm_Password.value) {
        errors.confirm_Password = 'Passwords do not match';
    }

    return errors;
}



// src/utils/validationHelpers.js

// Validate Email
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Phone
export function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/; // Adjust this regex to match your phone number format
    return phoneRegex.test(phone);
}

// Validate Role
export function validateRole(role) {
    const validRoles = ['dj', 'audience', 'organiser'];
    return validRoles.includes(role);
}

// Validate Username
// Dummy function to simulate a username check
// In a real application, this would involve a call to the backend to check username availability
export function validateUsername(username) {
    const takenUsernames = ['user1', 'admin']; // Example taken usernames
    return !takenUsernames.includes(username);
}

// Validate Password
export function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}
