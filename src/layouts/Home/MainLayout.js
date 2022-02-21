import React from "react";
import About from "./About";
import Client from "./Client";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import Portfolio from "./Portfolio";
import Section from "./Section";
import Team from "./Team";
import Item from "./Item";
import Item2 from "./Item2";
import Item3 from "./Item3";
import Item4 from "./Item4";
import Item5 from "./Item5";
import Item6 from "./Item6";
import "../../assets/Home/css/styles.css";
import "../../assets/Home/js/scripts";
const MainLayout = () => {
  return (
    <div id="page-top">
      <Navbar />

      <Header />
      <Section />
      <Portfolio />
      <About />
      <Team />
      <Client />
      <Contact />
      <Footer />
      <Item />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
      <Item6 />
    </div>
  );
};

export default MainLayout;
