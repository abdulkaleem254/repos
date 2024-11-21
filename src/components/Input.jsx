import { useState } from "react";

const Input=({handleSearch})=>{
    const [inputValue,setInputValue]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputValue);
        console.log("Form submitted");
        handleSearch(inputValue);
        setInputValue("");
    }
    return(
        <>
        <div className="input">
            <form action="#" onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" name="name" value={inputValue} placeholder="Enter your github username" onChange={(e)=>setInputValue(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
        </div>
        </>
    )
}
export default Input;