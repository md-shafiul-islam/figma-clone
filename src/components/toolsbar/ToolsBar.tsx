import React from "react";
import { Button } from "../ui/button";
import { Hand, MousePointer2 } from "lucide-react";

const ToolsBar = () => {
  return (
    <div className="fixed bottom-5 left-0 flex h-20 w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="container mx-auto">
        <div className="flex w-full flex-row gap-5">
          <div className="flex w-full flex-row gap-5">
            <Button variant="outline" className="cursor-pointer">
              <Hand />
            </Button>
            <Button variant="outline" className="cursor-pointer">
              {" "}
              <MousePointer2 />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsBar;
