import React, { Component } from 'react';
import './App.css';
import {} from 'react-bootstrap'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Login from './container/Login';
import Email from './container/email';
import UserList from './container/userlist';
import {connect} from 'react-redux';
import Register from "./container/Register";
import About from "./container/about";
import {logoutMethod} from './actionMethods/auth';
import Gallary from "./container/Gallary";

class App extends Component {
    logoutHandler=()=>{

        this.props.logoutMethod();
     }
  render() {
      const PublicRoute=({component:Component,...rest})=>(
          <Route {...rest} render={(routeProps)=>(!this.props.users ?
              <div>

                  <Button component={Link} to="/login">
                     Login
                  </Button>
                  <Button component={Link} to="/register">
                      Register
                  </Button>
                  <Component {...routeProps} /></div>: <Redirect to={'/about'} />)} />
      );
      const PrivateRoute=({component:Component,...rest})=>(
          <Route {...rest} render={(routeProps)=>(this.props.users ?
              <div>
                  <Button component={Link} to="/userlist">User List</Button>
                  <Button component={Link} to="/gallary">Gallary</Button>
                  <Button component={Link} to="/about">About</Button>
                  <Button component={Link} to="/email">Contact us</Button>
                  <a onClick={this.logoutHandler}><Button component={Link} to="/login">Logout</Button></a>
                  <Component {...routeProps} /></div>: <Redirect to={'/login'} />)} />
      );
      return (
          <div className="App">
              <div className="container">
                  <div className="App">
                    <Switch>
                        <PublicRoute path={'/login'} component={Login} />
                        <PublicRoute path={'/register'} component={Register} />


                        <PrivateRoute path={'/userlist'} component={UserList} />
                        <PrivateRoute path={'/gallary'} component={Gallary} />
                        <PrivateRoute path={'/about'} component={About} />
                        <PrivateRoute path={'/email'} component={Email} />
                    </Switch>
                  </div>
              </div>
          </div>
    );
  }
}
const mapStateToProps=state=>{
    return {
        users:state.auth.user
    }
};
const mapDispatchToProps=(dispatch)=>bindActionCreators({logoutMethod},dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
