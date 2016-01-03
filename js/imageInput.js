window.ajxStore = {
  urlBuild: {
    encodedURL: " ",
    imgLink: " ",
    
  }
};

var myDataRef = new Firebase('https://facecheck.firebaseio.com/');

$(document).ready(function (){

//init materialize dropdowns
  $(".dropdown-button").dropdown();

  $(".urlBtn").on("click", urlReader);

// fireBase callback, html imagelist build, 

  myDataRef.on("child_added", function(snapshot) {
  var newImg = snapshot.val();
  var newA = $("<a>");
  var newAImg = $("<img>").attr("src", newImg.url);
  newAImg.addClass("responsive-img center-block imglist");
  newA.append(newAImg);
  var PicList = $("#dropdown3");
  PicList.prepend(newA);

   $(".imglist").on("click", function() {    
    ajxStore.urlBuild.imgLink = ($(this).attr("src"));
    showImg(ajxStore.urlBuild.imgLink);
    ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink); 
    alchemyAjax();
    projectOxfordAjax();
    skyAjax();
   });


  });  

//click imgList

  
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
  ajxStore.urlBuild.imgLink = evt.dataTransfer.getData("URL");
  myDataRef.push({url: ajxStore.urlBuild.imgLink});
  showImg(ajxStore.urlBuild.imgLink);
  ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink);
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
  myDataRef.push({url: ajxStore.urlBuild.imgLink});
  showImg(ajxStore.urlBuild.imgLink);
  ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink);  
  alchemyAjax();
  projectOxfordAjax();
  skyAjax();
  }

});



