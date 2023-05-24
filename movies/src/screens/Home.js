import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import MovieItem from "../components/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../store/slices/movies";
import useRefresh from "../hooks/useRefresh";

const Home = ({ navigation }) => {
  const { list: data } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [refreshing, onRefresh] = useRefresh(() => dispatch(fetchAllMovies()));

  useEffect(() => {
    dispatch(fetchAllMovies())
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor="#1d1d1d" />
      {data.results ? (
        <FlatList
          data={data.results}
          keyExtractor={(x) => x.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <MovieItem
              text={item.original_title}
              desc={item.overview}
              image={item.poster_path}
              onPress={() =>
                navigation.navigate("Detail", {
                  data: item,
                })
              }
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.error}>
            No se pudieron cargar los datos, vuelva a intentarlo
          </Text>
        </ScrollView>
      )}
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

  error: {
    color: "#fff",
    fontSize: 20,
  },

});

export default Home;
