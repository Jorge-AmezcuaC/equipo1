import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import RecommendedMovie from "../components/RecommendedMovie";
import { axiosMarkAsFavorite } from "../store/slices/favorites";

const Detail = ({ route, navigation }) => {
  const { data } = route.params;
  const image = "https://image.tmdb.org/t/p/w500" + data.poster_path;

  const { sessionId } = useSelector((state) => state.login.tokens);
  const { list: movies } = useSelector((state) => state.movies);
  const { iconName, buttonName } = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.content}>
        <Text style={styles.title}>{data.original_title}</Text>
        <View style={styles.info}>
          <Text style={styles.desc}>{data.release_date}</Text>
          <Text style={styles.desc}>{data.vote_average}</Text>
        </View>
        <Text style={[styles.overview, styles.desc]}>{data.overview}</Text>
        <View style={styles.buttons}>
          <CustomButton
            onPress={() => dispatch(axiosMarkAsFavorite(sessionId, data.id))}
          >
            {`${buttonName}      `}
            <Ionicons name={iconName} size={20} />
          </CustomButton>
        </View>
        <Text style={styles.title}>Tambien Puede ver</Text>
        <FlatList
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
        />
      </View>
    </ScrollView>
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
