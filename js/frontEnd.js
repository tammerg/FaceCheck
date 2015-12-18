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
    var imageUrl = evt.dataTransfer.getData("URL");
    urlReader(imageUrl);
}


// read from URL input or dropped-in image

function urlReader () {
  var imgLink = $("#url-value").val();
  ajxStore.urlBuild.encodedURL = encodeURIComponent(imgLink);
  console.log(ajxStore.urlBuild.encodedURL);
  facePlusAjax();
}

// Face++ URL building and Ajax call

function facePlusAjax() {
    apiAcc = {
    faceApi: "https://apius.faceplusplus.com/v2/",
    meth: "detection/detect?",
    url: "http%3A%2F%2Fcdn.collider.com%2Fwp-content%2Fuploads%2Fanchorman-2-sequel-image-will-ferrell.jpg",
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
  console.log(callResultsAge, callResultsGender, callResultsSmile, callResultsGlass);
  var newPBoss = $("<p>");
  var newSCard = $("<span>").html("Face++ Results").addClass("card-title");
  var newPAge = $("<p>").html("Age: ");
  var newPGender = $("<p>").html("    Gender: ");
  var newPSmile = $("<p>").html("      Smile Degree: ");
  var newPGlass = $("<p>").html("        Glasses? ");
  newPAge.append(callResultsAge);
  newPGender.append(callResultsGender);
  newPSmile.append(callResultsSmile);
  newPGlass.append(callResultsGlass);
  newPBoss.append(newSCard).append(newPAge).append(newPGender).append(newPSmile).append(newPGlass);
  $("#facePlusAPI").empty();
  $("#facePlusAPI").append(newPBoss);
}










// $.ajax({
  // type: "GET",
  // url: http://gateway-a.watsonplatform.net/calls/url/URLGetRankedImageFaceTags


 // apiAlch {
    // api_key: "c84b707045f2eaf44ac7896ca8638274c82489c4",

 // }

});





