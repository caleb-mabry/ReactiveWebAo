import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArea } from "../features/masterserver/clientserver";

const sendChangeAreaRequest = (websocket, area, characterId) => {
  websocket.send(`MC#${area}#${characterId}#%`);
};

const ChangeArea = ({ websocket }) => {
  const areas = useSelector((state) => state.client.areas);
  const areasOptions = areas.map((area) => area.name);
  const area = useSelector((state) => state.client.area);
  const characterId = useSelector((state) => state.client.characterId);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    websocket ? setLoading(false) : setLoading(true);
  });
  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={areasOptions}
            sx={{ width: 300 }}
            value={area}
            renderInput={(params) => <TextField {...params} label="Area" />}
            onChange={(ev, changeValue) => {
              dispatch(setArea(changeValue));
              sendChangeAreaRequest(websocket, changeValue, characterId);
            }}
          />

          {/* <select
            value={selectedArea}
            onChange={(ev) => setSelectedArea(ev.target.value)}
          >
            {Object.keys(areas).map((area) => {
              return (
                <option value={areas[area].name}>{areas[area].name}</option>
              );
            })}
          </select>
          <button
            onClick={() =>
              sendChangeAreaRequest(websocket, selectedArea, characterId)
            }
          >
            Change Area
          </button> */}
        </div>
      )}
    </div>
  );
};
export default ChangeArea;
