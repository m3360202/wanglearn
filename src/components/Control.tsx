import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import '../assets/css/main.css';

import { TodoListState, useTodoList } from '../store/todoList';

export default function Control(): React.JSX.Element {
    const { todoList } = useTodoList((store: TodoListState) => store);

    const selectAll = () => {
        const oldList = useTodoList.getState().todoList;
        //如果有一个是未选中的，就全选；否则全部取消选中
        const selected = oldList.filter((item) => item.selected === false);
        const newList = oldList.map((item) => {
            if (selected.length > 0) {
                item.selected = true;
            }
            else {
                item.selected = false;
            }
            return item;
        });
        useTodoList.setState({ todoList: newList });
    }

    const signCompleted = () => {
        const oldList = useTodoList.getState().todoList;
        const newList = oldList.map((item) => {
            if (item.selected) {
                item.completed = true;
            }
            return item;
        });
        useTodoList.setState({ todoList: newList });
    }

    const clearCompleted = () => {
        const oldList = useTodoList.getState().todoList;
        const newList = oldList.filter((item) => item.completed === false);
        useTodoList.setState({ todoList: newList });
    }

    return (
        <Box style={{display:'flex',justifyContent:'space-around',justifyItems:'center',alignItems:'center',color:'#666',marginTop:'16px'}}>
            <Typography>{todoList.length} items left</Typography>
            <Typography onClick={selectAll}>All active</Typography>
            <Typography onClick={signCompleted}>Completed</Typography>
            <Typography onClick={clearCompleted}>Clear Completed</Typography>
        </Box>

    );
}