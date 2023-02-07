import { View } from 'react-native';
import AppBarTab from './AppBarTab';

import theme from '../theme';

const AppBar = () => {
    return <View style={theme.appBar.container}>
        <AppBarTab label={"Repositories"} />
    </View>;
};

export default AppBar;