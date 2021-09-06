import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AllUsers from './AllUsers'
import AddRole from './AddRole';
import AddPerms from './AddPerms';
import RolePerms from './RolePerms'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <>{children}</>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
   
    backgroundColor: theme.palette.background.paper,

  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        centered
      >
        <Tab label="All Users" {...a11yProps(0)} />
        <Tab label="Add Role" {...a11yProps(1)} />
        <Tab label="Add Permissions" {...a11yProps(2)} />
        <Tab label="Edit Role Permissions" {...a11yProps(3)} />
       
      </Tabs>

      <TabPanel  value={value} index={0}>
       <AllUsers/>
      </TabPanel>
      <TabPanel  value={value} index={1}>
        <AddRole/>
      </TabPanel>
      <TabPanel  value={value} index={2}>
       <AddPerms/>
      </TabPanel>
      <TabPanel  value={value} index={3}>
       <RolePerms/>
      </TabPanel>
      
    </div>
  );
}
