import { View, Pressable, Button, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';


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
        height: yup
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
            <Pressable onPress={onSubmit} style={{ margin: 5, padding: 5 }}>
                <Button title="Sign-in" style={styles.button} />
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;