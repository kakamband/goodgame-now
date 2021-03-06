$(document).ready(function() {
  var top = function() {
    var pagecount = 0;
    chrome.runtime.sendMessage(
      {
        msg: "page"
      },
      function(response) {
        pagecount = response;
        var i = 1;
        tops(i, pagecount);
      }
    );
  };

  top();

  $("#refresh").click(function() {
    var visible = $("#content div:visible");

    $({ deg: 0 }).animate(
      { deg: 360 },
      {
        duration: 200,
        step: function(now) {
          $(".icorefresh").css({
            transform: "rotate(" + now + "deg)"
          });
        }
      }
    );

    if (visible.attr("id") == "topstreams") {
      top();
    }
  });
});

var tops = function(i, pagecount) {
  prev = $("#prev");
  next = $("#next");
  switch (i) {
    case 1:
      {
        prev.off("click");
        prev.css("cursor", "default");
        prev.css("color", "#ACACAC");
        prev.css("background-color", "#2F323D");
        prev.unbind("mouseenter mouseleave");
        prev.removeClass("hover");

        next.off("click");
        next.css("cursor", "pointer");
        next.css("color", "#73ADFF");
        next.css("background-color", "#21273B");
        next.hover(
          function() {
            $(this).addClass("hover");
          },
          function() {
            $(this).removeClass("hover");
          }
        );
        next.click(function() {
          i++;
          $("#topstreams").html("");
          tops(i, pagecount);
        });
      }
      break;
    case pagecount:
      {
        next.off("click");
        next.css("cursor", "default");
        next.css("color", "#ACACAC");
        next.css("background-color", "#2F323D");
        next.unbind("mouseenter mouseleave");
        next.removeClass("hover");

        prev.off("click");
        prev.css("cursor", "pointer");
        prev.css("color", "#73ADFF");
        prev.css("background-color", "#21273B");
        prev.hover(
          function() {
            $(this).addClass("hover");
          },
          function() {
            $(this).removeClass("hover");
          }
        );
        prev.click(function() {
          i--;
          $("#topstreams").html("");
          tops(i, pagecount);
        });
      }
      break;
    default: {
      next.off("click");
      next.css("cursor", "pointer");
      next.css("color", "#73ADFF");
      next.css("background-color", "#21273B");
      next.hover(
        function() {
          $(this).addClass("hover");
        },
        function() {
          $(this).removeClass("hover");
        }
      );
      next.click(function() {
        i++;
        $("#topstreams").html("");
        tops(i, pagecount);
      });

      prev.off("click");
      prev.css("cursor", "pointer");
      prev.css("color", "#73ADFF");
      prev.css("background-color", "#21273B");
      prev.hover(
        function() {
          $(this).addClass("hover");
        },
        function() {
          $(this).removeClass("hover");
        }
      );
      prev.click(function() {
        i--;
        $("#topstreams").html("");
        tops(i, pagecount);
      });
    }
  }

  $.get("https://goodgame.ru/api/4/streams?page=" + i + "/", function(data) {
    var content = "";
    wrap = $("#topstreams");
    answertop = data;
    for (var i = 0; i < answertop.streams.length; i++) {
      if (answertop.streams[i].status != false) {
        if (
          answertop.streams[i].viewers.toString().length == 2 &&
          answertop.streams[i].viewers.toString().charAt(0) == "1"
        ) {
          var views = " зрителей";
        } else {
          switch (answertop.streams[i].viewers.toString().slice(-1)) {
            case "1":
              var views = " зритель";
              break;
            case "2":
            case "3":
            case "4":
              var views = " зрителя";
              break;
            default:
              var views = " зрителей";
          }
        }

        content +=
          '<a target="_blank" rel="noopener noreferrer" href="https://goodgame.ru/' +
          answertop.streams[i].streamer.username +
          '/"><div id="stream" name="' +
          answertop.streams[i].streamer.username +
          '"><img src="http:' +
          answertop.streams[i].preview +
          '"><div class="text"><div class="channame">' +
          answertop.streams[i].streamer.username +
          '</div><div class="description" title="' +
          answertop.streams[i].game.title +
          " - " +
          answertop.streams[i].viewers +
          views +
          '"><div class="name">' +
          answertop.streams[i].game.title +
          ' -&nbsp;</div><div class="viewers"><span class="icoviewers"></span>' +
          answertop.streams[i].viewers +
          '<span class="views">' +
          views +
          '</span></div></div><div title="' +
          answertop.streams[i].title +
          '" class="title">' +
          answertop.streams[i].title +
          "</div></div></div></a>";
      }
    }
    wrap.html(content);
  });
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

String.prototype.splice = function(start, delCount, newSubStr) {
  return (
    this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount))
  );
};
