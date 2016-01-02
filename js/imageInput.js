window.ajxStore = {
  urlBuild: {
    encodedURL: " ",
    imgLink: " " 
  }
};

$(document).ready(function (){
  $(".dropdown-button").dropdown();
  
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
  ajxStore.encodedURL.imgLink = evt.dataTransfer.getData("URL");
  ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.encodedURL.imgLink);
  showImg(ajxStore.encodedURL.imgLink);
  // facePlusAjax();
  alchemyAjax(); 
  projectOxfordAjax();  
  skyAjax(); 
  }

//show image function
function showImg(imgLink) {
  var newimg = $("<img>");
  $(newimg).attr("src", imgLink).addClass("responsive-img center-block valign");
  $("#dropbox").empty();
  $("#dropbox").append(newimg); 
  }

// read from URL input or dropped-in image

function urlReader() {
  ajxStore.urlBuild.imgLink = $("#url-value").val();
  showImg(ajxStore.urlBuild.imgLink);
  ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink);
  console.log(ajxStore.urlBuild.encodedURL);
  // facePlusAjax();
  alchemyAjax();
  projectOxfordAjax();
  skyAjax();
  }

});



