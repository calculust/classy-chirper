import { createGlobalStyle } from 'styled-components';
import bgImage from '../images/background.png';
 
const GlobalStyle = createGlobalStyle`
  body {
    position:relative;
    min-height:100vh;
  }

  // solution to add opacity to bg image
  body::before {    
      content: "";
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.1;
      background: url(${bgImage});
      background-position: 5% 95%;
      background-size: 300px;
      background-repeat: no-repeat;
      background-attachment: fixed;
}

  textarea:hover, 
  input:hover, 
  textarea:active, 
  input:active, 
  textarea:focus, 
  input:focus,
  button:focus,
  button:active,
  button:hover,
  label:focus,
  .btn:active,
  .btn.active
  {
    outline:0px !important;
    -webkit-appearance:none;
    box-shadow: none !important;
  }

  textarea {
    resize:none;
  }
`;
 
export default GlobalStyle;