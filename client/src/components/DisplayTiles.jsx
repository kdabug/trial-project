import React, { Component } from "react";

export default class DisplayTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.toggleClass = this.toggleClass.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggleClass(e) {
    e.preventDefault();
    this.setState(prevState => ({
      active: !prevState.active
    }));
  }
  onClick(e, clue) {
    e.preventDefault();
    this.props.handleAskQuestion(e, clue);
    this.toggleClass(e);
  }

  render() {
    const { clue, value, round } = this.props;
    const { active } = this.state;
    return (
      <>
        <div
          type="button"
          className={`question-information-${active}`}
          onClick={e => this.onClick(e, clue)}
          id={clue.id}
        >
          <span className="money">${(value + 1) * 100 * round}</span>
        </div>
      </>
    );
  }
}
