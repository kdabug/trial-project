import React, { Component } from "react";

export default class DisplayTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    //this.toggleClass = this.toggleClass.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // toggleClass(e) {
  //   e.preventDefault();
  //   e.target.classList.add("clicked");
  //   console.log("this is display tile classList", e.target.classList);
  // }
  onClick(e, clue, value) {
    e.preventDefault();
    this.setState((prevState, nextState) => ({
      active: !prevState.active
    }));
    this.props.handleAskQuestion(e, clue, value);
  }

  render() {
    const { clue, value, round } = this.props;
    let tileClass = ["question-box"];
    if (this.state.active) {
      tileClass.push("clicked");
    }
    return (
      <>
        <div
          className={tileClass.join(" ")}
          onClick={e => this.onClick(e, clue, value * 100)}
          id={clue.id}
        >
          <span className="money">${value * 100}</span>
        </div>
      </>
    );
  }
}
