import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Landing } from "../pages/landing";

const Routes = () => {

    const routesForPublic = [
        {
            // Landing Page (Home Page)
            path: "/",
            element: <Landing />,
        },
        {
            // Placeholder for page not found
            path: "*",
            element: <Landing />,
        }
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;