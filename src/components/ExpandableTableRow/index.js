import React from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {
    TableRow,
    TableCell,
    IconButton
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
            {isExpanded && (
                <>
                    {expandComponent}
                </>
            )}
        </>
    );
};

export default ExpandableTableRow;