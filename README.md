# TRIAL
the eyes have it.   
and your trial is short.   
to provide a question.  
and be judged by the court.  

**domain**: [judging-eyes.surge.sh](judging-eyes.surge.s)

## description and user story 

This is an app for people who like to play the trivia gameshow "Jeopardy" and who also like eyeballs. The user enters the game and can choose to play without logging in or can log in/create a user profile. Creating a user profile saves a score, and playing the game sends the user to the play-game screen and starts the game. The player chooses a value of question and a category, and an answer will appear with a slot to figure out the question corresponding to that answer by finishing the phrase 'What is....". The game is timed, and after 30 minutes will send the user to the 'Final Trial' sequence. At the end of the game, the score and wager and taken into account to give the user a final score. If logged in, that score will be added to their current user score and the game score will appear on their game history. The user can also create categories and questions (useful for teachers trying to help their class learn a subject). Post-MVP (along with some of the above listed features), I would love to make this game multi-player.

## technologies

- React and react router
- CSS and stylized React Components
- Bcrypt and jswebtoken
- Npm packages
- Axios
- Rails(v 2.6.2)
- Sequelize and postgres
- HTTParty
- react-countdown-now

## major problems & solutions
Timers for questions. Randomly assigning bonus questions. Potential for multiplayer or online playing with other online users. Using third party api though rails.

## MVP
The Trial app MVP contains the following:

- Styled front-end using CSS and Stylized Components
- Component-based(React) front-end with an efficient App hierarchy
- Timers to limit user playing time (per question and per game)
- "Double Jeopardy" bonus questions randomly throughout(\*)
- Ability to play multi-player or online games(\*)
- Ability to play as guest(\*)
- User Features:
  - Playing original Trivia-jeopardy game
  - Creating a user profile
  - Creating game with user-input questions and categories (\*)
    - created game will only render if enough questions are chosen with enough categories OR questions will repeat
  - Profile keeps running score for user
- An authorization system that allows a user to register and log in
  - oAuth\*
- Server with logical databases and relations between those databases
- User ability to create, update, read, and destroy information in databases
- Administrative Features\*: - See all information(? Is this safe ?)

\*all items marked with (\*) are POST-MVP items

## component library
List of react components:

- FinalTrial
- Footer
- Header
- NormalMode
- PersonalMode(user-based questions)
- ProfilePage
- RenderGame
  **API**
  API for quiz questions: http://jservice.io/

## databases and relations
See database photo in images.

Databases created on **rails** and hosted on heroku.
List of databases:

- Users (hasManyCategories hasManyQuestions hasManyGames)
- Categories (belongsToUser hasManyQuestions)
- Questions (belongsToUser belongsToCategories)
- Games (belongsToUser)

## _code snippet_

I had a difficult time trying to manipulate the tiles to change color and switch off the onclick event after the user had clicked on the question tile. My approach - I made my DisplayTile component have state and included an onClick event that not only contained the props function passed down from the parent, but also changed the style of the individual clue div.

```
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
```
