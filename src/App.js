import logo from './logo.svg';
import './App.css';
import{useEffect, useState}from 'react'
function App() {
  const[workDuration,setWorkDuration]=useState(25)
  const[breakDuration,setBreakDuration]=useState(5)
  const[workSecond,setWorkSecond]=useState(1500)
  const[breakSecond,setBreakSecond]=useState(300)
  const[type,setType]=useState("work")
  const[flag,setFlag]=useState(false);
  const[resetFlag,setResetFlag]=useState(true)
  useEffect(()=>{
    if(flag && type==="work"){
      if(workSecond>0){
        setTimeout(()=>setWorkSecond(workSecond-1),
      1000)
      }
    }
    if(workSecond=== 0){
      alert('Work Time Ended')
      setType("Break")
      setWorkSecond(1500)
    }
    if(flag && type==="Break"){
      if(breakSecond>0){
        setTimeout(()=>{
          setBreakSecond(breakSecond-1)
        },1000)
      }
      if(breakSecond===0){
        alert('Break time ended')
        setType("Break")
        setBreakSecond(300)
      }
      }
  },[workSecond,breakSecond,flag,type])
  const format=(seconds)=>{
    let minute=parseInt(seconds/60).toString();
    let second=parseInt(seconds%60).toString();
    if(minute.length===1) minute = "0"+minute;
    if(second.length===1) second="0"+second;
    return minute+":"+second

  }
  function handleReset(){
     setWorkDuration(25)
     setWorkSecond(1500)
     setBreakSecond(300)
     setBreakDuration(5)
     setType("work")
     setFlag(false)
     setResetFlag(true)
  }
  function handleSubmit(e){
    e.preventDefault();
    setWorkSecond(workDuration*60)
    setBreakSecond(breakDuration*60)
  }
  return (
    <div>
      <div>
        <h1>{type==="work"?format(workSecond):format(breakSecond)}</h1>
        <h1>{type==="work"?"Work":"Break"}-Time</h1>
      </div>
      <div>
        <button onClick={()=>{
          setFlag(true)
          setResetFlag(false)
        }}disabled={flag}>Start</button>

        <button onClick={()=>{
          setFlag(false);
          setResetFlag(false)
        }}
        disabled={!flag}>Stop</button>

        <button onClick={handleReset}
        disabled={resetFlag}>Restart</button>
      </div>
      <form onSubmit={handleSubmit}> 
        <input type="number" placeholder="Enter Work Time" value={workDuration} onChange={(e)=>setWorkDuration(e.target.value)}></input>
        <input type="number" placeholder="Enter Break Time" value={breakDuration} onChange={(e)=>setBreakDuration(e.target.value)}></input>
        <input type="submit" value="Set"></input>
      </form>
    </div>
  );
}

export default App;
