import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, StatusBar } from "react-native";
import MovieItem from "../components/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../store/slices/movies";
import CustomButton from "../components/CustomButton";

const Home = ({ navigation }) => {
  const { list: data } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="#1d1d1d" />
      <FlatList
        data={data.results}
        keyExtractor={(x) => x.id}
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
      <View style={styles.footer}>
        <CustomButton
          onPress={() =>
            navigation.navigate('Favorito', {
            })
          }>
          Mis Peliculas Favoritas
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d1d",
  },
  footer: {
    padding: 10,
  }
});

export default Home;
