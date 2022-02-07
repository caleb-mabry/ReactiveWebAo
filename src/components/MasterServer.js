import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setServers } from "../features/masterserver/masterserver";
import getServers from "../utils/allParser";
import MasterServerList from "./MasterServerList";
const MASTERSERVER_IP = "master.aceattorneyonline.com:27014";

const MasterServer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onCheck = (msg) => {};
    const onCT = (msg) => {};

    const onSV = (msg) => {};

    const onAll = (msg) => {
      dispatch(setServers(getServers(msg)));
    };

    const messageHandler = {
      AO2CHECK: onSV,
      servercheok: onSV,
      CHECK: onCheck,
      SV: onSV,
      CT: onCT,
      ALL: onAll,
    };

    const createServer = () => {
      const masterserver = new WebSocket("ws://" + MASTERSERVER_IP);

      masterserver.onmessage = (ev) => onMessageHandler(ev.data);
      masterserver.onopen = (ev) => onOpen();

      const onOpen = () => {
        masterserver.send(`ID#webAO#webAO#%`);
        masterserver.send("ALL#%");
        masterserver.send("VC#%");
      };

      const onMessageHandler = (data) => {
        const header = data.split("#", 2)[0];
        messageHandler[header](data);
      };

      return masterserver;
    };
    createServer();
  }, []);

  return (
    <>
      <MasterServerList />
    </>
  );
};

export default MasterServer;
