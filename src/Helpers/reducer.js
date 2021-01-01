export const initialState = {
  user: null,
  // token: "BQAJiOYRAlW49XGDeRxD8VXh1_BMqSGghyPMD7NhthuVrwjZWJstFoMSt4RDqGR7tOpYhfNMSuRbIYUx5jirgS0wNMJDnMqigAqoxjcFk-3ekUhcejFnJiL3mJ-tsNkkV-srj9flA-uSjUJXd0VIfa-QtfcSHQ",
  token: null,
  playlists: [],
  artists: [],
  tracks: [],
  playing: false,
  item: null,
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_ARTISTS":
      return {
        ...state,
        artists: action.artists,
      };
    case "SET_TRACKS":
      return {
        ...state,
        tracks: action.tracks,
      };
    default:
      return state;
  }
};

export default reducer;
