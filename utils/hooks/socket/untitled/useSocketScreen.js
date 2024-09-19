import io from "socket.io-client";
import { useEffect, useRef } from "react";

export default function useSocketInit({ handleNewMobileJoin, handleNewInput, handleNewPhoto, handleNewConsent, handleNewRegister }) {
  const socket = useRef(null);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.current = io();

    socket.current.on("connect", () => {
      console.log("socket connected");
      socket.current.emit("untitled-screen-init");

      socket.current.on("new-untitled-mobile-join", handleNewMobileJoin);
      socket.current.on("new-untitled-input", handleNewInput);
      socket.current.on("new-untitled-photo", handleNewPhoto);
      socket.current.on("new-untitled-consent", handleNewConsent);
      socket.current.on("new-untitled-register", handleNewRegister);
    });
  };

  return socket;
}
