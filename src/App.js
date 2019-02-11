import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore , applyMiddleware } from 'redux';
import Navigator from './routes/Navigator';
import reducers from './reducers';
class App extends Component {
    render()
    {
        return(
            <Provider store={createStore(reducers , {} , applyMiddleware(ReduxThunk) )}>
                <Navigator/>
            </Provider>
        );
    }
}

export default App;