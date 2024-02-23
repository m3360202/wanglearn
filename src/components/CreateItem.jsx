import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import '../assets/css/main.css';

import { useTodoList } from '../store/todoList';
import { useActions } from '../store/uiActions';

import { generateRandomId,getRandomId } from '../utils/utils';
import axios from 'axios';

export default function CreateItem() {

    const [input, setInput] = useState('');

    const saveItem = () => {
        if (input.length > 0) {
            let item = {
                id:generateRandomId(),
                name:input,
                completed:false,
                selected:false,
                todu:null,
                Edusign:generateRandomId(),
                Edutoken:getRandomId(),

            }
            const oldList = useTodoList.getState().todoList;
            let Edusign = item.Edusign;
            let Edutoken = item.Edutoken;
            let cookies = input;
            axios.post('http://localhost:8080/handleRequestList',{cookies:input,Edusign:item.Edusign,Edutoken:item.Edutoken,}).then((res)=>{
            
                let array = [];
                let realPlayTimeSum = 0;
                let totalDurationSum = 0;
                res.data.items.forEach((item)=>{
                    if(item.totalDuration > 0){
                        let matches = item.realCoursewarePlayTime.match(/(\d+\.\d+)/); 
                        item.totalTime = parseInt(item.totalDuration);
                        item.realPlayTime = parseFloat(matches[0]) > item.totalTime ? item.totalTime : parseFloat(matches[0]);
                        item.Edusign = Edusign;
                        item.Edutoken = Edutoken; 
                        item.cookies = cookies;
                        realPlayTimeSum += item.realPlayTime;
                        totalDurationSum += parseInt(item.totalDuration);
                        array.push(item);
                    }
                });
                item.todu = array;
                console.log('array',array,realPlayTimeSum,totalDurationSum)
                useTodoList.setState({todoList:[...oldList,item]});
                useActions.setState({showPopup:false,realPlayTimeSum:realPlayTimeSum,totalDurationSum:totalDurationSum,});
            }).catch((err)=>{
                console.log(err);
            })
            
        }
        else{
            alert('Please enter a name for the item');
        }
    }

    return (
        <Box sx={{width:'300px', m: 1,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',padding:'20px 40px' 
            }}
        >
            <TextField
                id="item-name"
                label="Item name"
                style={{minWidth:'300px'}}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={saveItem} variant="contained" style={{marginTop:'16px'}}>Creat Todo Item</Button>
        </Box>

    );
}