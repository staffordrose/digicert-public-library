import { createGlobalStyle } from 'styled-components';

// Many styles from Josh Comeau (https://www.joshwcomeau.com/css/custom-css-reset)

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html,
  body {
    min-width: 320px;
    height: 100%;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
  body.ReactModal__Body--open {
    overflow: hidden;
  }
  h1, h2, h3, h4, h5, h6, label {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.navy[800]};
  }
  h1, h2, h3, h4, h5, h6, p {
    overflow-wrap: break-word;
  }
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  h4, label {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  h5 {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  h6 {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
  label {
   line-height: 2;
  }
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  input, button, textarea, select {
    font: inherit;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    h1 {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }
  
  #root,
  #__next {
    isolation: isolate;
  }
`;

export default GlobalStyle;
