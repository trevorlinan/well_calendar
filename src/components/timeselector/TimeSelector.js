import React, { useState } from 'react';
import './TimeSelector.css';

const TimeSelector = props => {
    const [show, updateDropdown] = useState(false);

    const listTimes = () => {
        if (!props.times.length) {
            return <p className="option available">No available times</p>
        }
        return props.times.map(({ displayTime, timestamp, available }) => {
            return (
                <p 
                    className={`option ${ available ? 'available' : '' }`}
                    key={ timestamp }
                    onClick={() => { 
                        if (available) {
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
        <div className="time-selector">
            <div className="display" onClick={() => { updateDropdown(!show) }}>
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