//import { Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const AppBarTab = ({ label, link }) => {
    return (
        <Link to={link}>
            <Text style={theme.appBar.tab}>{label}</Text>
        </Link>
    )
}

export default AppBarTab;