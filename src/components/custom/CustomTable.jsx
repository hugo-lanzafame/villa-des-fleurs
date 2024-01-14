import {Table, TableBody, TableCell, TableHead, TableRow, Button} from '@mui/material';
import "./customStyle.scss";
import {useNavigate} from "react-router-dom";

const CustomTable = ({ entries }) => {
    const navigate = useNavigate();

    return (
        <Table className="custom-table">
            <TableHead>
                <TableRow>
                    <TableCell className="custom-table__column">Name</TableCell>
                    <TableCell className="custom-table__column__action">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id} className="custom-table__row">
                        <TableCell className="custom-table__cell">{entry.name}</TableCell>
                        <TableCell className="custom-table__cell__action">
                            <Button className="custom-table__button">Edit</Button>
                            <Button className="custom-table__button__delete">Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};


export default CustomTable;