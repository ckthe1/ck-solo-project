const studentInfoReducer = (state = [], action) => {
    console.log('studentInfoReducer was hit', action);

    switch (action.type) {
        case 'SET_STUDENT_INFO':
            return action.payload
        default:
            return state;
    }
};
export default studentInfoReducer;