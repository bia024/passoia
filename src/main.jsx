import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// import { Globalstyle } from './styles/Globalstyle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Globalstyle /> */}
      <App />
    </BrowserRouter>
  </StrictMode>
)

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import { GlobalStyle } from "./styles/GlobalStyle.js";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <GlobalStyle />
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );
