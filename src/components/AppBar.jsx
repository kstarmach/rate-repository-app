import { View, ScrollView, Pressable } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native';
import Text from './Text';

const AppBar = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const navigate = useNavigate();

    const { data } = useQuery(GET_CURRENT_USER);
    const currentUser = data?.me
    const logout = () => {

        authStorage.removeAccessToken()
        apolloClient.resetStore()
        navigate('/sign-in')
    }

    return <View style={theme.appBar.container}>
        <ScrollView horizontal>
            {currentUser
                ? <>
                    <AppBarTab label={"Repositories"} link='/' />
                    <AppBarTab label={"Create a review"} link='/create-review' />
                    <AppBarTab label={"My reviews"} link='/my-reviews' />
                    <Pressable onPress={logout}>
                        <Text style={theme.appBar.tab}>Log out</Text>
                    </Pressable>
                </>
                : <>
                    <AppBarTab label={"Sign in"} link='/sign-in' />
                    <AppBarTab label={"Sign up"} link='/sign-up' />
                </>}
        </ScrollView>
    </View>;
};

export default AppBar;