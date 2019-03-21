// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import logger from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
import { takeLatest, put as dispatch } from 'redux-saga/effects';
import axios from 'axios';


function* postBook(action) {
    console.log('action.payload:', action.payload);
    
    try {
        yield axios.post('/book', action.payload);
        yield dispatch({ type: 'FETCH_BOOK' });
    } catch (error) {
        console.log('this was an error with the post-BOOK ');
    }
} 


function* fetchBook() {
    console.log('fetchBook was hit');
    try {
        const bookResponse = yield axios.get('/book');
        yield dispatch({ type: 'GET_BOOK', payload: bookResponse.data })
        console.log('IS THIS WORKING', bookResponse.data);
        

        // const countBook = yield axios.get('/book');
        // yield dispatch({ type: 'COUNT_BOOK' });
        // console.log('countBook sagas:', countBook.data);
        
    } catch (error) {
        console.log('saga Error with your fetchBook info');
    }
}
function* deleteBook(action) {
    console.log('deleteBook saga hit', action.payload)
    
    try {
        yield axios.delete('/book/'+ action.payload);
        yield dispatch({ type: 'FETCH_BOOK'})

    } catch (error) {
        console.log('saga Error with deleteBook sagas');
    }
}


function* studentSaga() {
    yield takeLatest('FETCH_BOOK', fetchBook)
    yield takeLatest('ADD_BOOK', postBook);
    yield takeLatest('DELETE_BOOK', deleteBook);
    // yield takeLatest('ADD_INITIAL', postInitial);
}

export default studentSaga;