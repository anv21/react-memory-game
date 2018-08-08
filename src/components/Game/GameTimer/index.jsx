import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

import {selectTime} from "../../../selectors";
import {incrementTime} from "../../../actions";

class GameTimer extends React.Component {

    static propTypes = {
        time: PropTypes.number.isRequired,
        incrementTime: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.props.incrementTime();
    }

    render() {
        return (
            <div>
                <p className="timer">{this.props.time} sec</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    time: selectTime(state),
});

const mapDispatchToProps = dispatch => ({
    incrementTime: () => dispatch(incrementTime()),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameTimer)
