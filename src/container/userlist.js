import React from 'react';
import {fetchUser,deleteUser,saveUser,UpdateUser} from '../actionMethods/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import TextField from "material-ui/TextField";
import Table, {
    TableBody,
    TableRow,
    TableCell,
    TableHead
} from 'material-ui/Table';
import Modal from 'react-responsive-modal';
import _ from 'lodash';

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false ,
            user:{},
            isEdit:false,
            tableField:'name',
            searchText:'',
            searchArr:[]
        };
    }

    onModal = () => {

        if(this.state.open)
        {
            this.setState({
                user:{},
                isEdit:false,
                open:!this.state.open
            });
        }
        else
        {
            this.setState({ open: !this.state.open });
        }
    };
    getData(user){
        this.setState({
            user : _.cloneDeep(user),
            isEdit:!this.state.isEdit
        },()=>{
            this.onModal();
        });
    }
    tableHandler = (datafield) =>{
        this.setState({tableField:datafield});
    }
    handleChange=(e)=>{
        const {user} =this.state;
        user[e.target.name]=e.target.value;
        this.setState({user});
    };
    onUpdate=()=>{
        this.props.UpdateUser(this.state.user).then((response)=>{
            if(response.payload.message==='Success')
            {
                this.props.history.push('/userlist');
            }
        }).catch((err)=>{
            console.log(err);
        })
        this.setState({ open: false });
    }
    // FOR SERCH
    handleSearch=(e)=>{
        this.setState({
            searchText:e.target.value
        },()=>{
            var tempArr=this.props;
            var newArr=[];
            for(var i=0;i<tempArr.users.length;i++){
                if(this.state.searchText!==''){
                    if(tempArr.users[i].name.indexOf(this.state.searchText)!==-1 || tempArr.users[i].email.indexOf(this.state.searchText)!==-1 ){
                        newArr.push(tempArr.users[i]);
                        this.setState({
                            searchArr:newArr,
                        })
                    }
                }
                else{
                    this.setState({
                        searchArr:[]
                    })
                }
            }
    });
    }
    onHandler=()=>{
        this.props.saveUser(this.state.user).then((response)=>{
       if(response.payload.message==='Success')
       {
                this.props.history.push('/userlist');
        }
        }).catch((err)=>{
            console.log(err);
        })
        this.setState({ open: false });
    };

    componentDidMount()
    {

        if(this.props.users.length === 0)
        {
            this.props.fetchUser();
        }

    }
    render(){
        const style = {
            margin: 12,
        };
        const users=(this.state.searchArr.length!==0) ? this.state.searchArr : this.props.users;
        const { open } = this.state;
        return(
            <div>
                <h1>Wel Come,{localStorage.getItem('user')}</h1>
                <h2>Userlist</h2>

                <Button  primary={true} style={style} onClick={this.onModal}>Add New User</Button>
                <Modal open={open} onClose={this.onModal}>
                    <div>
                        <h1>{ !this.state.isEdit ?<h5> Add New User  </h5>: <h5>Update User</h5>}</h1>
                        <TextField   name={"name"} type={'text'} value={this.state.user.name} placeholder={'enter name'}  onChange={this.handleChange}/><br/>
                        <TextField  name={'email'} type={'text'} placeholder={'enter email'} value={this.state.user.email}  onChange={this.handleChange}/><br/>
                        <TextField  name={"password"} type={'password'} placeholder={'enter password'} value={this.state.user.password} onChange={this.handleChange}/><br/>
                        {
                            !this.state.isEdit?
                                <Button type={'submit'}  onClick={this.onHandler} >submit</Button>
                                :
                                <Button type={'submit'}  onClick={this.onUpdate} >Update</Button>
                        }
                    </div>
                </Modal>
                    <div>
                    <label>Search</label> :
                    <TextField type="text" name="name" placeholder={'find your content here'} onKeyUp={this.handleSearch.bind(this)}/>
                  </div>
                <Table id='table'  border="2" >
                    <TableHead>
                    <TableRow>
                        <TableCell  > <span onClick={()=>this.tableHandler('name')}>Name <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg></span>	</TableCell>
                        <TableCell ><span onClick={()=>this.tableHandler('email')}>Email <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg></span></TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {

                            _.sortBy(users, this.state.tableField).map((user)=>{
                            return(
                                <TableRow>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell><Button onClick={() => this.props.deleteUser(user.id)} className="btn btn-danger">
                                        Remove
                                    </Button></TableCell>
                                    <TableCell><Button className="btn btn-danger" onClick={()=>{this.getData(user)}}>
                                        Edit
                                    </Button></TableCell>
                                </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return({
        users:state.user.user,
    })
};
const mapDispatchToProps=(dispatch)=>bindActionCreators({fetchUser,deleteUser,saveUser,UpdateUser},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(UserList);