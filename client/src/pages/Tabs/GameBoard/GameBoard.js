import React, { Component } from "react";
import FriendCard from "../../../components/FriendCard";
import CoverCard from "../../../components/CoverCard";
import Wrapper from "../../../components/Wrapper";
import Board from "../../../components/Board";
import Chat from "../../../components/Chat";
import Drawer from "../../../components/Instructions";
import { Col, Row, Container } from "../../../components/Grid";
import { socketConnect } from 'socket.io-react';
import { Search } from "../../../components/Search";
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import API from "../../../utils/API";

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      picResults: [],
      colourKey: [],
      cover: [],
      turn: "",
      size: "",
      animate: false,
      team: ""
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
  }

  componentDidMount() {
    console.log(this.props, "Did mount");
    this.loadBoard(this.props.id);
    let { socket } = this.props;

    socket.on('revealed', data=>{
      let newCover = this.state.cover;
      console.log(this.state.cover);
      for (var x=0; x<newCover.length; x++) {
        if (this.state.picResults[x].id === data.id) {
          newCover[x] = this.state.colourKey[x];
          if (this.state.colourKey[x] !== this.state.team) {
            this.endTurn();
          }
        }
      }
      console.log("Click Click Click", newCover)
      this.setState({
        cover: newCover
      })

      API.updateBoard(this.props.id, {cover: this.state.cover})
            .catch(err => console.log(err));
    })

    socket.on('newGame', data=>{
      API.getBoard(data.id)
      .then(res => {
        console.log(res, "Board is here");
        this.setState({ picResults: res.data.layout, colourKey: res.data.colourScheme, cover: res.data.cover, turn: res.data.turn, size: res.data.size })
      })
      .catch(err => console.log(err));
    })

    socket.on('nextTurn', data=>{
      this.setState({ turn: data});
      console.log("Next Turn?");
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

  updateCheck() {
    console.log(this.state.animate, "Animated state");
    this.setState((oldState) => {
      return {
        animate: !oldState.animate,
      };
    });
  }

  loadBoard = (id) => {
    API.getBoard(id)
      .then(res => {
        console.log(res, "Board is here");
        this.setState({ picResults: res.data.layout, colourKey: res.data.colourScheme, cover: res.data.cover, turn: res.data.turn, size: res.data.size })
      })
      .catch(err => console.log(err));
  };

  revealColour = (id) => {
    if (this.state.team === this.state.turn) {
      this.props.socket.emit('reveal', id);
    }
  }

  // handleInputChange = event => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  endTurn = () => {
    let nextTeam;
    if (this.state.turn === "#CC0000") {
      nextTeam = "#0000CC";
      API.updateBoard(this.props.id, {turn: nextTeam})
            .then(res => {
              console.log(res, "Update turn");
              this.props.socket.emit('newTurn', nextTeam);
            })
            .catch(err => console.log(err));
      console.log(nextTeam, "Is the end turn happening?");
    } else if (this.state.turn === "#0000CC") {
      nextTeam = "#CC0000";
      API.updateBoard(this.props.id, {turn: nextTeam})
            .then(res => {
              console.log(res, "Update turn");
              this.props.socket.emit('newTurn', nextTeam);
            })
            .catch(err => console.log(err));
      console.log(nextTeam, "Is the end turn happening?");
    }

  }

  saveTeam = event => {
    this.setState({ team: event });
  }

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
    let offset = Math.floor(Math.random() * (98 + 1));
    offset = offset + "&rating=G";
    let limit = submission.difficulty + "&offset="
    //this.searchGiphy(this.state.search, offset);

    API.search(submission.search, offset, limit)
      .then(picData => {
        pics = this.shuffleArray(picData.data.data, "picResults")
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
          if (index === 0 || index === 2) {
            this.setState({
              turn: "#CC0000"
            })
          } else if (index === 1 || index === 3) {
            this.setState({
              turn: "#0000CC"
            })
          }
          key = this.shuffleArray(key, "colourKey");
          console.log(pics, key, this.state.turn);
          API.updateBoard(this.props.id, {
            layout: pics,
            colourScheme: key,
            cover: this.state.cover,
            turn: this.state.turn,
            size: width
          })
            .then(res => this.props.socket.emit('update', this.props.id))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }; //End of FormSubmit

  createBoard = () => {
    let board = [];
    if (this.state.animate) {
      for (let x = 0; x < this.state.picResults.length; x++) {
        board.push(
          <FriendCard
            style={this.state.style}
            image={this.state.picResults[x].images.fixed_width.url}
            revealFunction={this.revealColour}
            id={this.state.picResults[x].id}
            key={this.state.picResults[x].id}
          >
            <CoverCard 
              colour={this.state.cover[x]}
              key={this.state.picResults[x].id} 
            />
          </FriendCard>
        )
      }
    } else {
      for (let x = 0; x < this.state.picResults.length; x++) {
        board.push(
          <FriendCard
            style={this.state.style}
            image={this.state.picResults[x].images.fixed_width_still.url}
            revealFunction={this.revealColour}
            id={this.state.picResults[x].id}
            key={this.state.picResults[x].id}
          >
            <CoverCard 
              colour={this.state.cover[x]}
              key={this.state.picResults[x].id} 
            />
          </FriendCard>
        )
      }
    }
    return board;
  }

  render() {
    console.log(this.state.turn, "Turn");
    return <Wrapper colour={this.state.turn}>
      <Col size="md-8">
        <Board style={this.state.size}>
          {
            this.createBoard()
          }
        </Board>
      </Col>
      <Col size="md-4">
        <Row>
          <Col size="sm-4">
            <Checkbox
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              onCheck={this.updateCheck.bind(this)}
              label="Animate Gifs"
              style={{marginBottom: 16}}
            />
          </Col>
          <Col size="sm-4">
            <button onClick={e=>this.endTurn(e)} >
            End Turn
            </button>
          </Col>
          <Col size="sm-4">
            <Drawer />
          </Col>
        </Row>
          <Chat saveTeam={this.saveTeam}/>
        
          <Search
              colour={this.state.turn}
              search={this.state.search}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
          />

      </Col>
    </Wrapper>
  }
}


export default socketConnect(GameBoard);
