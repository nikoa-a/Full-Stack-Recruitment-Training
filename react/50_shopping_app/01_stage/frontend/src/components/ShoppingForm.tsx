import React, { useState } from "react";
import ShoppingItem from '../models/ShoppingItem';
import { Box, Button, TextField } from "@mui/material";

interface State {
  type: string,
  count: number,
  price: number
}

interface Props {
  add(item: ShoppingItem): void;
}

const ShoppingForm = (props: Props) => {
  const [state, setState] = useState<State>({
    type: "",
    count: 0,
    price: 0
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const item = new ShoppingItem(state.type, state.count, state.price, "");
    props.add(item);
    setState({
      type: "",
      count: 0,
      price: 0
    })
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ width: "20%", mx: "auto"}}>
      <TextField 
        type="text" 
        name="type" 
        id="type" 
        label="Type" 
        onChange={onChange} 
        value={state.type}
        sx={{ mb: 3 }}/><br />
      <TextField 
        type="number" 
        name="count" 
        id="count" 
        label="Count" 
        onChange={onChange} 
        value={state.count}
        sx={{ mb: 3 }}/><br />
      <TextField
        type="number"
        name="price"
        id="price"
        label="Price"
        onChange={onChange}
        value={state.price}
        sx={{ mb: 3 }}/><br />
      <Button type="submit" color="secondary" variant="contained">Add Item</Button>
    </Box>
  )
}

export default ShoppingForm;