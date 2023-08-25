import './App.css';
import { Fragment, useCallback, useEffect, useState } from 'react';

function App() {
  let [cells,setCells]=useState(['','','','','','','','',''])
  let [trun,setTrun]=useState('circle')
  let [winner,setWinner]=useState('');
  const message=`It is now ${trun}'s trun to play`
  const checkWinner=useCallback(()=>{
    const winningCombs=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],]
    winningCombs.forEach(winArr=>{
      let circleWin=winArr.every(cell=>cells[cell]==='o')
      let crossWin=winArr.every(cell=>cells[cell]==='x')
      if(circleWin){
        setWinner('Circle Won!!!')
        console.log(winner);
      }
      if(crossWin){
        setWinner('Cross Won!!!')
        console.log(winner)
      }
    })
  },[cells,winner])
  useEffect(()=>{checkWinner()},[checkWinner])
  const handelClick=(e,i)=>{
    const fill=e.target.firstChild.classList.contains('x')||e.target.firstChild.classList.contains('o');
    if(!fill){
      if(trun==='circle'){
        e.target.firstChild.classList.add('o')
        setTrun('cross')
        handleChange(i,'o')
      }
      if(trun==='cross'){
        e.target.firstChild.classList.add('x')
        setTrun('circle')
        handleChange(i,'x')
      }
    }
  }
  const handleChange=(id,className)=>{
   const setCell= cells.map((cell,i)=>{
      if(i===id){
        return className
      }
      else{
        return cell
      }
    })
    setCells(setCell);
  }
  const reset=()=>{
    setCells(['','','','','','','','',''])
    setWinner('');
    setTrun(
      ()=>{if(trun==='circle'){
          return 'cross'
      }
    else{
      return 'circle'
    }})
  }
  return (
    <Fragment>
      
    <div className="App">
      
      {cells.map((box,i)=>{
        return(
          <div key={i} id={i} className='box' onClick={winner!==''?()=>{}:(e)=>handelClick(e,i)}>
            <div className={box}></div>
          </div>
        )
      })}
    </div>
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
    <p style={{color:'white',fontSize:'24px',textAlign:'center',marginBlock:'0'}}>{winner||message}</p>
    <button style={{border:'2px solid white',borderRadius:'15px',marginInline:'auto',maarginTop:'25px',backgroundColor:'red',color:'white',padding:'15px',fontWeight:'bold',fontSize:'24px'}} onClick={reset}>Reset</button>
    </div>
    </Fragment>
  );
}

export default App;
