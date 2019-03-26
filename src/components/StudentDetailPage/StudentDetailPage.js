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
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


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


class StudentDetailPage extends Component {
    state = {
        title: '',
        date_completed: '',
        initial: '',
        bookId: '',
        user: this.props.user.id,
        count: this.props.bookReducer.length,
        isEnable: true,

    };

    componentDidMount() {
        this.fetchBook();
    }

    fetchBook = () => {
        //make call to server using sagas
        console.log('studentDetailPage fetch');
        this.props.dispatch({ type: 'FETCH_STUDENT_INFO' });
    }

    render() {
        console.log('studentDetailPage: studentDetailReducer', this.props.studentDetailReducer);
        console.log('studentDetailPage: this.STATE', this.state);
        console.log('studentInfoReducer', this.props.studentInfoReducer);
     
        return (
            <div >
                <MuiThemeProvider theme={theme}>
                    <div className="bodyDetailPage">
                        <div className="studentPageBody" >
                            <div>
                                <b>Student Name: {this.props.studentDetailReducer.username} </b>
                            </div>
                        </div>                    
                        <b>Total books read: {this.props.studentDetailReducer}</b>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Book title</th>
                                <th>Initial by a Parent</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.studentInfoReducer.filter(item => item.student_id === this.props.studentDetailReducer).map((bookItem) => {
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