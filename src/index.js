$(document).ready(function() 
{
    document.getElementById('fitzpatrickFormButton').addEventListener('click', function(){
        window.location.href = "fps";
    });

    document.getElementById('monkFormButton').addEventListener('click', function(){
        window.location.href = "photo";
    });

    document.getElementById('summaryButton').addEventListener('click', function(){
        scrollTo("summary");
    });

    document.getElementById('formsButton').addEventListener('click', function(){
        scrollTo("forms");
    });

    document.getElementById('contactButton').addEventListener('click', function(){
        scrollTo("contact");
    });
})

function scrollTo(id)
{
    var scrollDiv = document.getElementById(id).offsetTop;
    window.scrollTo({ top: scrollDiv -50, behavior: 'smooth'});
}