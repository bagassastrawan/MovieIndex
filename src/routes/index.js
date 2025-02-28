import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import MovieDetails from "../components/MovieDetails";

const router = createBrowserRouter({
    Path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: <Home />
        },
        {
            path: "explore",
            element: <explorePage />
        },
        {
            path: "movie/:id",
            element: <MovieDetails />
        }
    ]
})

export default router