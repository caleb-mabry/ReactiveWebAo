import { useSelector } from "react-redux";

const OOCMessages = () => {
  const oocMessages = useSelector((state) => state.client.oocMessages);
  return (
    <>
      {oocMessages.map((ooc) => (
        <li key={Math.random()}>
          {ooc.name}: {ooc.message}
        </li>
      ))}
    </>
  );
};
export default OOCMessages;
