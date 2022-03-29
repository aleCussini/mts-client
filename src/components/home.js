import { Component } from 'react';
import MTSEbridgeTabs from './ebridgseTabs';
import MTSUtilityTabs from './utilityTabs';
import firebase from '../firebase/firebase-init';

class Home extends Component {
    
    render() {

        const user = firebase.auth.currentUser;
        console.log('current user', user);

        return (
            <div>
                <br/>
                <h1>Aggiornamenti eBridge</h1>
                <MTSEbridgeTabs />
                <br/>
                <h1>Utilità</h1>
                <MTSUtilityTabs />
            </div>
        );
    }
}

export default Home;