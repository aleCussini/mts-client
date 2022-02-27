import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MTSTable from './ebridgeTable';
import firebase from '../firebase/firebase-init';
import {ref, onValue, query, orderByChild, equalTo, limitToFirst} from 'firebase/database';

function TabPanel(props) {
    const {children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default class MTSEbridgeTabs extends Component{

    constructor(props) {
        super(props);
        this.state = {value: 0, customerUpdates: []}
    }

    handleChange(e)  {
        alert(e.target.value)
    };

    componentDidMount() {
        let fetchedCustomerUpdates = [];
        let user = firebase.auth.currentUser;
        if(user){
            let customersRef = query(ref(firebase.db,'customers'),orderByChild('email'), equalTo(user.email), limitToFirst(1));
            onValue(customersRef,(customersFetched)=>{
                customersFetched.forEach(customer => {
                    console.log('customer updates: ', customer.val().updates)
                    this.setState({...this.state,customerUpdates: customer.val().updates});
                })
            })
        }
    }

    render() {
        return (

            <div className='root'>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
                        <Tab label="Azienda" {...a11yProps(0)} />
                        <Tab label="Contabilità" {...a11yProps(1)} />
                        <Tab label="Dichiarativi" {...a11yProps(2)} />
                        <Tab label="Bilancio" {...a11yProps(3)} />
                        <Tab label="Lavoro" {...a11yProps(4)} />
                        <Tab label="Modelli Comunicazione" {...a11yProps(5)} />
                        <Tab label="Soluzioni Integrate" {...a11yProps(6)} />
                        <Tab label="Modulario" {...a11yProps(7)} />
                        <Tab label="Condominio" {...a11yProps(8)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <MTSTable line='azienda'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <MTSTable line='contabilita'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <MTSTable line='dichiarativi'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <MTSTable line='bilancio'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={4}>
                    <MTSTable line='lavoro'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={5}>
                    <MTSTable line='comunicazione'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={6}>
                    <MTSTable line='soluzioni'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={7}>
                    <MTSTable line='modulario'/>
                </TabPanel>
                <TabPanel value={this.state.value} index={8}>
                    <MTSTable line='condominio'/>
                </TabPanel>
            </div>
        );
    }



}
