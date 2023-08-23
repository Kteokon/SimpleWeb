arrow = false;
$(document).ready(function(){
    var title = $("title").text();
    $.get("xml/" + title + ".xml")
        .done(info, games);
    function info(xmlDom){
        $(xmlDom).find("info").each(function(index, e){
            var info = $("<div>",{
                "text": $(e).text()
            });
        $(".info").append(info);
        });
    }
    function games(xmlDom){
        $(xmlDom).find("game").each(function(index, e){
            var series = $(e).attr("name");
            var bigDiv = $("<div>",{
                "id": series
            });
            $(".games").append(bigDiv);
            $(e).find(series).each(function(index, e2){
                var game = $("<a>",{
                    "text": $(e2).text(),
                    "href": $(e2).attr("link"),
                    css: {
                        backgroundImage: "url('../img/games/" + $(this).attr("imgLine") + "')"
                    }
                });
                $("#" + series).append(game);
            });
        });
    }
    $(".info, #up").hide();
    $("header h1").click(function(){
        if (!arrow){
            $("#up").show();
            $("#down").hide();
            $(".info").slideDown();
        }
        else{
            $("#down").show();
            $("#up").hide();
            $(".info").slideUp();
        }
        arrow = !arrow;
    });
});