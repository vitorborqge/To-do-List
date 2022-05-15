let totalInsertions = [];
let noft = document.getElementById("not");
let notfText = document.getElementById("not-text");

//Botão de Limpar tudo
$("#clearAll").on("click", () => {
  $("tbody").html("");
  form_clear();
});
// Limpa as áreas de input
function form_clear() {
  $("#title").val("");
  $("#desc").val("");
}
//Adiciona uma nova linha se não for nula
$("#add").on("click", (e) => {
  e.preventDefault();
  title = $("#title").val();
  desc = $("#desc").val();
  let innerStr = "";
  if (title.trim() === "") {
    alert("O título não pode ser nulo. Insira um título");
    return;
  }
  nofify("Tarefa adicionada.", "laranja");
  //Cria um objeto json para salvar o input
  currentInsertion = {
    curTitle: title,
    curDesc: desc,
    status: "feito",
  };
  totalInsertions.push(currentInsertion);
  $("tbody").fadeOut(400, () => {
    let i = 0;
    totalInsertions.forEach((element) => {
      innerStr += `<tr id = "tr${i++}">
     <th scope="row">${i}</th>
     <td>${element.curTitle}</td>
     <td>${element.curDesc}</td>
     <td><button type="submit" class="btn btn-success btn-sm replace">${
       element.status
     }</button></td>
     <td><button type="submit" class="btn btn-danger btn-sm delete">Deletar</button></td>
     </tr>`;
    });
    $("tbody").html(innerStr);
    $("tbody").fadeIn(400);
  });
});

$(document).on("click", ".replace", (e) => {
  rowId = getCurrentRow(e);
  totalInsertions[rowId].status = "✔️";
  $(e.currentTarget).html("✔️");
  nofify("Task Completed.", "green");
});

$(document).on("click", ".delete", (e) => {
  e.preventDefault();
  rowId = getCurrentRow(e);
  totalInsertions.splice(rowId, 1);
  let i = 0;
  let innerStr = "";
  // Quando a junção não funcionar excluir o elemento central
  $("tbody").fadeOut(400, () => {
    totalInsertions.forEach((element) => {
      innerStr += `<tr id = "tr${i++}">
       <th scope="row">${i}</th>
       <td>${element.curTitle}</td>
       <td>${element.curDesc}</td>
       <td><button type="submit" class="btn btn-success btn-sm replace">${
         element.status
       }</button></td>
       <td><button type="submit" class="btn btn-danger btn-sm delete">Deletar</button></td>
       </tr>`;
    });
    $("tbody").html(innerStr);
    $("tbody").fadeIn(400);
  });
});

function getCurrentRow(event) {
  currRow = $(event.currentTarget).parent().parent();
  rowId = $(currRow).attr("id");
  return rowId.replace(/[^0-9]/g, "");
}

function nofify(message, color) {
  noft.innerHTML = message;
  noft.style.visibility = "visible";
  noft.style.borderColor = color;
  setTimeout(() => {
    noft.style.visibility = "hidden";
  }, 3000);
}
