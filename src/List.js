import React from 'react';
import Card from './Card.js';
import './TopButton.css';
import './List.css';

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {pokemon:[], offset:0};
        this.handleError = this.handleError.bind(this);
        this.displayCards = this.displayCards.bind(this);
    }

    handleError(error) {
        console.log(error);
        this.setState(
            {
                pokemon:<li>Network Error!</li>
            }
        );
    }

    displayCards() {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + this.state.offset;
        fetch(url)
        .then(function(response) {
            console.log(response.status);
            return response.json();
        })
        .then((response) => {
            const respPoke = response.results.map((item) => <Card key={item.name} name={item.name} url={item.url}></Card>);
            this.setState((state) =>
                {
                    return {pokemon: this.state.pokemon.concat(respPoke), offset: this.state.offset + 10}
                }
            );
        })
        .catch(this.handleError)
    }

    componentDidMount() {
        this.displayCards();
    }

    render() {
        const someJSX = (
            <div>
                <div className="cards-container">{this.state.pokemon}</div>
                <button id="more-poke" onClick={this.displayCards}>Show More Pokemon</button>
            </div>
        );
        console.log(this.state.offset);
        return someJSX;
    }
}

export default List;