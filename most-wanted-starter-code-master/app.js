"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found" + person[0].firstName + " " + person[0].lastName + " " + "Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person[0]);
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person[0], people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
        console.log(firstName, lastName);
        alert(firstName + " " + lastName);
      return true;
  }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.

  return foundPerson;
}

function searchByTrait(people){
  searchByTrait = promptFor("Enter what trait you would like to search: 'gender', 'date of birth', 'height', 'weight', 'eye color', 'occupation', 'parents', 'current spouse'.\n Type the option you want or 'quit'").toLocaleLowerCase();
  switch(searchByTrait){
  case "eyecolor":
  case "eye color":
  case "eye":
  case "color":
  let potentialMatches
  potentialMatches = searchByEyeColor(people);
  return potentialMatches;
  case "height":
  let potentialMatches
  potentialMatches = searchByHeight(people);
  return potentialMatches;
  case "weight":
  let potentialMatches
  potentialMatches = searchByWeight(people);
  return potentialMatches;
  case "occupation":
  case "job":
  case "profession":
  let potentialMatches
  potentialMatches = searchByOccupation(people);
  return potentialMatches;
  case "gender":
  let potentialMatches
  potentialMatches = searchByGender(people);
  return potentialMatches;
  case "quit":
    return;
  default:
    return searchByTrait(people);
  }
}



//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let potentialEyeColor = promptFor("What is the person's eye color?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === potentialEyeColor){
      return true
    }
    else{
      return false;
    }
  })
  return foundPeople
}

//TODO: add other trait filter functions here.

function searchByWeight(people){
  let potentialWeight = promptFor("What is the person's weight?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.weight === potentialWeight){
      return true
    }
    else{
      return false;
    }
  })
  return foundPeople
}

function searchByHeight(people){
  let potentialHeight = promptFor("What is the person's height?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.height === potentialHeight){
      return true
    }
    else{
      return false;
    }
  })
  return foundPeople
}

function searchByOccupation(people){
  let potentialOccupation = promptFor("What is the person's occupation?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === potentialOccupation){
      return true
    }
    else{
      return false;
    }
  })
  return foundPeople
}

function searchByGender(people){
  let potentialGender = promptFor("What is the person's gender?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.gender === potentialGender){
      return true
    }
    else{
      return false;
    }
  })
  return foundPeople
}

function searchByDateOfBirth(people){
  let potentialDateOfBirth = promptFor("What is the person's date of birth?", autoValid);

  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.dob === potentialDateOfBirth){
      return true
    }
    else{
      return false;
    }
  })
  return foundPeople
}




//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Id: " + person.id + "\n"; 
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n"; 
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = autoValid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion