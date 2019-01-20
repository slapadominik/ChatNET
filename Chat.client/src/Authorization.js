import store from './store';

export const isUserLoggedIn = () => {
   var newState =store.getState();
    if(newState.messages.user != null) {
       return true;
    }

     return false;
}

store.subscribe(isUserLoggedIn)