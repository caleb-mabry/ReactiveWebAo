import { createSlice } from "@reduxjs/toolkit";
export const clientServer = createSlice({
  name: "client",
  initialState: {
    client: null,
    assetUrl: "http://attorneyoffline.de/base/",
    characterId: -1,
    background: "",
    emotions: [],
    options: [],
    areas: [],
    timers: {},
    characters: [],
    messages: [],
    oocMessages: [],
    servers: [],
  },
  reducers: {
    setEmotes: (state, action) => {
      state.emotions = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setAssetUrl: (state, action) => {
      state.assetUrl = action.payload;
    },
    setBackground: (state, action) => {
      state.background = action.payload;
    },
    setAreaNames: (state, action) => {
      if (Object.keys(state.areas).length != action.payload.length) {
        state.areas = action.payload.map((areaName) => {
          return {
            playerCount: 0,
            name: areaName,
          };
        });
      }
      Object.keys(state.areas).forEach((areaIndx) => {
        state.areas[areaIndx].name = action.payload[areaIndx];
      });
    },
    setCharacterId: (state, action) => {
      state.characterId = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setAreaPlayerCount: (state, action) => {
      state.areas[action.payload.areaNumber].playerCount =
        action.payload.playerCount;
    },
    setTimers: (state, action) => {
      const id = action.payload.id;
      const command = action.payload.command;
      const time = action.payload.time;
      state.timers[id] = { command: command, time: time };
    },
    addCharacter: (state, action) => {
      state.characters = action.payload;
    },
    addOocMessage: (state, action) => {
      if (state.oocMessages.length > 5) {
        state.oocMessages.shift();
      }
      state.oocMessages.push(action.payload);
    },
    addMessage: (state, action) => {
      if (state.messages.length > 5) {
        state.messages.shift();
      }
      state.messages.push(action.payload);
    },
    setCharacterAvailablility: (state, action) => {
      state.characters[action.payload.index]["availability"] =
        action.payload.availability;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setEmotes,
  setOptions,
  setAreaPlayerCount,
  setBackground,
  setAssetUrl,
  setTimers,
  addCharacter,
  setCharacterAvailablility,
  addMessage,
  addOocMessage,
  setAreaNames,
  setClient,
  setCharacterId,
} = clientServer.actions;

export default clientServer.reducer;
