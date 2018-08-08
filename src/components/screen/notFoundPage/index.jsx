import React from 'react';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            information: 'You are lost! Go back to the game!'
        };
    }

    typeWriter = (selector) => {
        let currentChar = 0;
        let txt = this.state.information;
        let speed = 150;
        const container = document.querySelector(selector);

        function writer() {
            if (currentChar < txt.length) {
                container.textContent += txt.charAt(currentChar);
                currentChar++;
                setTimeout(writer, speed);
            }
        }
        writer();
    };

    componentDidMount() {
        this.typeWriter('h2');
    }

    render() {
        return <div className="not-found-page-container">
            <h2 className="not-found-heading game-container-heading"/>
            <Link className="button" to="/start-game">New game</Link>
            <img
            src={require("./img/dog.gif")}
            alt="dog"
            />
        </div>
    }
}

export default NotFound;