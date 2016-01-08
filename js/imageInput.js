
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

//url submit
 $(".urlBtn").on("click", urlReader);

//modal init
 $('.modal-trigger').leanModal();

// fireBase callback, html imagelist build


myDataRef.on("child_added", function(snapshot) {
  var newImg = snapshot.val().url;
   snapshot.forEach(function(urlSnapshot) {
     if (!newImg) {
       newImg = urlSnapshot.val();
     }
      console.log(newImg);
      var newA = $("<a>");
      var newAImg = $("<img>").attr("src", newImg);   
      newAImg.addClass("responsive-img center-block imglist");
      newA.append(newAImg);
      var picList = $("#dropdown3");
      picList.prepend(newA);
    });   
   

  $(".imglist").on("click", function() { 
  
   var a = ($(this).attr("src"));
   console.log(a);
   ajxStore.urlBuild.imgLink = ($(this).attr("src"));
   showImg(ajxStore.urlBuild.imgLink);
   ajxStore.urlBuild.encodedURL = encodeURIComponent(ajxStore.urlBuild.imgLink); 
   // alchemyAjax();
   // projectOxfordAjax();
   // skyAjax();
  });
 }); 

  //end Firebase function

  
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



