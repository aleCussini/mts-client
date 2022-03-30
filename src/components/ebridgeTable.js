import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase/firebase-init';
import { ref, onValue } from 'firebase/database';
import Button from '@material-ui/core/Button';
import { FileDownload} from "@mui/icons-material";

const lines = ['azienda', 'contabilita', 'dichiarativi', 'bilancio', 'lavoro', 'comunicazione', 'soluzioni', 'modulario', 'condominio'];

let rows = [];

function createData(key, name, description, releaseVersion, releaseDate, file) {
    return { key, name, description, releaseVersion, releaseDate, file };
}


class MTSTable extends Component{

    constructor(props) {
        super(props);
        this.state = {updates: []}
    }

    componentDidMount() {
        let fetchedUpdates = [];
        const db = firebase.db;
        const updatesRef = ref(db,'ebridge-'+this.props.line);
        onValue(updatesRef, snapshot => {
            snapshot.forEach((data) =>{
                fetchedUpdates.push(data.val());
            })
        })
        this.setState({updates : fetchedUpdates})
    }

    render() {
        return(
           <TableContainer component={Paper}>
                <Table className='table' size="small" aria-label="a dense table">
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
                        {this.state.updates.map((update) => (
                            <TableRow key={update.id}>
                                <TableCell align="left">{update.name}</TableCell>
                                <TableCell align="left">{update.description}</TableCell>
                                <TableCell align="right">{update.releaseVersion}</TableCell>
                                <TableCell align="right">{update.releaseDate}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" href={update.file}>
                                        <FileDownload />
                                    </Button>
                                </TableCell>
                                {/*<TableCell align="right">{update.file}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

}

export default MTSTable;