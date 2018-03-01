import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import Chat from "../../components/Chat";
import { socketConnect } from 'socket.io-react';
import { Search } from "../../components/Search";
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

  loadBoards = () => {
    API.getBoards()
      .then(res => {
        console.log(res, "Board is here");
        this.setState({ picResults: res.data[res.data.length-1].layout, colourKey: res.data[res.data.length-1].colourScheme })
      })
      .catch(err => console.log(err));
  };

  revealColour = (id) => {
    this.props.socket.emit('reveal', id)
    // let newCover = this.state.cover;
    // console.log(this.state.cover);
    // for (var x=0; x<newCover.length; x++) {
    //   if (this.state.picResults[x].id === id) {
    //     newCover[x] = this.state.colourKey[x];
    //   }
    // }
    // console.log("Click Click Click", newCover)
    // this.setState({
    //   cover: newCover
    // })
  }

  // searchGiphy = (query, offset) => {
  //   API.search(query, offset)
  //     .then(res => {
  //       var pics = this.shuffleArray(res.data.data, "picResults")
  //     })
  //     .catch(err => console.log(err));
  // };

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
      <div id="other">
        <Search
            colour={this.state.start}
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
        />
        <Chat />
      </div>
    </Wrapper>
  }
}


export default socketConnect(Introduction);
