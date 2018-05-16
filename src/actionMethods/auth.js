import axios from 'axios';
export const loginmethod=(payload)=> {
    return (dispatch => {
        return axios.post('http://192.168.200.159:3005/api/userdata/login', payload).then(({data}) => {
            localStorage.setItem('user', data.data[0].name);
            dispatch({
                type: 'LOGIN',
                payload: data
            });
            return data.message;
        }).catch((err)=>{
            console.log("login err====>",err);
        })
    });
}

export const logoutMethod=()=>{
    return dispatch => {
        localStorage.clear();
        localStorage.removeItem("user");
        dispatch({type:'logout'});
    }
};
