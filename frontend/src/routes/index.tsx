/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { AppRoutes } from "./public";
// import { useAuth0 } from "@auth0/auth0-react";
import { Layout } from "../components/Layout";

const RouterComponent: FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoute />}>
          {AppRoutes.map(({ path, element }, index) => (
            <Route path={path} element={element} key={path + index} />
          ))}
        </Route>
        {/* <Route path="/404" element={<PageNotFound />} /> */}
      </Routes>
    </Router>
  );
};

const AuthRoute = () => {
  // const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RouterComponent;
