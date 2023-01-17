import React from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {
    Fade,
    TableRow,
    TableCell,
    IconButton,
    Box
} from "@mui/material";

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <>
            <TableRow {...otherProps}>
                {children}
                <TableCell>
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            {/* <Fade> */}
            {isExpanded && (
                <>
                    {expandComponent}
                </>
            )}
            {/* </Fade> */}
        </>
    );
};

export default ExpandableTableRow;