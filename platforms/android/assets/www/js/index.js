var photoBase64;

var app = {

  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    var photoImage = document.getElementById('photo');
    photoImage.addEventListener('click', app.takePhoto, false);
    var takePhoto = document.getElementById('takePhoto');
    takePhoto.addEventListener('click', app.takePhoto, false);
    var sendPhoto = document.getElementById('sendPhoto');
    sendPhoto.addEventListener('click', app.sendPhoto, false);
  },

  sendPhoto: function() {


    navigator.notification.confirm(
        '¿Desea enviar la foto junto con las coordenadas de su ubicación?', // message
        function(buttonIndex) {
          if(buttonIndex == 1){
            sendPhotoWithGpsPosition();
          }else{
           var options = { dimBackground: true };
           SpinnerPlugin.activityStart("Enviando los datos al servidor..", options);

           $.post("http://iditswebservice.esy.es/testapi.php",
           {

            photo:photoBase64
          },
          function(data, status){
            SpinnerPlugin.activityStop();
            if(status=="success" && data >= 1){
              alert("Su foto se envio correctamente");
            }else{
              alert("Se produjo un error al enviar los datos al servidor "+status+", "+data);
            }


          });

         }
        },            // callback to invoke with index of button pressed
        'Opciones de transferencia',           // title
        ['Si','No']     // buttonLabels
        );



  },



  takePhoto: function(){
    navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, 
      allowEdit: false, destinationType: navigator.camera.DestinationType.DATA_URL });
  },

  onPhotoDataSuccess: function(imageData) {
    $("#sendPhoto").show();
    $("#takePhoto").text("TOMAR OTRA")

    var photo = document.getElementById('photo');
    photo.style.display = 'block';
    photo.src = "data:image/jpeg;base64," + imageData;
    photoBase64 = imageData;

  },

  onFail: function(message) {
    alert('Se produjo un error inesperado al obtener la foto: ' + message);
  }

};

$( document ).ready(function() {
  $.support.cors=true;

});


function sendPhotoWithGpsPosition() {
  var options = { dimBackground: true };
  SpinnerPlugin.activityStart("Obteniendo las coordenadas del gps..", options);

  var options = {
    enableHighAccuracy: true,
    maximumAge: 3600000
  }

  var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    SpinnerPlugin.activityStop();

    var options = { dimBackground: true };
    SpinnerPlugin.activityStart("Enviando los datos al servidor..", options);

    $.post("http://iditswebservice.esy.es/testapi.php",
    {

      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
      photo:photoBase64
    },
    function(data, status){
      SpinnerPlugin.activityStop();

      if(status=="success" && data >= 1){
        alert("Su foto se envio correctamente");
      }else{
        alert("Se produjo un error al enviar los datos al servidor "+status+", "+data);
      }

    });


  };

  function onError(error) {
    SpinnerPlugin.activityStop();
    alert('No se pudo acceder a las coordenadas gps del usuario '+ error.message + '\n');
    return null;
  }




}