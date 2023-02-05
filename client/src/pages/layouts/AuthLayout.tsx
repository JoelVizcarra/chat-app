import React from "react";
import { Outlet } from "react-router-dom";

import Card from "../../components/Card";

const AuthLayout = () => {
  return (
    <Card fullScreen>
      <Card.Body>
        <Outlet />
      </Card.Body>
      <Card.BelowCard>
        <p>holi</p>
      </Card.BelowCard>
    </Card>
  );
};

export default AuthLayout;
