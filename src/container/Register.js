import React from 'react';
import {saveUser} from '../actionMethods/user';
import {bindActionCreators} from 'redux';
import Button from 'material-ui/Button';
import TextField from "material-ui/TextField";
import {connect} from 'react-redux';

class Register extends React.Component{
    constructor(){
        super();
        this.state={
            user:{}
        }
    }
    handleChange=(e)=>{
        const {user} =this.state;
        user[e.target.name]=e.target.value;
        this.setState({user});
    };
    onHandler=()=>{
        this.props.saveUser(this.state.user).then((response)=>{
            console.log(response);
            if(response.payload.message==='Success')
            {
                this.props.history.push('/login');
            }
            else
            {
                alert('Not Successful');
            }
        }).catch((err)=>{
            console.log(err);
        })
    };

    render(){
        return(
            <div>
                <h1>Register</h1>
                <TextField name={"name"} type={'text'} placeholder={'enter name'}  onChange={this.handleChange}/><br/>
                <TextField name={'email'} type={'text'} placeholder={'enter email'}  onChange={this.handleChange}/><br/>
                <TextField name={"password"} type={'password'} placeholder={'enter password'}  onChange={this.handleChange}/><br/>
                <Button type={'submit'}  onClick={this.onHandler} >submit</Button>
            </div>
        )
    }
}

const mapStateToProps=state=>state;
const mapDispatchToProps=(dispatch)=>bindActionCreators({saveUser},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Register);