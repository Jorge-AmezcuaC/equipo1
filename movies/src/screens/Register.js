import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Register = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Soy Register</Text>
            <Button title='Login' onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Register;