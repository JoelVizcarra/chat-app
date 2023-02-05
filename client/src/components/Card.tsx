import React, { ReactNode } from "react";
import cx from "classnames";

type CardProps = {
  fullScreen: boolean;
  children: ReactNode;
};

const Card = ({ fullScreen, children }: CardProps) => {
  return (
    <div
      className={cx("flex justify-center items-center bg-gray-100", {
        "min-h-screen": fullScreen,
      })}
    >
      <div className={cx("max-w-md", { "w-full": fullScreen })}>{children}</div>
    </div>
  );
};

Card.Body = ({ children }: { children: ReactNode }) => {
  return <div className="shadow bg-white p-6 rounded-lg">{children}</div>;
};

Card.BelowCard = ({ children }: { children: ReactNode }) => {
  return <div className="mt-2 justify-center flex gap-3">{children}</div>;
};

export default Card;
