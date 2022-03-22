const poketeam = [];
const pokeids = [];
let refresh = () => {};
let refreshAdded = () => {};

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
        refresh(poketeam);
        refreshAdded(card, true);
    }
}

const removeMember = (card, cardid) => {
    const ind = pokeids.indexOf(cardid);
    pokeids.splice(ind, 1);
    poketeam.splice(ind, 1);
    refresh(poketeam);
    refreshAdded(card, false);
}

const setRefresh = (ref) => {
    refresh = ref;
}

const setRefreshAdded = (refa) => {
     refreshAdded = refa;
}

export {addMember, removeMember, setRefresh, setRefreshAdded};
