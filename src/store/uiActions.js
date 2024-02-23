import { create } from 'zustand';


export const useActions = create((set) => ({
    showPopup:false,
    realPlayTimeSum:0,
    totalDurationSum:0,
    taskState:0
}));