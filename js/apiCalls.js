
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
  var newSCard = $("<span>").html("Face++ API Results").addClass("card-title");
  var newPAge = $("<p>").html("Age: ").append(callResultsAge);
  var newPGender = $("<p>").html("Gender: ").append(callResultsGender);
  var newPSmile = $("<p>").html("Smile Degree: ").append(callResultsSmile);
  var newPGlass = $("<p>").html("Glasses: ").append(callResultsGlass);
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
  var newSCard = $("<span>").html("Watson Alchemy Face Detection API Results").addClass("card-title");
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


  function projectOxfordAjax() {

    var v1 =  ajxStore.urlBuild.imgLink;
    var v2 = "{\'url\': \'" + v1 + " \'}";
    console.log(v2);
    
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize?subscription-key=b3b1af6be31f456a9d6d215f8a8ae23d", 
        type: "POST",
        dataType: "json", 
        contentType: "application/json",
        data: ""+v2+"",
        success: projectOxfordShow
        });
   }

  
  function projectOxfordShow(imageData) {
 
  var callResultsAnger = imageData[0].scores.anger;
  var callResultsContempt = imageData[0].scores.contempt;
  var callResultsDisgust = imageData[0].scores.disgust;
  var callResultsFear = imageData[0].scores.fear;
  var callResultsHappiness = imageData[0].scores.happiness;
  var callResultsNeutral = imageData[0].scores.neutral;
  var callResultsSadness = imageData[0].scores.sadness;
  var callResultsSurprise = imageData[0].scores.surprise;

  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("Project Oxford Emotional Recognition API Results").addClass("card-title");
  var newPAnger = $("<p>").html("Anger: ").append(callResultsAnger);
  var newPDisgust = $("<p>").html("Disgust: ").append(callResultsDisgust);
  var newPFear = $("<p>").html("Fear: ").append(callResultsFear);
  var newPHappiness = $("<p>").html("Happiness: ").append(callResultsHappiness);
  var newPNeutral = $("<p>").html("Neutral: ").append(callResultsNeutral);
  var newPSadness = $("<p>").html("Sadness: ").append(callResultsSadness);
  var newPSurprise = $("<p>").html("Surprise: ").append(callResultsSurprise);
  newPBoss.append(newSCard).append(newPAnger).append(newPDisgust).append(newPFear).append(newPHappiness)
    .append(newPNeutral).append(newPSadness).append(newPSurprise);
  $("#oxfordAPI").empty();
  $("#oxfordAPI").append(newPBoss);

  
}




