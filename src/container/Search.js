import React from 'react';
import _ from 'lodash';
import {fetchUser} from '../actionMethods/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TextField from "material-ui/TextField";
class Search extends React.Component {
    constructor(){
        super();
        this.state={
            user:{},
            alluser:{}
        }

    }
    handleSearch=(e)=>{
      console.log(e.target.name);
        const {users}=this.props;
        console.log("users",users);
    }


    render() {
        return (
            <div className="row">
                <div className="input-field">
                    <label>Search</label> :
                    <TextField type="text" placeholder={'find your content here'} onKeyUp={this.handleSearch.bind(this)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return({
        users:state.user.user,
    })
};
const mapDispatchToProps=(dispatch)=>bindActionCreators({fetchUser},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Search);
