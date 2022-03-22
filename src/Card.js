import React from 'react';
import './Card.css';
import {addMember, setRefreshAdded, removeMember} from './teamfn.js';

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {id: 0, name: "", height: 0, weight: 0, bxp: 0, btnclass: "addteam", typenames: [], teambutton: "Add to Team", teamfn: () => {addMember(this, this.state.frontdef, this.state.name, this.state.id)}};
        this.handleError = this.handleError.bind(this);
        this.refreshAdded = this.refreshAdded.bind(this);
    }

    handleError(error) {
        console.log(error);
        this.setState(
            {
                pokemon:<li>Network Error!</li>
            }
        );
    }

    componentDidMount() {
        fetch(this.props.url)
        .then(function(response) {
            console.log(response.status);
            return response.json();
        })
        .then((response) => {
            this.setState((state) =>
                {
                    return {
                        id: response.id,
                        frontdef: response.sprites.front_default,
                        frontshiny: response.sprites.front_shiny,
                        name: response.name.substring(0, 1).toUpperCase() + response.name.substring(1),
                        height: response.height,
                        weight: response.weight,
                        bxp: response.base_experience,
                        typenames: response.types.map((type) => <div key={response.id + ": " + type.type.name} className={"type type" + type.type.name}>Type: {type.type.name.substring(0, 1).toUpperCase() + type.type.name.substring(1)}</div>),
                    }
                }
            );
        })
        .then(() => {
            setRefreshAdded(this.refreshAdded);
        })
        .catch(this.handleError)
    }

    refreshAdded(card, addStatus) {
        if (addStatus) {
            card.setState((state) => {
                return {
                    teambutton: "Remove from Team",
                    btnclass: "removeteam",
                    teamfn: () => {
                        removeMember(card, card.state.id)
                    },
                }
            });
        } else {
            card.setState((state) => {
                return {
                    teambutton: "Add to Team",
                    btnclass: "addteam",
                    teamfn: () => {
                        addMember(card, card.state.frontdef, card.state.name, card.state.id)
                    },
                }
            });
        }
    }

    render() {
        const someJSX = (
            <div key={this.state.name + "card"} className="card">
                <div className="sprite-container">
                    <img src={this.state.frontdef} alt={this.state.name} />
                    <img src={this.state.frontshiny} alt={this.state.name} />
                </div>

                <div className="name">
                    {this.state.name}
                </div>

                <div className="height">
                    Height: {this.state.height}
                </div>

                <div className="weight">
                    Weight: {this.state.weight}
                </div>

                <div className="bxp">
                    Base XP: {this.state.bxp}
                </div>

                <div className="typenames">
                    {this.state.typenames}
                </div>

                <button className={this.state.btnclass} onClick={this.state.teamfn}>
                    {this.state.teambutton}
                </button>

            </div>
        );
        return someJSX;
    }
}

export default Card;
