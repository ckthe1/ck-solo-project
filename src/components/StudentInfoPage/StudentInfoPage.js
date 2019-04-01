
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
// import { useAlert } from 'react-alert'
import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
// import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PrintIcon from '@material-ui/icons/Print';
import AddBoxIcon from '@material-ui/icons/Add';


const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: red,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
    fontFamily: "fantasy",
    fontSize: 12,
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


class StudentInfoPage extends Component {
  state = {
    title: '',
    date_completed: '',
    initial: '',
    bookId: '',
    user: this.props.user.id,
    count: this.props.bookReducer.length,
    isEnable: true,

  };


  handleChange = (property) => (event) => {
    console.log(event.target.value)
    event.preventDefault();
    this.setState({
      ...this.state,
      [property]: event.target.value,
    });
  };// get inputs infos onChange

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === '' && this.state.date_completed === '' && this.state.initial === '') {
      alert('BOOK TITLE, DATE AND INITIAL CANNOT BE EMPTY')
    } else {
      this.props.dispatch({ type: 'ADD_BOOK', payload: this.state });
      alert('GREAT SUCCESS')
    }
    this.setState({
      title: '',
      date_completed: '',
      initial: '',
      bookId: '',
      user: this.props.user.id,
      count: '',
      isEnable: false,
    })
    this.fetchBook();
  }// end handleSubmit, add student to DB onSubmit. 

  componentDidMount() {
    this.fetchBook();
  }
  fetchBook = () => {
    console.log('going to get, title, date, initial');
    this.props.dispatch({ type: 'FETCH_BOOK' });
  }// fetch added book info. date, title, initial

  handleDelete = id => () => {
    console.log('STUDENT INFO HANDLE DELETE', id);
    alert('Delete Successful')
    this.props.dispatch({ type: 'DELETE_BOOK', payload: id })
    this.setState({
      title: '',
      date_completed: '',
      initial: '',
      bookId: '',
      user: this.props.user.id,
      count: '',
      isEnable: true,
    })
  }// delete student, date, book title, initial from database

  handlePrint=()=>{
    console.log('print this');  
    window.print();
  }//end print

//This is the student page layout
render() {
    console.log('bookReducer', this.props.bookReducer);
    console.log('this.STATE', this.state);

    return (
      
      <div >
        <MuiThemeProvider theme={theme}>
          <div className="body">
            <div className="studentPageBody" >           
              <div>                
                <b>Reading is Oh so Sweet</b>
              </div>
                <h5>Please spend 10-15 minutes each night reading to your child</h5> 
            </div>
            <form onSubmit={this.handleSubmit} className="box">
              <div className="flex-container">
                <h4>Select a Date:
                <input type="date" value={this.state.date} onChange={this.handleChange('date_completed')} className="inputHeight" size="25"/></h4>
                <h4>Enter Book Title:
                <input type="text" value={this.state.title} onChange={this.handleChange('title')}
                    placeholder="Title of Book" size="25" className="inputHeight" /></h4>
                <div>
                  <h4>Parent Initial Here:
                <input type="text" value={this.state.initial} onChange={this.handleChange('initial')}
                      placeholder="Initials" size="10" className="inputHeight" /></h4>
                </div>              
                <Button type="submit" variant="contained" color="primary"
                  style={{ maxWidth: '10px', maxHeight: '10px', minWidth: '120px', minHeight: '100px' }} >Add Book<AddBoxIcon/></Button>
              </div>
            </form>
              <b>Total books read: {this.props.bookReducer.length}</b>
          </div>
          <b className="BackIcon">
            <Button className="BackIcon" variant="contained" color="primary" onClick={this.handlePrint} > Print<PrintIcon/></Button>
          </b>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title of Book</th>
                <th>Initial by a Parent</th>
                <th>Remove</th>
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
                      <Button variant="contained" color="secondary"
                        onClick={this.handleDelete(bookItem.book_id_id)} disabled={this.state.isEnable}>Remove
                      <DeleteIcon /></Button>
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

StudentInfoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(StudentInfoPage));

// disabled = { this.state.isEnable }