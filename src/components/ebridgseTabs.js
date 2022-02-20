import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MTSTable from './ebridgeTable';


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

export default function MTSEbridgeTabs() {


    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
        // readData(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
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
            <TabPanel value={value} index={0}>
                <MTSTable line='azienda'/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MTSTable line='contabilita'/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MTSTable line='dichiarativi'/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MTSTable line='bilancio'/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <MTSTable line='lavoro'/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <MTSTable line='comunicazione'/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <MTSTable line='soluzioni'/>
            </TabPanel>
            <TabPanel value={value} index={7}>
                <MTSTable line='modulario'/>
            </TabPanel>
            <TabPanel value={value} index={8}>
                <MTSTable line='condominio'/>
            </TabPanel>
        </div>
    );
}
