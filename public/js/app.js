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

//click event to create a note
$("#submitNote").on('click', function (event) {
  event.preventDefault();
  sendNote($(this));
});

//keypress event to allow user to submit note with enter key
$("#noteBodyEntry").on('keypress', function (event) {
  if(event.keyCode === 13){
    sendNote($(this));
  }
});

//click event to delete an article from savedArticles
$("#delete").on('click', function (event){
  event.preventDefault();
  let id = $(this).data("id");
  $.ajax({
    url: "/deleteArticle/" + id,
    type: "DELETE",
    success: function (response) {
      window.location.href = "/saved";
    },
    error: function (error) {
      showErrorModal(error);
    }
  });
});

});