
const studentReducer = (state = [], action) => {
    console.log('studentReducer was hit', action);

    switch (action.type) {
        case 'GET_STUDENT':
            return action.payload
        default:
            return state;
    }
};
export default studentReducer;