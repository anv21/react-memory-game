import React from 'react';

import Header from '../Header';

class Score extends React.Component {

    state = {
        scores: [],
        loading: true,
    };

    componentDidMount() {
        fetch('http://mmg-score.herokuapp.com/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            data.result.sort((a, b) => b.score - a.score);
            this.setState({
                scores:
                    data.result.slice(0, 10).map(({username, email, score}) => {
                        return {
                            name: username,
                            email,
                            score,
                        }
                    }),
                loading: false,
            });
        });
    };

    render() {
        if (this.state.loading) {
            return <p>Please, don't go, score is loading!</p>
        }
        return (
            <div className='score'>
                <Header/>
                <h2 className="heading">Ratings</h2>
                <table>
                    <tbody>
                    {
                        this.state.scores.map(({name, email, score}, ind) => {
                                return <tr key={ind}>
                                    <td>{ind + 1}.</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{score}</td>
                                </tr>
                            }
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Score;