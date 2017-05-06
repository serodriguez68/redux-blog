import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Browser router: interacts with the history library
// Route: workhorse of react-router. Is a component that if fuzzily matches
// the given path, renders the component given as prop.
// Switch: looks for all Route components and renders ONLY the FIRST that fizzily
// matches the path given in the nested Routes
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise'; //import redux-promise middleware

import reducers from './reducers';

// Project specific imports
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// set-up middleware
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// Route: If a user goes to this route, show this component
// THE ORDER OF THE ROUTES IS IMPORTANT, the switch will stop on the first
// matching path
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
