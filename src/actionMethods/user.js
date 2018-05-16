import axios from 'axios';
export const fetchUser=()=> {
    return (dispatch => {
        return axios.get('http://192.168.200.159:3005/api/userdata').then(({data}) => {
            dispatch({
                type: 'FETCH_USER',
                payload: data
            });

        }).catch((err)=>{
            console.log("login err====>",err);
        })
    });
}
export const fetchGmail=()=> {
    debugger;
    return (dispatch => {
        return axios.get('http://192.168.200.159:3005/auth/google').then(({data}) => {
            console.log(data)

        }).catch((err)=>{
            console.log("login err====>",err);
        })
    });
}

export const deleteUser = (id) => {
    return (dispatch => {
        return axios.delete('http://192.168.200.159:3005/api/userdata/delete/'+id).then(({data}) => {
            return dispatch({
                type: 'DELETE_USER',
                payload:id
            })
        }).catch((err)=>{
            console.log(err.message);
        })
    });
}
export function saveUser(users) {
    return dispatch => {
       return axios.post('http://192.168.200.159:3005/api/userdata/add/',users).then(({data})=>{
            return dispatch({
                type: 'SAVE_USER',
                payload:users
            })
        }).catch((err)=>{
            console.log(err.message);
        })
    }
}
export function UpdateUser(users) {
    return dispatch => {
        return axios.put('http://192.168.200.159:3005/api/userdata/update/',users).then(({data})=>{
            return dispatch({
                type: 'UPDATE_USER',
                payload:users
            })
        }).catch((err)=>{
            console.log(err.message);
        })
    }
}
export const fetchImage=()=> {
    return (dispatch => {
        return axios.get('http://192.168.200.159:3005/api/userdata/image').then(({data}) => {
            dispatch({
                type: 'FETCH_IMAGE',
                payload: data
            });
        }).catch((err)=>{
            console.log("login err====>",err);
        })
    });
}
export const fileUpload=(file)=>{
    const formData = new FormData();
    formData.append('file',file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return dispatch => {
        return axios.post('http://192.168.200.159:3005/api/userdata/fileupload',formData,config).then(({data})=>{
            return dispatch({
                type: 'SAVE_IMAGE',
                payload:{"image":file.name}
            })
        }).catch((err)=>{
            console.log(err.message);
        })
    }

}


