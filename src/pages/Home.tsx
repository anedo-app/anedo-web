import "../App.scss";
import React from "react";
import Button from "@/components/Button";
import {useCookies} from "react-cookie";

const Home: React.FC = () => {
  const [_, _s, removeCookie] = useCookies(["user"]);

  return (
    <div className="container">
      <h1 className="title">Home</h1>
      <Button onClick={() => removeCookie("user")}>Clean cookies</Button>
    </div>
  );
};

export default Home;
