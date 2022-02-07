export function arupParser0(arupMsg) {
  const playerCounts = arupMsg.split("#");
  playerCounts.pop();
  playerCounts.shift();
  playerCounts.shift();

  return playerCounts;
}

export function getArupInformationCode(arupMsg) {
  const data = arupMsg.split("#");
  data.shift();
  data.pop();
  const areaInformationCode = data.shift();
  return Number(areaInformationCode);
}
