import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const sendChangeAreaRequest = (websocket, area, characterId) => {
    websocket.send(`MC#${area}#${characterId}#%`)
}

const ChangeArea = ({websocket}) => {
    const areas = useSelector(state => state.client.areas)
    const characterId = useSelector(state => state.client.characterId)
    const [selectedArea, setSelectedArea] = useState(0)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        websocket ? setLoading(false) : setLoading(true)

    });
    return (
        <div>
        {loading 
        ? <h1>Loading</h1>
        :<div>
                <select value={selectedArea} onChange={ev => setSelectedArea(ev.target.value)}>
                    {Object.keys(areas).map(area => {
                        return(<option value={areas[area].name}>{areas[area].name}</option>)
                    })}
                </select>
                <button onClick={sendChangeAreaRequest(websocket, selectedArea, characterId)}>Change Area</button>
            </div>
        }
        </div>
        

    )
}
export default ChangeArea