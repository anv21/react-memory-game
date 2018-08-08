import React from 'react';
import {Redirect} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

import {selectGameBackground, selectGameField} from "../../selectors";
import {closeCards, deleteCards, openCard} from "../../actions";

import Header from '../Header';
import GameTimer from './GameTimer/index';
import Card from './Card/index';

class Game extends React.Component {

    static propTypes = {
        background: PropTypes.string.isRequired,
        gameField: PropTypes.arrayOf(
            PropTypes.shape({
                opened: PropTypes.bool.isRequired,
                image: PropTypes.string.isRequired
            })
        ).isRequired,
        openCard: PropTypes.func.isRequired,
        deleteCards: PropTypes.func.isRequired,
        closeCards: PropTypes.func.isRequired,
    };

    state = {
        openedCardsInd: null,
        stopOpen: false,
    };

    onCardClick = (ind) => () => {
        if (this.state.stopOpen) {
            return
        }
        if (this.state.openedCardsInd === null) {
            this.setState({openedCardsInd: ind});
            this.props.openCard(ind);
        } else {
            this.props.openCard(ind);
            this.setState({stopOpen: true});
            setTimeout(() => {
                if (this.props.gameField[this.state.openedCardsInd].image === this.props.gameField[ind].image) {
                    this.props.deleteCards(this.state.openedCardsInd, ind);
                    this.setState({openedCardsInd: null});
                } else {
                    this.props.closeCards(this.state.openedCardsInd, ind);
                    this.setState({openedCardsInd: null});
                }
                this.setState({stopOpen: false});
            }, 1000)
        }
    };

    render() {
        if (this.props.gameField.length === 0) {
            return (<Redirect to='/congratulation'/>)
        }
        return (
            <div>
                <Header/>
                <div className="game-container">
                    <h2 className="heading">Game</h2>
                    <GameTimer/>
                    <div className="game-cards-field">
                        {this.props.gameField.map(({opened, image}, ind) => {
                            return <Card
                                image={image}
                                background={this.props.background}
                                opened={opened}
                                onClick={this.onCardClick(ind)}
                                key={ind}
                            />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    background: selectGameBackground(state),
    gameField: selectGameField(state),
});

const mapDispatchToProps = dispatch => ({
    openCard: ind => dispatch(openCard(ind)),
    deleteCards: (ind1, ind2) => dispatch(deleteCards(ind1, ind2)),
    closeCards: (ind1, ind2) => dispatch(closeCards(ind1, ind2)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)