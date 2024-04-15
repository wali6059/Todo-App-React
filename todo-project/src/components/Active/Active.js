import React, { useState, useEffect} from 'react'
import { Stack, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';

const Active = () => {
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
    let active =[];
    y.map((task,i)=> {
      if(task.inActive === false){
        active.push(task);
      }
      return task;
      }
    )
    
    let z = JSON.stringify(active)
    localStorage.setItem("key4", z);

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
            {active?.map((task) => (<FormControlLabel control={<Checkbox/>} label={task.title}/>
                ))}
        </Stack>
        
    </Stack>
  )
}

export default Active