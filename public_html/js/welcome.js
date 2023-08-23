$(document).ready(function(){
    $.get("welcome.xml")
        .done(welcome);
    function welcome(xmlDom){
        $(xmlDom).find("dev").each(function(index, e){
            var link = $("<a>",{
                "href": "pages/" + $(e).text() + ".html",
                "class": "devs",
                css: {
                    backgroundImage: "url('img/logo/" + $(this).attr("logo") + "')"
                }
            });
        $(".menu").append(link);
        });
        $(xmlDom).find("genre").each(function(index, e){
            var link = $("<a>",{
                "href": "pages/" + $(e).text() + ".html",
                "class": "genres",
                "text": $(e).attr("name"),
                css: {
                    backgroundImage: "url('img/logo/" + $(this).text() + ".jpg')"
                }
            });
            $(".menu").append(link);
        });
        $(".genres").hide();
    }
    $(".buttons div").click(function(){
        if ($(this).hasClass("unpressed")){
            var was = $(".pressed");
            if (was.text() === "Разработчики")
                $(".devs").hide();
            else
                $(".genres").hide();
            $(".pressed").removeClass("pressed");
            $(was).addClass("unpressed");
            $(this).removeClass("unpressed");
            $(this).addClass("pressed");
        }
        if ($(this).text() === "Разработчики")
                $(".devs").show();
            else
                $(".genres").show();
    });
});