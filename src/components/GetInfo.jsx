import { useEffect, useState } from "react";
const GetInfo = ({ value }) => {
    const username = value;
    const url = `https://api.github.com/users/${username}/repos`;
    const repoUrl=`www.github.com/${username}/`
    const [repos, setRepos] = useState([]);
    const [checkLimitrate,setCheckLimitrate]=useState();
    const repoData = async() => {
        try{
            const res=await fetch(url);
            const data = await res.json();     
            console.log(data);
            return data;
        }
        catch(err){
            console.log("Error", err);
        }  
    }
    const checkLimit=async()=>{
        const url=`https://api.github.com/rate_limit`;
        try{
            const res=await fetch(url);
            const data=await res.json();
            return data;

        }
        catch(err){
            console.log("Error ", err);
            
        }
    }
    useEffect(()=>{
        checkLimit().then(data=>{console.log(data);setCheckLimitrate(data)});

        repoData().then(data=>{console.log(data);setRepos(data)})
    },[username])
   
    // console.log(repoData);

    return (
        <>
        <div className="container-box">
        <ul>
            <li><b>REPOS</b></li>
            {repos&&repos.length>0&& repos.map((repo,index)=>{
                const repoUrl = "https://github.com/"; // Base URL for GitHub repositories
                let url = `${repoUrl}${repo.full_name}`; // Use full_name to get 'username/repo-name'
                return <li key={index}> <a href={url} target="blank" rel="noopener noreferrer">{repo.name}</a></li>
            })}
        </ul>
        <ul>
            {/* {checkLimitrate&&checkLimitrate.resources.core.limit>0&&checkLimitrate.resources.search} */}
            <li>Limit : {checkLimitrate&&checkLimitrate.rate.limit}</li>
            <li>Remaining : {checkLimitrate&&checkLimitrate.rate.remaining}</li>
            <li>Reset : {checkLimitrate&&checkLimitrate.rate.reset}</li>

            {/* {checkLimitrate&&checkLimitrate.resources.core} */}
        </ul>
        </div>
        </>
    )
}
export default GetInfo;