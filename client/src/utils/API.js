import axios from "axios";

const BASEURL = "https://api.giphy.com/v1/gifs/search?q=";
const APIKEY = "&api_key=dc6zaTOxFJmzC&limit=16&offset=";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function(query, offset) {
    return axios.get(BASEURL + query + APIKEY + offset);
  },
  // Gets all boards
  getBoards: function() {
    return axios.get("/api/boards");
  },
  // Gets the board with the given id
  getBoard: function(id) {
    return axios.get("/api/boards/" + id);
  },
  // Updates the board with the given id
  updateBoard: function(id, updateData) {
    return axios.put("/api/boards/" + id, updateData);
  },
  // Deletes the board with the given id
  deleteBoard: function(id) {
    return axios.delete("/api/boards/" + id);
  },
  // Saves a board to the database
  saveBoard: function(boardData) {
    return axios.post("/api/boards", boardData);
  },
  // Gets all boards
  getColours: function() {
    return axios.get("/api/colours");
  }
};
