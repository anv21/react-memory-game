import React from 'react';
import {Link} from 'react-router-dom'
import Header from "../Header";

class MainView extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <article className='main-view-article'>
                    <header>
                        <h2>The Memory Card Game</h2>
                    </header>
                    <main className='main-view-container'>
                        <ul className="detailed-rules">
                            <li>Select two cards to try to match the pictures.</li>
                            <li>If you match the picture you can go again.</li>
                            <li>If they don't match it is the computer turn them.</li>
                            <li>The player that finds all pairs wins!</li>
                            <li>Have Fun!</li>
                        </ul>
                    </main>
                    <Link to='/start-game' className='button start-game-bth'>Start Game</Link>
                    <footer className='copyright'>
                        &copy; Anv21 2018
                    </footer>
                </article>
            </div>
        )
    }
}

export default MainView;