import React, { useState, useEffect} from 'react'
import { Stack, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';

const All = () => {
    const [inputValue, setInputValue] = useState(null);
    const [tasks, setTasks] = useState([]);
    //const [checked, setChecked] = useState([]);

    const Task = (title, inActive) => { return { title: title, inActive: inActive } }

    const handleChange = (event,index) => {
        //let newChecked = [...checked];
        //newChecked[index] = event.target.checked;
        //setChecked(newChecked);

        let newTasks = tasks.map((task,i)=> {
            if(i===index){
                return Task(task.title, !event.target.checked)
            }
            else{
                return task; 
            }
            
        })
        setTasks(newTasks)

        let string = JSON.stringify(newTasks)
        localStorage.setItem("key", string);


    };



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
        <Stack direction="column" >
            {/* {tasks.filter((task)=> task.inActive).m} */}
            {tasks?.map((task,index) => (<FormControlLabel key={index} control={<Checkbox checked={!task.inActive || false} onChange={(event) => handleChange(event, index)} />}
            label={task.title} style={{ textDecoration: !task.inActive ? 'line-through' : 'none' }}/>
            ))}
        </Stack>
        
    </Stack>
  )
}

export default All