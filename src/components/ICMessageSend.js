import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ICMessageSend = ({ websocket }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const characters = useSelector((state) => state.client.characters);
  const characterId = useSelector((state) => state.client.characterId);
  const selectedEmote = useSelector(state => state.client.selectedEmote)
  useEffect(() => {
    websocket ? setLoading(false) : setLoading(true);
  });
  const icMessageBuilder = () => {
    const characterName = characters[characterId].name;

    let packet = `MS#chat#-#${characterName}#${selectedEmote}#${message}#wit#0#0#${characterId}#0#0#0#0#0#0##-1#0<and>0#0#0#0#-#-#-#0#||#%`;

    return packet;
  };
  return (
    <>
      {loading ? (
        <h1>Loading!</h1>
      ) : (
        <div>
          <input type={"text"} onChange={(ev) => setMessage(ev.target.value)} />
          <button onClick={() => websocket.send(icMessageBuilder())}>
            Submit
          </button>
        </div>
      )}
    </>
  );
};
export default ICMessageSend;
