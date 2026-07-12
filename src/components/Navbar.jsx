import styled from "styled-components";
import { auth, provider } from "../firebase";
import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/users/userSlice";
import { useCallback, useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const setUser = useCallback(
    (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      );
    },
    [dispatch],
  );

  console.log("Redux photo:", userPhoto);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (location.pathname === "/") {
          navigate("/home");
        }
      }
    });

    return unsubscribe;
  }, [location.pathname, navigate, setUser]);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
          navigate("/home");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    handleRedirectResult();
  }, [navigate, setUser]);

  const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
    navigator.userAgent,
  );

  const handleAuth = async () => {
    if (!userName) {
      try {
        if (isMobileDevice) {
          await signInWithRedirect(auth, provider);
          return;
        }

        const result = await signInWithPopup(auth, provider);

        console.log(result.user);
        console.log(result.user.photoURL);

        setUser(result.user);
        navigate("/home");
      } catch (error) {
        if (
          error.code === "auth/popup-blocked" ||
          error.code === "auth/operation-not-supported-in-this-environment"
        ) {
          await signInWithRedirect(auth, provider);
          return;
        }

        alert(error.message);
      }
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <Link to="/home">
              <img src="/images/home-icon.svg" alt="Home" />
              <span>HOME</span>
            </Link>
            <div>
              <img src="/images/search-icon.svg" alt="Home" />
              <span>SEARCH</span>
            </div>
            <div>
              <img src="/images/watchlist-icon.svg" alt="Home" />
              <span>WATCHLIST</span>
            </div>
            <div>
              <img src="/images/original-icon.svg" alt="Home" />
              <span>ORIGINALS</span>
            </div>
            <div>
              <img src="/images/movie-icon.svg" alt="Home" />
              <span>MOVIES</span>
            </div>
            <div>
              <img src="/images/series-icon.svg" alt="Home" />
              <span>SERIES</span>
            </div>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a,
  div {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        opacity: 0;
        height: 2px;
        left: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.46, 0.94);
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9ff;
  border-radius: 4px;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #f9f9ff;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const DropDown = styled.div`
  position: absolute;
  top: 54px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.034);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Navbar;
