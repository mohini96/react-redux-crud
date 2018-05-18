import React from 'react';
import Button from 'material-ui/Button';
import TextField from "material-ui/TextField";
import {loginmethod} from './../actionMethods/auth';
import {fetchGmail} from './../actionMethods/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

 class Login extends React.Component{
     constructor() {
         super();
         this.state = {
             credentials:{}
         }
     }
     handleChange=(e)=>{
       const {credentials} =this.state;
       credentials[e.target.id]=e.target.value;
       this.setState({credentials});
     };
     logingmail=()=>{
         this.props.fetchGmail();
     }
     loginHandler=()=>{
       this.props.loginmethod(this.state.credentials).then((response)=>{
           if(response==='Success')
           {
               this.props.history.push('/userlist');
           }
           else
           {
               alert('username or password is invalid');
           }

       }).catch((err)=>{
           console.log("error in login",err);
       })

     };
     render(){

         return(
             <div class="loginform">
                 <h1>Login</h1>
                 <TextField type={'text'} id={'name'} onChange={this.handleChange}  placeholder={'enter name'} required/><br/>
                 <TextField type={'password'} id={'password'} onChange={this.handleChange}  placeholder={'enter password'} required/><br/>
                 <Button onClick={this.loginHandler}>login</Button>
                 <Button onClick={this.logingmail}>Google Authentication</Button>
             </div>
         )
     }
 }

 const mapStateToProps=state=>state;
 const mapDispatchToProps=(dispatch)=>bindActionCreators({loginmethod,fetchGmail},dispatch);
 export default connect(mapStateToProps,mapDispatchToProps)(Login)