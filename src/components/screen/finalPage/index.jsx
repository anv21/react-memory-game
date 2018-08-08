import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import {selectDifficulty, selectEmail, selectName, selectTime} from "../../../selectors";
import Header from '../../Header';

const calculateScore = (time, difficulty) => {
    let parseDifficulty = parseInt(difficulty);
    if (!Number.isInteger(parseDifficulty) || parseDifficulty <= 0) {
        return 0;
    }
    let score = (2 * parseDifficulty * 1.5) / time;
    if (score < 1) {
        score *= 1000;
    } else {
        score = 0;
    }
    return score.toFixed(0);
};

class FinalPage extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        difficulty: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    };

    state = {
        score: calculateScore(this.props.time, this.props.difficulty)
    };

    componentDidMount() {
        if (this.props.name && this.props.time > 0) {
            fetch("http://mmg-score.herokuapp.com/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.props.name,
                    email: this.props.email,
                    score: this.state.score
                })
            })
                .then((response) => response.json())
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div className='finalPage'>
                    <h2 className="heading">Congratulations</h2>
                    <div className="congratulations-content">
                        <div>You win, {this.props.name}!</div>
                        <div>Your time is {this.props.time} sec</div>
                        <div>Your score is {this.state.score}</div>
                    </div>
                    <img
                        src={require('../../Game/img/cong-img.gif')}
                        alt="congratulation"
                        className="congratulations-img"
                    />
                    <div className="button-container">
                        <Link className="button" to="/start-game">New game</Link>
                        <Link className="button" to="/score">Top players</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        name: selectName(state),
        time: selectTime(state),
        email: selectEmail(state),
        difficulty: selectDifficulty(state),
    });
};

export default connect(
    mapStateToProps
)(FinalPage)



