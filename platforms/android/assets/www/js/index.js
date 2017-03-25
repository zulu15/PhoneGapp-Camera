      var app = {

          initialize: function() {
              this.bindEvents();
          },
         
          bindEvents: function() {
              var takePhoto = document.getElementById('takePhoto');
              takePhoto.addEventListener('click', app.takePhoto, false);
              var sendPhoto = document.getElementById('sendPhoto');
              sendPhoto.addEventListener('click', app.sendPhoto, false);
          },

          sendPhoto: function() {
            //TODO conexion con la api
              alert('Imagen enviada al servidor');
          },

          takePhoto: function(){
              navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, 
                  allowEdit: true, destinationType: navigator.camera.DestinationType.DATA_URL });
          },

          onPhotoDataSuccess: function(imageData) {
            
            alert('Imagen recibida '+imageData);

            var photo = document.getElementById('photo');

            photo.style.display = 'block';

            photo.src = "data:image/jpeg;base64," + imageData;

            var sendPhoto = document.getElementById('sendPhoto');
            sendPhoto.style.display = 'block';
            
          },

          onFail: function(message) {
            alert('Failed because: ' + message);
          }

      };