$(document).ready(function() {
  $("#nonactive").click(function() {
    $("#offline").css("display", "block");
    $("#nonactive").css("display", "none");
  });

  $("#fav").click(function() {
    var btn = $("#fav");
    btn
      .parent()
      .children()
      .css("background-color", "#1C2644");
    btn.css("background-color", "#52709C");

    $("#refresh").css("display", "block");
    $("#filter").css("display", "block");
    $("#pages").css("display", "none");
    $("#offline").css("display", "none");
    if ($("#unauth").css("display") == "none") {
      $("#nonactive").css("display", "block");
    } else {
      $("#nonactive").css("display", "none");
    }

    var favs = $("#favorite");
    favs
      .parent()
      .children()
      .css("display", "none");
    favs.css("display", "block");
  });

  $("#fav").click();
});
