const { v4: uuidv4 } = require('uuid');


let	items = [
		{
			id: uuidv4(),
			name : "This is the first work you must do in day",
			level : 0 //Lv small
		},
		{
			id: uuidv4(),
			name : "This is the second work you must do in day",
			level : 1 //Lv medium
		},
		{
			id: uuidv4(),
			name : "This is the third work you must do in day",
			level : 2 //Lv high
		},
		{
			id: uuidv4(),
			name : "This is the fourth work you must do in day",
			level : 0 //Lv small
		},
		{
			id: uuidv4(),
			name : "This is the fifth work you must do in day",
			level : 2 //Lv high
		},
		{
			id: uuidv4(),
			name : "This is the seventh work you must do in day",
			level : 0 //Lv small
		},
	]
export default  items;