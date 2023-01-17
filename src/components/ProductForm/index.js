import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Rating,
    TextField,
    Typography
} from "@mui/material";

const ProductForm = ({ status, handleClose, onSubmit, values, mode }) => {

    const { product } = useSelector(state => state);
    const [formValues, setFormValues] = React.useState({});
    const [checked, setChecked] = React.useState([]);
    const [rating, setRating] = React.useState(0);

    const handleTextFieldChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCheckboxChange = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const handleSubmit = () => {
        let payload = {};
        if (mode === 'create') {
            payload = {
                ...formValues,
                category: checked,
                image: '',
                rating: {
                    count: values?.rating?.count || 0,
                    rate: values?.rating?.rate || rating
                }
            }
        } else {
            payload = {
                id: values?.id,
                title: formValues?.title || values?.title,
                price: formValues?.price || values?.price,
                description: formValues?.description || values?.description,
                category: checked || values?.category,
                image: formValues?.image || values?.image,
                rating: {
                    count: values?.rating?.count || 0,
                    rate: values?.rating?.rate || rating
                }
            }
        }
        console.log(payload);
        onSubmit(payload, mode);
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
                                    {
                                        mode === 'create?' ?
                                            <AddBoxOutlinedIcon fontSize={'medium'} color={'#3D3D3D'} /> :
                                            <EditOutlinedIcon fontSize={'medium'} color={'#3D3D3D'} />
                                    }

                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" justifyContent="flex-end">
                                    <IconButton onClick={handleClose} aria-label="close-icon" component="label">
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    id="outlined-basic"
                                    label="ID"
                                    name="id"
                                    type="text"
                                    fullWidth
                                    disabled={mode === 'edit'}
                                    defaultValue={values?.id}
                                    onChange={handleTextFieldChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    id="outlined-basic"
                                    label="Price"
                                    type="number"
                                    name="price"
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    defaultValue={values?.price}
                                    onChange={handleTextFieldChange}
                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField
                                    autoFocus
                                    id="outlined-basic"
                                    label="Author"
                                    type="text"
                                    fullWidth
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    id="outlined-basic"
                                    label="Title"
                                    name="title"
                                    type="text"
                                    fullWidth
                                    defaultValue={values?.title}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleTextFieldChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    id="outlined-basic"
                                    label="Description"
                                    name="description"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue={values?.description}
                                    onChange={handleTextFieldChange}
                                />
                            </Grid>
                            <Grid container padding={2}>
                                <>
                                    <FormLabel component="legend">Category</FormLabel>
                                    <FormGroup row sx={{ paddingBottom: 2 }} >
                                        {

                                            product.categories.map((category) => {
                                                return (

                                                    <Grid item xs={4} key={category}>
                                                        <FormControlLabel control={
                                                            <Checkbox
                                                                value={category}
                                                                onChange={handleCheckboxChange} />} label={category} />
                                                    </Grid>

                                                )
                                            })
                                        }
                                    </FormGroup>
                                </>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Published"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    value={rating || values?.rating?.rate}
                                    precision={0.5}
                                    max={5}
                                    name="unique-rating"
                                    onChange={(event, newValue) => setRating(newValue)}
                                />
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
                                    {
                                        mode === 'create' ? 'Add' : 'Edit'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}

export default ProductForm;
