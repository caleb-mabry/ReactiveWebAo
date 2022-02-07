import { configureStore } from "@reduxjs/toolkit";
import masterServerReducer from "./features/masterserver/masterserver";
import clientReducer from "./features/masterserver/clientserver";
export default configureStore({
  reducer: {
    master: masterServerReducer,
    client: clientReducer,
  },
});
