// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList'
import { Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8'
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/create-review" element={<CreateReview />} exact />
                <Route path="/sign-in" element={<SignIn />} exact />
                <Route path="/sign-up" element={<SignUp />} exact />
                <Route path="/repository-details/:id" element={<SingleRepository />} exact />
                <Route path="/my-reviews" element={<MyReviews />} exact />
            </Routes>
        </View>
    );
};

export default Main;