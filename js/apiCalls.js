window.ajxStore = {
  urlBuild: {
    encodedURL: " " 
  }
}

// Face++ URL building and Ajax call

function facePlusAjax() {
  apiAcc = {
  faceApi: "https://apius.faceplusplus.com/v2/",
  meth: "detection/detect?",
  api_secret: "PTwMJGAq9Qnqg34EozZpH9mhwsy4mRbF",
  api_key: "f53e2536752725f3bed49a4ede929058",
  attributes: "age,glass,pose,gender,race,smiling"
  }
  var fullUrl = apiAcc.faceApi + apiAcc.meth + "url=" + ajxStore.urlBuild.encodedURL + "&api_secret=" 
      + apiAcc.api_secret + "&api_key=" + apiAcc.api_key + "&attribute=" + apiAcc.attributes;
  $.ajax ({
    type: "GET",
    url: fullUrl,
    success: facePlusShow
    });
  }

function facePlusShow(imageData) {
  console.log(imageData);
  var callResultsAge = imageData.face[0].attribute.age.value;
  var callResultsGender = imageData.face[0].attribute.gender.value;
  var callResultsSmile =  imageData.face[0].attribute.smiling.value;
  var callResultsGlass = imageData.face[0].attribute.glass.value;
  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("Face++ Results").addClass("card-title");
  var newPAge = $("<p>").html("Age:").append(callResultsAge);
  var newPGender = $("<p>").html("    Gender: ").append(callResultsGender);
  var newPSmile = $("<p>").html("      Smile Degree: ").append(callResultsSmile);
  var newPGlass = $("<p>").html("        Glasses? ").append(callResultsGlass);
  newPBoss.append(newSCard).append(newPAge).append(newPGender).append(newPSmile).append(newPGlass);
  $("#facePlusAPI").empty();
  $("#facePlusAPI").append(newPBoss);
  }

function alchemyAjax() {
  apiAcc = {
  alchApi: "http://gateway-a.watsonplatform.net/calls/image/ImageGetRankedImageFaceTags?",
  apikey: "c84b707045f2eaf44ac7896ca8638274c82489c4",
  output: "json"
  }
  var fullUrl = apiAcc.alchApi + "&url=" + ajxStore.urlBuild.encodedURL + "&apikey=" + apiAcc.apikey + "&outputMode=" + apiAcc.output;
  
  $.ajax ({
  type: "GET",
  url: fullUrl,
  success: alchemyShow
  });

  }

 function alchemyShow(imageData) {
  var callResultsAge = imageData.imageFaces[0].age.ageRange;
  var callResultsGender = imageData.imageFaces[0].gender.gender;
  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("Alchemy Results").addClass("card-title");
  var newPAge = $("<p>").html("Age: ").append(callResultsAge);
  var newPGender = $("<p>").html("Gender: ").append(callResultsGender);
  var newPIdentity = $("<p>").html("Celebrity Name: ");
  var newPBossAppend = newPBoss.append(newSCard).append(newPAge).append(newPGender)

  if (imageData.imageFaces[0].identity !== undefined) {
    var callResultsIdentity =  imageData.imageFaces[0].identity.name;
    newPIdentity.append(callResultsIdentity);
    newPBossAppend.append(newPIdentity);
    }
  
  $("#alchemyAPI").empty();
  $("#alchemyAPI").append(newPBossAppend);
  }

