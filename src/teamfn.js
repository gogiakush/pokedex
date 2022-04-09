import { database } from './database.js';
import { set, update, onValue, remove, ref } from 'firebase/database';
const poketeam = [];
const pokeids = [];
let refresh = () => {};
let refreshAdded = () => {};
let refreshInSearch = () => {};

const addMember = (card, cardimg, cardname, cardid) => {
    if (poketeam.length === 6) {
        alert('You have already added 6 pokemon to your team!');
    } else if(pokeids.includes(cardid)) {
        alert('This pokemon has already been added to your team!');
    } else {
        poketeam.push((
            <div key={cardid} className="team-card">
                <img src={cardimg} alt={cardname}/>
                <div className="member-name">{cardname}</div>
                <button className="rem-btn" onClick={() => removeMember(card, cardid)}>Remove</button>
            </div>
        ));
        pokeids.push(cardid);

        let data = {};
        data['poke' + cardid + '/name'] = cardname;
        data['poke' + cardid + '/id'] = cardid;

        const dataRef = ref(database, '/');
        update(dataRef, data)
        .then(() => {
            console.log("Update was successful");
        })
        .catch((error) => {
            console.log("Update failed");
            console.log(error);
        });

        refresh(poketeam);
        refreshAdded(card, true);
    }
}

const removeMember = (card, cardid) => {
    const ind = pokeids.indexOf(cardid);
    pokeids.splice(ind, 1);
    poketeam.splice(ind, 1);

    const dataRef = ref(database, '/poke' + cardid);
    remove(dataRef)
    .then(() => {
        console.log("Remove was successful");
    })
    .catch((error) => {
        console.log("Remove failed");
        console.log(error);
    });

    refresh(poketeam);
    refreshAdded(card, false);
}

const setRefresh = (ref) => {
    refresh = ref;
}

const setRefreshAdded = (refa) => {
     refreshAdded = refa;
}

const setRefreshInSearch = (refreshfn) => {
    refreshInSearch = refreshfn;
}

const lookupCards = () => {
    const keyword = document.querySelector("#search-bar").value.toLowerCase();
    if(keyword.charAt(keyword.length - 1) === ' ') {
        document.querySelector("#search-bar").value = keyword.substring(0, keyword.length - 1);
    } else if (keyword.length === 0) {
        refreshInSearch(false, '');
        console.log('opy');
    } else {
        refreshInSearch(true, keyword);
    }
}

export {addMember, removeMember, setRefresh, setRefreshAdded, setRefreshInSearch, lookupCards};
