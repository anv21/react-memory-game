import React from 'react';
import {Link} from 'react-router-dom'

class Header extends React.Component {
    render() {
        return <header>
            <h1 className="logo">Mem game v0.0.2</h1>
            <nav>
                <Link className='button' to={'/'}>Home</Link>
                <Link className='button' to={'/start-game'}>New Game</Link>
                <Link className='button' to={'/score'}>Top players</Link>
            </nav>
        </header>
    }
}

export default Header;