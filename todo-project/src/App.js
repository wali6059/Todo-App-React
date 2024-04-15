import React from "react";
import Header from "./components/Header/Header";
import { Box, Stack } from "@mui/material";
import Todos from "./components/Todos/Todos";

function App() {
  return (
    <Box>
      <Stack direction="column">
        <Header/>
        <Todos />
      </Stack>
    </Box>
  );
}

export default App;
