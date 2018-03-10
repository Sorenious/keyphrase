import React, { Component } from "react";
import FriendCard from "../../../components/FriendCard";
import ColourCard from "../../../components/ColourCard";
import CoverCard from "../../../components/CoverCard";
import Wrapper from "../../../components/Wrapper";
import Board from "../../../components/Board";
import Chat from "../../../components/Chat";
import Drawer from "../../../components/Instructions";
import { Col, Row, Container } from "../../../components/Grid";
import { socketConnect } from 'socket.io-react';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import API from "../../../utils/API";

class ClueGiver extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      picResults: [],
      colourKey: [],
      cover: [],
      turn: "",
      size: "",
      animate: false
    };
  }

  componentDidMount() {
    this.loadBoard(this.props.id);
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

    socket.on('newGame', data=>{
      API.getBoard(data.id)
      .then(res => {
        console.log(res, "Board is here");
        this.setState({ picResults: res.data.layout, colourKey: res.data.colourScheme, cover: res.data.cover, turn: res.data.turn, size: res.data.size })
      })
      .catch(err => console.log(err));
    })

    socket.on('nextTurn', data=>{
      this.setState({ turn: data})
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
    // let newCover = this.state.cover;
    // for (var x=0; x<newCover.length; x++) {
    //   if (this.state.picResults[x].id === id) {
    //     newCover[x] = this.state.colourKey[x];
    //   }
    // }

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

  createBoard = () => {
    let board = [];if (this.state.animate) {
      for (let x = 0; x < this.state.picResults.length; x++) {
        board.push(
          <ColourCard
            colour={this.state.colourKey[x]}
            key={this.state.picResults[x].id}
          >
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
          </ColourCard>
        )
      }
    } else {
      for (let x = 0; x < this.state.picResults.length; x++) {
        board.push(
          <ColourCard
            colour={this.state.colourKey[x]}
            key={this.state.picResults[x].id}
          >
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
          </ColourCard>
        )
      }
    }
    return board;
  }

  render() {
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
            
          </Col>
          <Col size="sm-4">
            <Drawer />
          </Col>
        </Row>
          <Chat />
        
      </Col>
    </Wrapper>
  }
}


export default socketConnect(ClueGiver);
