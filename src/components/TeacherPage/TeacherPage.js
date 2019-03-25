// import React from 'react';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});


class TeacherPage extends Component {
  state = {
    userName:'',
    title: '',
    bookId: '',
    user: this.props.user.id,
    count: this.props.studentReducer.length,
    isEnable: true,
    checked:false,
    reachTwenty:'',
  };
  
  componentDidMount() {
    this.fetchStudent();
  }
  fetchStudent = () => {
    //make call to server using sagas
    console.log('going to get students infos');
    this.props.dispatch({ type: 'FETCH_STUDENT' });
  }

  handleDelete = id => () => {
    console.log('STUDENT INFO HANDLE DELETE', id);
    alert('Delete Successful')
    this.props.dispatch({ type: 'DELETE_BOOK', payload: id })
    this.setState({
      title: '',
      
      initial: '',
      bookId: '',
      user: this.props.user.id,
      count: '',
      isEnable: true,
    })
  }

  handleChange = (property) => (event) => {
    
    event.preventDefault();
    this.setState({
     
    });
  };// get inputs infos onChange

//   reach=()=>{
//   if(this.props.studentReducer.length === '7') {
//      this.setState({
//     reachTwenty: "Yes",
//     checked: true,
//   })
// }

  render() {
    console.log('studentSeducer', this.props.studentReducer.length);
    console.log('this.STATE', this.state);

    console.log('this.state TEACHER ', this.state);
    // else{
    //   this.setState({
    //     checked: false,
    //   })
    // }
    // if (this.props.student_id ===[i])
    return (
      <div >
        <MuiThemeProvider theme={theme}>
          <div className="bodyTeacher">
            </div>
            <a>Total students: {this.props.studentReducer.length}</a>      
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
              {this.props.studentReducer.map((studentItem, i) => {
                return (

                  <tr key={studentItem.id}>
                    <td>
                      {studentItem.username}
                    </td>
                    <td>
                      {studentItem.total_books_read}
                    </td>
                    <td>
                      <input type="checkbox" value={this.state.reachTwenty} onChange={this.handleChange('checked')} checked={this.state.checked} />
                    </td>
                    <td>
                      
                      {this.state.reachTwenty}

                    </td>
                    <td>
                      <DeleteIcon variant="contained" color="secondary"  onClick={this.handleDelete(studentItem.book_id_id)} />
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

TeacherPage.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles) (connect(mapStateToProps)(TeacherPage));



//checked={this.state.checked}
//disabled={this.state.isEnable}// disable button
