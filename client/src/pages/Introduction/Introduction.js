import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Search } from "../../components/Search";
import { Col, Row } from "../../components/Grid";
import API from "../../utils/API";

class Introduction extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      picResults: [],
      colourKey: [],
      cover: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      turn: "",
      size: "",
      redCount: 0,
      blueCount: 0
    };
  }

  componentDidMount() {

  }

  shuffleArray = (array, name) => {
    let randResults = array;
    for (var i = randResults.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randResults[i];
        randResults[i] = randResults[j];
        randResults[j] = temp;
    }
    return randResults;
    // this.setState({
    //   [name]: randResults
    // });
  }

  createRandBoard = (array, difficulty) => {
    let newBoard = [];
    let diff = parseInt(difficulty)
    console.log(array);
    if (array.length) {
      for (var i = 0; i < diff; i++) {
        let bool = true;
        do {
          var j = Math.floor(Math.random() * 500);
          if (newBoard.indexOf(array[j]) === -1) {
            newBoard.push(array[j]);
            bool = false;
            console.log(array[j], bool);
          } else if (array[j] === undefined) {
            bool = false;
          }
        } while (bool)
      }
    }
    if (newBoard.length === diff) {
      return newBoard;
    }
  }

  // handleInputChange = event => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, setup the game board using the search criteria
  handleFormSubmit = (event, submission) => {
    event.preventDefault();
    console.log(submission, "form submit");
    let pics = [];
    let key = [];
    let overlay = []; // cover array

    for (var i = 0; i < parseInt(submission.difficulty); i++) {
      overlay.push("");
    }
    this.setState({
      cover: overlay
    })
    // let offset = Math.floor(Math.random() * (98 + 1));
    // offset = offset + "&rating=G";
    // let limit = submission.difficulty + "&offset="
    //this.searchGiphy(this.state.search, offset);

    API.search(submission.search)
      .then(picData => {
        pics = this.createRandBoard(picData.data.data, submission.difficulty)
        API.getColours()
        .then(colourData => {
          let index;
          let width;
          if (submission.difficulty === "16") {
            width = "80%";
            index = Math.floor((Math.random() * 2));
          } else if (submission.difficulty === "25") {
            width = "100%";
            index = Math.floor((Math.random() * 2) + 2);
          }
          key = colourData.data[index].start;
          if (index === 0) {
            this.setState({
              turn: "#CC0000", redCount: 6, blueCount: 5
            })
          } else if (index === 1) {
            this.setState({
              turn: "#0000CC", blueCount: 6, redCount: 5
            })
          } else if (index === 2) {
            this.setState({
              turn: "#CC0000", redCount: 9, blueCount: 8
            })
          } else if (index === 3) {
            this.setState({
              turn: "#0000CC", blueCount: 9, redCount: 8
            })
          }
          key = this.shuffleArray(key, "colourKey");
          console.log(pics, key, this.state.turn);
          API.saveBoard({
            layout: pics,
            colourScheme: key,
            cover: this.state.cover,
            turn: this.state.turn,
            size: width,
            red: this.state.redCount,
            blue: this.state.blueCount,
            over: false
          })
            .then(res => {
              console.log(res.data._id, "Board created")
              window.location.href = "/board/" + res.data._id;
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }; //End of FormSubmit

  render() {
    return <Wrapper className="deshadow">
      <h1 className="title">Keyphrase</h1>
        <Col size="md-6">
          <h2>Game Setup</h2>
          <p>
            Setup is done for you. All you have to do is enter a theme into the search bar below and choose which difficulty you would like to play with. (When choosing a theme, you may want to go more general so you get a more diverse set of pictures. Example: Having 16 "Marios" on the board could make it difficult to come up with a clue that only relates to a few of them.)
          </p>
          <p>
            You'll be given a board the size you indicated full of Gifs relating to the theme you chose. If the board is not to your liking or you finish your game and want a new one, you can create a new board using the same form at the bottom of the Game Board screen.
          </p>
          <p>
            Once you have a board set up, you can copy and send the url to your friends so they may join your game. Enter a name and login to open the chat you will use to discuss teams, clues, and moves. Players split up into two teams of similar size and skill. You need at least four players (two teams of two) for a standard game. (There are alternate rules for less players)
          </p>
          <p>
            Each team chooses a keymaster. The chosen keymaster will select their role. Once selected their name will be marked with a "K" and their board will include the colour key.
          </p>
          <h2>Game Play</h2>
          <p>
            Keymasters take turns giving one-word clues. The word relates to one or more pictures on the table. The field operatives try to guess which pictures their keymaster meant. When a field operative touches a picture, the keymaster reveals who is in that location. If it is one of their team's agents, the operatives may keep guessing locations related to that one-word clue. Otherwise, it is the other team's turn. The first team to contact all their agents wins the game.
          </p>
          <h4>TAKING TURNS</h4>
          <p>
            <b>Teams take turns</b>, beginning with the starting team. (The starting team is indicated by the background colour of the game page.) On your team's turn, the keymaster gives <b>one clue</b>, and the field operatives may make <b>multiple guesses</b>.
          </p>
          <h4>GIVING THE CLUE</h4>
          <p>
            If you are the keymaster, your job is to think up a clue that relates to some of the pictures your team is trying to guess. Your clue consists of <b>one word</b> that relates to those pictures <b>and one number</b> that tells how many of your pictures relate to that word.<br />
            Example: A good clue for these two pictures might be evolution: 2.<br />
            You are allowed to give a clue for only one picture (kangaroo: 1) but it's fun to try for two or more. Getting four pictures with one clue is a big accomplishment.
          </p>
          <h4>MAKING CONTACT</h4>
          <p>
            When the keymaster gives a clue, his or her field operatives try to figure out what it means. They can debate it amongst themselves, but the keymaster must keep a straight face. The operatives indicate their official guess when one of them touches one of the pictures on the table.
            The keymaster reveals who is in that location by placing a card over the picture:
            <ul>
              <li>
                If the field operative touches <b>a picture belonging to his or her team</b>, the keymaster covers the picture with an agent card in that color. <b>The operatives may continue making guesses (but they do not get another clue).</b>
              </li>
              <li>
                If the field operative touches a location with <b>an innocent bystander</b>, the keymaster covers it with an innocent bystander card. <b>This ends the turn.</b>
              </li>
              <li>
                If the field operative touches <b>a picture belonging to the other team</b>, the picture is covered by one of the other team's agent cards. <b>This ends the turn.</b> (And it helps the other team.)
              </li>
              <li>
                If the field operative touches the location with <b>the assassin</b>, the picture is covered by the assassin card. <b>This ends the game!</b> The team that contacted the assassin loses. (See alternate ASSASSIN ENDING)
              </li>
            </ul>
          </p>
      </Col>
      <Col size="md-6">
          <h5>Ending the Turn</h5>
          <p>
            Your team's turn always has <b>exactly one clue</b> and <b>one or more guesses</b>. If the operatives' first guess is one of their team's pictures, they may make a second guess. If that's correct, they may make another guess, and so on.
            The turn ends
            <ul>
              <li>if they guess a picture that's not theirs,</li>
              <li>if they choose to not guess anymore,</li>
              <li>or if they have already made as many guesses as the number specified by the clue <b>plus one more</b>.</li>
            </ul>
            For example, if your keymaster says <i>evolution: 2</i>, you can make as many as 3 correct guesses. This doesn't make much sense on your first turn, but later in the game it can be very useful. For example, you might have received several clues for which you did not get all the pictures. You can guess these pictures instead of or in addition to those related to the current clue. The "one more guess" rule gives you a chance to catch up. An example is on the next page.
            </p>
            <h4>ENDING THE GAME</h4>
            <p>
              <b>The game ends when one team has all their pictures covered. That team wins.</b><br />
              It is possible to win on the other team's turn if they guess your last picture.<br />
              The game can end early if a field operative touches the location with the assassin. That operative's team loses.
            </p>
            <h5>Setup for the Next Game</h5>
            <p>
              Do other people want a chance to be keymasters? Setup for the second game is easy. Remove the cards covering the pictures and put them back in their stacks. Flip over the 20 picture cards, draw a new key card, and you're ready to go!
            </p>

        <h2>Keeping A Straight Face</h2>
        <p>
          Keymasters are expected to give away no more information than one word and one number. Do not preface your clue with additional comments. "I don't know if you'll get this" is a fact that should go without saying. And "I don't know if you'll get this unless you've read The Hobbit" reveals way too much. Keymasters should not appear to be staring at one part of the board, and they must never touch the pictures once they have seen the key card.<br />
          Keep a straight face when your field operatives are guessing. Do not reach for an agent card when your operatives begin discussing a picture. Wait until they actually touch it. When a teammate chooses a picture of the correct color, you must act as though that was the picture you meant even if it wasn't.<br />
          If you are a field operative, you should focus on the table when you are making your guesses. Do not make eye contact with the keymaster. This will help you avoid nonverbal cues.<br />
          When your information is strictly limited to what can be conveyed with one word and one number, then your victory will be even sweeter because you will win with honor.
        </p>
        <h2>Valid Clues</h2>
        <p>
          Your clue should be <b>one word, no hyphens, no spaces</b>. If you don't know whether your clue is one word or not, ask the opposing keymaster. <b>If the opposing keymaster allows it, the clue is valid.</b><br />
          <b>Your clue must be about the pictures</b>, not about the patterns that cards make on the table or the letters in certain words or the shades of the pictures. <i>Close: 3</i> is not a valid clue for the three cards closest to your operatives. <i>S: 3</i> is not a valid clue for pictures of things that start with S. <i>Dark: 2</i> is not a valid clue for the two darkest pictures. However, it is a valid clue for pictures of things associated with night, darkness, or evil.<br />
          <b>Your group may agree to relax the one-word restriction</b>. Maybe you would like to allow multiple-word proper names (<i>James Bond</i>, <i>North Dakota</i>) or abbreviations (<i>FBI</i>, <i>FIFA</i>) or even common compound words (<i>merry-goround</i>, <i>scuba diver</i>).
        </p>
      </Col>

      <div id="other">
        <Search
            colour={this.state.turn}
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
        />
      </div>
    </Wrapper>
  }
}


export default Introduction;
