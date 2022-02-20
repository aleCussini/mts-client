import React, { Component, useState } from 'react';
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
import { SettingsInputAntennaTwoTone, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';

const lines = ['azienda', 'contabilita', 'dichiarativi', 'bilancio', 'lavoro', 'comunicazione', 'soluzioni', 'modulario', 'condominio'];

let rows = [];

function createData(key, name, description, releaseVersion, releaseDate, file) {
    return { key, name, description, releaseVersion, releaseDate, file };
}

function readData(line) {
   
}

function MTSTable(props) {
    let line = props.line;
    const [rowsCompleted, setRowsComplete] = useState(false);
    let fetchedRows = [];
    const db = firebase.db;
    const updatesRef = ref(db, 'ebridge-' + line);
    console.log(updatesRef);
    onValue(updatesRef, (snapshot) => {
        console.log('into onValue: {}', snapshot.val())
        let idx = 0;
        snapshot.forEach((data) => {
            fetchedRows.push(createData(idx ++, data.val().name, data.val().description, data.val().releaseVersion, data.val().releaseDate, data.val().file));
        });
        rows = fetchedRows;
        setRowsComplete(true);
    }, { onlyOnce: true });
    console.log('loaded {}', rows);
    const classes = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    return (
        
       rows && <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow style={{ backgroundColor: "grey" }}>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="right">Descrizione</TableCell>
                        <TableCell align="right">Release</TableCell>
                        <TableCell align="right">Data</TableCell>
                        <TableCell align="right">Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.releaseVersion}</TableCell>
                            <TableCell align="right">{row.releaseDate}</TableCell>
                            <TableCell align="right">{row.file}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );  
}

export default MTSTable;