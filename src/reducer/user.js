import _ from 'lodash';


const initialState={
    user:[],
    image:[]
};

export default (state=initialState,action)=>{
    switch (action.type) {
        case 'FETCH_USER':
            return {...state,user:_.cloneDeep(action.payload)};
        case  'FETCH_IMAGE':
            return {...state,image:_.cloneDeep(action.payload)};
        case 'SAVE_USER':
            const data = state.user;
            data.push(action.payload);
            return{...state,user:_.cloneDeep(data)};
        case  'SAVE_IMAGE':
            const dataimage = state.image;
            dataimage.push(action.payload);
            return{...state,image:_.cloneDeep(dataimage)};
        case 'DELETE_USER':
            //................
            const deluser = state.user;
            const index = _.findIndex(deluser, {'id': action.payload});
            deluser.splice(index,1);
            return { ...state,user:_.cloneDeep(deluser)};
        case 'UPDATE_USER':
            const updateUser = state.user;
            const findid = action.payload.id;
            const indexfind = _.findIndex(updateUser, {'id': findid});
            updateUser[indexfind] = action.payload;
            return { ...state,user:_.cloneDeep(updateUser)};
            //..................
            // const id = action.payload;
            // return {
            //     ...state,
            //     user: state.user.filter(item => item.id !== id)
            // };
        default:
            return {...state}
    }
}

// switch (action.type){
//     case 'FETCH_USER':
//         return action.payload;
//     case 'SAVE_USER':
//         return action.payload
//     default:
//         return state;
// }