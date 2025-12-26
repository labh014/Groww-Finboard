import { createSlice } from '@reduxjs/toolkit';


const getInitialWidgets = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('finboard_data');
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

const initialState = {
    widgets: [],
};


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {

        initializeWidgets: (state) => {
            state.widgets = getInitialWidgets();
        },

        addWidget: (state, action) => {
            state.widgets.push(action.payload);

            if (typeof window !== 'undefined') {  // saving
                localStorage.setItem('finboard_data', JSON.stringify(state.widgets));
            }
        },

        removeWidget: (state, action) => {
            state.widgets = state.widgets.filter(w => w.id !== action.payload);

            if (typeof window !== 'undefined') {  // saving
                localStorage.setItem('finboard_data', JSON.stringify(state.widgets));
            }
        },

        reorderWidgets: (state, action) => {
            state.widgets = action.payload; // Set new order directly

            if (typeof window !== 'undefined') {
                localStorage.setItem('finboard_data', JSON.stringify(state.widgets));
            }
        },
    },
});

export const { addWidget, removeWidget, initializeWidgets, reorderWidgets } = dashboardSlice.actions;
export default dashboardSlice.reducer;
