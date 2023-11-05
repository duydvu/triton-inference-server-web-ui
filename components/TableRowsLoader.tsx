import { Skeleton, TableCell, TableRow } from "@mui/material";

interface Props {
  rowsNum: number;
  columnsNum: number;
}

const TableRowsLoader = ({ rowsNum, columnsNum }: Props) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      {[...Array(columnsNum)].map((col, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableRowsLoader;
