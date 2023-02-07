import { Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';

const AppBarTab = ({ label }) => {
    return (
        <Pressable>
            <Text style={theme.appBar.tab}>{label}</Text>
        </Pressable>
    )
}

export default AppBarTab;