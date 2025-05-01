import React from "react";
import { Button } from "../button";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        SignOut
      </Button>
    </div>
  );
};

export default LogOut;
