import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Card from "../../components/Card";
import Link from "../../components/Link";

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Card fullScreen>
      <Card.Body>
        <Outlet />
      </Card.Body>
      <Card.BelowCard>
        <Link to={isLoginPage ? "/signup" : "/login"}>
          {isLoginPage ? "Create account" : "Login"}
        </Link>
      </Card.BelowCard>
    </Card>
  );
};

export default AuthLayout;
