import moment from 'moment';

export const formatHourMinutePeriod = timestamp => {
    return moment(timestamp).format("h:mm a");
}

// increment = time interval to create times with e.g. 15, 30, 60
// timestamp = unix date 
// start, end = times of day to start and end the available selections
// existing times = existing appointments [{ start: ttimestamp, end: timestamp }]
export const getSelectionTimesByMinutes = (increment, timestamp, { start, end }, existingTimes) => {
    const timesCount = Math.round(1440 / increment); 
    const minute = moment(timestamp).startOf('minute');
    const mod = parseInt(minute.format('m')) % increment; // get remaning minutes to next increment
    var currentTimestamp = moment(minute.add(increment - mod, 'minute')).unix() *1000 // get timestamp of next consecutive selection

    return [ ...new Array(timesCount) ].reduce((times, val, ind) => {
        timestamp = (ind === 0 && mod !== 0) ? currentTimestamp : timestamp + (increment * 60 * 1000)
        if (timestamp >= start && timestamp <= end) {
            const timeNotAvailable = existingTimes.find(time => {
                return timestamp === time.start || timestamp === time.end || (timestamp > time.start && timestamp < time.end)
            });

            times.push({
                timestamp: timestamp, 
                displayTime: formatHourMinutePeriod(timestamp),
                available: !timeNotAvailable
            })

        }
        return times;
    }, [])
}

// startTime = unix date
// times = all selection times generated
export const getAvailableEndTimes = (startTime, times) => {
    if (!startTime) return [];
    let exit = false;
    return times.filter((obj, ind) => {
        if (obj.timestamp < startTime) return false;
        if ((ind + 1 < times.length && !times[ind + 1].available) || exit) {
            if (!exit) {
                exit = true;
                return obj.timestamp > startTime;
            }
            exit = true;
            return false
        }
        return obj.timestamp > startTime;
    })
}