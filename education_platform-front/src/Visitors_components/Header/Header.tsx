import React, { useState } from "react";
import {useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Typography, Button } from "@mui/material";
import { RiPantoneLine, RiMenuLine } from "react-icons/ri";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "@mui/material/styles/styled";
import "./Header.css"
import "animate.css/animate.min.css"; // Import the Animate.css styles

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#35bbe3",
      contrastText: "#fff"
    },
  },
});

// Define styled components
const SignInButton = styled(Button)({
  borderRadius: "2rem",
  marginRight: "1rem",
  marginLeft: "1rem",
});

const RegisterButton = styled(Button)({
  borderRadius: "2rem",
});

const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About",
    url: "/about",
  },
  {
    display: "Courses",
    url: "/content",
  },
  {
    display: "Blog",
    url: "#",
  },
];

const Header: React.FC = () => {

  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <header className="header bg-white shadow-sm fixed top-0 left-0 right-0 z-50 h-20 px-4 md:px-8">
        <Container className="h-full mx-auto">
          <div className="navigation flex items-center justify-between h-full">
          <div className="logo animate__animated animate__fadeIn">
            <Typography variant="h5" className="flex items-center gap-1">
              <RiPantoneLine className="text-xl" style={{ color:"#006afe",animation: "slideFromBottom 1s ease-out" }} />
              <span className="animate__animated linear-wipe animate__slideInRight">Learners.</span>
            </Typography>
          </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-10">
              <ul className="nav__list flex items-center gap-10">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a
                      href={item.url}
                      className="counter text-xl font-meduim hover:text-cyan-400"
                    >
                      {item.display}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="nav__right">
                <SignInButton variant="outlined" color="primary" onClick={()=> navigate('/SignIn')}>
                  Sign In
                </SignInButton>
                <RegisterButton variant="contained" color="primary" onClick={()=> navigate('/LogIn')}>
                  Log In
                </RegisterButton>
              </div>
            </nav>

            {/* Mobile Menu */}
            <div className="mobile__menu md:hidden">
              <Button onClick={toggleMobileMenu} className="focus:outline-none">
                <RiMenuLine className="text-xl text-cyan-800" />
              </Button>
              {showMobileMenu && (
                <div className="mobile__menu-items absolute top-20 left-0 right-0 bg-white text-slate-950 divide-y gap-6">
                  <ul className="px-4 py-2 divide-y">
                    {navLinks.map((item, index) => (
                      <li key={index} className="py-2 nav__item">
                        <a
                          href={item.url}
                          className="block font-medium hover:text-cyan-400"
                        >
                          {item.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2">
                    <SignInButton variant="outlined" color="primary" onClick={()=> navigate('/SignIn')}>
                      Sign In
                    </SignInButton>
                  </div>
                  <div className="px-4 py-2">
                    <RegisterButton variant="contained" color="primary"  onClick={()=> navigate('/LogIn')}>
                     Log In
                    </RegisterButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>
    </ThemeProvider>
  );
};

export default Header;
