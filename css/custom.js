$(document).ready(function() {
    // Menu click Scrolling
    "use strict";
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        var hash = this.hash;
        var $target = $(hash);
        if ($target.length>0) {
            var offset = $('header').outerHeight();
            var responsive = $('header nav ul li').css('marginBottom');
            if (responsive === '20px') {
                offset = 0;
            }
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - offset
            }, 700);
        }
    });
    $('.main-menu-select select').change(function() {
        var hash = jQuery(this).find("option:selected").val();
        var $target = $(hash);
        if ($target.length>0) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 700);
        }

    });
    // Google map
    $('#map').gMap({
        maptype: 'ROADMAP',
        zoom: 12,
        scrollwheel: false,
        markers: [
            {
                address: '1535 Broadway, Suite 13A, New York, 10036',
                html: '1535 Broadway, Suite 13A, New York, 10036',
                icon: {
                    image: "images/gmap-pin.png",
                    iconsize: [52, 64],
                    iconanchor: [12,46]
                }
            }
        ]
    });
    

    // slider activation    
    $('.flexslider').flexslider();


    // Form input placeholder for older browsers
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() === input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() === '' || input.val() === input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() === input.attr('placeholder')) {
          input.val('');
        }
      });
    });


    //Contact form
    jQuery("#form").submit(function() {
        var str = jQuery(this).serialize();
        jQuery.ajax({
            type: "POST",
            url: "/timessquare/php/sendmail.php",
            data: str,
            success: function(msg){
                var result;
                    if(msg === "OK"){
                        result = "<div class='alert-success'>Your message has been successfully send! Thank you!</div>";
                        var yPos = jQuery("#form").offset().top;
                        yPos=yPos-100;
                        jQuery("#form").animate({ height: '0px' }, 1000, function() {
                            jQuery(this).hide();
                        });
                    }
                    else{
                        result = msg;
                        Recaptcha.reload();
                    }
                    jQuery('.submit_note').html(result);
            }                    
        });                  
        return false;
    });         


});