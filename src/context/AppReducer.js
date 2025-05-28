// src/context/AppReducer.js

export default function AppReducer(state, action) {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };

    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    case "REORDER_WATCHLIST": {
      const { startIndex, endIndex } = action.payload;
      const newWatchlist = Array.from(state.watchlist);
      const [moved] = newWatchlist.splice(startIndex, 1);
      newWatchlist.splice(endIndex, 0, moved);
      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
      return {
        ...state,
        watchlist: newWatchlist,
      };
    }

    case "ADD_MOVIE_TO_WATCHED": {
      const movieToAdd = action.payload;
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== movieToAdd.id
        ),
        watched: [movieToAdd, ...state.watched],
      };
    }

    case "MOVE_TO_WATCHLIST": {
      const movieToMove = action.payload;
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== movieToMove.id),
        watchlist: [movieToMove, ...state.watchlist],
      };
    }

    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };

    default:
      return state;
  }
}
