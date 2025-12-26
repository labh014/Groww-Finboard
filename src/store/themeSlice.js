import { createSlice } from '@reduxjs/toolkit';



const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('finboard_theme');
        return saved ? JSON.parse(saved) : 'light';
    }
    return 'light';
};

const initialState = {
    value: 'light', 
};


export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {

        initializeTheme: (state) => {
            state.value = getInitialTheme();
        },
 
        toggleTheme: (state) => {
            state.value = state.value === 'light' ? 'dark' : 'light';
    
            if (typeof window !== 'undefined') {
                localStorage.setItem('finboard_theme', JSON.stringify(state.value));
            }
        },
    },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
