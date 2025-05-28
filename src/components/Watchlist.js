// src/components/Watchlist.js
import React, { useContext } from "react";
import { GlobalContext, reorderWatchlist } from "../context/GlobalState";
import { MovieCard3D } from "./MovieCard3D";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const Watchlist = () => {
  const { watchlist, dispatch } = useContext(GlobalContext);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    dispatch(reorderWatchlist(source.index, destination.index));
  };

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>
          <span className="count-pill">
            {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {watchlist.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="watchlist">
              {(provided) => (
                <div
                  className="movie-grid"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {watchlist.map((movie, index) => (
                    <Draggable
                      key={movie.id.toString()}
                      draggableId={movie.id.toString()}
                      index={index}
                    >
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                        >
                          <MovieCard3D movie={movie} type="watchlist" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};
