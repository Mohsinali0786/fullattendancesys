import rootReducer from './reducers/index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';

const initialState = {
    AllUsers: {
        Users: localStorage.getItem("Users") ? JSON.parse(localStorage.getItem("Users"))?.AllUsers?.Users : [],
        Company: localStorage.getItem("Users") ? JSON.parse(localStorage.getItem("Users"))?.AllUsers?.Company : [],

    }
}
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store    