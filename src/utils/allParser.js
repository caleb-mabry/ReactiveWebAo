const getServers = (msg) => {
    const allservers = msg.split("#").slice(1);
    return allservers.map(serverInfo => {
        const serverDetails = serverInfo.split("&");
        return {
            name: serverDetails[0], 
            description: serverDetails[1], 
            ip: serverDetails[2], 
            port: serverDetails[3], 
            assets: serverDetails[4], 
        }
        
    })
    
}
export default getServers