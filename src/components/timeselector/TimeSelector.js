import React, { useState } from 'react';
import './TimeSelector.css';

const TimeSelector = props => {
    const [show, updateDropdown] = useState(false);

    const listTimes = () => {
        if (!props.times.length) {
            return <p className="option available">No available times</p>
        }
        return props.times.map(({ displayTime, timestamp, available }, ind) => {
            let isSelection = true;
            if ((ind + 1 < props.times.length) && !props.times[ind + 1].available) {
                if (ind > 0 && !props.times[ind - 1].available) {
                    available = false;
                }
                isSelection = false;
            }
            
            return (
                <p 
                    className={`option ${ available ? 'available' : '' }`}
                    key={ timestamp }
                    onClick={() => {
                        if (available && isSelection) {
                            props.updateTime(displayTime, timestamp)
                            updateDropdown(!show)
                        }
                    }}>
                    { displayTime }
                </p>
            )
        })
    }

    return (
        <div className="time-selector" onBlur={() => { updateDropdown(false) }} tabIndex={0}>
            <div className="display" onClick={() => { updateDropdown(!show) }} >
                { props.displayTime }
                <div className="arrow-down"></div>
            </div>
            <div className="dropdown" style={{ 'display': show ? 'block' : 'none' }}>
                { listTimes() }
            </div>
        </div>
    )
}

export default TimeSelector;