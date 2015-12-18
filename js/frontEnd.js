window.urlBuild = {
  apiAcc: {
    faceApi: "https://apius.faceplusplus.com/v2/",
    meth: "detection/detect?",
    url: "http%3A%2F%2Fcdn.collider.com%2Fwp-content%2Fuploads%2Fanchorman-2-sequel-image-will-ferrell.jpg",
    api_secret: "PTwMJGAq9Qnqg34EozZpH9mhwsy4mRbF",
    api_key: "f53e2536752725f3bed49a4ede929058",
    attributes: "age"
  }
}







$(document).ready(function (){
  $(".urlBtn").on("click", urlReader);

  $(".img-dropbox").on("dragenter", noopHandler);
  $(".img-dropbox").on("dragexit", noopHandler);
  $(".img-dropbox").on("dragover", noopHandler);
  var dropbox = document.getElementById('dropbox');
  dropbox.addEventListener('drop', drop, false);








function urlReader () {
  var imgLink = $("#url-value").val();
  var encodedURL = encodeURIComponent(imgLink);
  var fullUrl = urlBuild.apiAcc.faceApi + urlBuild.apiAcc.meth + "url=" + encodedURL + "&api_secret=" 
      + urlBuild.apiAcc.api_secret + "&api_key=" + urlBuild.apiAcc.api_key + "&attribute=" + urlBuild.apiAcc.attributes;
  alert(encodedURL);
  alert(fullUrl);

  $.ajax ({
    type: "GET",
    url: fullUrl,
    success: faceCall
  });
}

function faceCall(imageData) {
  console.log(imageData);
  var callResults = imageData.face[0].attribute.age.value;
  alert(callResults);
  var newP = $("<p>");
  newP.append(callResults);
  $("#testApiInfo").append(newP);
}

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

});