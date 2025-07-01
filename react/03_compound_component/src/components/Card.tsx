import React, { useState } from "react";
import Square from "./Square";
import Label from "./Label";

interface State {
  color: string;
}

const Card = () => {
  const [state, setState] = useState<State>({ color: "red" })

  const cardStyle:React.CSSProperties = {
    height: 200,
    width: 150,
    backgroundColor: "#FFF",
    filter: "drop-shadow(0px 0px 10px #FFF)"
  }

  const onColorChange = () => {
    let color = "#";
    const colorpicker = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      let temp = Math.floor(Math.random() * 16);
      color += colorpicker[temp];
    }

    setState({ color: color });
  }

  return (
    <div style={cardStyle}>
      <Square color={state.color} />
      <Label color={state.color} onColorChange={onColorChange} />
    </div>
  )
}

export default Card;