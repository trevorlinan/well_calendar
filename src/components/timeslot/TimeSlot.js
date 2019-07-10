import React, { useState } from 'react';
import './TimeSlot.css';

// components
import TimeSelector from '../timeselector/TimeSelector';

const TimeSlot = props =>  {
    const [selectedTime, updateSelectedTime] = useState({
        start: '1am',
        end: '2am'
    });

    const updateDisplayTime = (type, displayTime) => {
        updateSelectedTime({
            ...selectedTime,
            [type]: displayTime
        })
    };

    return (
        <div className="time-slot">
            <TimeSelector 
                times={ props.times } 
                displayTime={ selectedTime.start } 
                updateDisplayTime={ updateDisplayTime.bind(this, 'start')} 
            />
            <TimeSelector 
                times={ props.times } 
                displayTime={ selectedTime.end }
                updateDisplayTime={ updateDisplayTime.bind(this, 'end')} 
            />
        </div>
    )
}

export default TimeSlot;