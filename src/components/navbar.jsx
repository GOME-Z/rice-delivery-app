import React, { Component } from "react";
import styled from "styled-components";

class NavBar extends Component {
  styles = {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
  };

  render() {
    console.log("NavBar-Rendered");
    return (
      <Nav>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <a style={this.styles} className="navbar-brand" href="#">
              Welcome to {"\n"} Rice Delivery App
            </a>
          </div>
        </nav>
      </Nav>
    );
  }
}

const Nav = styled.nav`
  position: relative;
  top: 0;
  padding: 3em;
  background: #000000;
  @media (max-width: 1080px) {
    padding-top: 0px;
  }
  @media (min-width: 600px) {
    position: fixed;
    width: 1080px;
    height: 100px;
  }
`;

export default NavBar;
