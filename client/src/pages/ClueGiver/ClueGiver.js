import React, { Component } from "react";
import FriendCard from "../../components/FriendCard";
import ColourCard from "../../components/ColourCard";
import CoverCard from "../../components/CoverCard";
import Wrapper from "../../components/Wrapper";
import Board from "../../components/Board";
import Chat from "../../components/Chat";
import { socketConnect } from 'socket.io-react';
import API from "../../utils/API";

let redStart = [ 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B"
    ]

// let cover = [ 
//         "", 
//         "", 
//         "#CC0000", 
//         "", 
//         "", 
//         "", 
//         "#", 
//         "#0000CC", 
//         "#", 
//         "#", 
//         "#", 
//         "#", 
//         "#", 
//         "#", 
//         "#ECE15B", 
//         "#"
//     ]

class ClueGiver extends Component {
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
    this.loadBoards();
    let { socket } = this.props;

    socket.on('revealed', data=>{
      let newCover = this.state.cover;
      console.log(this.state.cover);
      for (var x=0; x<newCover.length; x++) {
        if (this.state.picResults[x].id === data.id) {
          newCover[x] = this.state.colourKey[x];
        }
      }
      console.log("Click Click Click", newCover)
      this.setState({
        cover: newCover
      })
    })
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

  loadBoards = () => {
    API.getBoards()
      .then(res => {
        console.log(res, "Board is here");
        this.setState({ picResults: res.data[res.data.length-1].layout, colourKey: res.data[res.data.length-1].colourScheme })
      })
      .catch(err => console.log(err));
  };

  revealColour = (id) => {
    let newCover = this.state.cover;
    for (var x=0; x<newCover.length; x++) {
      if (this.state.picResults[x].id === id) {
        newCover[x] = this.state.colourKey[x];
      }
    }

    this.setState({
      cover: newCover
    })
  }

  // searchGiphy = (query, offset) => {
  //   API.search(query, offset)
  //     .then(res => {
  //       var pics = this.shuffleArray(res.data.data, "picResults")
  //     })
  //     .catch(err => console.log(err));
  // };

  createBoard = () => {
    let board = [];
    for (let x = 0; x < this.state.picResults.length; x++) {
      board.push(
              <ColourCard colour={this.state.colourKey[x]}>
                <FriendCard
                  style={this.state.style}
                  image={this.state.picResults[x].images.fixed_width_still.url}
                  value={redStart[x]}
                  revealFunction={this.revealColour}
                  id={this.state.picResults[x].id}
                >
                  <CoverCard colour={this.state.cover[x]} />
                </FriendCard>
              </ColourCard>)
          }
    return board;
  }

  render() {
    return <Wrapper>
      <h1 className="title">Keyphrase</h1>
      <Board>
        {
          this.createBoard()
        }
      </Board>
      <div id="other">
        <Chat />
      </div>
    </Wrapper>
  }
}


export default socketConnect(ClueGiver);
