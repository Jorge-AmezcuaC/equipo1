import React, { useEffect } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "../components/MovieItem";
import { fetchAllFavMovies } from "../store/slices/favlist";
import useRefresh from "../hooks/useRefresh";

const Favorito = ({ navigation }) => {
  const { list: data } = useSelector((state) => state.favlist);
  const { sessionId } = useSelector((state) => state.login.tokens);

  const dispatch = useDispatch();

  const getFavMovies = () => {
    dispatch(fetchAllFavMovies(sessionId));
  };

  const [refreshing, onRefresh] = useRefresh(getFavMovies);

  useEffect(() => {
    getFavMovies();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {data.results ? (
        <FlatList
          keyExtractor={(x) => x.id}
          data={data.results}
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
            No se pudo cargar la seccion, vuelva a intentarlo
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
    fontSize: 20
  },

});

export default Favorito;
