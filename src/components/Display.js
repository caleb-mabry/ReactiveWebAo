import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import positions from "../constants/positions";

const getUrl = (message) => {
  if (message === undefined) {
    return "";
  }
  return `http://attorneyoffline.de/base/characters/${message.character.toLowerCase()}/(a)${message.emote.toLowerCase()}.gif`;
};
const getBackground = (assetUrl, backgroundName) => {
  if (backgroundName === undefined) {
    return "";
  }
  return (
    assetUrl +
    "background/" +
    encodeURI(backgroundName.toLowerCase()) +
    "/defenseempty.png"
  );
};
const sideUrl = (assetUrl, message, backgroundName) => {
  if (backgroundName === undefined || message === undefined) {
    return "";
  }
  return (
    assetUrl +
    "background/" +
    encodeURI(backgroundName.toLowerCase()) +
    "/" +
    positions[message.side].desk.ao2
  );
};
const CharacterDisplay = styled.div`
  position: relative;
  width: 256px;
  height: 192px;
`;
const InsideImage = styled.img`
  position: absolute;
`;
const MessageBackground = styled.div`
  position: absolute;
  height: 50px;
  bottom: 0px;
  opacity: 0.5;
  background-color: white;
  width: 256px;
  max-width: 256px;
`;
const Message = styled.div`
  position: absolute;
  height: 50px;
  bottom: 0px;
  width: 256px;
  max-width: 256px;
  overflow-y: auto;
`;
const DisplayMessage = ({ messages }) => {
  if (messages[messages.length - 1] === undefined) {
    return <></>;
  } else {
    return (
      <>
        <MessageBackground />
        <Message>{messages[messages.length - 1].message}</Message>
      </>
    );
  }
};
const flipStyle = (flip) => {
  if (flip === 1) {
    return {
      transform: `scaleX(-1)`,
    };
  }
};
const getBackgroundWithPosition = (
  assetUrl,
  backgroundName,
  positionBackgroundName
) => {
  return (
    assetUrl +
    "background/" +
    encodeURI(backgroundName.toLowerCase()) +
    "/" +
    positionBackgroundName
  );
};
const DisplayBackground = ({ messages, assetUrl, backgroundName }) => {
  const message = messages[messages.length - 1];
  if (message === undefined || backgroundName === undefined) {
    return <></>;
  }
  if (Object.keys(positions).includes(message.side)) {
    return (
      <>
        <InsideImage
          src={getBackgroundWithPosition(
            assetUrl,
            backgroundName,
            positions[message.side].bg
          )}
        />
        <InsideImage style={flipStyle(message.flip)} src={getUrl(message)} />
        <InsideImage
          src={sideUrl(assetUrl, messages[messages.length - 1], backgroundName)}
        />
      </>
    );
  }
  return <InsideImage src={getBackground(assetUrl, backgroundName)} />;
};
const Display = () => {
  const messages = useSelector((state) => state.client.messages);
  const assetUrl = useSelector((state) => state.client.assetUrl);
  const backgroundName = useSelector((state) => state.client.background);
  return (
    <div>
      {JSON.stringify(messages[messages.length - 1])}
      <CharacterDisplay>
        <DisplayBackground
          messages={messages}
          assetUrl={assetUrl}
          backgroundName={backgroundName}
        />
        {/* <InsideImage src={getBackground(assetUrl, backgroundName)} />
                <InsideImage src={getUrl(messages[messages.length-1])}/>
                <InsideImage src={sideUrl(assetUrl, messages[messages.length-1], backgroundName)} /> */}
        <DisplayMessage messages={messages} />
      </CharacterDisplay>
    </div>
  );
};
export default Display;
