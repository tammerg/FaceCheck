
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
  console.log(imageData);
  var callResultsAge = imageData.imageFaces[0].age.ageRange;
  var callResultsGender = imageData.imageFaces[0].gender.gender;
  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("Watson Alchemy Face Detection API").addClass("card-title");
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
  var oxImg =  ajxStore.urlBuild.imgLink;
  var oxImgBd = "{\'url\': \'" + oxImg + " \'}";
    
    
  $.ajax({
   url: "https://api.projectoxford.ai/emotion/v1.0/recognize?subscription-key=b3b1af6be31f456a9d6d215f8a8ae23d", 
   type: "POST",
   dataType: "json", 
   contentType: "application/json",
   data: ""+oxImgBd+"",
   success: projectOxfordShow
  });
 }

  
 function projectOxfordShow(imageData) {
  console.log(imageData);
  var callResultsAnger = imageData[0].scores.anger;
  var callResultsContempt = imageData[0].scores.contempt;
  var callResultsDisgust = imageData[0].scores.disgust;
  var callResultsFear = imageData[0].scores.fear;
  var callResultsHappiness = imageData[0].scores.happiness;
  var callResultsNeutral = imageData[0].scores.neutral;
  var callResultsSadness = imageData[0].scores.sadness;
  var callResultsSurprise = imageData[0].scores.surprise;

  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("Project Oxford Emotional Recognition API").addClass("card-title");
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

 function skyAjax() {
  apiAcc = {
  skyApi: "http://api.skybiometry.com/fc/faces/detect.json?",
  api_key: "3812961842c149eb8825921fec8d59a6",
  api_secret: "3e012d436e254cc192669451d9d89801",
  attributes: "age,glass,pose,gender,race,smiling"
 }
  var fullUrl = apiAcc.skyApi + "api_key=" + apiAcc.api_key + "&api_secret=" + apiAcc.api_secret + "&urls=" + 
   ajxStore.urlBuild.imgLink + "&attributes=all"; 
     
  $.ajax ({
   type: "GET",
   url: fullUrl,
   success: skyShow
  });
 }

 function skyShow(imageData) {
  console.log(imageData);
  var callResultsAge = imageData.photos[0].tags[0].attributes.age_est.value;
  var callResultsGender = imageData.photos[0].tags[0].attributes.gender.value;
  var callResultsSmile =  imageData.photos[0].tags[0].attributes.smiling.value;
  var callResultsGlass = imageData.photos[0].tags[0].attributes.glasses.value;
  var callResultsAnger = imageData.photos[0].tags[0].attributes.anger.value;
  var callResultsEyes= imageData.photos[0].tags[0].attributes.eyes.value;
  var callResultsFear = imageData.photos[0].tags[0].attributes.fear.value;
  var callResultsHappiness = imageData.photos[0].tags[0].attributes.happiness.value;
  var callResultsLips = imageData.photos[0].tags[0].attributes.lips.value;
  var callResultsMood = imageData.photos[0].tags[0].attributes.mood.value;
  var callResultsSadness = imageData.photos[0].tags[0].attributes.sadness.value;
  var callResultsSurprise = imageData.photos[0].tags[0].attributes.surprise.value;

  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("SkyBiometry Face Detection and Recognition API").addClass("card-title");
  var newPSmile = $("<p>").html("Smile: ").append(callResultsSmile);
  var newPGlass = $("<p>").html("Glasses: ").append(callResultsGlass);
  var newPAnger = $("<p>").html("Anger: ").append(callResultsAnger);
  var newPEyes = $("<p>").html("Eyes: ").append(callResultsEyes);
  var newPFear = $("<p>").html("Fear: ").append(callResultsFear);
  var newPHappiness = $("<p>").html("Happiness: ").append(callResultsHappiness);
  var newPLips = $("<p>").html("Lips: ").append(callResultsLips);
  var newPMood = $("<p>").html("Mood: ").append(callResultsMood);
  var newPSadness = $("<p>").html("Sadness: ").append(callResultsSadness);
  var newPSurprise = $("<p>").html("Surprise: ").append(callResultsSurprise);

  newPBoss.append(newSCard).append(newPSmile).append(newPGlass)
   .append(newPAnger).append(newPEyes).append(newPFear).append(newPHappiness).append(newPHappiness)
   .append(newPLips).append(newPMood).append(newPSadness).append(newPSurprise);
  $("#facePlusAPI").empty();
  $("#facePlusAPI").append(newPBoss); 
 }




