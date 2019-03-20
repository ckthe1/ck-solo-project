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
        console.log('fetchBook:', bookResponse.data);
        
    } catch (error) {
        console.log('saga Error with your fetchBook info');
    }
}
// function* fetchBook(action) {
//     console.log('get action:',action);
    
//     try {
//         yield axios.get('/book');
//         yield dispatch({ type: 'GET_BOOK' });
//     } catch (error) {
//         console.log('this was an error with the FETCH_book ');
//     }
// } 

// function* postInitial(action) {
//     try {
//         yield axios.post('/main/initial', action.payload);
//         // yield dispatch({ type: 'FETCH_BOOK' });
//     } catch (error) {
//         console.log('this was an error with the post-INITIAL ');
//     }
// } 
function* studentSaga() {
    yield takeLatest('FETCH_BOOK', fetchBook)
    yield takeLatest('ADD_BOOK', postBook);
    // yield takeLatest('ADD_DATE', postDate);
    // yield takeLatest('ADD_INITIAL', postInitial);
}

export default studentSaga;