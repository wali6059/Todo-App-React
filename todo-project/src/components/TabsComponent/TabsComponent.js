import { React, useState} from 'react';
import All from '../All/All';
import Active from '../Active/Active';
import Completed from '../Completed/Completed';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { Stack, Box, Tab} from '@mui/material';

const TabsComponent = () => {
  const [value, setValue] = useState("1");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  return (
    <Stack direction="column">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="All" value="1" />
            <Tab label="Active" value="2" />
            <Tab label="Completed" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><All /></TabPanel>
        <TabPanel value="2"><Active /></TabPanel>
        <TabPanel value="3"><Completed /></TabPanel>
      </TabContext>
    </Stack>
    
  );
}

export default TabsComponent
