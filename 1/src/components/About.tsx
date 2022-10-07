import React from "react";
import { useRouter } from "../myRouter/hooks";

const About = () => {
  const { push } = useRouter();

  const handleNavigateRoot = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    push("/");
  };

  return (
    <>
      <div>
        <div>About</div>
        <button onClick={handleNavigateRoot}>Root</button>
      </div>
    </>
  );
};

export default About;
