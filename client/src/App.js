import React from "react";
import FriendCard from "./components/FriendCard";
import ColourCard from "./components/ColourCard";
import CoverCard from "./components/CoverCard";
import Wrapper from "./components/Wrapper";
import Board from "./components/Board";
import Chat from "./components/Chat";
import friends from "./friends.json";
import { Search, Results } from "./components/Search";
import API from "./utils/API";
import "./App.css";

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

class App extends React.Component {

  // state = {
  //   friends: friends
  // }
  state = {
    search: "",
    results: [],
    colourKey: [],
    cover: [],
    start: ""
  };

  componentDidMount() {
    this.searchGiphy("cartoon");
  }

  shuffleArray = (array, name) => {
    let randResults = array;
    for (var i = randResults.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randResults[i];
        randResults[i] = randResults[j];
        randResults[j] = temp;
    }

    this.setState({
      [name]: randResults
    });
  }

  removeFriend = (id) => {
    console.log("Here!");
    let newResults = this.state.results.filter(result => {
      if (result.id === id) {
        return false;
      }
      return true;
    });

    this.setState({
      results: newResults
    })
    console.log(this.state.results);
  }

  revealColour = (id) => {
    let newCover = this.state.cover;
    for (var x=0; x<newCover.length; x++) {
      if (this.state.results[x].id === id) {
        newCover[x] = this.state.colourKey[x];
      }
    }

    this.setState({
      cover: newCover
    })
  }

  searchGiphy = (query, offset) => {
    API.search(query, offset)
      .then(res => {
        var pics = this.shuffleArray(res.data.data, "results")
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    let pics = [];
    let key = [];
    this.setState({
      cover: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    })
    let offset = Math.floor(Math.random() * (98 + 1));
    offset = offset + "&rating=G";
    this.searchGiphy(this.state.search, offset);

    API.getColours()
    .then(res => {
      let index = Math.floor((Math.random() * 1) + 1);
      key = res.data[index].start;
      if (index === 0) {
        this.setState({
          start: "#CC0000"
        })
      } else if (index === 1) {
        this.setState({
          start: "#0000CC"
        })
      }
      this.shuffleArray(key, "colourKey");
      console.log(key, this.state.start);
    })
    .catch(err => console.log(err));
  };

  createBoard = () => {
    let board = [];
    for (let x = 0; x < this.state.results.length; x++) {
      board.push(
              <ColourCard colour={this.state.colourKey[x]}>
                <FriendCard
                  style={this.state.style}
                  image={this.state.results[x].images.fixed_width_still.url}
                  value={redStart[x]}
                  revealFunction={this.revealColour}
                  id={this.state.results[x].id}
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
      <div style={{backgroundColor: this.state.start}}>
        <Search
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
        />
        <Chat />
      </div>
    </Wrapper>
  }
}


export default App;
