import React, { useState } from 'react';
import './TimeSelector.css';

const TimeSelector = props => {
    const [show, updateDropdown] = useState(false);

    const listTimes = () => {
        return props.times.map(({ displayTime, timestamp }) => {
            return (
                <p 
                    className="option"
                    key={ timestamp }
                    onClick={() => { 
                        props.updateTime(displayTime, timestamp)
                        updateDropdown(!show)
                    }}>
                    { displayTime }
                </p>
            )
        })
    }

    return (
        <div className="time-selector">
            <div className="display" onClick={() => { if (props.times.length) updateDropdown(!show) }}>
                { props.displayTime }
            </div>
            <div className="dropdown" style={{ 'display': show ? 'block' : 'none' }}>
                { listTimes() }
            </div>
        </div>
    )
}

export default TimeSelector;