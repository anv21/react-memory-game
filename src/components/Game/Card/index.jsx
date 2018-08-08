import React from 'react';
import PropTypes from "prop-types";

class Card extends React.Component {
    static propTypes = {
        image: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        opened: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <div
                className={'card ' + (this.props.opened ? 'opened' : '')}
                onClick={this.props.onClick}
            >
                <div
                    className='card__face'
                    style={{
                        backgroundImage: "url(" + this.props.background + ")",
                        opacity: this.props.opened ? '0.3' : '1',
                        height: this.props.opened ? '0' : 'inherit',
                    }}
                />
                <div
                    className='card__img'
                    style={{
                        backgroundImage: "url(" + this.props.image + ")",
                        opacity: this.props.opened ? '1' : '0.3',
                        height: this.props.opened ? 'inherit' : '0',
                    }}
                />
            </div>
        )
    }
}

export default Card;