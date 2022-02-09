import { useEffect } from "react";
import { useSelector } from "react-redux";

const ICMessages = () => {
  const icMessages = useSelector((state) => state.client.messages);
  return (
    <>
      {icMessages.map((ic) => (
        <li key={Math.random()}>
          {ic.character}: {ic.message}
        </li>
      ))}
    </>
  );
};
export default ICMessages;
