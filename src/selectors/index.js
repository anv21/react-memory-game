export const selectGameForm = (state) => state.get('form').toJS();

export const selectGameBackground = (state) => selectGameForm(state).background;

export const selectDifficulty = (state) => selectGameForm(state).difficulty;

export const selectEmail = (state) => selectGameForm(state).email;

export const selectGame = (state) => state.get('game').toJS();

export const selectName = (state) => selectGameForm(state).name;

export const selectTime = (state) => selectGame(state).time;

export const selectGameField = (state) => selectGame(state).gameField;