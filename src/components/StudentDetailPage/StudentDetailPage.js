import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import ReplyIcon from '@material-ui/icons/Reply';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


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
});

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    Icon: {
        marginRight: theme.spacing.unit,
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
    };

    componentDidMount() {
        this.fetchBook();
    }

    fetchBook = () => {
        //make call to server using sagas
        console.log('studentDetailPage fetch');
        this.props.dispatch({ type: 'FETCH_STUDENT_INFO' });
    }// get student infos. date , title, initial, id

    handleClick=()=>{
        console.log('back button clicked');
        
        this.props.history.push('/about');

    }

    render() {
        console.log('studentDetailPage: studentDetailReducer:', this.props.studentDetailReducer);
        console.log('studentDetailPage: this.STATE:', this.state);
        console.log('studentInfoReducer:', this.props.studentInfoReducer);

        return (
            <div >
                <MuiThemeProvider theme={theme}>
                    <div className="bodyDetailPage">
                        <div className="studentPageBody" >
                            <b>Student Name: {this.props.studentDetailReducer.username}</b>
                        </div>
                        <div>
                            <b>Total books read: {this.props.studentDetailReducer.total_books_read}</b>
                        </div>
                    </div>
                    <p className="BackIcon">
                        <Button  variant="contained" color="primary" onClick={this.handleClick}>back
                        <ReplyIcon /></Button>
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Book title</th>
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