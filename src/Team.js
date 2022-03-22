import React from 'react';
import {setRefresh} from './teamfn.js';
import './Team.css';

class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {team: [<h1 key="default" style={{color: "rgb(228, 92, 92)"}}>Add Some Pokemon!</h1>]}
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        setRefresh(this.refresh);
    }

    refresh(poketeam) {
        this.setState((state) => {
            return {
                team: poketeam.length > 0 ? poketeam : [<h1 key="default" style={{color: "rgb(228, 92, 92)"}}>Add Some Pokemon!</h1>],
            }
        });
    }

    render() {
        const someJSX = (
            <div>
                <hr />
                <h1>Team:</h1>
                <div className="team-container">{this.state.team}</div>
                <hr />
            </div>
        )
        return someJSX;
    }
}

export default Team;