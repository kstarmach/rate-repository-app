import { View, Button, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

import { useNavigate } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
};

const validationSchema = yup
    .object()
    .shape({
        username: yup
            .string()
            .min(1)
            .max(30)
            .required('Username is required'),
        password: yup
            .string()
            .min(5)
            .max(50)
            .required('Password is required'),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], "Passwords don't match")
            .required('Password confirm is required')
    });

const styles = StyleSheet.create({
    container: {
        maring: 5,
        padding: 5,
        backgroundColor: '#ffff',
    },
    button: {
        margin: 10,
    }
});

export const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                placeholder="Username"
                name="username"
            />
            <FormikTextInput
                placeholder="Password"
                name="password"
                secureTextEntry
            />
            <FormikTextInput
                placeholder="Password confirmation"
                name="passwordConfirm"
                secureTextEntry
            />
            <View style={styles.button}>
                <Button onPress={onSubmit} title="Sign up" />
            </View>
        </View>
    );
};

export const SignUpContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data: signUpData } = await signUp({ username, password });
            console.log(signUpData);
            if (signUpData) {
                const { data: signInData } = await signIn({ username, password });
                if (signInData) {
                    navigate('/')
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SignUpContainer onSubmit={onSubmit} />
    );
};

export default SignUp;