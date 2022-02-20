import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import firebase from './firebase/firebase-init';
import MTSLoginPage from './components/login';
import {useState} from 'react';
import { ref, onValue, orderByChild, equalTo, query, limitToFirst } from 'firebase/database';

function App() {
  // const db = firebase.db;
  // const [userLogged, setUserLogged] = useState('');
  // const [updates, setUpdates] = useState('');

  // var user = firebase.auth.currentUser; 

  // firebase.auth.onAuthStateChanged(user =>{
  //   if(!user && !updates){
  //     let customersRef = query(ref(db,'customers'),orderByChild('email'), equalTo(user.email));
  //     onValue(customersRef,(customersFetched)=>{
  //       customersFetched.forEach(customer => {
  //         console.log(customer.val())
  //         setUpdates(customer.val().updates);  
  //         setUserLogged(true);
  //       })  
  //       })
  //   }
  // });

    // if(user){
      // console.log('user logged')
      //setUpdates(fetchUpdates(user, db));
      return (
        <>
        <Navbar />
        <Home/>
        </>
      )
    // }else{ 
    //   console.log('user not logged')
    //   return(
    //     <MTSLoginPage></MTSLoginPage>
    //   )
    // }
}

function fetchUpdates(user, db){
  let customersRef = query(ref(db,'customers'),orderByChild('email'), equalTo(user.email), limitToFirst(1));
      onValue(customersRef,(customersFetched)=>{
        customersFetched.forEach(customer => {
          console.log('customer updates: ', customer.val().updates)
         return  customer.val().updates;
        })  
      })
}

export default App;
