import React from 'react';
import {lookupCards} from './teamfn.js';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {};
        this.checkZero = this.checkZero.bind(this);
    }

    componentDidMount() {
       
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    checkZero() {
        const val = document.querySelector('#search-bar').value;
        if (val.charAt(val.length-1) === ' ') {
            document.querySelector('#search-bar').value=val.substring(0, val.length-1);
        }  

        if (val === '') {
            lookupCards();
        }
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <textarea id="search-bar" onChange={this.checkZero} placeholder="Search for Pokemon"></textarea>
                <button style={{marginLeft: "10px", border: "none", padding: "0 15px", fontWeight: "bold"}} onClick={lookupCards}>Search</button>
            </div>
        );
    }
}

export default SearchBar;