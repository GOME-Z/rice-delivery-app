import React, { Component } from "react";

class LidController extends React.Component {
  styles = {
    fontSize: 50,
    fontWeight: "bold",
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }
  componentWillUnmount() {
    console.log("LidController-Unmounted");
  }

  render() {
    console.log("LidController-Rendered");
    return (
      <React.Fragment>
        <button
          style={this.styles}
          onClick={() => this.props.onToggle()}
          className={
            "badge m-2 " +
            (this.props.robstatus.lid === "open"
              ? "badge-warning"
              : "badge-primary")
          }
        >
          Press to {this.props.robstatus.lid === "open" ? "close" : "open"}
        </button>
      </React.Fragment>
    );
  }
}

export default LidController;
