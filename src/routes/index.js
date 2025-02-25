import { createBrowserRouter } from "react-router-dom";
import App from "../App"

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
            element: <DetailsPage />
        }
    ]
})

export default router