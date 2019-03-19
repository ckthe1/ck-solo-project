// import React from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { createMuiTheme } from '@material-ui/core/styles';
// import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

// import AddButton from './AddButton';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: cyan,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,

  },
  typography: {
    useNextVariants: true,
  }
});

class StudentInfoPage extends Component {
  state = {
    title: '',
    date_completed: '',  
    initial:'',
  };


  handleChange = (property) => (event) => {
    console.log(event.target.value)
    event.preventDefault();
    this.setState({
      ...this.state,
      [property]: event.target.value,
    });
  };// get inputs infos onChange

  handleSubmit= (event)=>{
    event.preventDefault();
    if (this.state.title === '' && this.state.date_completed ===''){
      alert('BOOK TITLE, DATE AND INITIAL CANNOT BE EMPTY')
    }else{
      this.props.dispatch({ type: 'ADD_BOOK', payload: this.state });

    }
    this.setState({
      title: '',
      date_completed: '',
      initial: '',
    })
  }// end handleSubmit, add student to DB onSubmit

  componentDidMount() {
    this.fetchBook();
  }
  fetchBook = () => {
    //make call to server using sagas
    console.log('going to get, title, date, initial');
    this.props.dispatch({ type: 'FETCH_BOOK' });
  }

  render(){
    return (
      <div >
        <MuiThemeProvider theme={theme}>
        <div className="studentPageBody" >
          <h1>Reading is Oh So Sweet</h1>
      </div>
          <form onSubmit={this.handleSubmit}>         
            <input type="text" value={this.state.title} onChange={this.handleChange('title')} placeholder="Book title" size="40"/>
            <input type="date" value={this.state.date} onChange={this.handleChange('date_completed')} /> 
          <div>
          Parent initial Here:
          <input type="text" value={this.state.initial} onChange={this.handleChange('initial')} placeholder="initials" size="6"/>
          </div>          
          <Button  type="submit" variant="contained" color="primary">Add Book</Button>        
      </form>
      </MuiThemeProvider>
      <p>Total of book read:</p>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title of Book</th>
            <th>Initial by Parents</th>
          </tr>
        </thead>
        <tbody>
          
              {this.props.bookReducer.map((bookItem)=> {
                  return (
                    <tr >
                      <td key={bookItem.id}>
                        {bookItem.date_completed}
                    </td>
                    <td>
                      {bookItem.title}
                    </td>
                    <td>
                      {bookItem.initial}
                    </td>
                    </tr>
                  )

              }
                )}

         
         
          
        
        </tbody>

      </table>
      <>
      {JSON.stringify(this.props.bookReducer)}
      </>
    </div>
 
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState
};
export default (connect(mapStateToProps)(StudentInfoPage));
// export default StudentInfoPage;
