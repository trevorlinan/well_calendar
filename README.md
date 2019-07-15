### To run app:
`npm install` or `yarn install` 
<br />
<br />
`npm run start` or `yarn run start`

### Tools used:
- **create-react-app**: Boilerplate for starting the project. [Create React App](https://facebook.github.io/create-react-app/)
- **momentjs**: Used for time calculations. [Moment.js](https://momentjs.com/)

### Plugins used:
- **react-infinite-calendar**: Used for calendar display and *ONLY* to retreive selected date. [React Infinite Calendar](https://github.com/clauderic/react-infinite-calendar)

### Existing issues:
- Boundary issue: Current date end time. (4:45 pm should be 5:00 pm on current date)
	- FIXED: previous calculation did not reconcile seconds as part of timestamp, rounding down to 0 seconds solved timestamp comparison
- Boundary issue: When full range of times are selected, end time displays "8:00 am", although not selectable, it should be empty.
	- FIXED: If start time is not selected, end time generation function will now return empty array

### To dos:
- Sort appoinment list by date

### User Flow:
- **User chooses a date**
	* Current date is pre selected. User can select any date. However, if date is in the past, no selection times will be available.  
- **User chooses a start and end time**
	* All available start times are shown. If a time is not available, it is grayed out and not selectable. If a start time is available, but the next consecutive time is not, it will be unclickable. When user selects a start time, an "end times" list is generated insuring all end times are after start time. If any of the end times have previously been selected, the list will only contain times before the already existing end time. This ensures there is no overlap.  
- **Schedule appointment**
	* An appointment can only be scheduled if a start time and end time have been selected. These times have already been validated through time selection logic, so appointment is allowed to be made. This generates an appointment that is kept in state and listed in the appointment section. Each appointment can be removed and the time selection list will show those times as available again.
