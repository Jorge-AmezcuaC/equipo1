import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MovieItem from "../components/MovieItem";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies } from "../store/slices/movies";

const Home = ({ navigation }) => {

    const { list: data } = useSelector((state) => state.movies);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAllMovies());
    }, [dispatch]);
        
    return (
        <View style={styles.container}>
            <FlatList 
            data={data.results}
            keyExtractor={(x) => x.id}
            renderItem={({ item }) => (
                <MovieItem 
                text={item.original_title}
                desc={item.overview}
                image={item.poster_path}
                onPress={() => navigation.navigate('Detail', { title: item.original_title, desc: item.overview, image: item.poster_path }  )}
                />
            )}
            />
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