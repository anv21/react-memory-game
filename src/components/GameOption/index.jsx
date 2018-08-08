import React from 'react';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {initGame, saveGameForm} from "../../actions";
import {selectGameForm} from '../../selectors';
import {CARDS, BACKGROUND} from "../const";
import Header from '../Header';

export const generateGameField = (difficulty) => {
    let randomCards = CARDS.sort(() => 0.5 - Math.random())
        .slice(0, difficulty);
    randomCards = randomCards.concat(randomCards).sort(() => 0.5 - Math.random());
    return randomCards.map((url) => ({opened: false, image: url}))
};

class GameOption extends React.Component {
    static propTypes = {
        onFormChange: PropTypes.func.isRequired,
        formState: PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            background: PropTypes.string.isRequired,
            difficulty: PropTypes.string.isRequired
        }).isRequired,
    };

    state = {
        redirectToGame: false,
    };

    onInputChange = (key) => (event) => {
        let value = event.target.value;
        this.props.onFormChange({
            ...this.props.formState,
            [key]: value
        })
    };

    onSubmitClick = (event) => {
        event.preventDefault();
        this.props.initGame(generateGameField(this.props.formState.difficulty));
        this.setState({redirectToGame: true});
    };

    render() {
        if (this.state.redirectToGame === true) {
            return <Redirect to='/game'/>
        }

        return (
            <div>
                <Header/>
                <h2 className="heading">Game option</h2>
                <form onSubmit={this.onSubmit} className="game-options__form">
                    <div className="game-options__field">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="name"
                            value={this.props.formState.name}
                            onChange={this.onInputChange('name')}
                        />
                    </div>
                    <div className="game-options__field">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="email"
                            value={this.props.formState.email}
                            onChange={this.onInputChange('email')}
                        />
                    </div>
                    <div className="game-options__field radio-bth" id="card-face">
                        {BACKGROUND.map((bgUrl, ind) => (
                            <label>
                                <img
                                    src={bgUrl}
                                    alt={bgUrl}
                                    name="background"
                                    key={bgUrl}
                                    className={"game-option-image" + " " + (bgUrl === this.props.formState.background ? 'checked' : '')}
                                />
                                <input
                                    onChange={this.onInputChange('background')}
                                    type="radio"
                                    value={bgUrl}
                                    checked={bgUrl === this.props.formState.background}
                                    name="background"
                                    key={ind}
                                />
                            </label>
                            )
                        )}
                    </div>
                    <div className="game-options__field">
                        <label>
                            <select
                                onChange={this.onInputChange('difficulty')}
                                value={this.props.formState.difficulty}
                            >
                                <option value="5">Easy</option>
                                <option value="10">Normal</option>
                                <option value="15">Hard</option>
                                <option value="20">Very Hard</option>
                            </select>
                        </label>
                    </div>
                    <button className="button" onClick={this.onSubmitClick}>Start game</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formState: selectGameForm(state),
});

const mapDispatchToProps = dispatch => ({
    onFormChange: formState => dispatch(saveGameForm(formState)),
    initGame: gameField => dispatch(initGame(gameField)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameOption)
