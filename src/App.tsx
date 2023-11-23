import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import LayoutUser from "./Layout/LayoutUser/LayoutUser";
import HomePages from "./pages/Clients/Homepages/home";
import BookingSeat from "./pages/Clients/TICKET - SEAT LAYOUT/seat";
import Cinema from "./pages/Clients/Cinema/Cinema";
import Orther from "./pages/Clients/Orther/Orther";
import Movie_About from "./pages/Clients/MOVIE-ABOUT/Movie-About";
import Ticket from "./pages/Clients/TICKET/Ticket";
import Movies from "./pages/Clients/Movies/Movies";
import F_B from "./pages/Clients/F&B/F&B";
import Login from "./pages/Clients/Login/Login";
import LayoutAdmin from "./Layout/LayoutAdmin/LayoutAdmin";
import ListFilm from "./pages/Admin/ListFilm/ListFilm";
import { useEffect } from "react";
import ListCate from "./pages/Admin/Category/ListCategory";
import ListCinema from "./pages/Admin/Cinemas/ListCinema";
import ListShow from "./pages/Admin/Quản Lí suất chiếu/ListShow";
import ListBookTicket from "./pages/Admin/Book-Ticket/ListBookTicket";
import ListMovieRoom from "./pages/Admin/MovieRoom/ListMovieRoom";
import ListFood from "./pages/Admin/Food/ListFood";
import ListCateDetail from "./pages/Admin/CateDetail/ListCateDetail";
import ListVNP from "./pages/Clients/ListThanhToan/ListVNP";
import ListTime from "./pages/Admin/time/listTime";

import QrCode from "./components/QrCode/qr";
import { setSelectedCinema } from "./components/CinemaSlice/selectedCinemaSlice";
import { updateToken } from "./components/CinemaSlice/authSlice";
import { useDispatch } from "react-redux";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      children: [
        {
          path: "/",
          element: <HomePages />,
        },
        {
          path: "/book-ticket/:id",
          element: <BookingSeat />,
        },
        {
          path: "/movie_about/:id",
          element: <Movie_About />,
        },
        {
          path: "/ticket",
          element: <Ticket />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/F&B",
          element: <F_B />,
        },
        {
          path: "/cinema",
          element: <Cinema />,
        },
        {
          path: "/orther",
          element: <Orther />,
        },
        {
          path: "/listvnp",
          element: <ListVNP />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/admin/listfilm",
          element: <ListFilm />,
        },
        {
          path: "/admin/book_ticket",
          element: <ListBookTicket />,
        },
        {
          path: "/admin/listcate",
          element: <ListCate />,
        },
        {
          path: "/admin/time",
          element: <ListTime />,
        },
        {
          path: "/admin/cinema",
          element: <ListCinema />,
        },
        {
          path: "/admin/show",
          element: <ListShow />,
        },
        {
          path: "/admin/movieroom",
          element: <ListMovieRoom />,
        },
        {
          path: "/admin/food",
          element: <ListFood />,
        },
        {
          path: "/admin/category_detail",
          element: <ListCateDetail />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutDuration = 1000 * 15 * 60; // 10 seconds

    const timeoutCallback = async () => {
      try {
        // Dispatch the actions and wait for them to complete
        await Promise.all([
          dispatch(setSelectedCinema(null)),
          dispatch(updateToken(null)),
          localStorage.removeItem("authToken"),
        ]);

        // Once both actions are completed, navigate to the root path
        window.location.href = "/";
      } catch (error) {
        // Handle any potential errors
        console.error("Error during dispatch:", error);
      }
    };

    const timeoutId = setInterval(timeoutCallback, timeoutDuration);

    return () => {
      clearInterval(timeoutId);
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
