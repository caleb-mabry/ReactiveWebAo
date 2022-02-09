import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setArea,
  addCharacter,
  addMessage,
  addOocMessage,
  setAreaNames,
  setAreaPlayerCount,
  setAssetUrl,
  setBackground,
  setCharacterAvailablility,
  setClient,
  setSong,
  setSongs,
  setTimers,
} from "../features/masterserver/clientserver";
import { getArupInformationCode, arupParser0 } from "../utils/arupParser";
import assParser from "../utils/assParser";
import bnParser from "../utils/bnParser";
import charsCheckParser from "../utils/charsCheckparser";
import ctParser from "../utils/ctParser";
import msParser from "../utils/msParser";
import scParser from "../utils/scParser";
import smParser from "../utils/smParser";
import tiParser from "../utils/tiParser";
import Areas from "./Areas";
import ChangeArea from "./ChangeArea";
import Characters from "./Characters";
import Display from "./Display";
import Emotes from "./Emotes";
import ICMessages from "./ICMessages";
import OOCMessages from "./OOCMessages";
import ICMessageSend from "./ICMessageSend";
import Songs from "./Songs";
import Audio from "./Audio";
import mcParser from "../utils/mcParser";
import Backgrounds from "./Backgrounds";

const Client = () => {
  const { ip } = useParams();
  const dispatch = useDispatch();
  const area = useSelector((state) => state.client.area);
  const song = useSelector((state) => state.client.song);
  const characters = useSelector((state) => state.client.characters);
  const [websocket, setWebsocket] = useState();
  const [connected, setConnected] = useState(false);
  const server = useRef(null);

  const createServer = () => {
    server.current = new WebSocket(`ws://${ip}`);
    setConnected(true);
    server.current.onmessage = (ev) => onMessageHandler(ev.data);
    server.current.onclose = (ev) => {
      console.error(ev);
      try {
        console.log("Attempting to reconnect");
        setTimeout(createServer, 1000);
      } catch (er) {
        console.error(er.stack);
        setConnected(false);
      }
    };
    server.current.onopen = (ev) => {
      const hdid = Math.random();

      server.current.send(`HI#${hdid}#%`);
      server.current.send(`ID#webAO#webAO#%`);
      server.current.send(`RM#%`);
      server.current.send(`RC#%`);
      server.current.send("RD#%");
      setConnected(true);
    };
    const onMessageHandler = (data) => {
      const header = data.split("#", 2)[0];
      console.log(header);
      try {
        handleMessage[header](data);
      } catch (error) {
        console.error(`Unknown Header: ${header}
            ${error}`);
      }
    };
    const assHandle = (msg) => {
      dispatch(setAssetUrl(assParser(msg)));
    };
    const arupHandle = (msg) => {
      const informationCode = getArupInformationCode(msg);
      switch (informationCode) {
        case 0:
          const areas = arupParser0(msg);
          areas.forEach((playerCount, indx) => {
            dispatch(
              setAreaPlayerCount({ areaNumber: indx, playerCount: playerCount })
            );
          });
          break;

        default:
          console.error(`UNKNOWN ARUP CODE: ${informationCode}`);
          break;
      }
    };
    const tiHandler = (msg) => {
      const timers = tiParser(msg);
      dispatch(setTimers(timers));
    };
    const msHandler = (msg) => {
      const parsedMsg = msParser(msg);

      dispatch(addMessage(parsedMsg));
    };
    const scHandler = (msg) => {
      const characterNames = scParser(msg);
      const characters = characterNames.map((char) => {
        return { name: char };
      });
      dispatch(addCharacter(characters));
    };
    const ctHandler = (msg) => {
      const oocMessage = ctParser(msg);
      dispatch(addOocMessage(oocMessage));
    };
    const charsCheckHandler = (msg) => {
      const charactersAvailable = charsCheckParser(msg);
      for (let i = 0; i < charactersAvailable.length; i++) {
        const characterAvailability = {
          index: i,
          availability: charactersAvailable[i],
        };
        dispatch(setCharacterAvailablility(characterAvailability));
      }
    };
    const idHandler = (msg) => {
      console.log(msg);
    };
    const pnHandler = (msg) => {
      console.log(msg);
    };
    const flHandler = (msg) => {
      console.log(msg);
    };
    const mcHandler = (msg) => {
      console.log(msg);
      const parsedMc = mcParser(msg);
      dispatch(setSong(parsedMc.songName));
    };
    // const decryptorHandler = () => {};
    const smHandler = (msg) => {
      const smParsed = smParser(msg);
      dispatch(setAreaNames(smParsed.areas));
      dispatch(setSongs(smParsed.songs));
      if (song === "") {
        dispatch(setSong(smParsed.songs[0]));
      }
      if (area === "") {
        dispatch(setArea(smParsed.areas[0]));
      }
    };
    const bnHandler = (msg) => {
      const backgroundName = bnParser(msg);
      dispatch(setBackground(backgroundName));
    };
    const handleMessage = {
      ARUP: arupHandle,
      ASS: assHandle,
      TI: tiHandler,
      MS: msHandler,
      FL: flHandler,
      SC: scHandler,
      CT: ctHandler,
      MC: mcHandler,
      SM: smHandler,
      BN: bnHandler,
      CharsCheck: charsCheckHandler,
      ID: idHandler,
      PN: pnHandler,
    };
  };

  useEffect(() => {
    createServer();
    return () => server.current.close();
  }, []);

  return (
    <div>
      {connected ? (
        <>
          <Areas />
          <Audio />
          <Display />
          <br></br>
          <Emotes />
          <br></br>

          <ICMessageSend websocket={server.current} />
          <br></br>

          <ChangeArea websocket={server.current} />
          <br></br>

          <Songs websocket={server.current} />
          <br></br>
          <Backgrounds />

          <ICMessages />

          <Characters websocket={server.current} />
          <div>OOC Messages</div>
          <OOCMessages />
        </>
      ) : (
        <h1>You were disconnected</h1>
      )}
    </div>
  );
};
export default Client;
