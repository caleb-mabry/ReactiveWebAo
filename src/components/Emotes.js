import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedEmote } from "../features/masterserver/clientserver";

const ButtonUnpressed = styled.img`
  align-items: center;
  background: linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25));
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
   -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  justify-content: center;
  opacity:.6;

`
const ButtonPressed = styled.img`
align-items: center;
background: linear-gradient(135deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25));
box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
 -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
border-radius: 50px;
justify-content: center;
}`
const Emotes = () => {
  const emotes = useSelector((state) => state.client.emotions);
  const characters = useSelector((state) => state.client.characters);
  const characterId = useSelector((state) => state.client.characterId);
  const assetUrl = useSelector((state) => state.client.assetUrl);
  const [stateSelectedEmote, setStateSelectedEmote] = useState('')
  const dispatch = useDispatch()

  const getEmoteImageUrl = (id) => {
    if (characters.length === 0 || characterId === -1) {
      return "";
    }
    const characterName = characters[characterId].name;
    return `${assetUrl}characters/${encodeURI(
      characterName.toLowerCase()
    )}/emotions/button${Number(id) + 1}_off.png`;
  };

return(
  <div>
  {emotes.length === 0 
    ?
    <div></div>
    :
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Emote</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stateSelectedEmote}
          label="Age"
          onChange={ev => {setStateSelectedEmote(ev.target.value)
          dispatch(setSelectedEmote(ev.target.value))
          }}
        >
          {emotes.map((emote, indx) => { return (<MenuItem key={emote} value={emote}><img src={getEmoteImageUrl(indx)} /></MenuItem>) })}
        </Select>
      </FormControl>
      
  }
  </div>)
};
export default Emotes;
