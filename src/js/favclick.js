$(document).ready(function() {
  $("#nonactive div").click(function() {
    if ($("#offline").css("display") == "none") {
      $("#offline").show(300);
      $("#nonactive div").text("Скрыть оффлайн");
    } else {
      $("#offline").hide(300);
      $("#nonactive div").text("Оффлайн");
    }
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
