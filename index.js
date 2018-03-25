$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


function clearfields() {
  $('input, textarea').val("");
  console.warn("All fields have been cleared!");
}


function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function updatebase64() {
  var plain = $("#plaintext").val();
  var plainconvert = b64EncodeUnicode(plain);
  $("#base64").val(plainconvert);
}


function updateplain() {
  var base64 = $("#base64").val();
  var base64convert = b64DecodeUnicode(base64);
  $("#plaintext").val(base64convert);


}


$( "#toggle" ).change(function() {
  if ($('#base64').prop( "disabled" ) == true) {
    $('#base64').prop("disabled", false);
    $('#plaintext').prop("disabled", true);
    $('#showencodedecode').html("<span class='text-danger'>Decode Mode</span>");
    $('#convert').html("Decode");
  }else {
    $('#base64').prop("disabled", true);
    $('#plaintext').prop("disabled", false);
    $('#showencodedecode').html("<span class='text-success'>Encode Mode</span>");
    $('#convert').html("Encode");

  }

});


function update() {
  if ($('#base64').prop( "disabled" ) == true) {
    updatebase64();
  }else {


    var base64try = $("#base64").val();


    try {
        window.atob(base64try);
        updateplain();
    } catch(err) {

        console.error("ERROR: Yeah, " + base64try + " is not a valid base64 string. Sorry");
        $('#ErrorModal').modal()
        $('#modalerrorfield').html(err.message);

    }



  }
}
