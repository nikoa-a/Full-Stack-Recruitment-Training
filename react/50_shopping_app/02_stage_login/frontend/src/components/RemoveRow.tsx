import { TableRow, TableCell, Button } from "@mui/material";
import type ShoppingItem from "../models/ShoppingItem";

interface Props {
  item: ShoppingItem;
  removeItem(id: string): void;
  changeMode(index: number, mode: string): void;
}

const RemoveRow = (props: Props) => {

  return (
    <TableRow>
      <TableCell>{props.item.type}</TableCell>
      <TableCell>{props.item.count}</TableCell>
      <TableCell>{props.item.price}</TableCell>
      <TableCell>
        <Button 
          onClick={() => props.changeMode(0, "cancel")} 
          color="error"
          variant="contained">
            Cancel
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => props.removeItem(props.item.id)}
          color="success"
          variant="contained">
            Confirm
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default RemoveRow;