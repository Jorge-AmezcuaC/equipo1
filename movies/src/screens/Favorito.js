import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch} from "react-redux";
import MovieItem from "../components/MovieItem";
import { fetchAllFavMovies } from "../store/slices/favlist";

const Favorito = ({ navigation }) => {

    const { list: data } = useSelector((state) => state.favlist);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchAllFavMovies()); 
    }, [dispatch])

    return (
        <View style={styles.container}>
            <FlatList 
                keyExtractor={(x) => x.id}
                data={data.results}
                renderItem={({ item }) => (
                    <MovieItem 
                        text={item.original_title}
                        desc={item.overview}
                        image={item.poster_path}
                        onPress={() =>
                            navigation.navigate("Detail", {
                              data: item
                            })
                          }
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
        backgroundColor: "#1d1d1d",
    }
})

export default Favorito;