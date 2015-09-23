var highlightEnabled = true;

$(document).ready(function () {
    //$('#renderOverlay').hide();           // for background debug

    $('#contentDiv').perfectScrollbar();

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    $("#contentDiv").bind('scroll', function () {
        if (highlightEnabled) {
            var offset = $('#contentDiv').scrollTop();
            if (offset > 400) {
                $('#contentHighlight').hide();
                $('#highlightPhrase').text(getPhrase());
            } else {
                $('#contentHighlight').show();
            }
        }
    });

    $('#footer').hide();

    $('#header').load('html/header.html');
    $('#footer').load('html/footer.html');



    handleResize();
});

function handleResize() {
    var size = $('#headerOverlay').height() + $('#contentHighlight').height();
    $('#headerSpacer').height(size);

    return size;
}

function getPhrase ()
{
    var phrases = [
        "developer. creative. nerd.",
        "general purpose geek.",
        "full-stack developer.",
        "C#, Java, SQL, JS, HTML5 / CSS.",
        "20 years of web development experience.",
        "agile.",
        "genuine simulated musician.",
        "industry standard."
    ];

    return phrases[Math.floor((Math.random() * phrases.length))];
}

function aboutSite ()
{
    $('#contentDiv').fadeOut(300, "swing", function () {
    });
}

function router (html)
{

    $('#footer').fadeOut(300, "swing");


    $('#contentDiv').fadeOut(300, "swing", function () {
        var url = location.hash.slice(1) || '/';
        
        if (url == "/" || url == "home") {
            $('#contentHighlight').show();
            highlightEnabled = true;

            $('#mainBody').load('html/home.html');

            // change the phrase
            $('#highlightPhrase').text(getPhrase());
        } else {
            $('#contentHighlight').hide();
            highlightEnabled = false;

            $('#mainBody').load('html/' + url + '.html', function (response, status, xhr) {
                if (status == "error") {
                    console.log("ERROR");
                    $("#mainBody").html("<h1>Not found</h1><p>The page you request doesn't exist.</p>");
                }
            });
        }

        $('#contentDiv').fadeIn(150, "swing", function () {

            $('#footer').show();

            $('#contentDiv').animate({ scrollTop: 0 }, 300);
            //$('#contentDiv').scrollTop(0);
        });
    });
}