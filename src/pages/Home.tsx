import "../App.scss";
import React from "react";
import useUser from "@/hooks/useUser";
import Button from "@/components/Button";

const Home: React.FC = () => {
  const {logout} = useUser();

  return (
    <div className="container">
      <h1 className="title">Home</h1>
      <Button onClick={logout}>Clean cookies</Button>
    </div>
  );
};

export default Home;
