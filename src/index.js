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

const paintHmtl = (cleanerPos, action_result, aBox, bBox) => {

  document.getElementById("log").innerHTML += "<br>Cleaner in: "
    .concat(cleanerPos)
    .concat(" | Action: ")
    .concat(action_result)
    .concat(" | State: ")
    .concat(stateNumber);

};

// Main
const test = async(states) => {

  let location = states[0];
  let state = states[0] == "A" ? states[1] : states[2];
  let action_result = reflex_agent(location, state);

  paintHmtl(location, action_result, states[1], states[2]);

  if(action_result == "CLEAN") {

  	if(location == "A") {
 
      	states[1] = "CLEAN";

      } else if (location == "B") {

		states[2] = "CLEAN";

      } else if (action_result == "RIGHT") {

		states[0] = "B";

      } else if (action_result == "LEFT")  {

		states[0] = "A";

      }
 
      // Sleep
      await timeSleep(1000);

};

// Init
var states = ["A", "DIRTY", "DIRTY"];
test(states);