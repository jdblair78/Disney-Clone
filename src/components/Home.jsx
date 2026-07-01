import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommended from "./Recommended";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/users/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "movies"), (snapshot) => {
      let recommended = [];
      let newDisney = [];
      let originals = [];
      let trending = [];

      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommended.push({ id: doc.id, ...doc.data() });
            break;

          case "new":
            newDisney.push({ id: doc.id, ...doc.data() });
            break;

          case "original":
            originals.push({ id: doc.id, ...doc.data() });
            break;

          case "trending":
            trending.push({ id: doc.id, ...doc.data() });
            break;

          default:
            break;
        }
      });

      dispatch(
        setMovies({
          recommended,
          newDisney,
          originals,
          trending,
        }),
      );
    });

    return () => unsubscribe();
  }, [dispatch, userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommended />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background-image: url("/images/home-background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
