## PROPOSAL

**description and user story**

**technologies**

- React and react router
- CSS and stylized React Components
- Bcrypt and jswebtoken
- Npm packages
- Axios
- Rails(v 2.6.2)
- Sequelize and postgres
- HTTParty
- react-coundown-now

**major problems & solutions**
Timers for questions. Randomly assigning bonus questions. Potential for multiplayer or online playing with other online users. Using third party api though rails.

**MVP**
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

**component library**
List of react components:

- AskQuestion
- CategoryDetail
- Contact
- CreateBoard
- CreateCategory
- CreateQuestion
- DisplayGameHistory
- DisplayTiles
- FinalTrial
- GameFooter (on the bottom of all pages)
- GameHeader (currently unused)
- Loading (loading screen)
- LoginForm (user function: login form)
- LogoutForm (user function: logout form)
- Modal (designate modals)
- Portal (create a directory to attach modals)
- RenderGame (class component; starts and contains game logic)
- RestartGame (modal that ends game for user and offers to restart game)
- RightOrWrong (modal that responds to user saying if the user is right or wrong)
- TitlePage (functional component - shown on the main landing page)
- UserForm (functional component - used for registering and editing a user's information)
- UserProfilePage (class component - shows user information and allows user to create questions and categories)

**API**
API for quiz questions: http://jservice.io/

**databases and relations**
See database photo in images.
List of databases:

- Users (hasManyCategories hasManyQuestions hasManyGames)
- Categories (belongsToUser hasManyQuestions)
- Questions (belongsToUser belongsToCategories)
- Games (belongsToUser)

**_code snippet_**

**installation guide**
Using:
