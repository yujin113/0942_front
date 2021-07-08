import React from "react";
import "./App.css";
import ScrollToTop from "./components/views/ScrollToTop";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import MainPage from "./components/views/MainPage/MainPage";
import Footer from "./components/views/Footer/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import WritePage from "./components/views/WritePage/WritePage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/main" component={MainPage} />
      <Route exact path="/write" component={WritePage} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
