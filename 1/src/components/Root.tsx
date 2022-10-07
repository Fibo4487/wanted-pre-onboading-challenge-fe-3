import React from "react";
import { useRouter } from "../myRouter/hooks";

const Root = () => {
  const { push } = useRouter();

  const handleNavigateAbout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    push("/about");
  };

  return (
    <>
      <div>
        <div>Root</div>
        <button onClick={handleNavigateAbout}>About</button>
      </div>
    </>
  );
};

export default Root;
