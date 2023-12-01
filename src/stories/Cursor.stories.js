import React from "react"

import Cursor from "../component/Cursor"

export default {
  title: "Cursor",
  component: Cursor,
}

export const Default = {
  render: () => (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <h1 data-cursor="--pointer" data-cursor-text="💡">
          Cursor
        </h1>
      </div>
      <Cursor />
    </>
  ),
}
