import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import {
  setCharacterId,
  setEmotes,
  setOptions,
} from "../features/masterserver/clientserver";
import { useEffect } from "react";
const ini = require("ini");
const AvailableCharacter = styled.img`
  pointer: click;
`;
const UnavailableCharacter = styled.img`
  opacity: 50%;
`;
const setSelectedCharacter = (
  assetUrl,
  characterId,
  characterName,
  websocket,
  dispatcher
) => {
  websocket.send(`CC#0#${characterId}#${Math.random()}#%`);
};
const getUrl = (assetUrl, character) =>
  `${assetUrl}characters/${encodeURIComponent(
    character.toLowerCase()
  )}/char_icon.png`;

const Characters = ({ websocket }) => {
  const characters = useSelector((state) => state.client.characters);
  const assetUrl = useSelector((state) => state.client.assetUrl);
  const dispatch = useDispatch();

  const getEmotes = (characterName) => {
    axios
      .get(
        assetUrl +
          "characters/" +
          encodeURI(characterName.toLowerCase()) +
          "/char.ini"
      )
      .then((data) => {
        const cini = ini.parse(data.data);
        delete cini.Emotions.number;
        dispatch(setOptions(cini.Options));
        dispatch(setEmotes(cini.Emotions));
      });
  };
  return (
    <div>
      {characters.map((char, indx) => {
        return Number(char.availability) === 0 ? (
          <AvailableCharacter
            onClick={() => {
              dispatch(setCharacterId(indx));
              getEmotes(char.name);
              setSelectedCharacter(
                assetUrl,
                indx,
                char.name,
                websocket,
                dispatch
              );
            }}
            src={getUrl(assetUrl, char.name)}
          />
        ) : (
          <UnavailableCharacter src={getUrl(assetUrl, char.name)} />
        );
      })}
    </div>
  );
};
export default Characters;
