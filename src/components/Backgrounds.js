import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "../features/masterserver/clientserver";

const BACKGROUND_URL = "http://attorneyoffline.de/base/backgrounds.json";
const Backgrounds = ({ websocket }) => {
  const [backgrounds, setBackgrounds] = useState([]);
  const background = useSelector((state) => state.client.background);
  const dispatch = useDispatch();
  const getBackgrounds = () => {
    axios
      .get(BACKGROUND_URL)
      .then((res) => res.data)
      .then((data) => setBackgrounds(data.map((data) => data.toLowerCase())));
  };
  useEffect(() => {
    getBackgrounds();
  }, []);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={backgrounds}
      sx={{ width: 300 }}
      value={background}
      renderInput={(params) => <TextField {...params} label="Background" />}
      onChange={(ev, changeValue) => {
        setBackground(changeValue);
        //   sendChangeAreaRequest(websocket, changeValue, characterId)
      }}
    />
  );
};
export default Backgrounds;
