import DeleteIcon from '@mui/icons-material/Delete';
import { React, useState, useEffect} from 'react';
import { Tab, IconButton, TextField, Button, Stack, Box} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import CustomFormControlLabel from '../CustomFormControlLabel/CustomFormControlLabel';


const Todos = () => {
  const [value, setValue] = useState("1");
  const [inputValue, setInputValue] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  let activeTasks = tasks.filter((task) => task.Active === true);
  let completedTasks = tasks.filter((task) => task.Active === false)
  let locStor = (localStorage.getItem("key"))
  
  const Task = (title, Active) => ({ title: title, Active: Active }) 
  
  const handleChange1 = (event,index) => {
    let newTasks = tasks.map((task,i)=> {
        if(i===index){ return Task(task.title, !event.target.checked)}
        else{return task; }})
    setTasks(newTasks)
    saveToLocalStorage("key", newTasks)};

  const handleChange2 = (_event, newValue) => {setValue(newValue);};

  const handleSubmit = (event) => {
    event.preventDefault();
    let newState = [...tasks, Task(inputValue,true)]
    setTasks(newState);
    saveToLocalStorage("key", newState)};

  useEffect(() => {
    if(!!locStor){ 
        let x = (JSON.parse(locStor));
        setTasks(x); }}, [locStor])

  const saveToLocalStorage = (key, data) => {
    let b = JSON.stringify(data)
    localStorage.setItem(key, b);}

  const handleClick = () => {
    let newtasks= activeTasks;
    setTasks(newtasks);
    saveToLocalStorage("key", newtasks)}

const deleteCompleted = (val) => {
    if (val === "3"){
        return(<IconButton onClick={handleClick} size="regular">Clear<DeleteIcon /></IconButton>)}}

const tabValues = [
    {label:"All", value:"1"},
    {label:"Active", value:"2"},
    {label:"Completed", value:"3"}
]

const TabPanelList = [
    {value:"1", input:tasks},
    {value:"2", input:activeTasks},
    {value:"3", input:completedTasks}
]

  return (
    <Stack direction="column">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange2} aria-label="lab API tabs example" centered>
            {tabValues.map((tab) => (<Tab label= {tab.label} value={tab.value} />))}
          </TabList>
        </Box>
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center" >
                <TextField
                placeholder="add details"
                onChange={e => setInputValue(e.target.value)}
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ width: { sm: 300, md: 600 }, height: 55}}
                value={inputValue}
                />
                <Button  type ="submit" variant="contained" size="large">Add</Button>
            </Stack>
        </form>
        {TabPanelList.map((tabs)=> (<TabPanel value={tabs.value}>
                                        <Stack direction="column">
                                            <CustomFormControlLabel
                                                tasks={tabs.input}
                                                handleChange={handleChange1}
                                            />
                                            {deleteCompleted(tabs.value)}
                                        </Stack> 
                                    </TabPanel>))}
      </TabContext>
    </Stack>
  );
};
    

export default Todos
