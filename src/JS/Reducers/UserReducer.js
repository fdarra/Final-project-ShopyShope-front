import { ADD_USER_FAIL, ADD_USER_LOAD, ADD_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_LOAD, DELETE_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_LOAD, EDIT_USER_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_LOAD, GET_USER_BY_ID_SUCCESS, GET_USERS_FAIL, GET_USERS_LOAD, GET_USERS_SUCCESS } from "../Actiontypes/UserActionTypes"

const initialState = {
    load: false,
    success: null,
    error: null,
    Users: [],
   User: {},
   deletedUser: {}
}

const UserReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_USERS_LOAD:
            return {...state, load: true}

        case GET_USERS_SUCCESS:
            return {...state, load: false, success: true, Users: payload}

        case GET_USERS_FAIL:
            return {...state, success: null, load: false, error: payload}

        case GET_USER_BY_ID_LOAD:
            return {...state, load: true}

        case GET_USER_BY_ID_SUCCESS:
            return {...state, load: false, success: true, User: payload}

        case GET_USER_BY_ID_FAIL:
            return {...state, success: null, load: false, error: payload}

        case DELETE_USER_LOAD:
            return {...state, load: true}

        case DELETE_USER_SUCCESS:
            return {...state, load: false, success: true, deletedUser: payload}

        case DELETE_USER_FAIL:
            return {...state, success: null, load: false, error: payload}

        case ADD_USER_LOAD:
            return {...state, load: true}

        case ADD_USER_SUCCESS:
            return {...state, load: false, success: true}

        case ADD_USER_FAIL:
            return {...state, success: null, load: false, error: payload}

        case EDIT_USER_LOAD:
            return {...state, load: true}

        case EDIT_USER_SUCCESS:
            return {...state, load: false, success: true}

        case EDIT_USER_FAIL:
            return {...state, success: null, load: false, error: payload}
            
    
        default:
            return state
    }
}

export default UserReducer