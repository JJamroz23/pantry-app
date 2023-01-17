import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*,
*:after,
*:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html, body {

  width: 100%;
  height: 100%;
}

html {
  font-size: 62.5%;
  background-color: #fff;

  @media (max-width: 900px) { 
    font-size: 56.25%;
  }

  @media (max-width: 600px) { 
    font-size: 50%;
  }
}

body {
  position: relative;
  z-index: 0;
  min-height: 100%;
  color: #000;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  font-style: normal;
  line-height: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}





`;
