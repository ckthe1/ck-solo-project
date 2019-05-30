import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
// import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import ReplyIcon from '@material-ui/icons/Reply';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PrintIcon from '@material-ui/icons/Print';
import { spawn } from 'child_process';

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
        fontFamily: "fantasy",
        fontSize: 12,
    }
});// material UI colors

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        marginRight: theme.spacing.unit,
        fontSize: 32,
    },
});


class StudentDetailPage extends Component {
    state = {
        title: '',
        date_completed: '',
        initial: '',
        comments:'',
        bookId: '',
        user: this.props.user.id,
        count: this.props.bookReducer.length,
    };

    componentDidMount() {
        this.fetchBook();
    }// on load, execute this function

    fetchBook = () => {
        //make call to server using sagas
        console.log('studentDetailPage fetch');
        this.props.dispatch({ type: 'FETCH_STUDENT_INFO' });
    }// get student infos. date , title, initial, id

    handleClick=()=>{
        console.log('back button clicked');        
        this.props.history.push('/about');
    }// going back to the about page.

    handlePrint = () => {
        console.log('print this');
        window.print();
    }//end print. Print the current page

/// This is the detailed page of each student's info when you click on the "detail" button.
render() {
        console.log('studentDetailPage: studentDetailReducer:', this.props.studentDetailReducer);
        console.log('studentDetailPage: this.STATE:', this.state);
        console.log('studentInfoReducer:', this.props.studentInfoReducer);

        return (
            <div >
                <MuiThemeProvider theme={theme}>
                    <div className="bodyDetailPage">
                        <div className="studentPageBody" >
                            <div className="flex-names">                              
                                Student Name: {this.props.studentDetailReducer.username}
                            </div>
                        </div>
                        <div>
                            {/* number of total books change color to blue, red, gold when it reaches 10,20,30 */}
                            <div className="flex-names">
                                Total books read:       
                                {Number(this.props.studentDetailReducer.total_books_read) === 3 ? <span className='reachBook10'>{this.props.studentDetailReducer.total_books_read}</span>
                                        : Number(this.props.studentDetailReducer.total_books_read) === 5 ? <span className='reachBook20'>{this.props.studentDetailReducer.total_books_read}</span>
                                        : Number(this.props.studentDetailReducer.total_books_read) === 11 ? <span className='reachBook30'>{this.props.studentDetailReducer.total_books_read}</span>
                                        : <span >{this.props.studentDetailReducer.total_books_read}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="flex-names">                      
                        <div className="BackIcon"><Button  variant="contained" color="primary" onClick={this.handleClick}>
                            back<ReplyIcon /></Button>
                        </div>                      
                        <div className="BackIcon"><Button  variant="contained" color="primary" onClick={this.handlePrint} >
                            Print <PrintIcon /></Button>
                        </div>                 
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Book title</th>
                                <th>Comments</th>
                                <th>Initial by a Parent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.studentInfoReducer.filter(item => item.student_id === this.props.studentDetailReducer.student_id).map((bookItem) => {
                                return (
                                    
                                    <tr key={bookItem.id}>
                                        <td>
                                            {new Date(bookItem.date_completed).getMonth() + 1}/
                                            {new Date(bookItem.date_completed).getDate()}/
                                            {new Date(bookItem.date_completed).getFullYear()}
                                        </td>
                                        <td > 
                                            {/* book title changes color to blue, red, gold when it reaches 10,20,30 */}
                                            {Number(this.props.studentDetailReducer.total_books_read) === 3 ? <span className='reachBook10'>{bookItem.title}</span> 
                                                : Number(this.props.studentDetailReducer.total_books_read) ===5 ? <span className='reachBook20'>{bookItem.title}</span> 
                                                : Number(this.props.studentDetailReducer.total_books_read) ===11 ? <span className='reachBook30'>{bookItem.title}</span>
                                                : <span >{bookItem.title}</span> }     
                                        </td>
                                        <td>   
                                            {/* comments changes color to blue, red, gold when it reaches 10,20,30 */}         
                                            {Number(this.props.studentDetailReducer.total_books_read) === 3 ? <span className='reachBook10'>{bookItem.comments}</span>
                                                : Number(this.props.studentDetailReducer.total_books_read) === 5 ? <span className='reachBook20'>{bookItem.comments}</span>
                                                : Number(this.props.studentDetailReducer.total_books_read) === 11 ? <span className='reachBook30'>{bookItem.comments}</span>
                                                : <span >{bookItem.comments}</span>}
                                        </td>
                                        <td>
                                            {/* initials changes color to blue, red, gold when it reaches 10,20,30 */}
                                            {Number(this.props.studentDetailReducer.total_books_read) === 3 ? <span className='reachBook10'>{bookItem.initial}</span>
                                                : Number(this.props.studentDetailReducer.total_books_read) === 5 ? <span className='reachBook20'>{bookItem.initial}</span>
                                                : Number(this.props.studentDetailReducer.total_books_read) === 11 ? <span className='reachBook30'>{bookItem.initial}</span>
                                                : <span >{bookItem.initial}</span>}
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

StudentDetailPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(StudentDetailPage));