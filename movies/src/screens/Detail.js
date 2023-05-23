import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import RecommendedMovie from "../components/RecommendedMovie";
import { fetchAllFavMovies, removeFromFavorites, addToFavorites } from "../store/slices/favlist";

const Content = ({ image, data }) => {
  const { sessionId } = useSelector((state) => state.login.tokens);
  const { moviesId } = useSelector((state) => state.favlist);

  const dispatch = useDispatch();

  const axiosFavorites = async () => {
    let favorite = true;

    if (index !== -1) {
      favorite = false;
    }

    const url = `
  https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=af168e8969d69372dcccc733bfb642ff&session_id=${sessionId}`;
    const response = await axios.post(url, {
      media_type: "movie",
      media_id: favMovieId,
      favorite: favorite,
    });

    if (response.status === 200 || response.status === 201) {
      if (!favorite) {
        alert("Pelicula quitada de favoritos correctamente");
        dispatch(removeFromFavorites(favMovieId))
      } else {
        alert("Pelicula añadida a favoritos correctamente");
        dispatch(addToFavorites(favMovieId))
      }
    } else {
      alert("Hubo un error intentelo más tarde")
    }
  };

  const favMovieId = data.id;
  let buttonName = "";
  let iconName = "";
  const index = moviesId.indexOf(favMovieId);

  if (index !== -1) {
    buttonName = "Quitar de favoritos";
    iconName = "heart-sharp";
  } else {
    buttonName = "Añadir a favoritos";
    iconName = "heart-outline";
  }

  useEffect(() => {
    dispatch(fetchAllFavMovies(sessionId));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.original_title}</Text>
        <View style={styles.info}>
          <Text style={styles.desc}>{data.release_date}</Text>
          <Text style={styles.desc}>{data.vote_average}</Text>
        </View>
        <Text style={[styles.overview, styles.desc]}>{data.overview}</Text>
        <View style={styles.buttons}>
          <CustomButton onPress={axiosFavorites}>
            {`${buttonName}     `}
            <Ionicons name={iconName} size={20} />
          </CustomButton>
        </View>
        <Text style={styles.title}>Tambien Puede ver</Text>
      </View>
    </View>
  );
};

const Detail = ({ route, navigation }) => {
  const { data } = route.params;
  const image = "https://image.tmdb.org/t/p/w500" + data.poster_path;

  const { list: movies } = useSelector((state) => state.movies);

  return (
    <FlatList
      style={styles.content}
      key={1}
      data={movies.results}
      keyExtractor={(x) => x.id}
      numColumns={2}
      renderItem={({ item }) => (
        <RecommendedMovie
          text={item.original_title}
          image={item.poster_path}
          onPress={() =>
            navigation.navigate("Detail", {
              data: item,
            })
          }
        />
      )}
      ListHeaderComponent={<Content image={image} data={data} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#eee",
    paddingHorizontal: 25,
    marginVertical: 25,
  },
  image: {
    width: "100%",
    height: 530,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  info: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  desc: {
    paddingHorizontal: 25,
    fontSize: 16,
    textAlign: "justify",
    fontWeight: "400",
    color: "#eee",
  },
  imageContainer: {
    height: 150,
  },
  content: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
  overview: {
    marginVertical: 25,
  },
  buttons: {
    paddingHorizontal: 25,
  },
});

export default Detail;
