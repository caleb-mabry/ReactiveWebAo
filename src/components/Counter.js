import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/masterserver/masterserver";
import createServer from "../features/webhook/webhook";
import { servers } from "../utils/allParser";
export function Counter() {
  useEffect(() => {
    createServer();
  }, []);

  const count = useSelector((state) => state.master.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {servers}
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
