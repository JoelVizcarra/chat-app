import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import cx from "classnames";

const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <RouterLink
      {...rest}
      className={cx("text-blue-400 underline underline-offset-2", className)}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
