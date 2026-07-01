import styled from "styled-components";
import { Link } from "react-router-dom";

const NewDisney = () => {
  return (
    <Container>
      <h4>New to Disney+</h4>
      <Content>
        <Wrap>
          <Link to="/">
            <img src="/images/viewers-disney.png" alt="disney" />
          </Link>
          <Video autoPlay loop muted playsInline>
            <source src="/videos/disney.mp4" type="video/mp4" />
          </Video>
        </Wrap>
        <Wrap>
          <Link to="/">
            <img src="/images/viewers-disney.png" alt="disney" />
          </Link>
          <Video autoPlay loop muted playsInline>
            <source src="/videos/disney.mp4" type="video/mp4" />
          </Video>
        </Wrap>
        <Wrap>
          <Link to="/">
            <img src="/images/viewers-disney.png" alt="disney" />
          </Link>
          <Video autoPlay loop muted playsInline>
            <source src="/videos/disney.mp4" type="video/mp4" />
          </Video>
        </Wrap>
        <Wrap>
          <Link to="/">
            <img src="/images/viewers-disney.png" alt="disney" />
          </Link>
          <Video autoPlay loop muted playsInline>
            <source src="/videos/disney.mp4" type="video/mp4" />
          </Video>
        </Wrap>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;

  h4 {
    margin: 0 0 16px;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1.5px;
    color: rgb(249, 249, 249);
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow:
    rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    position: absolute;
    width: 100%;
    z-index: 1;
    top: 0;
    transition: opacity 500ms ease-in-out 0s;
  }

  &:hover {
    box-shadow:
      rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    transform: scale(1.05);
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  object-fit: cover;
`;

export default NewDisney;
