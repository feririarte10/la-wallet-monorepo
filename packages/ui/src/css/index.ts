import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;

    font-size: 20px;
  }

  body {
    overflow-x: hidden;

    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100dvh;

    background: ${(props) => props.theme.colors.background};

    color: ${(props) => props.theme.colors.text};
    font-size: 1em;
    font-weight: 400;
    font-family: ${(props) => props.theme.font.secondary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.font.primary};
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    background-color: inherit;
    border: inherit;
    color: inherit;
    cursor: pointer;
  }

  a, 
  button {
    font-family: ${(props) => props.theme.font.secondary};
  }
`;

export default GlobalStyles;
