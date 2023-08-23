$(document).ready(function(){
    var title = $("title").text();
    $.get("../welcome.xml")
        .done(menu);
    function menu(xmlDom){
        $(xmlDom).find("dev").each(function(index, e){
            if ($(this).attr("name") !== title){
                var li = $("<li>",{
                    "id": $(e).text()
                });
                var link = $("<a>",{
                    "href": $(e).text() + ".html",
                    "text": $(e).attr("name")
                });
                li.append(link);
                $("#devs .second").append(li);
            }
        });
        $(xmlDom).find("genre").each(function(index, e){
            if ($(this).attr("name") !== title){
                var li = $("<li>",{
                    "id": $(e).text()
                });
                var link = $("<a>",{
                    "href": $(e).text() + ".html",
                    "text": $(e).attr("name")
                });
                li.append(link);
                $("#genres .second").append(li);
            }
        });
    }
});