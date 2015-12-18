window.ajxStore {
  urlBuild: {
    encodedURL: 0 
}

$(document).ready(function (){
  $(".urlBtn").on("click", urlReader);

function urlReader () {
  var imgLink = $("#url-value").val();
  encodedURL = encodeURIComponent(imgLink);
  }

function facePlusAjax() {
    apiAcc: {
    faceApi: "https://apius.faceplusplus.com/v2/",
    meth: "detection/detect?",
    url: "http%3A%2F%2Fcdn.collider.com%2Fwp-content%2Fuploads%2Fanchorman-2-sequel-image-will-ferrell.jpg",
    api_secret: "PTwMJGAq9Qnqg34EozZpH9mhwsy4mRbF",
    api_key: "f53e2536752725f3bed49a4ede929058",
    attributes: "age"
    }

var fullUrl = apiAcc.faceApi + apiAcc.meth + "url=" + encodedURL + "&api_secret=" 
      + urlBuild.apiAcc.api_secret + "&api_key=" + urlBuild.apiAcc.api_key + "&attribute=" + urlBuild.apiAcc.attributes;

$.ajax ({
  type: "GET",
  url: fullUrl,
  success: faceCall

});

function faceCall(imageData) {
  console.log(imageData);
  var callResults = imageData.face[0].attribute.age.value;
  alert(callResults);
  var newP = $("<p>");
  newP.append(callResults);
  $("#testApiInfo").append(newP);
}



 apiAlch {
    api_key: "c84b707045f2eaf44ac7896ca8638274c82489c4",

 }



$.ajax({
  type: "GET",
  url: http://gateway-a.watsonplatform.net/calls/url/URLGetRankedImageFaceTags


});




});