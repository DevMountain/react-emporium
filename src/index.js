import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux'
import App from './components/App/App';
import Login from './components/Login/Login';
import Shop from './components/Shop/Shop';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/login' component={Login} />
        <Route path='/shop' component={Shop} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react-node')
);
