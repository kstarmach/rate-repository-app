import { View, ScrollView, Pressable } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { ME } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client'
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native';
import Text from './Text';

const AppBar = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const navigate = useNavigate();

    const { data } = useQuery(ME);
    const currentUser = data && data.me
    const logout = () => {
        console.log('logout');
        authStorage.removeAccessToken()
        apolloClient.resetStore()
        navigate('/sign-in')
    }

    console.log('current user: ');
    console.log(data);
    return <View style={theme.appBar.container}>
        <ScrollView horizontal>
            {currentUser
                ? <>
                    <AppBarTab label={"Repositories"} link='/' />
                    <AppBarTab label={"Create a review"} link='/create-review' />
                    {/* <Button title='Log out' onPress={logout} /> */}
                    <Pressable onPress={logout}>
                        <Text style={theme.appBar.tab}>Log out</Text>
                    </Pressable>

                    {/* <AppBarTab label={"Log out"} link='/sign-in' onPress={logout} /> */}
                </>
                : <>
                    <AppBarTab label={"Sign in"} link='/sign-in' />
                    <AppBarTab label={"Sign up"} link='/sign-up' />
                </>}
        </ScrollView>
    </View>;
};

export default AppBar;