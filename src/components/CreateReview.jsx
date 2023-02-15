import { View, Button, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
// import useSignIn from '../hooks/useSignIn';

import { useNavigate } from 'react-router-native';
import createReview from '../hooks/createReview';

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: 0,
    text: ''
};

const validationSchema = yup
    .object()
    .shape({
        ownerName: yup
            .string()
            .required('Username is required'),
        repositoryName: yup
            .string()
            .required('Repository name is a required'),
        rating: yup
            .number()
            .min(0)
            .max(100)
            .positive()
            .integer()
            .required('Rating is a required number between 0 and 100')
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

export const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                placeholder="Repository owner name"
                name="ownerName"
            />
            <FormikTextInput
                placeholder="Repository name"
                name="repositoryName"
            />
            <FormikTextInput
                placeholder="Rating between 0 and 100"
                name="rating"
                keyboardType='numeric'
                maxLength={3}
                max={100}
                min={0}
            />
            <FormikTextInput
                placeholder="Review"
                name="text"
                multiline={true}
            />
            <View style={styles.button}>
                <Button onPress={onSubmit} title="Create a review" />
            </View>
        </View>
    );
};


export const CreateReviewContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

const CreateReview = () => {
    // const [signIn] = useSignIn();
    const [sendReview] = createReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating, text } = values;

        console.log(typeof rating);
        try {
            const { data } = await sendReview({ repositoryName, ownerName, rating, text });
            navigate('/repository-details/' + data.createReview.repositoryId)
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export default CreateReview