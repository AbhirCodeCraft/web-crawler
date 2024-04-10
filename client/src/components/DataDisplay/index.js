import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import TableComponent from '../Table';
import OverlayForm from '../OverlayForm';
import SearchBar from '../SearchBar';
import Alert from '@mui/material/Alert';
import './styles.css'
import apiHelper from '../../configs/api';

const DataComponent = () => {
    const [listData, setListData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchParam, setSearchParam] = useState({});
    const [responseEmpty, setResponseEmpty] = useState(false);
    const [crawlerInProgress, setCrawlerInProgress] = useState(false);
    const emptyDb = responseEmpty && !Object.keys(searchParam).length;
    
    const setData = async() => {
        try {
            setListData([]);
            setResponseEmpty(false);
            const { selectedOption, searchText } = searchParam;
            let query = '';
            if (selectedOption && searchText) query = `?${selectedOption}=${searchText}`;
            const {data: {clientData}} = await apiHelper.get(`/clients${query}`);
            if (clientData.length) setListData(clientData);
            else setResponseEmpty(true);        
        } catch (error) {
            console.error(error);
            setResponseEmpty(true);            
        }
    }
    
    const handleCrawler = async() => {
        try {
            setListData([]);
            setResponseEmpty(false);
            setCrawlerInProgress(true);
            await apiHelper.get(`/crawler`);
            setCrawlerInProgress(false);
            setData();
        } catch (error) {
            console.error(error);
            setCrawlerInProgress(false);
        }
    }

    const closeModal = (refresh) => {
        setShowModal(false);
        if(refresh) setData();
    }

    useEffect(() => {
        setData();
    }, [searchParam]);

    const getContent = () => {
        switch (true) {
            case emptyDb:
                return <Alert severity="info">No records in database. Please run the crawler or use the 'Add new' feature.</Alert>
            case responseEmpty:
                return <Alert severity="info">No data found for the search.</Alert>
            case !!listData.length:
                return (
                    <Col>
                        <TableComponent listData={listData} setData={setData} />
                    </Col>                    
                )
            default:
                return (
                    <div className='spinnerWrapper'>
                        <Spinner animation="border" variant="dark" />
                        {crawlerInProgress && <h5 className='loaderText'>Fetching data from the site. Please wait.</h5> }
                    </div>
                )
        }
    }
    
    return (
        <>
            <Container>
                <Row className='sectionWrapper'>
                    <Col>
                        <h1 className="title">Client List</h1>
                    </Col>
                    <Col>
                        <div className="buttonsWrapper">
                            <Button variant="primary" className='headerButton' onClick={()=>{setShowModal(true)}} disabled={crawlerInProgress}>Add new</Button>
                            <Button variant="success" className='headerButton' onClick={()=>{handleCrawler()}} disabled={crawlerInProgress}>Run crawler</Button>
                        </div>
                    </Col>
                </Row>
                {(!emptyDb && !crawlerInProgress) &&
                    <Row className='sectionWrapper'>
                        <SearchBar setSearchParam={setSearchParam} />
                    </Row>
                }
                <Row className='sectionWrapper'>
                    { getContent() }
                </Row>
            </Container>
            {showModal && <OverlayForm closeModal={closeModal}/>}
        </>
    );
};

export default DataComponent;
