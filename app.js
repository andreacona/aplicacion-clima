$(document).ready(function(){
  $('#select').on('change',function() {
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/67be3c918dc1481d4f70cce406af7bb4/-33.4377968,-70.6504451',
      method: 'GET'
    }).then(function(data) {
      console.log(data);
    });
  })
});
