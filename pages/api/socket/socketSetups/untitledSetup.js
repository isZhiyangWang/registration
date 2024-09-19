export default function visitNowSetup({ socket, io }) {
  //init
  socket.on("untitled-mobile-init", () => {
    socket.join("untitled");
    socket.join("untitled-mobile");
    socket.to("untitled-screen").emit("new-untitled-mobile-join");
  });

  socket.on("untitled-screen-init", () => {
    socket.join("untitled");
    socket.join("untitled-screen");
  });

  socket.on("untitled-new-input", (data) => {
    socket.to("untitled-screen").emit("new-untitled-input", data);
  });

  socket.on("untitled-new-photo", (data) => {
    socket.to("untitled-screen").emit("new-untitled-photo", data);
  });

  socket.on("untitled-new-consent", (data) => {
    socket.to("untitled-screen").emit("new-untitled-consent", data);
  });

  socket.on("untitled-new-register", (data) => {
    socket.to("untitled-screen").emit("new-untitled-register", data);
  });
}
