import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

const Timer = ({myTime, Timeup}) => {

    console.log(Timeup)

    const [Minute, setMinute] = useState(0);
    const [Second, setSecond] = useState(0);
    const [Hour, setHour] = useState(0); 
    const [Time, setTime] = useState(myTime)

    useEffect(() => {
        const interval =  setInterval(function(){
            if(Time !== 0){
            setSecond( Time % 60 );
            setMinute(Math.floor((Time/60)%60));
            setHour(Math.floor(Time/60/60));
            setTime(Time=> Time - 1);
            console.log('Nan',Time)
            }
            else{
                setSecond(0);
                setMinute(0);
                setHour(0);
                setTime(0); 
                Timeup(); 
            }
        },1000);
        return () => clearInterval(interval);
    },[Time])
    

    return (
        <div className="timer-container">
            <div className="timer-wrapper">
                <div className="time">
                    <span className="hour">{Hour}</span>
                    <span className="minute">:{Minute}</span>
                    <span className="second">:{Second}</span>
                </div>
            </div>
        </div>
    );
}

export default Timer;
