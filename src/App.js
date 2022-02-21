import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import LidController from "./components/lidcontroller";
import axios from "axios";
import Dropdown from "./components/Dropdown";
import styled from "styled-components";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
    lidcontroller: { id: 1, status: false },
    robstatus: {
      charge: 0,
      charging: false,
      online: false,
      position: { x: 100, y: 100, theta: 100 },
      lid: "open",
    },
    waypoints: [
      [
        {
          id: "a9b1857b-f2ef-4a63-a005-9e027d125254",
          name: "Home",
          coordinate: [0, 0, 0],
          meta: {},
        },
        {
          id: "61ad23f1-5b25-4ea8-b749-50a338a69081",
          name: "Destination A",
          coordinate: [1, 1, 0],
          meta: {},
        },
        {
          id: "ab021623-590a-41bd-a9ce-45b933a7326f",
          name: "Destination B",
          coordinate: [-1, -1, 0],
          meta: {},
        },
      ],
    ],
    target: {},
  };

  constructor() {
    super();
    console.log("App-Constructor");
    //GET status
    axios
      .get("http://localhost:3001/status")
      .then((response) => {
        const robstatus = response.data;
        this.setState({ robstatus });
        console.log("Constructor GET status:");
        console.log(this.state.robstatus);
      })
      .catch((error) => {
        console.log(error);
      });
    //GET Waypt
    axios
      .get("http://localhost:3001/map-waypoints")
      .then((response) => {
        const waypoints = response.data;
        this.setState({ waypoints });
        console.log("Constructor GET waypoints:");
        console.log(this.state.waypoints);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("App-Mounted");
    this.loadData();
    setInterval(this.loadData, 6000);
  }

  loadData = () => {
    // console.log("looping");
    //GET status
    axios
      .get("http://localhost:3001/status")
      .then((response) => {
        const robstatus = response.data;
        this.setState({ robstatus });
        console.log("Constructor GET status:");
        console.log(this.state.robstatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleToggle = () => {
    const robstatus = this.state.robstatus;
    const lidstatus = "open";
    console.log("robstatus: ", robstatus);
    if (robstatus.lid === "open") {
      robstatus.lid = "close";
      //lidstatus = "close";
    } else if (robstatus.lid === "close") {
      robstatus.lid = "open";
      // lidstatus = "open";
    } else {
      robstatus.lid = "open";
      // lidstatus = "open";
    }
    this.setState(robstatus);
    console.log("onToggle");
    console.log("Lid status: ", robstatus.lid);
    axios
      .post("http://localhost:3001/set-lid", "lid: " + robstatus.lid)
      .then((response) => {
        console.log(response);
        console.log("Request sent: ", robstatus.lid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("App-Rendered");
    return (
      <React.Fragment>
        <NavBar />
        <Wrapper>
          <main className="container">
            <Sidemenu>
              <h1>Status:</h1>
              <span
                style={{ fontSize: 30, fontWeight: "bold" }}
                className={
                  "badge m-2 " +
                  (this.state.robstatus.charge >= 30
                    ? "badge-primary"
                    : "badge-warning")
                }
              >
                Battery: {this.state.robstatus.charge}
              </span>
              <span
                style={{ fontSize: 30, fontWeight: "bold" }}
                className={
                  "badge m-2 " +
                  (this.state.robstatus.online
                    ? "badge-primary"
                    : "badge-warning")
                }
              >
                Server: {this.state.robstatus.online ? "online" : "offlne"}
              </span>
              <span
                style={{ fontSize: 30, fontWeight: "bold" }}
                className={
                  "badge m-2 " +
                  (this.state.robstatus.charge >= 30
                    ? "badge-primary"
                    : "badge-warning")
                }
              >
                [ {this.state.robstatus.position.x},{" "}
                {this.state.robstatus.position.y},{" "}
                {this.state.robstatus.position.theta} ]
              </span>
              <span
                style={{ fontSize: 30, fontWeight: "bold" }}
                className={"badge m-2 badge-warning"}
              >
                {this.state.robstatus.lid === "open" ? "Lid is opened" : ""}
              </span>
            </Sidemenu>
            <Main>
              <LidController
                robstatus={this.state.robstatus}
                onToggle={this.handleToggle}
              />
              <Dropdown
                className="badge m-2 badge-primary"
                title="Click to Select Target Location"
                waypoints={this.state.waypoints}
                robstatus={this.state.robstatus}
              />
              {/* <PostForm /> */}
            </Main>
          </main>
        </Wrapper>
      </React.Fragment>
    );
  }
}

// component styles
const Wrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    top: 100px;
    position: relative;
    height: calc(100% - 100px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;
const Main = styled.main`
  position: fixed;
  height: calc(100% - 100px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 600px) {
    flex: 1;
    margin-left: 260px;
    height: calc(100% - 100px);
    width: calc(100% - 260px);
  }
`;
const Sidemenu = styled.div`
  position: fixed;
  top: 100px;
  left: 0px;
  background: #d3d3d3;
  height: calc(100% - 100px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 600px) {
    flex: 1;
    margin-left: 0px;
    height: calc(100% - 100px);
    width: 260px;
  }
`;

export default App;
