import React from 'react';
import '../App.css';
import {fetchImage,fileUpload} from '../actionMethods/user';
import TextField from "material-ui/TextField";
import Button from 'material-ui/Button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class Gallary extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            file:null,
            user:{},
        }

    }
    onFormSubmit=(e)=>{
        e.preventDefault() // Stop form submit
        this.props.fileUpload(this.state.file).then((response)=>{
            alert("inserted");
            // if(response.data['message']){
            //     alert("inserted");
            // }
        })
    }
    onChange=(e)=> {
        this.setState({file:e.target.files[0]})
    }
    // fileUpload=(file)=>{
    //     const url = 'http://192.168.200.159:3005/api/userdata/fileupload';
    //     const formData = new FormData();
    //     formData.append('file',file)
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     }
    //     return  post(url, formData,config)
    // }
    componentDidMount()
    {
        if(this.props.users.length === 0)
        {
            this.props.fetchImage();
        }

    }
    render() {
        const {users}=this.props;
        return (

            <div>
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <TextField type="file" onChange={this.onChange} />
                <Button type="submit">Upload</Button>
            </form>
                <div>
                    {
                        Object.keys(users).map((key,index)=>{
                            return(
                                <div className="gallery zoom">
                                    <a target="_blank" href={'http://localhost:3005/'+users.data[index]['image']}>
                                        <img height={300} width={300} alt={'img'}
                                             src={'http://localhost:3005/'+users.data[index]['image']}/>
                                    </a>

                                    <div className="desc">description</div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>

         )
    }
}
const mapStateToProps=state=>{
    return({
        users:state.user.image,
    })
};
const mapDispatchToProps=(dispatch)=>bindActionCreators({fetchImage,fileUpload},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Gallary);