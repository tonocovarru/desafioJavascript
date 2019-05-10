var idSelectedPet = "";
function getData(){
    $.ajax({
        url: "https://jquerycrud-ed8dc.firebaseio.com/jose.json",
        type: "GET",
        success: function(response){
            console.log(response);
            loadPets(response);
            $(".btn-adopcion" ).click(function() {
              console.log("this---->",$(this)[0].id);
              idSelectedPet = $(this)[0].id;
            });

            $("#btn-solicitante" ).click(function() {
              console.log("CLICK ACEPTAR SOLICITANTE");
              return saveApplicant();
            });

            $('#exampleModal').on('show.bs.modal', function() {
              // do something when the modal is shown
              console.log("AQUI EN EL MODAL",idSelectedPet);
              $("#inputIdPet").val(idSelectedPet);
          });            

          }
    });
}

function saveApplicant(){
  let inputName = document.getElementById("inputName").value;
  let inputPhone =document.getElementById("inputPhone").value;
  let inputAddress =document.getElementById("inputAddress").value;
  let inputIdPet =document.getElementById("inputIdPet").value;
  if(validateFormApplicant())
    deleteData(inputIdPet);
  else return false;
}

function validateInput(forminput) {
  $(forminput).removeClass("border-fail");
  $(forminput).removeClass("border-succes");
  if ($(forminput).val() === "") {
    $(forminput).addClass("border-fail");
    $("<p class='text-fail'>Favor de llenar el campo</p>").insertAfter(forminput);
    return false;
  } else {
    $(forminput).addClass("border-success")
    return $(forminput).val();
  }
 }


 function validateFormApplicant(){
  document.querySelectorAll(".text-fail").forEach(function(element){
    console.log(element);
      element.parentNode.removeChild(element);
  });
  let inputName = validateInput("#inputName");
  let inputPhone =validateInput("#inputPhone");
  let inputAddress =validateInput("#inputAddress");
  return inputName && inputPhone && inputAddress;
 }


 function validateFormAddPets(){
  document.querySelectorAll(".text-fail").forEach(function(element){
    console.log(element);
      element.parentNode.removeChild(element);
  });

  let inputName = validateInput("#inputNombre");
  let inputBreed =validateInput("#inputRaza");
  let inputImage =validateInput("#inputURL");
  let inputDesc = validateInput("#inputDescripcion");
  return inputName && inputBreed && inputImage && inputDesc;
 }

function loadPets(objPets){
  $(".container-pets").empty();
  var numpets = 0;
  var classCol = "";
  $.each(objPets,(key,value)=>{
    console.log(" Es impar",numpets % 3);
    console.log(`key ${key}, value ${value}, name ${value.name}, breed: ${value.breed}, image: ${value.image}, description: ${value.description}`);
    if((numpets % 3) === 0)
       classCol += '<div class="row">';
    classCol +=  `<div class="col col-sm-6 col-md-4 mb-4">
                      <div class="card">
                          <div class="text-center"> 
                            <img src="${value.image}" class="card-img-top" alt="...">
                          </div>
                          <div class="card-body">
                          <h5 class="card-title">${value.name}</h5>
                          <p class="card-text">¡Hola! Soy ${value.name}, ${value.description}!</p>
                          <button id= "${key}" class="btn-adopcion btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            ¡Adoptar!
                          </button>                          
                          </div>
                      </div>
                  </div>`;
    if((numpets % 3) === 2)
       classCol += "</div>"
    numpets++;
  });
  console.log(classCol);
  $(".container-adopcion").append(classCol);
}

var postObject = {
  'name': 'Gogdo',
  'breed': 'Black Cat'
}

function postData(postObject){
    $.post( "https://jquerycrud-ed8dc.firebaseio.com/jose.json", JSON.stringify(postObject), function( data ) {
  console.log( data);
}, "json");
}

function updateData(){
    $.ajax({
       url: 'https://jquerycrud-ed8dc.firebaseio.com/dogs/-LeJgLYcUIR1OwHL49pW.json',
       type: 'PUT',
       data: JSON.stringify(postObject),
       success: function(response) {
         console.log(response)
       }
    });
}

function deleteData(key){
  var urlLocal = 'https://jquerycrud-ed8dc.firebaseio.com/jose/' + key + '.json';
  console.log("urlLocal ->>>>",urlLocal);
  $.ajax({
       url: urlLocal,
       type: 'DELETE',
       async: false,
       success: function(response) {
         console.log(response)
         init();
       }
    });
}


$(document).ready(function () {
  $('a').on('click', function (){
    //console.log();
    if($(this)[0].id === "sugiere") loadAddPet();
    if($(this)[0].id === "principal" || $(this)[0].id === "adopta") init();
  });
  $('button').on('click', function (){
    console.log(this);
  });  
});


function loadAddPet(){
  
  $(".container-adopcion").load("addpet.html", function( response, status, xhr ) {
    console.log(status);
    if ( status == "success" ) {
      var button = document.getElementsByClassName("submit")[0];
      //button.addEventListener()
      console.log(button);
    }
  });
}

function init(){
  $(".container-adopcion").load("content.html", function( response, status, xhr ) {
    console.log(status);
    if ( status == "success" ) {
        getData();
    }
  });
}


function addPetDB(){
  if(validateFormAddPets()){
    var namePet = document.getElementById("inputNombre").value;
    var breedPet = document.getElementById("inputRaza").value;
    var imagePet = document.getElementById("inputURL").value;
    var descriptionPet = document.getElementById("inputDescripcion").value;
    var objPet={
        "name": namePet,
        "breed": breedPet,
        "image": imagePet,
        "description":descriptionPet
    }
    console.log(namePet,breedPet,imagePet,descriptionPet);
    postData(objPet);
    $('#exampleModalCenter').modal();
    init();
  }
  else return false;
}

init();
