import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Soy Home</Text>
            <Button title='Detalles' onPress={() => navigation.navigate('Detail')}/>
            <Button title='Favoritos' onPress={() => navigation.navigate('Favorito')}/>
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

export default Home;