// import React from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


class StudentInfoPage extends Component {


  render(){
    return (
      <div >
        <div className="studentPageBody" >
          <h1>Reading is Oh So Sweet</h1>
      </div>
      <form>
        <input type="date"/> 
        <input type="text" placeholder="Book title" size="40"/>

      </form>
    </div>
 
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});
export default (connect(mapStateToProps)(StudentInfoPage));
// export default StudentInfoPage;
