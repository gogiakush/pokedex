import React from 'react';
import Card from './Card.js';
import './TopButton.css';
import './List.css';
import {setRefreshInSearch} from './teamfn.js';

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {searchPoke:[], nonSearchPoke:[], pokemon:[], offset:0, inSearch: false};
        this.handleError = this.handleError.bind(this);
        this.displayCards = this.displayCards.bind(this);
        this.setAllPoke = this.setAllPoke.bind(this);
        this.displaySearch = this.displaySearch.bind(this);
        this.refreshInSearch = this.refreshInSearch.bind(this);
        this.childComponentWillUnmount = this.childComponentWillUnmount.bind(this);
        this.allPoke = [];
        this.addedPoke = Array(1126).fill(false);
    }

    handleError(error) {
        console.log(error);
        this.setState(
            {
                pokemon:<li>Network Error!</li>
            }
        );
    }

    childComponentWillUnmount(data) {
        this.addedPoke[data.id - 1] = data.added;
    }

    setAllPoke() {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0";
        fetch(url)
        .then(function(response) {
            console.log(response.status);
            return response.json();
        })
        .then((response) => {
            this.allPoke = response.results;
        })
        .then(() => {
            this.displayCards(true);
        })
        .catch(this.handleError)
    }

    displaySearch(keyword) {
        const respPoke = this.allPoke.filter((item) => item.name.includes(keyword)).map((item) => {
            let id = parseInt(item.url.substring(item.url.lastIndexOf('/', item.url.length - 2) + 1, item.url.length - 1));
            console.log(id);
            if(id >= 899) {
                id -= 9102;
            }
            return <Card componentUnmountCallback={this.childComponentWillUnmount} added={this.addedPoke[id-1]} key={item.name} name={item.name} url={item.url}></Card>
        })
        this.setState((state) => {
            return {
                pokemon: respPoke,
            }
        })
        document.getElementById('more-poke').style.display = "none";
    }

    displayCards(isBClick) {
        let respPoke = [];
        let offs = 0;
        if (isBClick) {
            respPoke = this.allPoke.slice(this.state.offset, this.state.offset + 10).map((item) => {
                let id = parseInt(item.url.substring(item.url.lastIndexOf('/', item.url.length - 2) + 1, item.url.length - 1));
                console.log(id);
                if(id >= 899) {
                    id -= 9102;
                }
                return <Card componentUnmountCallback={this.childComponentWillUnmount} added={this.addedPoke[id-1]} key={item.name} name={item.name} url={item.url}></Card>
            });
            offs = 10;
        }
        this.setState((state) => {
            return {nonSearchPoke: this.state.nonSearchPoke.concat(respPoke), offset: this.state.offset + offs, pokemon: this.state.nonSearchPoke.concat(respPoke)}
        });
        document.getElementById('more-poke').style.display = "inline";
    }

    componentDidMount() {
        this.setAllPoke();
        setRefreshInSearch(this.refreshInSearch);
    }

    refreshInSearch(insearch, keyword) {
        if (insearch) {
            this.displaySearch(keyword);
        } else {
            this.displayCards(false);
        }
    }

    render() {
        const someJSX = (
            <div>
                <div className="cards-container">
                    {this.state.pokemon}
                </div>
                <button id="more-poke" onClick={() => {this.displayCards(true)}}>Show More Pokemon</button>
            </div>
        );
        console.log(this.state.offset);
        return someJSX;
    }
}

export default List;