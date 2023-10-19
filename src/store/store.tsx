import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import filmsAPI from "../service/films.service";
import categorysAPI from "../service/cate.service";

import cinemasAPI from "../service/brand.service";
import showsAPI from "../service/show.service";
import foodAPI from "../service/food.sevice";
import movieRoomAPI from "../service/movieroom.service";
import selectedCinemaReducer from "../components/CinemaSlice/selectedCinemaSlice";
import { combineReducers } from "redux";
import timesAPI from "../service/time.service";
import bookTicketsAPI from "../service/book_ticket.service";
import cateDetailAPI from "../service/catedetail.service";

// Import redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["films", "cates", "cinemas", "shows", "selectedCinema", "foods", "movies","catedetails"],
};

const rootReducer = combineReducers({
  films: filmsAPI.reducer,
  cates: categorysAPI.reducer,
  cinemas: cinemasAPI.reducer,
  shows: showsAPI.reducer,
  times: timesAPI.reducer,
  bookTickets: bookTicketsAPI.reducer,
  foods: foodAPI.reducer,
  movies: movieRoomAPI.reducer,
  catedetails : cateDetailAPI.reducer,

  selectedCinema: selectedCinemaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["selectedCinema"],
      },
    }).concat(
      filmsAPI.middleware,
      categorysAPI.middleware,
      cinemasAPI.middleware,
      showsAPI.middleware,
      timesAPI.middleware,
      bookTicketsAPI.middleware,
      foodAPI.middleware,
      movieRoomAPI.middleware,
      cateDetailAPI.middleware,
    ),
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
