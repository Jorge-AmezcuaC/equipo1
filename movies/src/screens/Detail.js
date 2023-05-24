import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, Image, FlatList, Modal } from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import RecommendedMovie from "../components/RecommendedMovie";
import {
  fetchAllFavMovies,
  removeFromFavorites,
  addToFavorites,
} from "../store/slices/favlist";

const Content = ({ image, data }) => {
  const { sessionId } = useSelector((state) => state.login.tokens);
  const { moviesId } = useSelector((state) => state.favlist);
  const [showModal, setShowModal] = useState(false);

  const anio = data.release_date
  
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
        dispatch(removeFromFavorites(favMovieId));
      } else {
        alert("Pelicula añadida a favoritos correctamente");
        dispatch(addToFavorites(favMovieId));
      }
    } else {
      alert("Hubo un error intentelo más tarde");
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

  const [gen, setGeneres] = useState([])
  
  const get_data_movie = async () => {
    const id = data.id
    const uri = `https://api.themoviedb.org/3/movie/${id}?api_key=af168e8969d69372dcccc733bfb642ff`

    const fetch_Movie = await fetch(uri)
    const generes = await fetch_Movie.json()
    setGeneres(generes.genres)
  } 

  useEffect(() => {
    get_data_movie()
  }, [data])

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(!setShowModal)}
      >
        <WebView
          style={styles.container}
          source={{ uri: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }}
        />
      </Modal>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.original_title}</Text>
        <View style={styles.info}>

          <Text style={[styles.desc, styles.date]}>{data.release_date}</Text>
          <View style={styles.desc}>
            <Ionicons style={styles.star} name="star" size={20} color="#fff" />
            <Text style={styles.desc}>{data.vote_average}</Text>
          </View>
        </View>
        <Text style={[styles.overview, styles.desc]}>{data.overview}</Text>
        <View style={styles.buttons}>
          <CustomButton onPress={() => setShowModal(true)}>
            Ver pelicula
          </CustomButton>
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
  const ref = useRef();

  const toTop = () => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const { data } = route.params;
  const image = "https://image.tmdb.org/t/p/w500" + data.poster_path;

  const { list: movies } = useSelector((state) => state.movies);

  return (
    <FlatList

      ref={ref}

      style={styles.content}
      key={1}
      data={movies.results}
      keyExtractor={(x) => x.id}
      numColumns={2}
      renderItem={({ item }) => (
        <RecommendedMovie
          text={item.original_title}
          image={item.poster_path}
          onPress={() => {
            toTop();
            navigation.navigate("Detail", {
              data: item,
            });
          }}
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

    marginTop: 25,

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

    justifyContent: "space-between",
    height: 100,
  },
  star: {
    top: 23,
    right: 8,
  },
  date: {
    top: 23,

  },
});

export default Detail;
