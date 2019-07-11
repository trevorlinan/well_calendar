import React, { Component } from 'react';
import './TimeSlot.css';

// components
import TimeSelector from '../timeselector/TimeSelector';

// helpers
import { getAvailableEndTimes } from '../../utils';

class TimeSlot extends Component  {
    constructor () {
        super();
        this.state = {
            start: {
                displayTime: 'Start time',
                timestamp: null
            },
            end: {
                displayTime: 'End time',
                timestamp: null
            }
        }
    }

    updateTime = (type, displayTime, timestamp) => {
        this.setState(state => { 
            state[type] = { displayTime, timestamp }
            if (type === 'start' && timestamp >= state.end.timestamp) {
                state.end = { displayTime: 'End time', timestamp: null }
            }
            return state;
        })
    };


    render () {
        const { start: { displayTime: start, timestamp: unixStart }, end: { displayTime: end } } = this.state;
        const { times } = this.props;

        return (
            <div className="time-slot">
                <h2>Choose a time</h2>
                <div className="time-selectors">
                    <TimeSelector 
                        times={ times } 
                        displayTime={ start } 
                        updateTime={ this.updateTime.bind(this, 'start')}
                    />
                    <TimeSelector 
                        times={ getAvailableEndTimes(unixStart, times) }
                        displayTime={ end }
                        updateTime={ this.updateTime.bind(this, 'end')} 
                    />
                </div>
                <button className="schedule">Schedule Appointment</button>
            </div>
        )
    }
}

export default TimeSlot;