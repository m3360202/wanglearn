import { create } from 'zustand';

export const useTodoList = create((set) => ({
    todoList: []
}));