import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#586069',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 4
    },
    error: {
        height: 40,
        borderColor: '#d73a4a',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 4
    }
});

const TextInput = ({ error, ...props }) => {
    const textInputStyle = error ? styles.error : styles.input
    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;