var w = window.innerWidth;
var h = window.innerHeight;

$('body').css('perspective', h);

$('nav').css('top', function(){
    return .5*(h-$(this).innerHeight());
});

$('.close').click(function(){
    $(this).fadeOut("fast");
    $(this).parent().animate({width: "toggle"});
});

$(".sidebar").animate({width: "toggle"});
$('.close').hide();

$('nav a.sidebar-link').click(function(){
    if ($('.sidebar').css('display') === 'none'){
        $(".sidebar").animate({width: "toggle"});
        $('.close').fadeIn('fast');
    }
});

$('#abstract-link').click(function(){
    $('#manifesto').hide();
    $('#abstract').show();
});

$('#manifesto-link').click(function(){
    $('#abstract').hide();
    $('#manifesto').show();
});

$('.tenet').each(function(){
    $(this).css('top', function(){
        return 0*(h-$(this).innerHeight());
    });
    $(this).css('left', function(){
        return .5*(w-$(this).find('article').innerWidth());
    });
    $(this).hide();
});
$('.tenet').eq(2).css('transform', function(){
    var sign = Math.round(Math.random()) * 2 - 1;
    var x = sign * Math.floor(Math.random()*4);
    var y = sign * Math.floor(Math.random()*4);
    var z = sign * Math.floor(Math.random()*6);
    return "rotateX("+x+"deg)" + " rotateY("+y+"deg)" + " rotateZ("+z+"deg)" + " translateZ(-4em)";
});


$( document ).on( "mousemove", function( event ) {
    var x = event.pageX;
    var y = event.pageY;

    if (y<h/3){
        if (x<w/3){
            $('.tenet').hide();
            $('.tenet').eq(0).show();
        }
        else if (x>2*w/3){
            $('.tenet').hide();
            $('.tenet').eq(1).show();
        }
        else
            $('.tenet').hide();
    }
    else if (y>2*h/3){
        if (x<w/3){
            $('.tenet').hide();
            $('.tenet').eq(3).show();
        }
        else if (x>2*w/3){
            $('.tenet').hide();
            $('.tenet').eq(4).show();
        }
        else
            $('.tenet').hide();
    }
    else {
        if (x>w/3 && x<2*w/3){
            $('.tenet').hide();
            $('.tenet').eq(2).show();
        }
        else
            $('.tenet').hide();
    }
});

$('#rotate').click(function(){
    camera.position.z *= -1;
    sign *= -1;
});

$('#fullscreen').click(function(){
    fullscreen();
});

function fullscreen(){
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
}
