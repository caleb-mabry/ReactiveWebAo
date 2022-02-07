import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ServerInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  &:hover {
    opacity: 0.6;
  }
  padding: 5px;
  pointer: click;
  background-color: blue;
  transition-duration: 0.5s;
`;
const ServerLink = styled.link``;
const ServerName = styled.div``;
const ServerDescription = styled.div``;
const ServerInfo = ({ server }) => {
  return (
    <Link to={`/${server.ip}:${server.port}`}>
      <ServerInformation key={server.name}>
        <ServerName key={server.name}>{server.name}</ServerName>
        <ServerDescription key={server.description}>
          {server.description}
        </ServerDescription>
      </ServerInformation>
    </Link>
  );
};
export default ServerInfo;
