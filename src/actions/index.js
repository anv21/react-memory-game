export const SAVE_GAME_FORM = 'SAVE_GAME_FORM';
export const INIT_GAME = 'INIT_GAME';
export const OPEN_CARD = 'OPEN_CARD';
export const DELETE_CARDS = 'DELETE_CARDS';
export const CLOSE_CARDS = 'CLOSE_CARDS';
export const INCREMENT_TIME = 'INCREMENT_TIME';

export const saveGameForm = ({name, email, background, difficulty}) => ({
    type: SAVE_GAME_FORM,
    payload: {name, email, background, difficulty}
});

export const initGame = (gameField) => ({
    type: INIT_GAME,
    payload: {gameField}
});

export const openCard = (ind) => ({
    type: OPEN_CARD,
    payload: {ind},
});

export const deleteCards = (ind1, ind2) => ({
    type: DELETE_CARDS,
    payload: {ind1, ind2},
});

export const closeCards = (ind1, ind2) => ({
    type: CLOSE_CARDS,
    payload: {ind1, ind2},
});

export const incrementTime = () => ({
    type: INCREMENT_TIME,
});