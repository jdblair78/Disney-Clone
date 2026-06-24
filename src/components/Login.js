import styled from 'styled-components'

const Login = () => {
    return(
        <Container>
            <Content>
                <CTA>
                    <CTALogoOne src="./images/cta-logo-one.svg" alt="" />
                </CTA>
                <BgImage />
            </Content>
        </Container>
    )
}

export default Login;

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
margin-bottom: 10vh;
width: 100%;
position: relative;
min-height: 100vh;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 80px 40px;
height: 100%;
`;

const BgImage = styled.div`
height: 100%;
background-image: url("/images/loginBG.jpg");
background-position: top;
background-size: cover;
background-repeat: no-repeat;

position: absolute;
top: 0;
right: 0;
left: 0;
bottom: 0;
z-index: -1;
`;

const CTA = styled.div`
width: 100%;
margin-bottom: 2vw;
position: relative;
z-index: 1;
max-width: 650px;
flex-wrap: wrap;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 0;
align-items: center;
text-align: center;
margin-left: auto;
margin-right: auto;
transition-timeing-function: ease-out;
transtition: opacity: 0.2s;


`;

const CTALogoOne = styled.img`
margin-bottom: 12px;
width: 100%;
max-width: 600px;
min-height: 1px:
display: block;
margin: 0 auto;

`;

