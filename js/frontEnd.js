window.ajxStore = {
  urlBuild: {
    encodedURL: " " 
  }
}

$(document).ready(function (){
  $(".urlBtn").on("click", urlReader);
  
// initialize dropbox
  $(".img-dropbox").on("dragenter", noopHandler);
  $(".img-dropbox").on("dragexit", noopHandler);
  $(".img-dropbox").on("dragover", noopHandler);
  var dropbox = document.getElementById('dropbox');
  dropbox.addEventListener('drop', drop, false);  


// drop box functions

function noopHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  }

function drop(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var imgLink = evt.dataTransfer.getData("URL");
  ajxStore.urlBuild.encodedURL = encodeURIComponent(imgLink);
  showImg(imgLink);
  facePlusAjax();
  alchemyAjax();    
  }

//show image function
function showImg(imgLink) {
  var newimg = $("<img>");
  $(newimg).attr("src", imgLink).addClass("responsive valign");
  $("#dropbox").empty();
  $("#dropbox").append(newimg); 
  }


// read from URL input or dropped-in image

function urlReader () {
  var imgLink = $("#url-value").val();
  showImg(imgLink);
  ajxStore.urlBuild.encodedURL = encodeURIComponent(imgLink);
  console.log(ajxStore.urlBuild.encodedURL);
  facePlusAjax();
  alchemyAjax();
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
  url: "http%3A%2F%2Fblackathlete.net%2Fwp-content%2Fuploads%2F2015%2F08%2FBarack-Obama-200x200.jpg",
  apikey: "c84b707045f2eaf44ac7896ca8638274c82489c4",
  output: "json",
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
  var newPGender = $("<p>").html("    Gender: ").append(callResultsGender);
  var newPIdentity = $("<p>").html("      Celebrity Name: ");
  var newPBossAppend = newPBoss.append(newSCard).append(newPAge).append(newPGender)

  if (imageData.imageFaces[0].identity !== undefined) {
    var callResultsIdentity =  imageData.imageFaces[0].identity.name;
    newPIdentity.append(callResultsIdentity);
    newPBossAppend.append(newPIdentity);
    }
  

  newPBossAppend;
  $("#alchemyAPI").empty();
  $("#alchemyAPI").append(newPBoss);
  }

});


