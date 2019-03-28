$(document).ready(function() {

//function to display error modal on ajax error
function showErrorModal(error) {
  $('#error').modal('show');
}

// When you click the save button
$("#save").on('click', function () {
  var articleId = $(this).attr("data-id");
  console.log(articleId);

  $.ajax({
    url: "/save/" + articleId,
    type: "GET",
    success: function (response) {
      window.location.href = '/';
    },
    error: function (error) {
      // showErrorModal(error);
    }
  });
});

//click event to open note modal and populate with notes
$("#addNote").on('click', function (){
  $("#noteArea").empty();
  $("#noteTitleEntry, #noteBodyEntry").val("");
  let id = $(this).data("id");
  $("#submitNote, #noteBodyEntry").attr("data-id", id);
  $.ajax({
    url: "/getNotes/" + id,
    type: "GET",
    success: function (data){
      $.each(data.notes, function (i, item){
        showNote(item, id);
      });
      $("#noteModal").modal("show");
    },
    error: function (error) {
      showErrorModal(error);
    }
  });
});

});