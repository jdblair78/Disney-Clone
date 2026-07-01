import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchMovie = async () => {
      try {
        const movieRef = doc(db, "movies", id);
        const movieDoc = await getDoc(movieRef);

        if (movieDoc.exists()) {
          setMovie(movieDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };
    fetchMovie();
  }, [id]);


  return (
    <Container>
      <Background>
        <img src={movie.backgroundImg} alt={movie?.title || ""} />
      </Background>
      <ImageTitle>
        <img src={movie.titleImg} alt={movie.title} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
            <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <Subtitles>
          <p>{movie.subTitle}</p>
        </Subtitles>
        <Description>
            <p>
                {movie.description}
            </p>
        </Description>
      </ContentMeta>
    </Container>
  );
}


const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;
  background: rgb(0, 0, 0);

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;

    @media (max-width: 768px) {
      width: initial;
      height: 100%;
    }
  }
`;

const ImageTitle = styled.div`
  width: 100%;
  height: 30vh;
  min-height: 170px;
  margin: 0px auto;
  padding-bottom: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  -webkit-box-pack: start;

  img {
    max-width: 600px;
    max-height: 200px;
    width: 35vw;

    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
    }
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  span {
    color: rgb(0, 0, 0);
  }

  &:hover {
    background: rgb(198, 198, 198);
    transition: all 0.2s ease all;
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  span {
    color: rgb(249, 249, 249);
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: not-allowed;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
  &:hover {
    background-color: rgb(198, 198, 198);
    transition: all 0.2s ease all;
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  div {
    height: 44px;
    width: 44px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    border: 2px solid white;
    
    img {
      width: 100%;
    }
    
    &:hover {
      background-color: rgb(198, 198, 198);
    }
  }

`;

const Subtitles = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    color: rgb(249, 249, 249);
    padding: 16px 0px;


@media (max-width: 768px) {
    font-size: 14px;
}
`;

export default Detail;
