// start with master string, which contains all possible characters for password
// user customizes master string with a series of prompts asking about different kinds of characters
// if user applies no customization, no password is generated and user will be prompted to start over
var passwordMasterString = "";
var password = "";

// the customizations are strings that will be appended to the master string if the user chooses
var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
var capitalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numericChars = "0123456789";
var specialChars = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";


// this function is called when the red "Generate Password" button is clicked
function generatePassword() {

  // variables reset on button click, for safety.
  passwordMasterString = "";
  password = "";

  // user prompted for lowercase letters
  var wantsLowers = window.confirm("Do you want lowercase letters in your password?");
  if (wantsLowers) {
    passwordMasterString += lowercaseChars;
  }
  console.log("User wants lowercase letters: " + wantsLowers);
  console.log("User's master password string is now " + passwordMasterString);

  // user prompted for capital letters
  var wantsCaps = window.confirm("Do you want capital letters?");
  if (wantsCaps) {
    passwordMasterString += capitalChars;
  }
  console.log("User wants capital letters: " + wantsCaps);
  console.log("User's master password string is now " + passwordMasterString);


  // user prompted for numerical characters
  var wantsNumbers = window.confirm("Do you want numbers?");
  if (wantsNumbers) {
    passwordMasterString += numericChars;
  }
  console.log("User wants numbers: " + wantsNumbers);
  console.log("User's master password string is now " + passwordMasterString);


  // user prompted for special characters, according to the OWASP standard, except for the whitespace character
  // https://owasp.org/www-community/password-special-characters
  var wantsSpecials = window.confirm("Do you want special characters?\nThis includes: " + specialChars);
  if (wantsSpecials) {
    passwordMasterString += specialChars;
  }
  console.log("User wants special characters: " + wantsSpecials);
  console.log("User's master password string is now " + passwordMasterString);

  // user prompted for length of password
  // while true loop ensures user entry will be a numerical value between 8 and 128, inclusive.
  while (true) {
    var passwordLength = parseInt(window.prompt("Enter password length. Minimum 8 characters long, maximum 128 characters."));

    if (typeof passwordLength == "number" && passwordLength >= 8 && passwordLength <= 128) {
      console.log("User wants " + passwordLength + " characters in the password.");
      break;
    } else {
      console.log("error: user entered not a number");
      window.alert("Error: Please enter a number between 8 and 128, inclusive.");
      continue;
    }
  }


  // for loop assembles password by pulling from master string at random indexes
  for (var i = 0; i < passwordLength; i++) {
    password += passwordMasterString[Math.floor(Math.random() * passwordMasterString.length)];
  }

  // check if master string is empty. If it is not, return generated password.
  if (passwordMasterString == "") {
    return "ERROR: Please try again and select at least one customization.";
  } else {
    return password;
  }
}

// function to select all text in the given element, can be called on clicking the element for easier copying
function selectAll(elementID) {
  document.getElementById("password").focus();
  document.getElementById("password").select();
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
