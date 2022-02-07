import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import ServerInfo from "./ServerInfo"

const HorizontalLine = styled.hr`
width: 100%
`
const MasterServerList = () => {
    const servers = useSelector((state) => state.master.servers)

    return (
        servers.map(server => {
            return (
            <ServerInfo key={server.name} server={server} />
            )
        })
    )
}
export default MasterServerList