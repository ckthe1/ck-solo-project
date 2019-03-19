


const bookReducer = (state = [], action) => {
    console.log('bookReducer was hit', action);

    switch (action.type) {
        case 'GET_BOOK':
            return action.payload
        default:
            return state;
    }
};
export default bookReducer;