import {fromJS} from 'immutable';

import {
    INIT_GAME,
    OPEN_CARD,
    SAVE_GAME_FORM,
    INCREMENT_TIME,
    DELETE_CARDS,
    CLOSE_CARDS
} from '../actions';
import {BACKGROUND} from '../components/const';

const initialFormState = fromJS({
    name: '',
    email: '',
    background: BACKGROUND[0],
    difficulty: '5'
});

export const formReducer = (state = initialFormState, action) => {
    switch (action.type) {
        case SAVE_GAME_FORM:
            return fromJS(action.payload);
        default:
            return state;
    }
};

const initialGameState = fromJS({});

export const gameReducer = (state = initialGameState, action) => {
    switch (action.type) {
        case INIT_GAME:
            return fromJS({...state, time: 0, gameField: action.payload.gameField});
        case OPEN_CARD: {
            return state.updateIn(['gameField', action.payload.ind, 'opened'], () => true)
        }
        case DELETE_CARDS: {
            let newGameField;
            const indexesToDel = [action.payload.ind1, action.payload.ind2]
                .sort((a, b) => b - a);

            newGameField = state.get('gameField');
            indexesToDel.forEach(ind => {
                newGameField = newGameField.splice(ind, 1)
            });
            return state.set('gameField', newGameField);
        }
        case CLOSE_CARDS: {
            let newState;
            newState = state.updateIn(['gameField', action.payload.ind1, 'opened'], () => false);
            newState = newState.updateIn(['gameField', action.payload.ind2, 'opened'], () => false);
            return newState;
        }
        case INCREMENT_TIME: {
            let newTime = state.get('time');
            newTime += 1;
            return state.set('time', newTime);
        }
        default:
            return state
    }
};