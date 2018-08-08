import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {formReducer, gameReducer} from './reducers'
import {combineReducers} from 'redux-immutable';

import './components/defaultStyle/index.css';

import MainView from './components/MainVeiw';
import GameOption from './components/GameOption'
import Game from './components/Game';
import FinalPage from './components/screen/finalPage';
import Score from './components/Score';
import NotFound from './components/screen/notFoundPage';

const reducer = combineReducers({
    form: formReducer,
    game: gameReducer,
}
);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={MainView}/>
                <Route path="/start-game" component={GameOption}/>
                <Route path="/congratulation" component={FinalPage}/>
                <Route path="/game" component={Game}/>
                <Route path="/score" component={Score}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('app'));