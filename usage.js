$(document).ready(function($){
  setTimeout(function () {
    window.iframeTracker($('.gronical'), function() {
        console.log('iframe clicked');
      });
  }, 5000);
  
});
