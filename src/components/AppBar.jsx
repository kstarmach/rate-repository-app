import { View, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const AppBar = () => {
    return <View style={theme.appBar.container}>
        <ScrollView horizontal>
            <AppBarTab label={"Repositories"} link='/' />
            <AppBarTab label={"Sign in"} link='/sign-in' />
        </ScrollView>
    </View>;
};

export default AppBar;