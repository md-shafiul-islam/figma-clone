import React from "react";
import Room from "@/components/ui/Room/Room";
import { aw } from "node_modules/@liveblocks/react/dist/room-CqT08uWZ";
import Canvas from "@/components/canvas/Canvas";

interface RoomPageProps {
  params: {
    id: string;
  };
}

const roomSinglePage: React.FC<RoomPageProps> = async ({ params }) => {
  const { id } = await params;
  console.log("room Page ID params", id);
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <Room>
        <Canvas />
      </Room>
    </div>
  );
};

export default roomSinglePage;
