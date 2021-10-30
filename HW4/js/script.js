
document.getElementById("runCrypt").addEventListener("click", cryptoScript);
document.getElementById("translateBinary").addEventListener("click", decToBinary);
document.getElementById("translateDecimal").addEventListener("click", binaryToDecimal);
document.getElementById("clear").addEventListener("click",clearBinary);
document.getElementById("passwordButton").addEventListener("click",password);



function password(){      // function uses user given key to encrypt message with AES then display.
  event.preventDefault();
  let inputPassword = document.getElementById("password").value;
  if(inputPassword === "" || inputPassword == null || inputPassword == 0){
    alert("Empty Password");
  }
  else{
    let message = "this is a secret message";
    let outputMessage = CryptoJS.AES.encrypt(message, inputPassword);

    document.getElementById("passOut").value = outputMessage.toString();
  }
}

function clearBinary(){                             //clears both text areas used in the Binary Functionality of Document
  document.getElementById("DecimalInput").value = "";
  document.getElementById("BinaryInput").value = "";
}
function decToBinary(){                            //uses loops and conditionals to parse a decimal value into its binary counterpart. refuses non number input.
  event.preventDefault();

  let inputDec = document.getElementById("DecimalInput").value;
  console.log("input value: " + inputDec);
  let binaryCalculation = "";
  let powOf2 = 1;

  if(isNaN(inputDec)){
    alert("Must enter number");
    return;
  }
  while (powOf2 < inputDec){
    powOf2 = powOf2 * 2;
    console.log(powOf2);
  }
  console.log("finished finding place value");

  while(inputDec > 0){
    if(inputDec >= powOf2){
      binaryCalculation = binaryCalculation + "1";
      inputDec = inputDec - powOf2;
    }
    else{
      binaryCalculation = binaryCalculation +"0";
    }
    console.log(inputDec + "is current decimal value on this loop iteration");
    console.log(binaryCalculation + "is current binary on this loop iteration");
    powOf2 = powOf2 / 2;
    console.log(inputDec + "is decimal value on next loop iteration");
    console.log(binaryCalculation + "is binary on next loop iteration");
  }

  console.log("final Binary Value is: " + binaryCalculation);
  document.getElementById("BinaryInput").value = binaryCalculation;

}

function binaryToDecimal(){                                     //parses a binary value and converts to its decimal counterpart. Will not accept any characters other than '1' or '0';
  event.preventDefault();
  let inputString = document.getElementById("BinaryInput").value;
  console.log("input value: " + inputString);
  let powOf2 = Math.pow(2, inputString.length-1);
  console.log("Power of 2 is : " + powOf2);
  let decValue = 0;

  console.log("power of 2 is " + powOf2);
  for(i = 0; i < inputString.length; i++){
    if(inputString.charAt(i) === '1'){
      decValue += powOf2;
    }
    if(inputString.charAt(i) != '1' && inputString.charAt(i) != '0'){
      alert("not a binary value");
      return 0;
    }
    powOf2 = powOf2 / 2;
  }
  console.log("dec value is :" + decValue);

  document.getElementById("DecimalInput").value = decValue;
}

function cryptoScript(){                                              //makes three hashes and one AES encrypted text using the CryptoJs library;
  event.preventDefault();
  const key = "supersecretkey";
  let plaintext = document.getElementById("cryptInput").value;
  let sha1Hash = CryptoJS.SHA1(plaintext,key);
  let sha256Hash = CryptoJS.SHA256(plaintext,key);
  let sha3Hash = CryptoJS.SHA3(plaintext,key);
  let aesText = CryptoJS.AES.encrypt(plaintext,key);

  console.log(sha1Hash.toString);
  document.getElementById("sha1Hash").value = sha1Hash.toString();
  document.getElementById("aesText").value = aesText.toString();
  document.getElementById("sha256Hash").value = sha256Hash.toString();
  document.getElementById("sha3Hash").value = sha3Hash.toString();


}
