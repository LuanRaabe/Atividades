function setGraphic(width = 500, height = 200, canvas, color) {
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.font = "30px Courier";
  return ctx;
}

function drawnGraph(width = 500, height = 200, ctx, data, param, color, legends) {
  let x = width / data.length;
  ctx.beginPath();
  ctx.moveTo(0, height);

  let pass = 0;
  let dataMin = Math.min(...data.map((item) => item[param]));
  let dataMax = Math.max(...data.map((item) => item[param]));
  let scale = height / (dataMax - dataMin);

  for (let i = 1; i < data.length; i++) {
    ctx.lineTo(pass, (height -  ((data[i][param] -dataMin) * scale)));
    pass += x;
  }
  ctx.strokeStyle = color;
  ctx.stroke();
  let li = document.createElement("li");
  li.innerText = param;
  li.setAttribute("style", `color: ${color}`);
  legends.appendChild(li);
  return 0;
}

const zeroFill = n => {
  return (n < 10) ? ('0' + n) : n;
}

$(document).ready(function () {
  $.ajax({ url: "https://economia.awesomeapi.com.br/json/all" })
    .done((data) => {
      Object.entries(data).forEach((item) => {
        $("#codes").append(`<option>${item[0]}</option>`)
      })
      $("#codes").prepend(`<option selected disabled>---Selecione---</option>`)
    });

  $("#codes").on("change", () => {
    let code = $("#codes").val();
    $.ajax({ url: `https://economia.awesomeapi.com.br/${code}/1` })
      .done((data) => {
        $("#actual").html(`Nome: ${data[0].name} <br />
                          Moeda: ${data[0].code} <br />
                          Cotação: ${data[0].codein} <br />
                          Alta: ${data[0].high} <br />
                          Baixa: ${data[0].code} <br />
                          Variação: ${data[0].varBid} <br />
                          Porcentagem variação: ${data[0].pctChange} <br />
                          Compra: ${data[0].bid} <br />
                          Venda: ${data[0].ask}<br />
                          Data: ${data[0].create_date}`)
      });
  })

  $("#consult").click(function () {
    if(!$("#codes").val() || !$("#date-1").val() || !$("#date-2").val()) {
      alert("É preciso definir a moeda, uma data inicial e uma data final");
      return 0;
    }
    let date1 = $("#date-1").val().replaceAll("-", "");
    let date2 = $("#date-2").val().replaceAll("-", "");
    let date1Formated = new Date($("#date-1").val());
    let date2Formated = new Date($("#date-2").val());
    let now = new Date();
    if(date1Formated > date2Formated) {
      [date1, date2] = [date2, date1];
    }
    if(date2Formated > now) {
      alert("Data de fim deve ser no máximo a atual");
    }
    let days = Math.floor(Math.abs((date2Formated.getTime() - date1Formated.getTime())/(1000 * 3600 * 24)));
    /* if(days > 90) {
      let i = 90;
      daysCount = 90;
      while(i <= days){
        date2Formated = new Date(date1Formated.getTime() + daysCount*1000*3600*24);
        date1 = zeroFill(date1Formated.getDate()) + "/" + zeroFill(date1Formated.getMonth()+1) + "/" + date1Formated.getFullYear();
        date2 = zeroFill(date2Formated.getDate()) + "/" + zeroFill(date2Formated.getMonth()+1) + "/" + date2Formated.getFullYear();
        $.ajax({ url: `https://economia.awesomeapi.com.br/${code}-BRL/${10**20}?start_date=${date1}&end_date=${date2}` })
          .done((data) => { allData = [ ...data, ...allData] })
        date1Formated = date2Formated;
        if((i + 90) < days) {
          i += 90;
        } else if((i + 90) > days) {
          daysCount = days - i;
          i = days; 
        }
      }
    } */
    let code = $("#codes").val();
    $.ajax({ url: `https://economia.awesomeapi.com.br/${code}-BRL/${10**20}?start_date=${date1}&end_date=${date2}` })
      .done((data) => {
        data = data.reverse();
        console.log(data);
        $("#result").html("");
        for (let i = 1; i < data.length; i++) {
          let date = new Date(Number(data[i].timestamp*1000));
          let formatDate = zeroFill(date.getDate()) + "/" + zeroFill(date.getMonth()+1) + "/" + date.getFullYear();
          $("#result").append(`<tr>
                                <td>${data[i].high}</td>
                                <td>${data[i].low}</td>
                                <td>${data[i].varBid}</td>
                                <td>${data[i].pctChange}</td>
                                <td>${data[i].bid}</td>
                                <td>${data[i].ask}</td>
                                <td>${formatDate}</td>
                              </tr>`);
        }
        $("#result").prepend("<tr><td>Máximo</td><td>Mínimo</td><td>Variação</td><td>Variação (%)</td><td>Compra</td><td>Venda</td><td>Data</td></tr>");
        $("#result").width(800);
        let legends = document.getElementById("legends");
        legends.innerText = "";
        let ctx = setGraphic(800, 300, document.getElementById("graphics"), "lightgray");
        drawnGraph(800, 300, ctx, data, "high","blue", legends);
        drawnGraph(800, 300, ctx, data, "low", "red", legends);
        drawnGraph(800, 300, ctx, data, "bid", "green", legends);
        drawnGraph(800, 300, ctx, data, "ask", "yellow", legends);
      });
      return 0;
  })
})