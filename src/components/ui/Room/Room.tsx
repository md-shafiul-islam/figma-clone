"use client";

import React from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import type { Layer } from "@/types/types";

interface RoomProps {
  children: React.ReactNode;
}

const Room: React.FC<RoomProps> = ({ children }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblock-auth">
      <RoomProvider
        id="test"
        initialPresence={{
          cursor: null,
          selection: [],
          penColor: null,
          pencilDraft: null,
        }}
        initialStorage={{
          roomColor: { r: 30, g: 30, b: 30, a: 1 },
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center">
              Loading…
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
