import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import '../assets/css/main.css';

import CreateItem from '../components/CreateItem';
import ItemList from '../components/ItemList';
import Control from '../components/Control';
import Footer from '../components/Footer';

import { useActions } from '../store/uiActions';

export default function App():React.JSX.Element {
    const { showPopup } = useActions((store)=>store);

    const handleOpen = () => {
        useActions.setState({showPopup:true});
    };

    const handleClose = () => {
        useActions.setState({showPopup:false});
    };

    return (
        <Box>
            <Box className="bg"></Box>
            <Box className="main">
                <Box className="contain">
                    <Box className="title">任务</Box>

                    <Box className="createItem" id="createItem" onClick={handleOpen}>
                        添加学生cookies...
                    </Box>
                    <Dialog onClose={handleClose} open={showPopup}>
                        <DialogTitle>增加刷课任务</DialogTitle>
                        <CreateItem />
                    </Dialog>

                    <Box style={{display:'flex',}}>
                        <ItemList />
                    </Box>

                </Box>

            </Box>
            <Footer />
        </Box>
    );
}