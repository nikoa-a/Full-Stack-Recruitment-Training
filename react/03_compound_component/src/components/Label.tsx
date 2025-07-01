import React from "react";

interface Props {
  color: string;
  onColorChange(): void;
}

const Label = (props: Props) => {
  const labelStyle:React.CSSProperties = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    color: props.color
  }

  return (
    <p style={labelStyle} onClick={props.onColorChange}>{props.color}</p>
  )
}

export default Label;