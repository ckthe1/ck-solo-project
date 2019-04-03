import studentInfoReducer from '../../redux/reducers/studentInfoReducer';


describe('testing studentInfoReducer', () => {
    test('should have the correct initial state', () => {
        const action = { type: 'SET_STUDENT_INFO', payload:['test'] };
        const returnedState = studentInfoReducer(undefined, action);
        expect(returnedState).toEqual(['test']);

    });
});