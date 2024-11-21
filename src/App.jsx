import { useState } from "react";
import "./App.css"
import Input from "./components/Input";
import GetInfo from "./components/GetInfo";
const App=()=>{
  const [searchValue,setSearchvalue]=useState("");
  const handleSearch=(value)=>{
    setSearchvalue(value);
    
  }
  console.log(searchValue);
  return(
    <>
      <div className="container">
        <h1>Github Repos</h1>
        <Input handleSearch={handleSearch}/>
        <GetInfo value={searchValue}/>
      </div>
    </>
  )
}
export default App;