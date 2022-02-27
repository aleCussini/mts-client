import React, {Component, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { render } from 'react-dom';
import firebase from '../firebase/firebase-init';
import { ref, onValue } from 'firebase/database';

class MTSUtilityTable extends Component {

    constructor(props) {
        super(props);
        this.state = {rows: []}
    }

    componentDidMount() {
        let fetchedRows = [];
        const db = firebase.db;
        const linksRef = ref(db, this.props.refName);
        console.log(linksRef);
        onValue(linksRef, (snapshot) => {
            snapshot.forEach((data) => {
                fetchedRows.push(data.val());
                console.log('data retrieved');
            });
            console.log('fetched Rows: ', fetchedRows);
            this.setState({rows: fetchedRows})
        })
    }

    render() {
        return (

            <TableContainer component={Paper}>
                 <Table className='table' size="small" aria-label="a dense table">
                     <TableHead>
                         <TableRow style={{ backgroundColor: "grey" }}>
                             <TableCell align="left">Descrizione</TableCell>
                             <TableCell align="right">Link</TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
                         {this.state.rows.map((row) => (
                             <TableRow key={row.id}>
                                 <TableCell align="left">{row.description}</TableCell>
                                 <TableCell align="right">{row.link}</TableCell>
                             </TableRow>
                         ))}
                     </TableBody>
                 </Table>
             </TableContainer>

        );
    }
}

export default MTSUtilityTable;