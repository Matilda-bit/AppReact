import { createStore } from 'redux';
import rootReducer from './reducers/meme'; 

const store = createStore(rootReducer);

export default store;


