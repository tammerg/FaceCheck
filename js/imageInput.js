window.ajxStore = {
  urlBuild: {
    encodedURL: " ",
    imgLink: " ",
    imgListAdder: " "
    
  }
};

var myDataRef = new Firebase('https://facecheck.firebaseio.com/');

$(document).ready(function (){

//init materialize dropdowns
  $(".dropdown-button").dropdown();

  $(".urlBtn").on("click", urlReader);

// fireBase callback and html imagelist build

  myDataRef.on("child_added", function(snapshot) {
  var newImg = snapshot.val();
  var newA = $("<a>");
  var newAImg = $("<img>").attr("src", newImg.url);
  newAImg.addClass("responsive-img center-block imglist");
  newA.append(newAImg);
  var PicList = $("#dropdown3");
  PicList.prepend(newA);



  });  
//click imgList

  $(".imglist").on("click", function() {    
    var srcClick = $(this).attr("src");  
    console.log(srcClick);
    showImg(srcClick);
   });

 
  
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
  myDataRef.push(ajxStore.urlBuild.imgLink);
  ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink);
  showImg(ajxStore.urlBuild.encodedURL);
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
  myDataRef.push({url: ajxStore.urlBuild.imgLink});
  ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink);
  // console.log(ajxStore.urlBuild.encodedURL);
  // facePlusAjax();
  alchemyAjax();
  projectOxfordAjax();
  skyAjax();
  }

});



