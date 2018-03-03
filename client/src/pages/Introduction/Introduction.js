import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Search } from "../../components/Search";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";

class Introduction extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      picResults: [],
      colourKey: [],
      cover: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      start: "#AAAAAA"
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

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, setup the game board using the search criteria
  handleFormSubmit = event => {
    event.preventDefault();
    let pics = [];
    let key = [];
    this.setState({
      cover: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    })
    let offset = Math.floor(Math.random() * (98 + 1));
    offset = offset + "&rating=G";
    //this.searchGiphy(this.state.search, offset);

    API.search(this.state.search, offset)
      .then(picData => {
        pics = this.shuffleArray(picData.data.data, "picResults")
        API.getColours()
        .then(colourData => {
          let index = Math.floor((Math.random() * 2));
          key = colourData.data[index].start;
          if (index === 0) {
            this.setState({
              start: "#CC0000"
            })
          } else if (index === 1) {
            this.setState({
              start: "#0000CC"
            })
          }
          key = this.shuffleArray(key, "colourKey");
          console.log(pics, key, this.state.start);
          API.saveBoard({
            layout: pics,
            colourScheme: key,
            cover: this.state.cover,
            start: this.state.start
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
    return <Wrapper>
      <h1 className="title">Keyphrase</h1>
        <Col size="md-6">
          <h2>Game Play</h2>
          <p>
            Spymasters take turns giving one-word clues. The word relates to one or more pictures on the table. The field operatives try to guess which pictures their spymaster meant. When a field operative touches a picture, the spymaster reveals who is in that location. If it is one of their team's agents, the operatives may keep guessing locations related to that one-word clue. Otherwise, it is the other team's turn. The first team to contact all their agents wins the game.
          </p>
          <h4>TAKING TURNS</h4>
          <p>
            <b>Teams take turns</b>, beginning with the starting team. (The starting team is indicated by the lights on the sides of the key card.) On your team's turn, the spymaster gives <b>one clue</b>, and the field operatives may make <b>multiple guesses</b>.
          </p>
          <h4>GIVING THE CLUE</h4>
          <p>
            If you are the spymaster, your job is to think up a clue that relates to some of the pictures your team is trying to guess. Your clue consists of <b>one word</b> that relates to those pictures <b>and one number</b> that tells how many of your pictures relate to that word.<br />
            Example: A good clue for these two pictures might be evolution: 2.<br />
            You are allowed to give a clue for only one picture (kangaroo: 1) but it's fun to try for two or more. Getting four pictures with one clue is a big accomplishment.
          </p>
          <h4>MAKING CONTACT</h4>
          <p>
            When the spymaster gives a clue, his or her field operatives try to figure out what it means. They can debate it amongst themselves, but the spymaster must keep a straight face. The operatives indicate their official guess when one of them touches one of the pictures on the table.
            The spymaster reveals who is in that location by placing a card over the picture:
            <ul>
              <li>
                If the field operative touches <b>a picture belonging to his or her team</b>, the spymaster covers the picture with an agent card in that color. <b>The operatives may continue making guesses (but they do not get another clue).</b>
              </li>
              <li>
                If the field operative touches a location with <b>an innocent bystander</b>, the spymaster covers it with an innocent bystander card. <b>This ends the turn.</b>
              </li>
              <li>
                If the field operative touches <b>a picture belonging to the other team</b>, the picture is covered by one of the other team's agent cards. <b>This ends the turn.</b> (And it helps the other team.)
              </li>
              <li>
                If the field operative touches the location with <b>the assassin</b>, the picture is covered by the assassin card. <b>This ends the game!</b> The team that contacted the assassin loses. (See alternate ASSASSIN ENDING)
              </li>
            </ul>
          </p>
          <h5>Ending the Turn</h5>
          <p>
            Your team's turn always has <b>exactly one clue</b> and <b>one or more guesses</b>. If the operatives' first guess is one of their team's pictures, they may make a second guess. If that's correct, they may make another guess, and so on.
            The turn ends
            <ul>
              <li>if they guess a picture that's not theirs,</li>
              <li>if they choose to not guess anymore,</li>
              <li>or if they have already made as many guesses as the number specified by the clue <b>plus one more</b>.</li>
            </ul>
            For example, if your spymaster says <i>evolution: 2</i>, you can make as many as 3 correct guesses. This doesn't make much sense on your first turn, but later in the game it can be very useful. For example, you might have received several clues for which you did not get all the pictures. You can guess these pictures instead of or in addition to those related to the current clue. The "one more guess" rule gives you a chance to catch up. An example is on the next page.
            </p>
            <h4>ENDING THE GAME</h4>
            <p>
              <b>The game ends when one team has all their pictures covered. That team wins.</b><br />
              It is possible to win on the other team's turn if they guess your last picture.<br />
              The game can end early if a field operative touches the location with the assassin. That operative's team loses.
            </p>
            <h5>Setup for the Next Game</h5>
            <p>
              Do other people want a chance to be spymasters? Setup for the second game is easy. Remove the cards covering the pictures and put them back in their stacks. Flip over the 20 picture cards, draw a new key card, and you're ready to go!
            </p>

      </Col>
      <Col size="md-6">
        <h2>Keeping A Straight Face</h2>
        <p>
          Spymasters are expected to give away no more information than one word and one number. Do not preface your clue with additional comments. "I don't know if you'll get this" is a fact that should go without saying. And "I don't know if you'll get this unless you've read The Hobbit" reveals way too much. Spymasters should not appear to be staring at one part of the board, and they must never touch the pictures once they have seen the key card.<br />
          Keep a straight face when your field operatives are guessing. Do not reach for an agent card when your operatives begin discussing a picture. Wait until they actually touch it. When a teammate chooses a picture of the correct color, you must act as though that was the picture you meant even if it wasn't.<br />
          If you are a field operative, you should focus on the table when you are making your guesses. Do not make eye contact with the spymaster. This will help you avoid nonverbal cues.<br />
          When your information is strictly limited to what can be conveyed with one word and one number, then your victory will be even sweeter because you will win with honor.
        </p>
        <h2>Valid Clues</h2>
        <p>
          Your clue should be <b>one word, no hyphens, no spaces</b>. If you don't know whether your clue is one word or not, ask the opposing spymaster. <b>If the opposing spymaster allows it, the clue is valid.</b><br />
          <b>Your clue must be about the pictures</b>, not about the patterns that cards make on the table or the letters in certain words or the shades of the pictures. <i>Close: 3</i> is not a valid clue for the three cards closest to your operatives. <i>S: 3</i> is not a valid clue for pictures of things that start with S. <i>Dark: 2</i> is not a valid clue for the two darkest pictures. However, it is a valid clue for pictures of things associated with night, darkness, or evil.<br />
          <b>Your group may agree to relax the one-word restriction</b>. Maybe you would like to allow multiple-word proper names (<i>James Bond</i>, <i>North Dakota</i>) or abbreviations (<i>FBI</i>, <i>FIFA</i>) or even common compound words (<i>merry-goround</i>, <i>scuba diver</i>).
        </p>
      </Col>

      <div id="other">
        <Search
            colour={this.state.start}
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
        />
      </div>
    </Wrapper>
  }
}


export default Introduction;
