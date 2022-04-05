$(document).ready(function () {
  function clearAll() {
    $(".addressInfo").eq(0).text("");
    $(".addressInfo").eq(1).text("");
    $(".addressInfo").eq(2).text("");
    $(".addressInfo").eq(3).text("");
    $("#iframe-here").html("");
  }
  
  function printAll(data) {
    if (data.hasOwnProperty("status") && data.status == 404) {
      alert("CEP não encontrado");
      return 0;
    }
    $(".addressInfo").eq(0).text(data.address);
    $(".addressInfo").eq(1).text(data.district);
    $(".addressInfo").eq(2).text(data.city);
    $(".addressInfo").eq(3).text(data.state);
    let parameters = `${data.address.replaceAll(" ", "+")}+${data.district.replaceAll(" ", "+")}+${data.city.replaceAll(" ", "+")}+${data.state.replaceAll(" ", "+")}+${data.cep}`;
    let url = `https://maps.google.com/maps?q=${parameters}&output=embed`;
    console.log(data, url);
    $("#iframe-here").append(`<iframe id="mapFrame" height="100%" width="100%" frameborder="0" style="border:0" src=${url} allowfullscreen></iframe>`)
  }

  $("#consult").click(function () {
    let regex = /^[0-9]{8}$/g
    if (!regex.test($("#cep").val())) {
      alert("Digite um CEP com 8 númmeros sem caracteres especiais");
    } else {
      $.ajax({ url: `https://cep.awesomeapi.com.br/json/${Number($("#cep").val())}` })
        .done((data) => {
          clearAll();
          printAll(data);
        });
    }
  })
  alert("Pesquise a sua localidade baseado em seu CEP");
})