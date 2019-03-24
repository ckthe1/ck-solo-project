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
        console.log('FETCH BOOK SAGAS', bookResponse.data);
        
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

function* fetchStudent() {
    console.log('fetchStudent was hit');
    try {
        const studentResponse = yield axios.get('/teacher');
        yield dispatch({ type: 'GET_STUDENT', payload: studentResponse.data })
        console.log('FETCH student SAGAS', studentResponse.data);

    } catch (error) {
        console.log('saga Error with your fetchStudent infos');
    }
}
function* studentSaga() {
    yield takeLatest('FETCH_BOOK', fetchBook)
    yield takeLatest('ADD_BOOK', postBook);
    yield takeLatest('DELETE_BOOK', deleteBook);
    yield takeLatest('FETCH_STUDENT', fetchStudent);
}

export default studentSaga;