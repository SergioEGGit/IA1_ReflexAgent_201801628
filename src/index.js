// ----------------------- Reflex Agent ---------------------

const reflex_agent = (location, state) => {

  if(state == "DIRTY") {

	return "CLEAN";

  } else if(location == "A") {

	return "RIGHT";

  } else if(location == "B") { 

	return "LEFT";

  }

};

// Sleep Timer
const timeSleep = (time) => {

  return new Promise((res) => setTimeout(res, time));

};

// Paint HTML
const paintHtml = (cleanerPos, action_result, aBox, bBox) => {

  document.getElementById("log").innerHTML += "<br>Cleaner in: "
    .concat(cleanerPos)
    .concat(" | Action: ")
    .concat(action_result);

};

// Stop Cycle
const stopCycle = (states) => {

   if(states[1] == "CLEAN" && states[2] == "CLEAN"){
	
   	document.getElementById("log").innerHTML += "<br>------- End -------"; 
	
	return false;

   } else {
		
	return false;
	
   }

}

// Dirty State
// 0 = nada [00, 10]
// 1 = dirty A   [11, 30]
// 2 = dirty B   [31, 50]
const randomDirty = (max, min) => {

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if(randomNumber >= 0 && randomNumber < 11) {

	return 0;

  } else if(randomNumber >= 11 && randomNumber < 31) { 

	return 1;

  } else {
  
	return 2;

  }

};

// Main
const test = async(states) => {

  let flag = true;

  while(flag) {

      let location = states[0];
  	let state = states[0] == "A" ? states[1] : states[2];
  	let action_result = reflex_agent(location, state);

  	paintHtml(location, action_result, states[1], states[2]);

  	if(action_result == "CLEAN") {

  		if(location == "A") {
 
      		states[1] = "CLEAN";

      	} else if (location == "B") {

			states[2] = "CLEAN";

      	} 

  	} else if (action_result == "RIGHT") {

		states[0] = "B";

      } else if (action_result == "LEFT")  {

		states[0] = "A";

      }
 
  	// Sleep
  	await timeSleep(1000);

      const dirty = randomDirty(0, 50);

	if(dirty != 0) {

		states[dirty] = "DIRTY"

	}

	console.log(states);

	if(stopCycle(states)) {

		flag = false;

	}

  }

};

// Init
let states = ["A", "DIRTY", "DIRTY"];
test(states);