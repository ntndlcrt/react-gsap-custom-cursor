import React from "react"
// import { storiesOf } from "@storybook/react"

// import Cursor from "../component/Cursor"

// const stories = storiesOf("Cursor", module)

// stories.add("Default", () => {
//   return <Cursor />
// })

import Cursor from "../component/Cursor"

export default {
  title: "Cursor",
  component: Cursor,
}

export const Default = {
  render: () => <Cursor />,
}
