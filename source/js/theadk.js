var highlightEnabled = true;

$(document).ready(function () {
    $.ajaxSetup({ cache: false });  // prevent caching when using load

    //$('#renderOverlay').hide();           // for background debug

    $('#contentDiv').perfectScrollbar();

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    $("#contentDiv").bind('scroll', function () {
        var offset = $('#contentDiv').scrollTop();
        if (offset > 400) {
            $('#headerImage').hide();

            if (highlightEnabled) {
                $('#contentHighlight').hide();
                $('#highlightPhrase').text(getPhrase());
            }
        } else {
            $('#headerImage').show();
            if (highlightEnabled) {
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
                    $("#mainBody").html("<h1 style='color: red;'><b>This is not available</h1><p>You have attempted a route that hasn't yet be routed. Please find another route.</b><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></p>");
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