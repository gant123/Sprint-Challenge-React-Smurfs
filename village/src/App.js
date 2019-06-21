import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount() {
    //make GET request and assign to state sumrfs array
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => this.setState({ smurfs: response.data }))
      .catch(err => console.log(err));
  }

  getData() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => this.setState({ smurfs: response.data }))
      .catch(err => console.log(err));
  }

  deleteSmurf(e, id) {
    e.preventDefault();

    let url = `http://localhost:3333/smurfs/${id}`;
    axios
      .delete(url)
      .then(response => this.setState({ smurfs: response.data }))
      .catch(err => console.log(err));
  }
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <div className="background-image">
          <h1>Welcome to the Smurfs Village!</h1>
          <Link className="form-link" to="/smurf-form">
            Add a Smurf!
          </Link>
          <Route
            exact
            path="/"
            render={() => (
              <Smurfs
                deleteSmurf={this.deleteSmurf}
                smurfs={this.state.smurfs}
              />
            )}
          />
          <Route
            path="/smurf-form"
            render={props => <SmurfForm {...props} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
