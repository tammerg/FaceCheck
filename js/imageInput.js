
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

});



