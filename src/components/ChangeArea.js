import { Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const sendChangeAreaRequest = (websocket, area, characterId) => {
  websocket.send(`MC#${area}#${characterId}#%`);
};

const ChangeArea = ({ websocket }) => {
  const areas = useSelector((state) => state.client.areas);
  const areasOptions = areas.map((area) => area.name)
  const characterId = useSelector((state) => state.client.characterId);
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(true);

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
            value={selectedArea}
            renderInput={(params) => <TextField {...params} label="Area" />}
            onChange={(ev, changeValue) => {
              setSelectedArea(changeValue);
              sendChangeAreaRequest(websocket, changeValue, characterId)
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
