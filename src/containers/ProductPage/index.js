
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import ProductForm from '../../components/ProductForm';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DeletePrompt from '../../components/DeletePrompt';
import ExpandableTableRow from '../../components/ExpandableTableRow';
import {
    fetchProducts,
    fetchCategories,
    createProduct,
    fetchProduct,
    updateProduct,
    deleteProduct
} from '../../actions/ProductActions';


const ViewProduct = () => {

    const dispatch = useDispatch();
    const { product } = useSelector(state => state);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(20);
    const [isOnCreate, setIsOnCreate] = React.useState(false);
    const [isOnDelete, setIsOnDelete] = React.useState(false);
    const [isOnEdit, setIsOnEdit] = React.useState(false);
    const [current, setCurrent] = React.useState({});


    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        setTotal(product.products.length)
        // eslint-disable-next-line
    }, []);


    // Load Product Prior Edit Modal
    useEffect(() => {
        if (!product.isLoadingProduct && !isOnDelete) {
            setIsOnEdit(true);
        }
        // eslint-disable-next-line
    }, [product.isLoadingProduct]);

    // Total of Items on First Load
    useEffect(() => {
        if (!product.isLoadingProducts && page === 1) {
            setIsOnEdit(false)
        }
        // eslint-disable-next-line
    }, [product.isLoadingProducts]);


    const handlePaginationChange = (event, value) => {
        setPage(value);
        dispatch(fetchProducts(value * 6));
    };

    const handleSubmit = (payload, mode) => {
        if (mode === 'create') {
            dispatch(createProduct(payload.id, payload))
            setIsOnCreate(false);
        } else {
            dispatch(updateProduct(payload.id, payload))
            setIsOnEdit(false);
        }
    };


    const handleDelete = (id) => {
        if (isOnDelete) {
            dispatch(deleteProduct(id))
            setIsOnDelete(false)
        }
    };



    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#326295',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 20,
        },
    }));

    const handleCreateModal = () => {
        setIsOnCreate(true);
    };

    const handleDeleteModal = () => {
        setIsOnDelete(true);
    };

    const handleCloseDelete = () => {
        setIsOnDelete(false);
    };


    const handleCloseCreate = () => {
        setIsOnCreate(false);
    };

    const handleEditModal = (id) => {
        dispatch(fetchProduct(id))
    }

    const handleCloseEdit = () => {
        setIsOnEdit(false);
    };

    const categoryStyler = (category) => {
        if (category === 'electronics') {
            return '#F8D8C3'
        } else if (category === 'jewelery') {
            return '#EDE7FB'
        } else if (category === "men's clothing") {
            return ' #D4F8D3'
        } else {
            return '#FBE7E9'
        }
    };


    return (
        <div id="view-product-component">
            <Button
                variant="outlined"
                sx={{ spacing: 2, my: 2 }}
                onClick={handleCreateModal}>Add Product</Button>
            <ProductForm
                status={isOnCreate}
                mode="create"
                handleClose={handleCloseCreate}
                onSubmit={handleSubmit}
            />
            <ProductForm
                status={isOnEdit && (product.isLoadingProduct === false || product.isLoadingProducts === false)}
                mode="edit"
                values={product?.product}
                handleClose={handleCloseEdit}
                onSubmit={handleSubmit} />
            <DeletePrompt
                status={isOnDelete}
                values={current}
                handleClose={handleCloseDelete}
                onDelete={handleDelete}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, sx: 2 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">Product Name</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left" colSpan={2}></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {
                        product.isLoadingProducts ?
                            <TableBody>
                                <TableRow sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TableCell colSpan={5}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            </TableBody> :
                            <TableBody>
                                {product.products.slice(-6).map((row) => (
                                    <ExpandableTableRow
                                        key={row.id}
                                        expandComponent={
                                            <>
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        Summary
                                                    </TableCell>
                                                    <TableCell colSpan={2}>
                                                        Rating
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        {row?.description}
                                                    </TableCell>
                                                    <TableCell colSpan={2}>
                                                        {
                                                            <Rating
                                                                value={row?.rating?.rate}
                                                            />
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        }
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell align="left">
                                            <Box sx={{ backgroundColor: categoryStyler(row?.category), borderRadius: 10, spacing: 1, padding: 1, width: 150, textAlign: 'center' }}>
                                                {row.category}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left">{row.price}</TableCell>
                                        <TableCell align="left">
                                            <Stack direction="row">
                                                <Button variant="text" fullWidth onClick={() => handleEditModal(row.id)}>Edit</Button>
                                                <Button variant="text" fullWidth onClick={() => {
                                                    handleDeleteModal(row.id)
                                                    setCurrent(row)
                                                }}>Delete</Button>
                                            </Stack>
                                        </TableCell>
                                    </ExpandableTableRow>
                                ))}
                            </TableBody>
                    }
                </Table>
            </TableContainer >
            <Stack direction="row" justifyContent="flex-end">
                <Pagination
                    count={Math.ceil(20 / 6)}
                    page={page}
                    onChange={handlePaginationChange}
                    variant="outlined"
                    shape="rounded" />
            </Stack>

        </div >
    );
};
export default ViewProduct;

