import { View, Button, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

import { useNavigate } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup
    .object()
    .shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
    });

const styles = StyleSheet.create({
    container: {
        maring: 5,
        padding: 5,
        backgroundColor: '#ffff',
    },
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 10
    }
});

const SignInForm = ({ onSubmit }) => {
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
            <Button onPress={onSubmit} title="Sign-in" style={styles.button} />
            {/* <Pressable onPress={onSubmit} style={{ margin: 5, padding: 5 }}>
            </Pressable> */}
        </View>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signIn({ username, password });
            console.log(data);
        } catch (e) {
            console.log(e);
        }
        navigate('/')
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;