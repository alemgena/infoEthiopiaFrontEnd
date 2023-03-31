import { TableCell, TableRow, Typography } from "@material-ui/core";
import { GiEmptyHourglass } from "react-icons/gi";

const Norecords = ({ col }) => {
  return (
    <TableRow>
      <TableCell colSpan={col} className="padding" align="center">
        <Typography
          variant="h3"
          className="flex justify-center align-center padding"
        >
          No records.
          <GiEmptyHourglass color="primary" fontSize="inherit" />
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default Norecords;
