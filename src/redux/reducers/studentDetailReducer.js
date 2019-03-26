const studentDetailReducer = (state = [], action) => {
    console.log('studentDetailReducer was hit', action);

    switch (action.type) {
        case 'GET_ID':
            return action.payload
        default:
            return state;
    }
};
export default studentDetailReducer;