$(document).ready(function(){
    var title = $("title").text(), clicked;
    $("body").css("background-image", "url('../../img/background/" + title + "Background.png')");
    $.get("xml/" + title + ".xml")
            .done(vers, menu);
    function vers(xmlDom){
        $(xmlDom).find("name").each(function(index, e){
            var ver = $("<div>",{
                "text": $(e).text(),
                "class": "new"
            });
            $("#versions").append(ver);
        });
    }
    function menu(xmlDom){
        $(xmlDom).find("story").each(function(index, e){
            var par = $("<div>",{
                "text": $(e).text(),
                "class": "story"
            });
            $(".text").append(par);
        });
        $(xmlDom).find("chars").each(function(index, e){
            var char = $("<div>",{
                "class": "chars"
            });
            var pic = $("<img>",{
                "src": "../../img/games/characters/" + title + "/"  + $(e).attr("img"),
                "alt": $(e).attr("name"),
                css:{
                    float: "left"
                }
            });
            var total = $("<div>");
            char.append(pic);
            $(e).find("text").each(function(index, e2){
                var text = $("<div>",{
                    "text": $(e2).text()
                });
                total.append(text);
            });
            char.append(total);
            $(".text").append(char);
        });
        $(".chars").hide();
        $(xmlDom).find("other").each(function(index, e){
            var main = $("<div>",{
                "class": "other"
            });
            var name = $("<div>",{
                "text": $(e).text()
            });
            var link = $("<a>",{
                "href": $(e).attr("link")
            });
            var cover = $("<img>",{
                "src": "../../img/games/" + $(e).attr("cover"),
                "alt": $(e).text()
            });
            link.append(cover);
            main.append(link);
            main.append(name);
            $(".text").append(main);
        });
        $(".other").hide();
    }
    setInterval(cover, 0);
    function cover(){
        if (parseInt($("#description").css("width")) <= parseInt($("#cover").css("width")) + parseInt($("#versions").css("width")) + 122){
            $("#description").css("justify-content", "center");
        }
        else{
            $("#description").css("justify-content", "space-between");
        }
    }
    $("body").on('click', ".new", function(){
        if ($(this).text() !== $("#title").text()){
            $("#title").empty();
            $("#title").text($(this).text());
            clicked = $(this).text();
            $.get("xml/" + title + ".xml")
                .done(img);
        }
    });
    function img(xmlDom){
        $(xmlDom).find("name").each(function(index, e){
            if (clicked === $(e).text()){
                $("#cover img").attr("src", "../../img/games/" + $(e).attr("cover"));
                $("#cover img").attr("alt", clicked);
            }
        });
    }
    $("#menu div").click(function(){
        if ($(this).hasClass("unpressed")){
            var was = $(".pressed");
            if (was.text() === "Описание")
                $(".story").hide();
            else{
                if (was.text() === "Персонажи")
                    $(".chars").hide();
                else
                    $(".other").hide();
            }
            $(".pressed").removeClass("pressed");
            $(was).addClass("unpressed");
            $(this).removeClass("unpressed");
            $(this).addClass("pressed");
        }
        if ($(this).text() === "Описание")
                $(".story").show();
            else{
                if ($(this).text() === "Персонажи")
                    $(".chars").show();
                else
                    $(".other").show();
            }
        if($(".pressed").text() === "Серия игр")
            $(".text").css("text-align", "center");
        else
            $(".text").css("text-align", "justify");
    });
});