import React from 'react';
import Drawer from 'material-ui/Drawer';
import "./Instructions.css";

export default class InstructionDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => {
  	this.setState({open: !this.state.open});
  	console.log(this.props, "Instruction props");
  	
  }

  render() {
    return (
      <div className="deshadow">
        <button
          label="Instructions"
          onClick={this.handleToggle}
        >
        Instructions
        </button>
        <Drawer open={this.state.open}>
          <div>
          {
            this.props.page
            ?
            <div>
              <h4>Pre-game Setup</h4>
              <p>
                Enter a name and login to open the chat you will use to discuss teams, clues, and moves. Players split up into two teams of similar size and skill. You need at least four players (two teams of two) for a standard game.
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
            </div>
            :
            <div>
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
            </div>
          }
          </div>
        </Drawer>
      </div>
    );
  }
}