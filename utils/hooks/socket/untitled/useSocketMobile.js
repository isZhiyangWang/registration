import io from "socket.io-client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef } from "react";

export default function useSocketInit({ initTime }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      if (Date.now() - initTime > 30 * 1000) return;
      const id = uuidv4();

      console.log("socket connected");
      socket.current.emit("untitled-mobile-init");
    });
  };

  return socket;
}
