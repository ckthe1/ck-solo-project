
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
import { Link } from 'react-router-dom';
import 'typeface-roboto';
import { withRouter } from 'react-router-dom';


const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: red,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: false,
    fontFamily: "fantasy",
    fontSize:12,
    // variant:"caption",
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
    studentId:'',
    title: '',
    bookId: '',
    user: this.props.user.id,
    count: this.props.studentReducer.length,
    isEnable: true,
  };
  
  componentDidMount() {
    this.fetchStudent();  
  };

  fetchStudent = () => {
    //make call to server using sagas
    console.log('going to get students infos');
    this.props.dispatch({ type: 'FETCH_STUDENT' });
  };


  handleClick = id => () => {
    console.log('STUDENT detail click:', id);
    this.props.history.push('/studentDetail')
    
  };

  // handleDelete = id => () => {
  //   console.log('STUDENT HANDLE DELETE', id);
  //   alert('Delete Successful')
  //   this.props.dispatch({ type: 'DELETE_STUDENT', payload: id })
  //   this.setState({
  //     studentId: '',
  //     title: '',     
  //     initial: '',
  //     bookId: '',
  //     user: this.props.user.id,
  //     count: '',
  //     isEnable: true,
  //   })
  // }

  // handleChange = (property) => (event) => {   
  //   event.preventDefault();
  //   this.setState({ 
  //   });
  // };// get inputs infos onChange



render() { 
  console.log('this.state:', this.state);
  console.log('this.props.studentReducer', this.props.studentReducer);
  
    return (
      <div >
        <MuiThemeProvider theme={theme}>
          <div className="bodyTeacher">
            </div>
            <b>Total students: {this.props.studentReducer.length}</b>      
          <table>
            <thead>
              <tr>
                <th>Students</th>
                <th>Total books read</th>
                <th>Reach 10 books</th>
                <th>Reach 20 books</th>
                <th>Reach 30 books</th>
              </tr>
            </thead>
            <tbody>
              {this.props.studentReducer.map((studentItem, i) => {
                console.log('studentItem', studentItem);               
                return (

                  <tr key={studentItem.id}>
                    <td>
                      {studentItem.username} 
                      <Typography variant="caption" gutterBottom>
                      <Button variant="contained" color="primary" onClick={this.handleClick(studentItem.student_id)}
                      style={{ maxWidth: '30px', maxHeight: '25px', minWidth: '70px', minHeight: '15px' }}>details</Button>
                      </Typography>
                    </td>
                    <td>
                      {studentItem.total_books_read}
                    </td>
                    <td>
                      {Number(studentItem.total_books_read) >= 2 ? "yes" : "no"}
                    </td>
                    <td>
                      {Number(studentItem.total_books_read) >= 20 ? "yes" : "no"}
                    </td>
                    <td>
                      {Number(studentItem.total_books_read) >= 30 ? "yes" : "no"}
                   
                      {/* <DeleteIcon variant="contained" color="secondary"  onClick={this.handleDelete(studentItem.student_id)} /> */}
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



export default withRouter(connect(mapStateToProps)(withStyles(styles)(TeacherPage)));


//checked={this.state.checked}
//disabled={this.state.isEnable}// disable button
