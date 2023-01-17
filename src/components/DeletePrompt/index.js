import React from 'react';
import {
    Box,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const DeletePrompt = ({ status, handleClose, onDelete, values }) => {


    const handleSubmit = () => {
        onDelete(values?.id);
    }

    return (
        <>
            <Box
                component="form"
                sx={{ flexGrow: 1 }}
                autoComplete="off"
            >
                <Dialog open={status} onClose={handleClose}>
                    <DialogContent>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-start">
                                    <ClearIcon n fontSize={'medium'} color={'#3D3D3D'} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="normal" component="h3">
                                    You are about to delete a product
                                </Typography>
                                <Typography variant="body2">
                                    Are you sure you want to delete {values?.title} ?
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container spacing={2} padding={2}>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleClose}>Cancel</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit} fullWidth>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
};

export default DeletePrompt;