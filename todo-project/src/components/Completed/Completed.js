import React, { useState, useEffect} from 'react'
import { Typography, Stack, FormControlLabel, Checkbox, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Completed = () => {
  const [inputValue, setInputValue] = useState(null);
  const [tasks, setTasks] = useState([]);
  //const [checked, setChecked] = useState([]);

  const Task = (title, inActive) => { return { title: title, inActive: inActive } }


  const handleSubmit = (event) => {
    event.preventDefault();
    let newState = [...tasks, Task(inputValue,false)]
    setTasks(newState);
    let string = JSON.stringify(newState)
    localStorage.setItem("key", string);
};
  useEffect(() => {
    if(!!localStorage.getItem("key")){
        let x = (JSON.parse(localStorage.getItem("key")));
        setTasks(x);
        //setChecked(x.map((task) => task.inActive)); 

    }
  }, [])
  
    
    let y = (JSON.parse(localStorage.getItem("key")));
    let complete =[];
    y.map((task)=> {
      if(task.inActive === true){
        complete.push(task);
      }
      return task;
      }
    )
    
    let x = JSON.stringify(complete)
    localStorage.setItem("key3", x);

    const handleClick = () => {
        let a = (JSON.parse(localStorage.getItem("key")));
        let newlocstorage = [];
        a.map((task)=> {
            if(task.inActive === false){
              newlocstorage.push(task);
            }
            return task;
            }
        )
        let b = JSON.stringify(newlocstorage)
        localStorage.setItem("key", b);
    
        localStorage.removeItem("key3")
    }

  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
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
        <Stack direction="column">
            {complete?.map((task,index) => (
              <FormControlLabel 
                control={<Checkbox checked/>} 
                label={
                <Typography
                  component="span"
                  sx={{
                  textDecoration: task.inActive ? 'line-through' : 'none',
                  display: 'inline-block',
                  }}
                >
                  {task.title}
                </Typography>}/>))}
            <IconButton onClick={handleClick} size="regular">
                Clear
                <DeleteIcon> </DeleteIcon>
            </IconButton>
        </Stack>
        
        
    </Stack>
  )
}

export default Completed