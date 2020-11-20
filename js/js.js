
      function loadAllData(tab2=null){
        $.ajax({
          data: {"all": true},
          type: "GET",
          dataType: "json",
          url: "./src/Controlers/DwellingControllers.php",
        }).done(function( data, textStatus, jqXHR ) {
            if(tab2!=null){
                let data2 =[];

                tab2.forEach(element => {
                    for(let i=0;i<data.length;i++){
                        if(data[i].id == element.id_json_dwelling){
                            data2.push(data[i]);
                            return;
                        }
                    }
                });
                buildCard(data2, 'tab2');
            }else{
                buildCard(data, 'tab1');
                buildDropDowns(data);
            }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                //alert;
            }
          });
      }

      function buildCard(data, tab){
        let html="";
          for(let i=0;i<data.length;i++){
            html+='<div class="row">'
            html+='<div class="col s12 m12">'
            html+='<div class="card">'
            html+='<div class="card-content">'
            html+='<div class="row">'
            
            html+='<div class="col s5 m5">'
            html+='<div class="card-image">'
            html+='<img src="img/home.jpg">'
            html+='</div>'
            html+='</div>'
            html+='<div class="col s7 m7">'
            html+='<h7><strong>Direccion</strong>:</h7> '+data[i].direccion+'<br>';
            html+='<h7><strong>Ciudad</strong>:</h7> '+data[i].ciudad+'<br>';
            html+='<h7><strong>Telefono</strong>:</h7> '+data[i].telefono+'<br>';
            html+='<h7><strong>Codigo Postal</strong>:</h7> '+data[i].codigo_Postal+'<br>';
            html+='<h7><strong>Tipo</strong>:</h7> '+data[i].tipo+'<br>';
            html+='<h7><strong>precio</strong>:</h7> '+data[i].precio+'<br>';
            html+='</div>'
            
            html+='</div>'
            html+='</div>'
            html+='<div class="card-action">'
            html+='<a class="waves-effect waves-light btn purple lighten-2"  onclick="addFavorite('+data[i].id+');">Guardar</a>'
            html+='</div>'
            html+='</div>'
            html+='</div>'
            html+='</div>'
          }

          $("#"+tab).html(html);
      }

      function buildDropDowns(data){
          citiesHtml='<option value="" selected>Elige una ciudad</option>';
          tipoHtml='<option value="" selected>Elige un tipo</option>'
          cities = [];
          tipo = [];
          for(let i = 0; i<data.length; i++){
              if(!cities.includes(data[i].ciudad)){
                  cities.push(data[i].ciudad);
                  citiesHtml+='<option value="'+data[i].ciudad+'">'+data[i].ciudad+'</option>';

              }
              if(!tipo.includes(data[i].tipo)){
                tipo.push(data[i].tipo);
                tipoHtml+='<option value="'+data[i].tipo+'">'+data[i].tipo+'</option>';
            }
          }          

          $('#selectCiudad').html(citiesHtml);
          $('#selectTipo').html(tipoHtml);
      }

      function addFavorite(id){
        $.ajax({
            data: {"idFavorite": id},
            type: "POST",
            dataType: "json",
            url: "./src/Controlers/DwellingControllers.php",
          }).done(function( data, textStatus, jqXHR ) {
            loadFavorite();
            alert('Se ha guardado correctamente');
          })
          .fail(function( jqXHR, textStatus, errorThrown ) {
              loadFavorite();
              alert('Se ha guardado correctamente');
              
        });
      }

      function loadFavorite(){
        $.ajax({
            data: {"favorite": true},
            type: "GET",
            dataType: "json",
            url: "./src/Controlers/DwellingControllers.php",
          }).done(function( data, textStatus, jqXHR ) {
              loadAllData(data);
          })
      }


      $('#formulario').on('submit', function (e){
            e.preventDefault();
            let ciudad = $('#selectCiudad').serialize().substr(7).replaceAll('+',' ');
            let tipo = $('#selectTipo').serialize().substr(5).replaceAll('+',' ');
            
            $.ajax({
                data: {"all": true},
                type: "GET",
                dataType: "json",
                url: "./src/Controlers/DwellingControllers.php",
              }).done(function( data, textStatus, jqXHR ) {
                let filter = data.filter(function (dwelling){
                    if(ciudad.length>0 && tipo.length>0){
                        return dwelling.ciudad === ciudad && dwelling.tipo === tipo;
                    }
                    if(ciudad.length==0){
                        return dwelling.tipo === tipo;
                    }
                    if(tipo.length==0){
                        return dwelling.ciudad === ciudad;
                    }
                }); 
                buildCard(filter,'tab1');
              })
              .fail(function( jqXHR, textStatus, errorThrown ) {
                  if ( console && console.log ) {
                      //alert;
                  }
            });

      });
