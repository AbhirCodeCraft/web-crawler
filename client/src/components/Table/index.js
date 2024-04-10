import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import OverlayForm from '../OverlayForm';
import DeleteModal from '../DeleteConfirmation';
import Tooltip from '@mui/material/Tooltip';
import './styles.css'

const Row = (props) => {
  const { row, handleEdit, handleDelete } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.company_name}
        </TableCell>
        <TableCell align="center">{row.cin}</TableCell>
        <TableCell align="center">{row.pin_code}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center" style={{minWidth: '100px'}}>
        <Tooltip title="Edit">
          <IconButton
              aria-label="edit"
              size="small"
              onClick={() => handleEdit(row)}
            >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDelete(row)}
            >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>          
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                All details
              </Typography>

              <Table size="small" aria-label="client details">
                <TableBody>
                  {Object.keys(row).map((field, index) => (
                    <TableRow key={index}>
                      <TableCell size="small">{field.replace('_',' ').toUpperCase()}</TableCell>
                      <TableCell>{row[field]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const HEADERS = ['Name', 'CID', 'PIN', 'Email', 'Actions'];

const CollapsibleTable = ({ listData, setData }) => {

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (data) => {
    setClientData(data);
    setShowModal(true);
  };

  const closeModal = (refresh) => {
    setShowModal(false);
    if(refresh) setData();
}

  const handleDelete = (data) => { 
    setClientData(data);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = (refresh) => {
    setShowDeleteModal(false);
    if(refresh) setData();
  }

  useEffect(() => {
    if (!showModal && clientData) {setClientData(null);}
  }, [showModal])

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {HEADERS.map((header, index) => <TableCell align="center" key={index}>{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              delete row.createdAt;
              return <Row key={index} row={row} handleEdit={handleEdit} handleDelete={handleDelete} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100, { value: -1, label: 'All' }]}
        component="div"
        count={listData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showModal && <OverlayForm closeModal={closeModal} data={clientData} />}
      {showDeleteModal && <DeleteModal closeModal={closeDeleteModal} data={clientData}/>}
    </>
  );
}

export default CollapsibleTable;