import { LandingPage } from "../pages/LandingPage";

export const AppRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <></>,
  },
];
export const PageNotFoundRoute = {
  path: "/404",
  component: <>PageNotFound</>,
};
