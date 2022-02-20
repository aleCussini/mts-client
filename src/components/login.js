import { React, Component , useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../firebase/firebase-init';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';




function login(user, password){
    console.log('passed value', user, password)
    signInWithEmailAndPassword(firebase.auth,user,password);
}

function MTSLoginPage (){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    return(
        <div>
            <TextField id="email" label="email" value={user} onInput={event => setUser(event.target.value)}/>
            <TextField id="password" label="password" value = {password} onInput={event => setPassword(event.target.value)}/>
            <Button variant="contained" onClick={()=>login(user, password)}>Login</Button>
        </div>
    )
}

export default MTSLoginPage;