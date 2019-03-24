// import React from 'react';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

// import AddButton from './AddButton';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: red,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,

  },
  typography: {
    useNextVariants: true,
  }
});

class TeacherPage extends Component {
  state = {
    userName:'',
    title: '',
    bookId: '',
    user: this.props.user.id,
    count: this.props.bookReducer.length,
    isEnable: true,
    checked:false,

  };
  
  componentDidMount() {
    this.fetchStudent();
  }
  fetchStudent = () => {
    //make call to server using sagas
    console.log('going to get students infos');
    this.props.dispatch({ type: 'FETCH_STUDENT' });
  }

  // handleDelete = id => () => {
  //   console.log('STUDENT INFO HANDLE DELETE', id);
  //   alert('ARE YOU SURE YOU WANT TO DELETE THIS BOOK?, PLEASE CONFIRM!')
  //   this.props.dispatch({ type: 'DELETE_BOOK', payload: id })
  //   this.setState({
  //     title: '',
  //     date_completed: '',
  //     initial: '',
  //     bookId: '',
  //     user: this.props.user.id,
  //     count: '',
  //     isEnable: true,
  //   })
  // }


  render() {
    console.log('bookSeducer', this.props.bookReducer);
    console.log('this.STATE', this.state);
    if(this.props.bookReducer.length==="2"){
      this.setState({
        checked: true,
      })
    }

    return (
      <div >
        <MuiThemeProvider theme={theme}>
          <div className="bodyTeacher">
            </div>
            <h1>Total books read: {this.props.bookReducer.length}</h1>      
          <table>
            <thead>
              <tr>
                <th>Students</th>
                <th>Total books read</th>
                <th>Reach 10 books</th>
                <th>Reach 20 books</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.bookReducer.map((bookItem) => {
                return (

                  <tr key={bookItem.id}>
                    <td>
                      {new Date(bookItem.date_completed).getMonth() + 1}/
                      {new Date(bookItem.date_completed).getDate()}/
                      {new Date(bookItem.date_completed).getFullYear()}
                    </td>
                    <td>
                      {bookItem.title}
                    </td>
                    <td>
                      {bookItem.initial}
                    </td>
                    <td>
                      <input type="checkbox" checked=""/>
                    </td>
                    <td>
                      <Button variant="contained" color="secondary" onClick={this.handleDelete(bookItem.book_id_id)} >Delete</Button>
                    </td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </MuiThemeProvider>
      </div>

    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState
};
export default (connect(mapStateToProps)(TeacherPage));

//disabled={this.state.isEnable}// disable button
