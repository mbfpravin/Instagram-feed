// JavaScript Document
document.createElement("header");
document.createElement("section");
document.createElement("nav");
document.createElement("main");
document.createElement("footer");
/* document end */
var regex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
function getSlickOptions(className, slideToShow, slideToScroll) {
    jQuery(className).slick({
        infinite: false,
        slidesToShow: slideToShow,
        slidesToScroll: slideToScroll,
        rows: 0,
        prevArrow: "<i class='fa fa-angle-left'></i>",
        nextArrow: "<i class='fa fa-angle-right'></i>",
        responsive: [ 
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              arrows:true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1.2,
              slidesToScroll: 1,
              arrows:true,
            }
          }
        ]
      });
}
    function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
jQuery(window).on('load', function() { 
  $('.toggle-all-reply').parents('li').find('ul').hide();
  $(".toggle-all-reply").click(function(){
    $(this).children('button').text($(this).text() == 'Show all replies' ? 'Hide all replies' : 'Show all replies');
    $(this).parents('li').find('ul').toggle(600);
  });
 
});
 


jQuery(document).on('click','#catshow ul li',function(){

   var categoryId = $(this).attr('data-id');
   var next_dd = $(this).parents('#state_dropdown').next().find('ul');
   var prev_dd = $(this).parents('#city_dropdown').prev().find('ul');
   console.log(next_dd);
   console.log(prev_dd);
   if(next_dd.length != 0){
        next_dd.find('li').each(function(e){
        var data_par = $(this).attr('data-par-id');
        if(data_par != categoryId){
            $(this).css('display','none');
                 $('.selected-text').empty();
             $('.placeholder').css('display','block');
        }else{
            $(this).css('display','block');
        }
    });
    
   }else if(prev_dd.length!=0){
        var data_par = $(this).attr('data-par-id');
        prev_dd.find('li').each(function(e){
        var data_id  = $(this).attr('data-id');
        console.log(data_par);
        console.log(data_id);
        if(data_par != data_id){
            $(this).css('display','none');
        }else{
            $(this).css('display','block');
        }
         $(this).css('display','block');
    });
   }
    
//alert(categoryId);
    $("#catshow ul li").removeClass("active");
    $(this).addClass('active');
    $('#articleallist').empty();
    $.ajax({

        url: templateUri + '/ajax/ajax-dir-category.php',
        data: {categoryId: categoryId},
        type:"POST",
        success: function(result) {
            $('#articleallist').html(result);
                   $('img').each(function(){        
                var imgSrc = $(this).attr('src');
                if(imgSrc=="" || imgSrc==" " || imgSrc==undefined)
                {            
                var defaultImage = templateUri+"/img/default.jpg";
                $(this).attr('src',defaultImage);
                }
                }); 

        $('.category-tag a, .category-tag h5').each(function() {
            $(this).wrapInner('<span />');
        });
        }
    });
    return false;
});


setInterval(function () {
    $('#inside-refresh').load(' #notification-refresh',function(responseTxt, statusTxt, xhr){
                            if(statusTxt == "success")
                                console.log('refreshed');
                                if(statusTxt == "error")
                                    console.log("Error: " + xhr.status + ": " + xhr.statusText);
                            }); 
    }, 10000);

jQuery(document).on('click','#catshowsp .slide-card a,#catshowsp ul li',function(){
   

   var categoryId = $(this).attr('data-id');
   var categoryName;
  // alert(categoryId);
  if($(this).parent().hasClass("slide-card")){
    categoryName="spares-modelcategories";
  }
  else{
   categoryName="sparescategories"; 
  }
    $("#catshowsp ul li").removeClass("active");
    $(this).addClass('active');
    $('#articleallist').empty();
    $.ajax({

        url: templateUri + '/ajax/ajax-spare-category.php',
        data: {categoryId: categoryId, categoryName: categoryName },
        type:"POST",
        success: function(result) {
            $('#articleallist').html(result);
                   $('img').each(function(){        
                var imgSrc = $(this).attr('src');
                if(imgSrc=="" || imgSrc==" " || imgSrc==undefined)
                {            
                var defaultImage = templateUri+"/img/default.jpg";
                $(this).attr('src',defaultImage);
                }
                }); 

        $('.category-tag a, .category-tag h5').each(function() {
            $(this).wrapInner('<span />');
        });
        if(categoryId!='')
        {
        $('.pagination-wrapper').css('display','none'); 
        }
        if(categoryId=='')
        {
        $('.pagination-wrapper').css('display','block'); 
        }
        
        }
    });
    return false;
});


function getSliderSettings(){
 return {
   infinite: true,
   slidesToShow: 3,
   slidesToScroll: 3,
   responsive: [
                 {
                   breakpoint: 1024,
                   settings: {
                     slidesToShow: 3,
                     slidesToScroll: 3,
                     infinite: true,
                     dots: false
                   }
                 },
                 {
                   breakpoint: 767,
                   settings: {
                     slidesToShow: 2,
                     slidesToScroll: 2
                   }
                 },
                 {
                   breakpoint: 600,
                   settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1
                   }
                 }
               ]
 }
}

jQuery(document).on('click','#catshowcity ul li',function(){
   var categoryId = $(this).attr('data-id');
   
    
//alert(categoryId);
    $("#catshow ul li").removeClass("active");
    $(this).addClass('active');
    $('#articleallist').empty();
    $.ajax({

        url: templateUri + '/ajax/ajax-city-category.php',
        data: {categoryId: categoryId},
        type:"POST",
        success: function(result) {

$('.sparedetail-slider').slick('unslick'); /* ONLY remove the classes and handlers added on initialize */

           $('#articleallist').html(result);

   $('.sparedetail-slider').slick(getSliderSettings()); /* Initialize the slick again */
            getSlickOptions('.sparedetail-slider',3,3);
                   $('img').each(function(){        
                var imgSrc = $(this).attr('src');
                if(imgSrc=="" || imgSrc==" " || imgSrc==undefined)
                {            
                var defaultImage = templateUri+"/img/default.jpg";
                $(this).attr('src',defaultImage);
                }
                }); 

        $('.category-tag a, .category-tag h5').each(function() {
            $(this).wrapInner('<span />');
        });



        }
    });
    return false;
});

jQuery(document).on('keyup','#search',function(){
    var searchVal = $(this).val();
    $.ajax({
        type: "POST",
        dataType: "text",
        url: blogUri+"/wp-admin/admin-ajax.php",
        data: {action:"search_member", value: searchVal},
    }).done(function (data) {
        var ids = data.trim();
        console.log(ids);
        var trainindIdArray = ids.split(',');
        $("#addMember .col-4").each(function() {
            var idVal = jQuery(this).attr('data-value');
            if(jQuery.inArray(idVal, trainindIdArray) !== -1) {
                jQuery('#member-show-'+idVal).show();
            } else {
                jQuery('#member-show-'+idVal).hide();
            }
        });
    });
    return false;
});

jQuery(document).on('keyup','#removeMemberSearch',function(){
    var searchVal = $(this).val();
    $.ajax({
        type: "POST",
        dataType: "text",
        url: blogUri+"/wp-admin/admin-ajax.php",
        data: {action:"search_remove_member", value: searchVal},
    }).done(function (data) {
        var ids = data.trim();
        console.log(ids);
        var trainindIdArray = ids.split(',');
        $("#removeMember .col-4").each(function() {
            var idVal = jQuery(this).attr('data-value');
            if(jQuery.inArray(idVal, trainindIdArray) !== -1) {
                jQuery('.member-show-'+idVal).show();
            } else {
                jQuery('.member-show-'+idVal).hide();
            }
        });
    });
    return false;
});

   // jQuery(document).ready(function() {
   //          $("#catshowcity").click(function(){      
   //            $("#myselection option:selected").text();
   //            var categoryId = $(this).attr('data-id');
   //            alert($(this).find(':selected').attr('data-id'))
   //             // alert( $("#myselection option:selected").text() );
   //            });
   //       });


(function($) {
        $(function() {
          $('.reply-id').on('click', function(e){
                    var id = jQuery(this).attr('data-value');
                    jQuery('#start-reply-'+id+' #bbp_reply_to').val(id);
                });

            var url = window.location.href;
                var array = url.split('/');

                var lastsegment = array[array.length-2];
                if(lastsegment=="sign-in") {
                    jQuery('#title-signin').addClass('active');
                    jQuery('#tab-signin').addClass('active');
                } else if(lastsegment=="sign-up") {
                    jQuery('#title-signup').addClass('active');
                    jQuery('#tab-signup').addClass('active');
                }


            let timerOn = true;

            function timer(remaining) {
              var m = Math.floor(remaining / 60);
              var s = remaining % 60;
              
              m = m < 10 ? '0' + m : m;
              s = s < 10 ? '0' + s : s;
              document.getElementById('countdowntimer').innerHTML = m + ':' + s;
              remaining -= 1;
              
              if(remaining >= 0 && timerOn) {
                setTimeout(function() {
                    timer(remaining);
                }, 1000);
                return;
              }

              if(!timerOn) {
                // Do validate stuff here
                return;
              }
              
              // Do timeout stuff here
              jQuery('.resend-verification-code').html('Resend OTP');
              jQuery('.resend-verification-code').removeClass('otp-enable');
            }

            function registerTimer(remaining) {
              var m = Math.floor(remaining / 60);
              var s = remaining % 60;
              
              m = m < 10 ? '0' + m : m;
              s = s < 10 ? '0' + s : s;
              document.getElementById('countdowntimersecond').innerHTML = m + ':' + s;
              remaining -= 1;
              
              if(remaining >= 0 && timerOn) {
                setTimeout(function() {
                    registerTimer(remaining);
                }, 1000);
                return;
              }

              if(!timerOn) {
                // Do validate stuff here
                return;
              }
              
              // Do timeout stuff here
              jQuery('.resend-verification-code').html('Resend OTP');
              jQuery('.resend-verification-code').removeClass('otp-enable');
            }

                $('#tab3 .user-action h4').on('click', function(e){
                    var action = jQuery(this).attr('data-param');
                    var id = jQuery(this).attr('data-dropzone');
                    jQuery('#story .action').val(action);
                    jQuery('#story .story_id').val(id);
                    jQuery('.popup-overlay #story').addClass('open');
                    jQuery('.popup-overlay #story').parent().addClass('active');
                });

                $('.edit-order .color-picker li').on('click', function(e){
                    var color = jQuery(this).attr('data-variant-code');
                    var name = jQuery(this).attr('data-variant-name');
                    jQuery('#variant-select').val(color);
                    jQuery('#item-variant-name').val(name);
                });

                $('.edit-order .modelradio input').on('click', function(e){
                    var model = jQuery(this).attr('id');
                    jQuery('#item-code').val(model);
                });

                $('.create-an-album').on('click', function(e){
                    var action = jQuery(this).attr('data-param');
                    var id = jQuery(this).attr('data-dropzone');
                    jQuery('#album .action').val(action);
                    jQuery('.popup-overlay #album').addClass('open');
                    jQuery('.popup-overlay #album').parent().addClass('active');
                });

                $('.create-story').on('click', function(e){
                    var action = jQuery(this).attr('data-param');
                    var id = jQuery(this).attr('data-dropzone');
                    jQuery('#story .story-action').val(action);
                    jQuery('.popup-overlay #story').addClass('open');
                    jQuery('.popup-overlay #story').parent().addClass('active');
                });

                $(document).on('click', '.story_init_dropzone',function(e){
                    e.preventDefault();
                    var action = jQuery(this).attr('data-param');
                    var tabid = jQuery(this).parents('.slide-content').attr('id');
                    var id = jQuery(this).attr('data-dropzone');
                    jQuery('#story'+id+' .action').val(action);
                    jQuery('#story'+id+' .story_id').val(id);
                    jQuery('#story'+id+' .tab-id').val(tabid);
                    jQuery('.popup-overlay #story'+id).addClass('open');
                    jQuery('.popup-overlay #story'+id).parent().addClass('active');
                });

                $(document).on('click','.album_edit', function(e){
                    e.preventDefault();
                    Dropzone.autoDiscover = false;
                    var action = jQuery(this).attr('data-param');
                    var tabid = jQuery(this).parents('.slide-content').attr('id');
                    var id = jQuery(this).attr('data-albumedit');
                    jQuery('#album'+id+' .action').val(action);
                    jQuery('#album'+id+' .album_id').val(id);
                    jQuery('#album'+id+' .tab-id').val(tabid);
                    jQuery('.popup-overlay #album'+id).addClass('open');
                    jQuery('.popup-overlay #album'+id).parent().addClass('active');
                });


                $('.add-story').on('click', function(e){
                    var action = jQuery(this).attr('data-param');
                    jQuery('#story .action').val(action);
                    jQuery('.popup-overlay #story').addClass('open');
                    jQuery('.popup-overlay #story').parent().addClass('active');
                });

                var quotations = [];
                $( ".member-dropdown .add-memberlink" ).each(function(index) {
                    $(this).on("click", function(){
                        var id = parseInt(jQuery(this).attr('data-id'));

                        var value = jQuery('#added-persons').val();
                        if(id==0) {
                            id = jQuery(this).parent('.empty-test').find('.personname').text();
                        }
                        if(value!='') {
                            quotations.push(value);
                        }
                        quotations.push(id);
                        jQuery('#added-persons').val(quotations);
                    });
                });

                $('.clubdel').on("click", function(){
                        var id = jQuery(this).attr('data-close-id');
                        
                        if(id==0) {
                            id = jQuery(this).text();
                        }

                        var persons = jQuery('#added-persons').val();
                        var parsedTest = persons.split(',');
                        console.log(parsedTest);
                        var index = parsedTest.indexOf(id);
                        if (index > -1) {
                          parsedTest.splice(index, 1);
                        }
                        
                        jQuery('#added-persons').val(parsedTest);
                    });
                    
            jQuery(function() {
                 jQuery(":file").change(function() {

                     if (this.files && this.files[0]) {
                         var reader = new FileReader();
                         reader.onload = imageIsLoaded;
                         reader.readAsDataURL(this.files[0]);
                     }
                 });
             }); 
             function imageIsLoaded(e) {
                 jQuery('#message').css("display", "none");
                 jQuery('#preview').css("display", "block");
                 jQuery('#previewimg').attr('src', e.target.result);
             };
             // Function for Deleting Preview Image.
             jQuery("#deleteimg").click(function() {
                 jQuery('#preview').css("display", "none");
                 jQuery('#file').val("");
             });
             // Function for Displaying Details of Uploaded Image.
             jQuery("#submit").click(function() {
                 jQuery('#preview').css("display", "none");
                 jQuery('#message').css("display", "block");
             });

            
    $(".club-submit").click(function(e){
        e.preventDefault();
        var thisV = jQuery(this);
        var x=0;
        var club_name = jQuery('#club_name').val();
        var founded_at = jQuery('#datepicker-club').val();
        var city = jQuery('#city').val();
        var phone = jQuery('#phone').val();
        var email = jQuery('#email').val();
        var fb_url = jQuery('#fb_url').val();
        var twitter_url = jQuery('#twitter_url').val();
        var instagram_url = jQuery('#instagram_url').val();
        var youtube_url = jQuery('#youtube_url').val();
        var fb_page_id = jQuery('#fb_page_id').val();
        var description = jQuery('#description').val();
        var file_data = jQuery('#file').prop('files')[0];
        var fb_page_image = jQuery('#club_fb_src').val();   
        var form_data = new FormData();


        if (club_name=='' || club_name == undefined) {
           jQuery('#err_club_name').parent().addClass('error-row');
           jQuery('#err_club_name').text("ENTER YOUR CLUB NAME").show();
           x++;
        } else {
             
           jQuery('#err_club_name').parent('.form-row').removeClass('error-row');
           jQuery('#err_club_name').hide();
        }
        if (founded_at=='' || founded_at == undefined) {
           jQuery('#err_founded_at').parent().addClass('error-row');
           jQuery('#err_founded_at').text("ENTER THE FOUNDATION YEAR").show();
           x++;
        } else {
           jQuery('#err_founded_at').parent('.form-row').removeClass('error-row');
           jQuery('#err_founded_at').hide();
        }

        if (city=='' || city == undefined) {
           jQuery('#err_city').parent().addClass('error-row');
           jQuery('#err_city').text("ENTER THE NAME OF YOUR CITY").show();
           x++;
        } else {
           jQuery('#err_city').parent().removeClass('error-row');
           jQuery('#err_city').hide();
        }
        if (email!='') {
           if (!regex.test(email)) {
               jQuery('#err_email').hide();
               jQuery('#err_email').parent().addClass('error-row');
               jQuery('#err_email').text("Enter a valid email address").show();
               x++;
           } else {
               jQuery('#err_email').parent().removeClass('error-row');
               jQuery('#err_email').hide();
           }
        } else {
           jQuery('#err_email').hide();
           jQuery('#err_email').text("ENTER YOUR EMAIL ADDRESS").show();
           jQuery('#err_email').parent().addClass('error-row');
           x++;
        }
        if( document.getElementById("file").files.length == 0 ){
            jQuery('#err_logo').parent().addClass('error-row');
           jQuery('#err_logo').text("Upload logo").show();
           x++;
        } else {
            jQuery('#err_logo').parent().removeClass('error-row');
           jQuery('#err_logo').hide();
        }
        if (phone=='' || phone == undefined) {
           jQuery('#err_telephone').parent().addClass('error-row');
           jQuery('#err_telephone').text("Enter your phone number").show();
           x++;
        } else {
           if(phone.length<10) {
                jQuery('#err_telephone').parent().addClass('error-row');
                jQuery('#err_telephone').text("Enter a valid phone number").show();
                x++;
            } else {
                jQuery('#err_telephone').parent().removeClass('error-row');
                jQuery('#err_telephone').hide();
            }
        }
        if (description=='' || description ==undefined) {
           jQuery('#err_description').parent().addClass('error-row');
           jQuery('#err_description').text("BRIEFLY DESCRIBE YOUR CLUB").show();
           x++;
        } else {
           jQuery('#err_description').parent().removeClass('error-row');
           jQuery('#err_description').hide();
        }

        
        if (x==0) {
            $.ajax({
                url: templateUri + '/ajax/ajax-club-name.php',
                data: {club_name: club_name},
                type:"POST",
                success: function(result) {
                    if(result==1){
                        jQuery('#content').html("<h5>Error</h5><p>Title has been already taken.</p>");
                        $("html, body").animate({
                            scrollTop: 0
                        }, 600);
                        jQuery('.global-popup').removeClass('success');
                        jQuery('.global-popup').addClass('error');
                        jQuery('.global-popup').addClass('show');
                    } else {
                        jQuery('.global-popup').removeClass('error');
                        jQuery('.global-popup').addClass('success');
                        form_data.append('file', file_data);
                        form_data.append('club_name', club_name);
                        form_data.append('founded_at', founded_at);
                        form_data.append('action', 'create_club');
                        form_data.append('city', city);
                        form_data.append('phone', phone);
                        form_data.append('email', email);
                        form_data.append('fb_url', fb_url);
                        form_data.append('twitter_url', twitter_url);
                        form_data.append('instagram_url', instagram_url);
                        form_data.append('youtube_url', youtube_url);
                        form_data.append('fb_page_id', fb_page_id);
                        form_data.append('description', description);
                        form_data.append('fb_page_image',fb_page_image);    
                        $.ajax({
                            type: "POST",
                            contentType: false,
                            async: false,
                            processData: false,
                            url: blogUri+"/wp-admin/admin-ajax.php",
                            data: form_data,
                        }).done(function (data) {
                            if(data==1) {
                               jQuery('#content').html("<h5>Success</h5><p>Club created successfully. Waiting for approval.</p>");
                               jQuery("#event .close-icon").trigger('click');
                                jQuery('.global-popup').addClass('show');
                                thisV.unbind();
                                return false;
                            } else {
                                jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                jQuery('.global-popup').removeClass('success');
                                jQuery('.global-popup').addClass('error');
                                jQuery('.global-popup').addClass('show');
                                thisV.unbind();
                                return false;
                            }
                        });
                    }
                }
            });
        }
        return false;
    });

     $(".events-submit").click(function(e){
        e.preventDefault();
        var thisV = jQuery(this);
        var event_type = jQuery('#event_type').val();
        var event_name = jQuery('#event_name').val();
        var founded_at = jQuery('#founded_at').val();
        var brief = jQuery('#brief').val();
        var club = jQuery('#club').val();
        var start_on = jQuery('#datepicker-start').val();
        var ends_on = jQuery('#datepicker-end').val();
        var departure_from = jQuery('#departure_from').val();
        var arrived_at = jQuery('#arrived_at').val();
        var url = jQuery('#url').val();
        var organizer_name = jQuery('#organizer_name').val();
        var organizer_phone = jQuery('#organizer_phone').val();
        var organizer_email = jQuery('#organizer_email').val();
        var thumbnail = jQuery('#file').prop('files')[0];
        var logo = jQuery('#files').prop('files')[0];
        var form_data = new FormData();
        form_data.append('thumbnail', thumbnail);
        form_data.append('logo', logo);
        form_data.append('event_type', event_type);
        form_data.append('event_name', event_name);
        form_data.append('brief', brief);
        form_data.append('club', club);
        form_data.append('event_name', event_name);
        form_data.append('action', 'create_events');
        form_data.append('brief', brief);
        form_data.append('start_on', start_on);
        form_data.append('ends_on', ends_on);
        form_data.append('departure_from', departure_from);
        form_data.append('url', url);
        form_data.append('arrived_at', arrived_at);
        form_data.append('organizer_name', organizer_name);
        form_data.append('organizer_phone', organizer_phone);
        form_data.append('organizer_email', organizer_email);
        $.ajax({
            type: "POST",
            contentType: false,
            async: false,
            processData: false,
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: form_data,
        }).done(function (data) {
            if(data==1) {
               jQuery('#content').html("<h5>Success</h5><p>Your club event has been created. Waiting for approval.</p>");
                jQuery('.global-popup').addClass('show');
                thisV.unbind();
                return false;
            } else {
                 jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                  jQuery('.global-popup').removeClass('success');
               jQuery('.global-popup').addClass('error');
                jQuery('.global-popup').addClass('show');
                thisV.unbind();
                return false;
            }
        });
        return false;
    });

    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });

    $(".change-password").click(function(e){
        e.preventDefault();
        var oldpass = jQuery('#old_password').val();
        var newpass = jQuery('#new_password').val();
        var x=0;
        if (oldpass=='' || oldpass == undefined) {
           jQuery('#err_oldpass').parent().addClass('error-row');
           jQuery('#err_oldpass').text("ENTER YOUR OLD PASSWORD").show();
           x++;
        } else {
           jQuery('#err_oldpass').parent('.form-row').removeClass('error-row');
           jQuery('#err_oldpass').hide();
        }
        if (newpass=='' || newpass == undefined) {
           jQuery('#err_newpass').parent().addClass('error-row');
           jQuery('#err_newpass').text("ENTER YOUR NEW PASSWORD").show();
           x++;
        } else {
           jQuery('#err_newpass').parent('.form-row').removeClass('error-row');
           jQuery('#err_newpass').hide();
        }
        if(x==0) {
            $.ajax({
                type: "POST",
                dataType: "text",
                url: blogUri+"/wp-admin/admin-ajax.php",
                data: {action:"change_password", oldpassword: oldpass,newpassword: newpass},
            }).done(function (data) {
                if(data==1) {
                    window.location.href = blogUri+"/my-account/";
                } else {
                    jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                    
                     jQuery('.global-popup').removeClass('success');
                   jQuery('.global-popup').addClass('error');
                    jQuery('.global-popup').addClass('show');
                }
            });
        }
        return false;
    });

   $(".reset-password").click(function(e){
        e.preventDefault();
        var loginemail = jQuery('#user_email').val();
        var verificationcode = jQuery('#verification_code').val();
        var resetpassword = jQuery('#reset_password').val();
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"reset_password", email: loginemail, code: verificationcode, resetpass: resetpassword},
        }).done(function (data) {
            if(data==1) {
                window.location.href = blogUri+"/sign-in/";
            } else {
                 jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                  jQuery('.global-popup').removeClass('success');
               jQuery('.global-popup').addClass('error');
                jQuery('.global-popup').addClass('show');
            }
        });
        return false;
    });

   $(".ajax-resend").click(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"resend_reset_password_request"},
        }).done(function (data) {
            if(data==1) {
                jQuery('#content').html("<h5>Success</h5><p>Please enter OTP to change your password.</p>");
                jQuery('.global-popup').addClass('show');
                jQuery('.ajax-resend').html('Resend OTP (<span id="countdowntimer">30 </span>)');
                jQuery('.ajax-resend').addClass('otp-enable');

                timer(30);
                
            } else {
                jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                 jQuery('.global-popup').removeClass('success');
               jQuery('.global-popup').addClass('error');
                jQuery('.global-popup').addClass('show');
            }
        });
        return false;
    });

   $(".sign-out").click(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"sign_out"},
        }).done(function (data) {
            window.location.href = blogUri+"/sign-in/";
        });
        return false;
    });

   $(".edit-user-profile").click(function(e){
        e.preventDefault();
        var editfirstname = jQuery('#firstname').val();
        var editemail = jQuery('#email').val();
        var editmobile = jQuery('#mobile').val()
        var aboutme = jQuery('#about_me').val();
        var city = jQuery('#city').val();
        var code = jQuery('#user-code').val();
        var facebook = jQuery('#facebook_url').val();
        var instagram = jQuery('#instagram_url').val();
        var twitter = jQuery('#twitter_url').val();
        var youtube = jQuery('#youtube_url').val();
        var motorcycles = jQuery('#added-persons').val();
        var profile_pic = jQuery('#file').prop('files')[0];
        var prof_image = jQuery('.preview-image').attr('src');
        
        var form_data = new FormData();

        form_data.append('firstname', editfirstname);
        form_data.append('email', editemail);
        form_data.append('mobile', editmobile);
        form_data.append('aboutme', aboutme);
        form_data.append('city', city);
        form_data.append('facebook', facebook);
        form_data.append('instagram', instagram);
        form_data.append('twitter', twitter);
        form_data.append('youtube', youtube);
        form_data.append('motorcycles', motorcycles);
        form_data.append('action', 'edit_profile');
        form_data.append('profile_pic', profile_pic);
        form_data.append('prof_image', prof_image);
        form_data.append('code', code);
        var x=0;
        if (editfirstname=='' || editfirstname == undefined) {
           jQuery('#err_editfirstname').parent().addClass('error-row');
           jQuery('#err_editfirstname').text("ENTER YOUR NAME").show();
           x++;
        } else {
           jQuery('#err_editfirstname').parent('.form-row').removeClass('error-row');
           jQuery('#err_editfirstname').hide();
        }
        if (aboutme=='' || aboutme == undefined) {
           jQuery('#err_aboutme').parent().addClass('error-row');
           jQuery('#err_aboutme').text("TELL US SOMETHING ABOUT YOU").show();
           x++;
        } else {
           jQuery('#err_aboutme').parent('.form-row').removeClass('error-row');
           jQuery('#err_aboutme').hide();
        }
        if (city=='' || city == undefined) {
           jQuery('#err_city').parent().addClass('error-row');
           jQuery('#err_city').text("ENTER THE NAME OF YOUR CITY").show();
           x++;
        } else {
           jQuery('#err_city').parent('.form-row').removeClass('error-row');
           jQuery('#err_city').hide();
        }

        if(x==0) {
            $.ajax({
                type: "POST",
                 contentType: false,
                processData: false,
                url: blogUri+"/wp-admin/admin-ajax.php",
                data: form_data,
            }).done(function (data) {
                if(data==1) {
                    window.location.href = blogUri+"/my-account/";
                } else {
                     jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                      jQuery('.global-popup').removeClass('success');
                   jQuery('.global-popup').addClass('error');
                    jQuery('.global-popup').addClass('show');
                }
            });
        }
        return false;
    });

 $(document).on('click', ".booking-submit", function(e){
        e.preventDefault();
        var model = jQuery('.bike-model:checked').val();
        var itemcode = jQuery('.bike-model:checked').attr('id');
        var colour = jQuery('.'+model+' .active').attr('data-variant-code');
        var documentId = jQuery('.bike-model:checked').attr('data-document-id');
         var bookingamount = jQuery('.bike-model:checked').attr('data-booking-amount');
        var itemdocumentId = jQuery('.'+model+' .active').attr('data-document-id');
        var variantname = jQuery('.'+model+' .active').attr('data-variant-name');
        var bookingname = jQuery('#bookingname').val();
        var bookingemail = jQuery('#email').val();
        var bookingmobile = jQuery('#mobile').val()
        var city = jQuery('#city').val();
        var state = jQuery('#state').val();
        var country = jQuery('#country').val();
        var address_1 = jQuery('#address1').val();
        var address_2 = jQuery('#address2').val();
        var postcode = jQuery('#postcode').val();
        var prebookingcode = jQuery('#pre-booking').val();
        $.ajax({
            type: "POST",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"booking", model: model, colour: colour,itemcode: itemcode, itemdocid: itemdocumentId, variantname: variantname, bookingamount: bookingamount, documentId: documentId, name: bookingname, email: bookingemail, mobile: bookingmobile, city: city, state: state, country: country, address_1: address_1, address_2: address_2, postcode: postcode, prebookingcode: prebookingcode},
        }).done(function (data) {
            var obj = jQuery.parseJSON( data );
            jQuery('#key').val(obj.key);
            jQuery('#salt').val(obj.salt);
            jQuery('#txnid').val(obj.txnid);
            jQuery('#amount').val(obj.amount);
            jQuery('#pinfo').val(obj.productinfo);
            jQuery('#fname').val(obj.firstname);
            jQuery('#email-address').val(obj.email);
            jQuery('#phone').val(obj.phone);
            jQuery('#hash').val(obj.hash);
            jQuery('.progressMenu li').removeClass('active');
            jQuery('.progressMenu li.prebookingheader').addClass('active');
            jQuery('#payu-click').trigger('click');
            /*if(data==1) {
                jQuery('#content').text("success");
                jQuery('.global-popup').addClass('show');
            } else {
                 jQuery('#content').text(data);
                  jQuery('.global-popup').removeClass('success');
               jQuery('.global-popup').addClass('error');
                jQuery('.global-popup').addClass('show');
            }*/
        });
        return false;
    });

$(document).on('click', ".add-mem", function(e){
        e.preventDefault();
        var memberid = jQuery(this).attr('data-member-id');
        var ownerid = jQuery(this).attr('data-owner-id');
        var clubid = jQuery(this).attr('data-club-id');
        var thisval = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"add_member", memberid: memberid, ownerid: ownerid, clubid: clubid, },
        }).done(function (data) {
                thisval.hide();
                jQuery('.request-sent-'+memberid).show();
        });
        return false;
    });

   $(".join-club").click(function(e){
        e.preventDefault();
        var memberid = jQuery(this).attr('data-member-id');
        var ownerid = jQuery(this).attr('data-owner-id');

        var clubid = jQuery(this).attr('data-club-id');
        var thisval = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"join_club", memberid: memberid, ownerid: ownerid, clubid: clubid, },

        }).done(function (data) {
                thisval.hide();
                jQuery('.join-request-sent').show();
        });
        return false;
    });
   $(document).on("click", ".request-accept", function(e){
        e.preventDefault();
        var senderid = jQuery(this).attr('data-sender-id');
        var acceptorid = jQuery(this).attr('data-receiver-id');
        var clubid = jQuery(this).attr('data-club-id');
        var noteid = jQuery(this).attr('data-note-id');
        var thisVal = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"accept_request", requestid: senderid, acceptorid: acceptorid, clubid: clubid, noteid: noteid},
        }).done(function (data) {
            //thisVal.parent().hide();
            thisVal.parents('.notify-details').find('.notify_message0').text(data);
            thisVal.parent().hide();

        });
        return false;
    });

   $(".join-request-accept").click(function(e){
        e.preventDefault();
        var senderid = jQuery(this).attr('data-sender-id');
        var acceptorid = jQuery(this).attr('data-receiver-id');
        var clubid = jQuery(this).attr('data-club-id');
        var noteid = jQuery(this).attr('data-note-id');
        var thisVal = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"join_accept_request", requestid: senderid, acceptorid: acceptorid, clubid: clubid, noteid: noteid},
        }).done(function (data) {
           thisVal.parents('.notify-details').find('.notify_message0').text(data);
           thisVal.parent().hide();

        });
    });

    $(".decline-request").click(function(e){
        e.preventDefault();
        var deleteid = jQuery(this).attr('data-delete-id');
        var table = jQuery(this).attr('data-delete-param');
       
        var thisVal = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"join_delete_request", deleteid: deleteid, table: table},
        }).done(function (data) {
            thisVal.parent().hide();

        });
    });
   
    $(".delete-story").click(function(e){
        e.preventDefault();
        var story_id = jQuery(this).attr('data-id');
        var count = jQuery('.count').val();
        var tab = jQuery(this).parents('.slide-content').attr('id');
        var thisVal = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"delete_story", story_id: story_id},
        }).done(function (data) {
            thisVal.parent().hide();
            jQuery('.count').val(parseInt(count)-1);
            jQuery('#content').html("<h5>Success</h5><p>Story deleted successfully.</p>");
            jQuery('.global-popup').addClass('show');
            if(count<=1) {
                    jQuery('#'+tab).html(' ');
                    jQuery('#'+tab).html('<div class="user-action xs-hide"><h5>stories</h5></div><div class="album-card border-red"><img src="'+templateUri+'/assets/images/placeholder/stories.jpg" alt="images"><div class="image-caption-content"><h4>What are you waiting for?</h4></div><div class="button button-primary"><a class="trigger-sidebar add-story" data-param="add" data-id="story" href="javascript:void(0);">Add Story</a></div></div><div class="horizontal-line"></div>');

            }

        });
    });

   $(".delete-album").click(function(e){
        e.preventDefault();
        var album_id = jQuery(this).attr('data-id');
        var count = jQuery('.album-count').val();
        var tab = jQuery(this).parents('.slide-content').attr('id');
        var thisVal = jQuery(this);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"delete_album", album_id: album_id},
        }).done(function (data) {
            thisVal.parent().hide();
            jQuery('.count').val(parseInt(count)-1);
            jQuery('#content').html("<h5>Success</h5><p>Album deleted successfully.</p>");
            jQuery('.global-popup').addClass('show');
            if(count<=1) {
                    jQuery('#'+tab).html(' ');
                    jQuery('#'+tab).html('<div class="user-action xs-hide"><h5>albums</h5></div><div class="album-card border-red"><img src="'+templateUri+'/assets/images/placeholder/album.jpeg" alt="images"><div class="image-caption-content"><h4>What are you waiting for?</h4></div><div class="button button-primary"><a class="trigger-sidebar create-an-album" data-param="add" data-id="album" href="javascript:void(0);">Create an album</a></div> </div><div class="horizontal-line"></div>');

            }

        });
    });


   $(".remove-member").click(function(e){
        e.preventDefault();
        var removeid = jQuery(this).attr('data-remove-id');
        var memberid = jQuery(this).attr('data-member-id');
        var ownerid = jQuery(this).attr('data-owner-id');
        var clubid = jQuery(this).attr('data-club-id');
        var thisVal = jQuery(this);
        var countNum = parseInt(jQuery('.club-members-count span').text());
        console.log(countNum);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"remove_member", removeid: removeid,memberid: memberid, ownerid: ownerid, clubid: clubid},
        }).done(function (data) {
            thisVal.parents('.col-4').hide();
            countNum = countNum-1;
            jQuery('.club-members-count span').text(countNum);
            jQuery('.request-sent-'+memberid).hide();
            jQuery('.request-sent'+memberid).hide();
            jQuery('.request-accepted'+memberid).hide();
            jQuery('<a href="javascript:void(0)" data-member-id="'+memberid+'"  data-owner-id="'+ownerid+'" data-club-id="'+clubid+'" class="link-type add add-mem"><i class="fa fa-plus"></i> Add</a><a href="javascript:void(0)" class="link-type add request-sent-'+memberid+'" style="display: none;"> Request sent</a>').insertAfter('.section-'+memberid+' h5');
        });

    });

   $(".join-remove-member").click(function(e){
        e.preventDefault();
        var removeid = jQuery(this).attr('data-remove-id');
        var memberid = jQuery(this).attr('data-member-id');
        var ownerid = jQuery(this).attr('data-owner-id');
        var clubid = jQuery(this).attr('data-club-id');
        var thisVal = jQuery(this);
        var countNum = parseInt(jQuery('.club-members-count span').text());
        console.log(countNum);
        $.ajax({
            type: "POST",
            dataType: "text",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:"join_remove_member", removeid: removeid,memberid: memberid, ownerid: ownerid, clubid: clubid},
        }).done(function (data) {
            thisVal.parents('.cards-member').hide();
            
            countNum = countNum-1;
            jQuery('.club-members-count span').text(countNum);
            jQuery('.request-sent-'+memberid).hide();
            jQuery('.request-sent'+memberid).hide();
            jQuery('.request-accepted'+memberid).hide();
            jQuery('<a href="javascript:void(0)" data-member-id="'+memberid+'"  data-owner-id="'+ownerid+'" data-club-id="'+clubid+'" class="link-type add add-mem"><i class="fa fa-plus"></i> Add</a><a href="javascript:void(0)" class="link-type add request-sent-'+memberid+'" style="display: none;"> Request sent</a>').insertAfter('.section-'+memberid+' h5');
        });

    });

    /* Facebook configuration */
    window.fbAsyncInit = function() {
      FB.init({
        appId            : '459045187868956',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.0'
      });
    };
    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    jQuery('.fb-sign-in').on('click',function(e){
      checkLoginState();
    });
    jQuery('.gplus-sign-in').on('click',function(e){
        handleAuthClick();
    });
    jQuery('.popupCloseButton').on('click',function(e){
      jQuery(".hover_bkgr_fricc").hide();
    });
    function checkLoginState() {

      FB.login(function(response) {
      console.log(response.authResponse);
        if (response.authResponse) {
                  getAuthtoken(response.authResponse);
               } else {
                 console.log('Authorization not completed.');
               }
           },{
               scope: 'public_profile,email',
               return_scopes: true
        });
           
        };

    function emailValidate(strValue) { 
        var objRegExp = /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,3}(\.[a-z]{2}){0,2})$/i; 
        return objRegExp.test(strValue); 
    }
    function getAuthtoken(response){
      var url = '/me?fields=name,email,picture.type(large)';
      FB.api(url, function (userresponse) {
            var name = userresponse.name;
            console.log(name);
            var email = userresponse.email;
            if(email==null){
              email = " ";
            }
            
            var image = userresponse.picture.data.url;
            var auth_token = response.accessToken;
            var userid = userresponse.userID;
            var provider = 'Facebook';
            var mobile = '';
             ssoajaxauth(name, email, image, mobile, auth_token, provider);
        });

    }
    jQuery('.sso_reg_next').on('click',function(e){
      e.preventDefault();
      ssoajax_2auth();
    });
    function ssoajax_2auth(){
        var name = jQuery('#ssoname').val();
        var email = jQuery('#ssoemail').val();
        var auth_token = jQuery('#sso_auth_token').val();
        var provider = jQuery('#sso_provider').val();
        var image = jQuery('#ssoimage').val();
        var mobile = jQuery('#sso_mobile').val();
        
            $.ajax({
              url : ajaxurl,
              type : 'POST',
              data : {action:"ssoregister","name" : name, "email": email, "image": image,
                  "mobile": mobile, "auth_token": auth_token, "provider": provider },
              async : false,  
              success : function(data){
                if (data == 1){
                        $('.step').removeClass('active');
                        $("#title-verify-otp").addClass('active');
                        $('.heading-flow').removeClass('active');
                        $("#verify-otp").addClass('active');
                        $('#globalMessage').removeClass('show');
                        $(".error-message").css('display','none');
                        $('.form-field').removeClass('error-row');
            
                }else{
                    $('.global-popup').addClass('show');
                    $('.global-caption').html('<div class="indicator"></div><h5>Error</h5><p>'+data+'</p>');
                }
              }
            });
      }

  function ssoajaxauth(name, email, image, mobile, auth_token, provider){
      $.ajax({
          url : ajaxurl,
          type : 'POST',
          data : {action:"ssoregister","name" : name, "email": email, "image": image,
              "mobile": mobile, "auth_token": auth_token, "provider": provider },
            async : false,  
          dataType: "json",
          success : function(response){
              console.log(response);
      if (response == 5){
          window.location.href = blogUri+'/My-account';
        }else if (response['IsRequestSuccessfull'] == true){
                if (response['redirect'] == "true"){
                  window.open(response['redirect_to'],"_self");
                }else{
                    $('.ssoimage').val(image);
                    $('.ssoname').val(name);
                    $('.sso_auth_token').val(auth_token);
                    $('.sso_provider').val(provider);
                    if(email){
                      if(email.trim()!=""){
                        $('#ssoemail').val(email);
                        $('#ssoemail').attr("readonly","readonly");
                      }
                    }
                    $('.step').removeClass('active');
                    $("#title-sso-registration").addClass('active');
                    $('.heading-flow').removeClass('active');
                    $("#tab-sso-registration").addClass('active');
                    $('#globalMessage').removeClass('show');
                    $(".error-message").css('display','none');
                    $('.form-field').removeClass('error-row');
                    
                }
            }else {

                $('.global-popup').addClass('show');
                $('.global-caption').html('<div class="indicator"></div><h5>Error</h5><p>'+response+'</p>');
            }
          },
          
        });
  }

    jQuery( ".cancel-submit" ).on('click',function() {
        var x=0;
        var message=jQuery('#message').val();
         if (message=='' || message == undefined) {
           jQuery('#err_message').parents('.form-field').addClass('error-row');
           jQuery('#err_message').text("Tell us why you'd like to cancel").show();
           x++;
        } else {
           jQuery('#err_message').parents('.form-field').removeClass('error-row');
           jQuery('#err_message').hide();
        }
         if (x==0) {
           return true;
        }
        return false;
    });


    jQuery( "#completeBooking" ).on('click',function(e) {
        e.preventDefault();
        var booking_response = jQuery('#booking-response').val();
        var ZipCode = jQuery('#ZipCode').val();
        var sales_order = jQuery('#sales-order').val();
        var billing_address = jQuery('#billing-address').val();
        var documentId = jQuery('#document-id').val();
        var dealerdocumentId = jQuery('.select-text .dealer-document-id').val();
         $.ajax({
            type: "POST",
            dataType: "json",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:'update_dealer',booking_response:booking_response, sales_order:sales_order, billing_address:billing_address, document_id: documentId, ZipCode:ZipCode, dealerdocumentId: dealerdocumentId},
        }).done(function (data) {
            if(data==1) {
                window.location.href = blogUri+"/kommuniti/my-account/my-orders/";
            }
        });
    });

    jQuery( "#ZipCode" ).on('keyup',function(e) {
        e.preventDefault();
        var organization_code = jQuery('.organization_code').val();
        var ZipCode = jQuery('#ZipCode').val();
         $.ajax({
            type: "POST",
            url: blogUri+"/wp-admin/admin-ajax.php",
            data: {action:'get_dealer',zipcode:ZipCode, organization_code:organization_code},
        }).done(function (data) {
           jQuery('#dealerLocatorResponse').html(data);
        });
    });
jQuery( ".edit_pincode" ).on('click',function() {

    jQuery(this).parents().find('#ZipCode').removeAttr("readonly");
});

            $('.btn-tab').on('click', function(e){
                e.preventDefault();
                  var x = 0;
                  var tabId=$(this).attr('data-tab');
                  var dataTitle=$(this).attr('data-title');
                  var datareset=$(this).attr('data-reset');
                  var dataId = $(this).attr('id');
                
                $(this).closest("form").find('input').each(function(){
                    var errorText  = $(this).closest('.form-field').find('label').attr('data-error');

                    if($(this).val().trim().length == ''){
                        $(this).closest('.form-field').addClass('error-row');
                        if($(this).closest('.form-field').find('.error-message').length==0) {
                            $('<div class="error-message">'+eval(errorText)+'</div>').appendTo($(this).closest('.form-field')).slideDown();
                            x++
                        }
                    }
                    else{
                        if($(this).closest('.form-field').find('.error-message').length>0) {
                            $(this).closest('.form-field').find('.error-message').text(eval(errorText)).slideUp();
                        }
                    }

                });
                  
                  if(x>0){
                    return false;
                  }
                switch(tabId) {
                    case "verify-otp":

                        var reg_name = jQuery('#reg_name').val();
                        var reg_phone_number = jQuery('#reg_phone_number').val();
                        var reg_email_address = jQuery('#reg_email_address').val();
                        var reg_pwd = jQuery('#reg_pwd').val();
                        var upd_phone_number = jQuery('#upd_phone_number').val();
                        var book = jQuery('#book-signin').val();
                        var x=0;
                               console.log(reg_name);
                               console.log(reg_phone_number);
                               console.log(reg_email_address);
                               console.log(reg_pwd);
                        if (reg_name=='' || reg_name ==undefined) {
                             jQuery('#err_name').parents('.form-field').addClass('error-row');
                             jQuery('#err_name').text("Enter your full name").show();
                             x++;
                          } else {
                             jQuery('#err_name').parents('.form-field').removeClass('error-row');
                             jQuery('#err_name').hide();
                          }

                          if (reg_phone_number=='' || reg_phone_number ==undefined) {
                             jQuery('#err_phone_number').parents('.form-field').addClass('error-row');
                             jQuery('#err_phone_number').text("Enter your phone number").show();
                             x++;
                          } else {
                             jQuery('#err_phone_number').parents('.form-field').removeClass('error-row');
                             jQuery('#err_phone_number').hide();
                          }
                          if (reg_email_address!='') {
                             if (!regex.test(reg_email_address)) {
                                 jQuery('#err_email').hide();
                                 jQuery('#err_email').parents('.form-field').addClass('error-row');
                                 jQuery('#err_email').text("Enter a valid email address").show();
                                 x++;
                             } else {
                                 jQuery('#err_email').parents('.form-field').removeClass('error-row');
                                 jQuery('#err_email').hide();
                             }
                          } else {
                             jQuery('#err_email').hide();
                             jQuery('#err_email').text("Enter your email address").show();
                             jQuery('#err_email').parents('.form-field').addClass('error-row');
                             x++;
                          }
                          if (reg_pwd=='' || reg_pwd ==undefined) {
                             jQuery('#err_register_password').parents('.form-field').addClass('error-row');
                             jQuery('#err_register_password').text("Enter your password").show();
                             x++;
                          } else {
                             jQuery('#err_register_password').parents('.form-field').removeClass('error-row');
                             jQuery('#err_register_password').hide();
                          }
                          

                          
                        if(upd_phone_number == ''){
                            if(x===0) {
                                jQuery.ajax({ 
                                    data: {action: 'mem_reg_form',reg_name:reg_name,reg_phone_number:reg_phone_number,reg_email_address:reg_email_address,reg_pwd:reg_pwd, book: book},
                                    type: 'post',
                                    url: ajaxurl,
                                    success: function(data) {
                                    if(data.trim() == 1)
                                      {
                                        $('.step').removeClass('active');
                                        $("#"+tabId).addClass('active');
                                        $('.heading-flow').removeClass('active');
                                        $("#"+dataTitle).addClass('active');
                                        $('#globalMessage').removeClass('show');
                                        $(".error-message").css('display','none');
                                        $('.form-field').removeClass('error-row');
                                        $('.sentNumber').text(reg_phone_number);
                                        $('.book-reg-name').val(reg_email_address);
                                        $('.book-reg-pwd').val(reg_pwd);
                                        $('form')[0].reset();
                                        registerTimer(30);
                                      }else{
                                        $('.global-popup').addClass('show');
                                        $('.global-caption').html('<div class="indicator"></div><h5>Error</h5><p>'+data+'</p>');
                                      }

                                    }
                                });
                            }
                            }else{
                                jQuery.ajax({ 
                                     data: {action: 'chang-phon',upd_phone_number:upd_phone_number },
                                     type: 'post',
                                     url: ajaxurl,
                                     success: function(data) {
                                        if(data.trim() == 1)
                                        {
                                            $('.step').removeClass('active');
                                        $("#"+tabId).addClass('active');
                                        $('.heading-flow').removeClass('active');
                                        $("#"+dataTitle).addClass('active');
                                        $('#globalMessage').removeClass('show');
                                        $(".error-message").css('display','none');
                                        $('.form-field').removeClass('error-row');
                                        $('.sentNumber').text(upd_phone_number);
                                        $('.book-reg-name').val(reg_email_address);
                                        $('.book-reg-pwd').val(reg_pwd);
                                        $('form')[0].reset();
                                        registerTimer(30);
                                        }else{
                                            $('.global-popup').addClass('show');
                                        
                                        $('.global-caption').html('<div class="indicator"></div><h5>Error</h5><p>'+data+'</p>');
                                        }
                                    }
                                });
                            }
                        
                        break;
                
                    case "tab-signin":
                            var reg_ver_otp = jQuery('#reg_ver_otp').val();
                            var book = jQuery('#tab-signup .book-signin').val();
                            
                                  //if(y==0) {
                            if(dataId =="resetpassword-btn"){
                                var x=0;
                                var loginemail = jQuery('#user_email').val();
                                var verificationcode = jQuery('#verification_code').val();
                                var resetpassword = jQuery('#reset_password').val();
                                if (verificationcode=='' || verificationcode ==undefined) {
                                     jQuery('#err_verification_code').parents('.form-field').addClass('error-row');
                                     jQuery('#err_verification_code').text("Enter your verification code").show();
                                     x++;
                                  } else {
                                     jQuery('#err_verification_code').parents('.form-field').removeClass('error-row');
                                     jQuery('#err_verification_code').hide();
                                  }

                                  if (resetpassword=='' || resetpassword ==undefined) {
                                     jQuery('#err_new_password').parents('.form-field').addClass('error-row');
                                     jQuery('#err_new_password').text("Enter your password").show();
                                     x++;
                                  } else {
                                     jQuery('#err_new_password').parents('.form-field').removeClass('error-row');
                                     jQuery('#err_new_password').hide();
                                  }
                                console.log(1);
                                if(x==0) {
                                $.ajax({
                                    type: "POST",
                                    dataType: "text",
                                    url: blogUri+"/wp-admin/admin-ajax.php",
                                    data: {action:"reset_password", email: loginemail, code: verificationcode, resetpass: resetpassword},
                                }).done(function (data) {
                                    if(data==1) {
                                        $('.step').removeClass('active');
                                        $("#"+tabId).addClass('active');
                                        $('.heading-flow').removeClass('active');
                                        $("#"+dataTitle).addClass('active');
                                        $('#globalMessage').removeClass('show');
                                        $(".error-message").css('display','none');
                                        $('.form-field').removeClass('error-row');
                                        $('form')[0].reset();
                                    } else {
                                        jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                        jQuery('.global-popup').removeClass('success');
                                        jQuery('.global-popup').addClass('error');
                                        jQuery('.global-popup').addClass('show');
                                    }
                                });
                                }
                            } else if(dataId =="back-to-signin"){
                                $('.step').removeClass('active');
                                $("#"+tabId).addClass('active');
                                $('.heading-flow').removeClass('active');
                                $("#"+dataTitle).addClass('active');
                                $('#globalMessage').removeClass('show');
                                $(".error-message").css('display','none');
                                $('.form-field').removeClass('error-row');
                                $('form')[0].reset();
                            } else if(dataId =="signup-to-signin"){
                                $('.step').removeClass('active');
                                $("#"+tabId).addClass('active');
                                $('.heading-flow').removeClass('active');
                                $("#"+dataTitle).addClass('active');
                                $('#globalMessage').removeClass('show');
                                $(".error-message").css('display','none');
                                $('.form-field').removeClass('error-row');
                                $('form')[0].reset();
                            } else if (reg_ver_otp=='' || reg_ver_otp ==undefined) {
                            if (reg_ver_otp=='' || reg_ver_otp ==undefined) {
                                    jQuery('#err_verify_otp').parents('.form-field').addClass('error-row');
                                     jQuery('#err_verify_otp').text("Enter your OTP").show();
                                     return false;
                                  } else {
                                     jQuery('#err_verify_otp').parents('.form-field').removeClass('error-row');
                                     jQuery('#err_verify_otp').hide();
                                  }

                            } else if(reg_ver_otp!='' && reg_ver_otp!=undefined){
                                
                                console.log(reg_ver_otp);
                                    jQuery.ajax({ 
                                     data: {action: 'reg_ver_otp',reg_ver_otp:reg_ver_otp, book: book},
                                     type: 'post',
                                     url: ajaxurl,
                                     success: function(data) {
                                        if(data.trim() == 1){
                                            $('.step').removeClass('active');
                                            $("#"+tabId).addClass('active');
                                            $('.heading-flow').removeClass('active');
                                            $("#"+dataTitle).addClass('active');
                                            $('#globalMessage').removeClass('show');
                                            $(".error-message").css('display','none');
                                            $('.form-field').removeClass('error-row');
                                            $('form')[0].reset();
                                        }  else{
                                            jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                            jQuery('.global-popup').removeClass('success');
                                            jQuery('.global-popup').addClass('error');
                                            jQuery('.global-popup').addClass('show');
                                        }

                                    }
                                });
                            }else{
                                console.log(3);
                                $('.step').removeClass('active');
                                $("#"+tabId).addClass('active');
                                $('.heading-flow').removeClass('active');
                                $("#"+dataTitle).addClass('active');
                                $('#globalMessage').removeClass('show');
                                $(".error-message").css('display','none');
                                $('.form-field').removeClass('error-row');
                                $('form')[0].reset();
                            }
                        //}
                        break;
                    case "resetpassword":
                        var femail = jQuery('#user_email').val();
                        jQuery('#hidden_email').val(femail);
                        var x=0;
                        if (femail!='') {
                             if (!regex.test(femail)) {
                                 jQuery('#err_forgot_email').hide();
                                 jQuery('#err_forgot_email').parents('.form-field').addClass('error-row');
                                 jQuery('#err_forgot_email').text("Enter a valid email address").show();
                                 x++;
                             } else {
                                 jQuery('#err_forgot_email').parents('.form-field').removeClass('error-row');
                                 jQuery('#err_forgot_email').hide();
                             }
                          } else {
                             jQuery('#err_forgot_email').hide();
                             jQuery('#err_forgot_email').text("Enter your email address").show();
                             jQuery('#err_forgot_email').parents('.form-field').addClass('error-row');
                             x++;
                          }

                           if(x==0) {
                        $.ajax({
                           type: "POST",
                           dataType: "text",
                           url: blogUri+"/wp-admin/admin-ajax.php",
                           data: {action:"forgot_password", email: femail},
                        }).done(function (data) {
                            if(data.trim()==1) {
                               $('.step').removeClass('active');
                                 $("#"+tabId).addClass('active');
                                 $('.heading-flow').removeClass('active');
                                 $("#"+dataTitle).addClass('active');
                                 $('#globalMessage').removeClass('show');
                                 $(".error-message").css('display','none');
                                 $('.form-field').removeClass('error-row');
                                 $('form')[0].reset();
                                 timer(30);
                            } else {
                               jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                jQuery('.global-popup').removeClass('success');
                                jQuery('.global-popup').addClass('error');
                                jQuery('.global-popup').addClass('show');
                            }
                             $("html, body").animate({
                                 scrollTop: 0
                             }, 600);
                        });
                    }
                    break;
                    case "tab-dashboard":
                        var memail = jQuery('#username').val();
                        var mpassword = jQuery('#password').val();
                        var id = jQuery(this).attr("id");
                        var book = jQuery('.book-signin').val();
                        
                        var x=0;
                         if (memail!='') {
                         if (!regex.test(memail)) {
                             jQuery('#err_signin_email').hide();
                             jQuery('#err_signin_email').parents('.form-field').addClass('error-row');
                             jQuery('#err_signin_email').text("Enter a valid email address").show();
                             x++;
                             console.log(x);
                         } else {
                             jQuery('#err_signin_email').parents('.form-field').removeClass('error-row');
                             jQuery('#err_signin_email').hide();
                         }
                      } else {
                         jQuery('#err_signin_email').hide();
                         jQuery('#err_signin_email').text("Enter your email address").show();
                         jQuery('#err_signin_email').parents('.form-field').addClass('error-row');
                         x++;
                      }

                      if (mpassword=='' || mpassword ==undefined) {
                         jQuery('#err_password').parents('.form-field').addClass('error-row');
                         jQuery('#err_password').text("Enter your password").show();
                         x++;
                      } else {
                         jQuery('#err_password').parents('.form-field').removeClass('error-row');
                         jQuery('#err_password').hide();
                      }

                        if(x==0) {
                        $.ajax({
                            type: "POST",
                            dataType: "text",
                            url: blogUri+"/wp-admin/admin-ajax.php",
                            data: {action: "sign_in", email: memail,password: mpassword, book:book},
                        }).done(function (data) {
                            if(data.trim()==1) {
                               window.location.href = blogUri+"/kommuniti";
                            } else {
                                jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                jQuery('.global-popup').removeClass('success');
                                jQuery('.global-popup').addClass('error');
                                jQuery('.global-popup').addClass('show');
                            }
                        });
                      } 
                    break;
                    case "pre-book-details-sec":
                        var memail = jQuery('#username').val();
                        var mpassword = jQuery('#password').val();
                        var id = jQuery(this).attr("id");
                        var book = jQuery('.book-signin').val();
                        if(id=="signin-booking") {
                        var x=0;
                         if (memail!='') {
                         if (!regex.test(memail)) {
                             jQuery('#err_signin_email').hide();
                             jQuery('#err_signin_email').parents('.form-field').addClass('error-row');
                             jQuery('#err_signin_email').text("Enter a valid email address").show();
                             x++;
                         } else {
                             jQuery('#err_signin_email').parents('.form-field').removeClass('error-row');
                             jQuery('#err_signin_email').hide();
                         }
                      } else {
                         jQuery('#err_signin_email').hide();
                         jQuery('#err_signin_email').text("Enter your email address").show();
                         jQuery('#err_signin_email').parents('.form-field').addClass('error-row');
                         x++;
                      }

                      if (mpassword=='' || mpassword ==undefined) {
                         jQuery('#err_password').parents('.form-field').addClass('error-row');
                         jQuery('#err_password').text("Enter your password").show();
                         x++;
                      } else {
                         jQuery('#err_password').parents('.form-field').removeClass('error-row');
                         jQuery('#err_password').hide();
                      }
                        if(x==0) {
                        $.ajax({
                            type: "POST",
                            dataType: "text",
                            url: blogUri+"/wp-admin/admin-ajax.php",
                            data: {action: "sign_in", email: memail,password: mpassword, book:book},
                        }).done(function (data) {
                            if(data.trim()==1) {
                                
                                    $('#refresh').load('http://192.168.3.220/jawa/booking/ #pre-book-details',function(responseTxt, statusTxt, xhr){
                                    if(statusTxt == "success")
                                        console.log('booking refreshed');
                                        if(statusTxt == "error")
                                            console.log("Error: " + xhr.status + ": " + xhr.statusText);
                                    }); 
                                    $('.step').removeClass('active');
                                    $('.heading-flow').removeClass('active');
                                    $("#pre-book-details").addClass('active');
                                    $("#"+dataTitle).addClass('active');
                                    $('#globalMessage').removeClass('show');
                                    $(".error-message").css('display','none');
                                    $('.form-field').removeClass('error-row');
                                
                                   
                            }  else {
                                jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                 jQuery('.global-popup').removeClass('success');
                                jQuery('.global-popup').addClass('error');
                                jQuery('.global-popup').addClass('show');
                            }
                        });
                      } 
                  } else {
                         var reg_ver_otp = jQuery('#reg_ver_otp').val();
                            var book = jQuery('#tab-signup .book-signin').val();
                                  //if(y==0) {
                            if(dataId =="resetpassword-btn"){
                                var x=0;
                                var loginemail = jQuery('#user_email').val();
                                var verificationcode = jQuery('#verification_code').val();
                                var resetpassword = jQuery('#reset_password').val();
                                if (verificationcode=='' || verificationcode ==undefined) {
                                     jQuery('#err_verification_code').parents('.form-field').addClass('error-row');
                                     jQuery('#err_verification_code').text("Enter your verification code").show();
                                     x++;
                                  } else {
                                     jQuery('#err_verification_code').parents('.form-field').removeClass('error-row');
                                     jQuery('#err_verification_code').hide();
                                  }

                                  if (resetpassword=='' || resetpassword ==undefined) {
                                     jQuery('#err_new_password').parents('.form-field').addClass('error-row');
                                     jQuery('#err_new_password').text("Enter your password").show();
                                     x++;
                                  } else {
                                     jQuery('#err_new_password').parents('.form-field').removeClass('error-row');
                                     jQuery('#err_new_password').hide();
                                  }
                                console.log(1);
                                if(x==0) {
                                $.ajax({
                                    type: "POST",
                                    dataType: "text",
                                    url: blogUri+"/wp-admin/admin-ajax.php",
                                    data: {action:"reset_password", email: loginemail, code: verificationcode, resetpass: resetpassword},
                                }).done(function (data) {
                                    if(data==1) {
                                        $('.step').removeClass('active');
                                        $("#"+tabId).addClass('active');
                                        $('.heading-flow').removeClass('active');
                                        $("#"+dataTitle).addClass('active');
                                        $('#globalMessage').removeClass('show');
                                        $(".error-message").css('display','none');
                                        $('.form-field').removeClass('error-row');
                                        $('form')[0].reset();
                                    } else {
                                        jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                         jQuery('.global-popup').removeClass('success');
                                        jQuery('.global-popup').addClass('error');
                                        jQuery('.global-popup').addClass('show');
                                    }
                                });
                                }
                            }else if (reg_ver_otp=='' || reg_ver_otp ==undefined) {
                            if (reg_ver_otp=='' || reg_ver_otp ==undefined) {
                                    jQuery('#err_verify_otp').parents('.form-field').addClass('error-row');
                                     jQuery('#err_verify_otp').text("Enter your OTP").show();
                                     return false;
                                  } else {
                                     jQuery('#err_verify_otp').parents('.form-field').removeClass('error-row');
                                     jQuery('#err_verify_otp').hide();
                                  }

                            } else if(reg_ver_otp!='' && reg_ver_otp!=undefined){
                                 var email = jQuery('.book-reg-name').val();
                                 var pwd = jQuery('.book-reg-pwd').val();
                                console.log(reg_ver_otp);
                                    jQuery.ajax({ 
                                     data: {action: 'reg_ver_otp',reg_ver_otp:reg_ver_otp, book: book},
                                     type: 'post',
                                     url: ajaxurl,
                                     success: function(data) {
                                        if(data.trim() == 1){
                                             $.ajax({
                                                type: "POST",
                                                dataType: "text",
                                                url: blogUri+"/wp-admin/admin-ajax.php",
                                                data: {action: "sign_in", email: email,password: pwd, book:book},
                                            }).done(function (data) {
                                                if(data.trim()==1) {
                                                   $('#refresh').load(' #'+tabId,function(responseTxt, statusTxt, xhr){
                                                    if(statusTxt == "success")
                                                        console.log('booking refreshed');
                                                        if(statusTxt == "error")
                                                            console.log("Error: " + xhr.status + ": " + xhr.statusText);
                                                        }); 
                                                    $("#"+tabId).addClass('active');
                                                    $("#"+dataTitle).addClass('active');
                                                    $('#globalMessage').removeClass('show');
                                                    $(".error-message").css('display','none');
                                                    $('.form-field').removeClass('error-row');
                                                } else {
                                                    jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                                    jQuery('.global-popup').removeClass('success');
                                                    jQuery('.global-popup').addClass('error');
                                                    jQuery('.global-popup').addClass('show');
                                                }
                                            });
                                            
                                        }  else{
                                            jQuery('#content').html('<h5>Error</h5><p>'+data+'</p>');
                                            jQuery('.global-popup').removeClass('success');
                                            jQuery('.global-popup').addClass('error');
                                            jQuery('.global-popup').addClass('show');
                                        }

                                    }
                                });
                            }else{
                                $('.step').removeClass('active');
                                $("#"+tabId).addClass('active');
                                $('.heading-flow').removeClass('active');
                                $("#"+dataTitle).addClass('active');
                                $('#globalMessage').removeClass('show');
                                $(".error-message").css('display','none');
                                $('.form-field').removeClass('error-row');
                                $('form')[0].reset();
                            }
                  }
                    break;
                    
                    default:
                        var tabId=$(this).attr('data-tab');
                        var dataTitle=$(this).attr('data-title');
                        var datareset=$(this).attr('data-reset');
                        $('.step').removeClass('active');
                        $("#"+tabId).addClass('active');
                        $('.heading-flow').removeClass('active');
                        $("#"+dataTitle).addClass('active');
                        $('#globalMessage').removeClass('show');
                        $(".error-message").css('display','none');
                        $('.form-field').removeClass('error-row');
                        $('.sentNumber').text(reg_phone_number);
                        $('form')[0].reset();

                        
                }
              
            });
               /* Link Facebook Page */
            
     $('.facebookpagelink').click(function(e){
        getFacebookAccess();
     });

   var radio_fbpage = $("#radio_fbpage");

   function makeDropDown(value, text) {
       console.log(value);
     var len = $('#radio_fbpage > option').length;
     if (len == 0){
       $("<option value=''>Select Facebook Page</option>").appendTo('#radio_fbpage');
     }
     $("<option value='"+ value +"'>" + text + "</option>").appendTo('#radio_fbpage');
     $('#radio_fbpage').slideDown();
   }

   function getAccesstoken(){
        FB.api('/me/accounts', function(response){
            // console.log(JSON.stringify(response.data));
            console.log(response);
        if($.isEmptyObject(response.data)){
//           globalmessage('error', 'No pages linked to your Facebook Account.');
        }else{
          $.each(response.data, function(res){
                var data = response.data[res];
                var name = data["name"];
                var about = data['about'];
                var access_token = data["access_token"];
                var id = data["id"];
                makeDropDown(JSON.stringify(data), name);
            });
        }
        });
   }

   function getFacebookAccess(){
        $('#radio_fbpage').text("");
        FB.login(function(response) {
            console.log(response.authResponse);
            if (response.authResponse) {
               getAccesstoken();
            } else {
              console.log('Authorization not completed.');
            }
        },{
            scope: 'manage_pages',
            return_scopes: true
        });
   }


  $('#radio_fbpage').on('change', function() {
    var fb_response =  this.value;
      var data_fb = JSON.parse(fb_response);
      var fbpage_token = data_fb['access_token'];
      var fbpage_id = data_fb['id'];
      var resp_pic_data = '';
      console.log(data_fb['id']);
        /* make the API call */
        FB.api(
            "/"+fbpage_id+"/picture",
            {
                "redirect": "0"
            },
            function (resp_pic) {
              if (resp_pic && !resp_pic.error) {
                /* handle the result */
                  resp_pic_data =  resp_pic;
              }
            }
        );
      FB.api(
      fbpage_id,
      'GET',
      {"fields":"name,about,birthday,link,location,phone,founded,emails,website"},
      function(response) {
          console.log(resp_pic_data['data']);
          console.log(resp_pic_data['data']['url']);
          
                var data = response;
                var about = data['about'];
                var pageid = data['id'];
                var pagename = data['name'];
                var pagelink = data['link'];
                var phone = data['phone'];
                var fb_page_img = resp_pic_data['data']['url']
                $("#radio_fbpage").find("option:first").hide();

                  try {
                    var founded = data['founded'];
                      console.log(founded);
                  }catch(err) {
                    var founded = "";
                  }

                  try {
                    var email = data['emails'][0];
                      console.log(email);
                  }catch(err) {
                    var email = "";
                  }

                  try {
                    var city = data['location']['city'];
                      console.log(city);
                  }catch(err) {
                    var city = "";
                  }
                  try {
                    var imgsrc = response['logo'];
                      console.log(imgsrc);
                  }catch(err) {
                    var imgsrc = "/static/images/180.png";
                  }
                  // console.log(pageid,pagename,founded,phone,email,city,pagelink);
                  $('#club_name').val(pagename);
                  $('#founded_at').val(founded);
                  if($('#founded_at').val()!=''){
                    $('#founded_at').addClass('input-email-active');
                  }
                  $('#pagelink').val(pagelink);
                  $('#phone').val(phone);
                  $('#fb_url').val(pagelink);
                  $('#email').val(email);
                  $('#club_description').val(about);
                  $('#city').val(city);
                  $('.profileImg').attr("src",imgsrc);
                  $('.error-message').remove();
                  $('.form-row').removeClass('error-row');
                  $('.logo_image').val(imgsrc);
                  $("#club_fb_src").val(fb_page_img);
                    $('#fb_page_id').val(pageid);
                    $( "#club_name" ).trigger( "blur" );


      }
    );
 });
            
  /* Link Facebook Page ends */
            
            jQuery('#resend-prov').click(function(e){
                
    
                jQuery.ajax({ 
                     data: {action: 'resend-prov'},
                     type: 'post',
                     url: ajaxurl,
                     success: function(data) {
                        if(data ==1){

                             jQuery('#content').html("<h5>Success</h5><p>Your verification code has been sent successfully.</p>");
                            jQuery('.global-popup').addClass('show');
                            jQuery('#resend-prov').html('Resend OTP (<span id="countdowntimersecond">30 </span>)');
                            jQuery('#resend-prov').addClass('otp-enable');
                            registerTimer(30);

                        }
                    }
                });
            });


             /**
          * We wrap all our code in the jQuery "DOM-ready" function to make sure the script runs only
          * after all the DOM elements are rendered and ready to take action
          */
          if($('.threesixty').length!=0){
            // Tells if the app is ready for user interaction
            var ready = false,
            // Tells the app if the user is dragging the pointer
            dragging = false,
            // Stores the pointer starting X position for the pointer tracking
            pointerStartPosX = 0,
            // Stores the pointer ending X position for the pointer tracking
            pointerEndPosX = 0,
            // Stores the distance between the starting and ending pointer X position in each time period we are tracking the pointer
            pointerDistance = 0,

            // The starting time of the pointer tracking period
            monitorStartTime = 0,
            // The pointer tracking time duration
            monitorInt = 10,
            // A setInterval instance used to call the rendering function
            ticker = 0,
            // Sets the speed of the image sliding animation
            speedMultiplier = 10,
            // CanvasLoader instance variable
            // spinner,

            // Stores the total amount of images we have in the sequence
            totalFrames = $('.threesixty-option li a:first').attr("data-frame-count"),
            // The current frame value of the image slider animation
            currentFrame = 0,
            // Stores all the loaded image objects
            frames = [],
            // The value of the end frame which the currentFrame will be tweened to during the sliding animation
            endFrame = 0,
            // We keep track of the loaded images by increasing every time a new image is added to the image slider
            loadedImages = 0;

            /**
            * Adds a "spiral" shaped CanvasLoader instance to the #spinner div
            */
            function addSpinner () {
                // We use the jQuery fadeIn method to slowly fade in the preloader
                $(".loader-overlay").fadeIn("slow");
            };

            var dataColor=$('.threesixty-option li a:first').attr("data-color");
            var dataPath=$('.threesixty-option li a:first').attr("data-path");
            var dataBikemodel=$('.threesixty-option li a:first').attr("data-bike");
            var datacolorName=$('.threesixty-option li a:first').attr("data-color-name");
            $('.threesixty-option li a:first').addClass("active");
            
            $('.color-name h4').html(datacolorName);
            $(document).on('click', '.threesixty-option li a', function(e){
                e.preventDefault();
             dataColor=$(this).attr("data-color");
             dataPath=$(this).attr("data-path");
             dataBikemodel=$(this).attr("data-bike");
             datacolorName=$(this).attr("data-color-name");
             $('.threesixty-option li a').removeClass("active");
             $(this).addClass('active');
             $('.color-name h4').html(datacolorName);
                loadedImages = 0;
                frames = [];
            totalFrames=$(this).attr("data-frame-count");
                $(".threesixty_images").html('');
                loadImage(dataColor,dataPath,dataBikemodel);
                addSpinner ()
            });


            /**
            * Creates a new <li> and loads the next image in the sequence inside it.
            * With jQuery we add the "load" event handler to the image, so when it's successfully loaded, we call the "imageLoaded" function.
            */
            function loadImage(imgUrl,baseUrl,bikeModel) {
              // Creates a new <li>
              var li = document.createElement("li");
              // Generates the image file name using the incremented "loadedImages" variable
              //var imageName = "/html/images/jawa/" + (loadedImages + 1) + ".jpg";

              //var imageName = "/uploads/media/motorcycle/360/jawa 42/"+ imgUrl + "/" + (loadedImages + 1) + ".jpg";
              var imageName = baseUrl+ "/"+ bikeModel +"/"+ imgUrl + "/" + (loadedImages + 1) + ".jpg";

              /*
                  Creates a new <img> and sets its src attribute to point to the file name we generated.
                  It also hides the image by applying the "previous-image" CSS class to it.
                  The image then is added to the <li>.
              */
              var image = $('<img>').attr({'src':imageName,'data-index':(loadedImages + 1)}).addClass("previous-image").appendTo(li);
              // We add the newly added image object (returned by jQuery) to the "frames" array.
              frames.push(image);

              // We add the <li> to the <ol>
              $(".threesixty_images").append(li);
              /*
                  Adds the "load" event handler to the new image.
                  When the event triggers it calls the "imageLoaded" function.
              */
              $(image).on('load', function() {
                  imageLoaded();
              });
            };

            /**
            * It handles the image "load" events.
            * Each time this function is called it checks if all the images have been loaded or it has to load the next one.
            * Every time a new image is succesfully loaded, we set the percentage value of the preloader to notify the user about the loading progress.
            * If all the images are loaded, it hides the preloader using the jQuery "fadeOut" method, which on complete stops the preloader rendering
            * and calls the "showThreesixty" method, that displays the image slider.
            */
            function imageLoaded() {
              // Increments the value of the "loadedImages" variable
              loadedImages++;
              // Checks if the currently loaded image is the last one in the sequence...
              if (loadedImages == totalFrames) {
                  // ...if so, it makes the first image in the sequence to be visible by removing the "previous-image" class and applying the "current-image" on it
                  frames[0].removeClass("previous-image").addClass("current-image");
                  /*
                      Displays the image slider by using the jQuery "fadeOut" animation and its complete event handler.
                      When the preloader is completely faded, it stops the preloader rendering and calls the "showThreesixty" function to display the images.
                  */
                  $(".loader-overlay").fadeOut("slow", function(){
                      showThreesixty();
                      var imgHt=$('.threesixty_images li img').height();
                      $('.threesixty').height(imgHt);
                  });
              } else {
                  // ...if not, Loads the next image in the sequence
                  loadImage(dataColor,dataPath,dataBikemodel);
              }
            };

            /**
            * Displays the images with the "swooshy" spinning effect.
            * As the endFrame is set to -720, the slider will take 4 complete spin before it stops.
            * At this point it also sets the application to be ready for the user interaction.
            */
            function showThreesixty () {
              // Fades in the image slider by using the jQuery "fadeIn" method
              $(".threesixty_images").fadeIn("slow");
              // Sets the "ready" variable to true, so the app now reacts to user interaction
              ready = true;
              // Sets the endFrame to an initial value...
              endFrame = -720;
              // ...so when the animation renders, it will initially take 4 complete spins.
              //refresh();
            };

            /*
                We launch the application by...
                Adding the preloader, and...
            */
            addSpinner();
            // loading the firt image in the sequence.
            loadImage(dataColor,dataPath,dataBikemodel);

            /**
            * Renders the image slider frame animations.
            */
            function render () {
              // The rendering function only runs if the "currentFrame" value hasn't reached the "endFrame" one
              if(currentFrame !== endFrame)
              {
                  /*
                      Calculates the 10% of the distance between the "currentFrame" and the "endFrame".
                      By adding only 10% we get a nice smooth and eased animation.
                      If the distance is a positive number, we have to ceil the value, if its a negative number, we have to floor it to make sure
                      that the "currentFrame" value surely reaches the "endFrame" value and the rendering doesn't end up in an infinite loop.
                  */
                  var frameEasing = endFrame < currentFrame ? Math.floor((endFrame - currentFrame) * 0.1) : Math.ceil((endFrame - currentFrame) * 0.1);
                  // Sets the current image to be hidden
                  hidePreviousFrame();
                  // Increments / decrements the "currentFrame" value by the 10% of the frame distance
                  currentFrame += frameEasing;
                  // Sets the current image to be visible
                  showCurrentFrame();
              } else {
                  // If the rendering can stop, we stop and clear the ticker
                  window.clearInterval(ticker);
                  ticker = 0;
              }
            };

            /**
            * Creates a new setInterval and stores it in the "ticker"
            * By default I set the FPS value to 60 which gives a nice and smooth rendering in newer browsers
            * and relatively fast machines, but obviously it could be too high for an older architecture.
            */
            function refresh () {
              // If the ticker is not running already...
              if (ticker === 0) {
                  // Let's create a new one!
                  //ticker = self.setInterval(render, Math.round(1000 / 60));
                  ticker = self.setInterval(render, Math.round(1000 / 15));
              }
            };

            /**
            * Hides the previous frame
            */
            function hidePreviousFrame() {
              /*
                  Replaces the "current-image" class with the "previous-image" one on the image.
                  It calls the "getNormalizedCurrentFrame" method to translate the "currentFrame" value to the "totalFrames" range (1-180 by default).
              */
              frames[getNormalizedCurrentFrame()].removeClass("current-image").addClass("previous-image");
            };

            /**
            * Displays the current frame
            */
            function showCurrentFrame() {
              /*
                  Replaces the "current-image" class with the "previous-image" one on the image.
                  It calls the "getNormalizedCurrentFrame" method to translate the "currentFrame" value to the "totalFrames" range (1-180 by default).
              */
              frames[getNormalizedCurrentFrame()].removeClass("previous-image").addClass("current-image");
            };

            /**
            * Returns the "currentFrame" value translated to a value inside the range of 0 and "totalFrames"
            */
            function getNormalizedCurrentFrame() {
              var c = -Math.ceil(currentFrame % totalFrames);
              if (c < 0) c += (totalFrames - 1);
              return c;
            };

            /**
            * Returns a simple event regarding the original event is a mouse event or a touch event.
            */
            function getPointerEvent(event) {
              return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
            };

            /**
            * Adds the jQuery "mousedown" event to the image slider wrapper.
            */
            $(".threesixty").on("mousedown", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Stores the pointer x position as the starting position
              pointerStartPosX = getPointerEvent(event).pageX;
              // Tells the pointer tracking function that the user is actually dragging the pointer and it needs to track the pointer changes
              dragging = true;
            });

            /**
            * Adds the jQuery "mouseup" event to the document. We use the document because we want to let the user to be able to drag
            * the mouse outside the image slider as well, providing a much bigger "playground".
            */
            $(".threesixty").on("mouseup", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Tells the pointer tracking function that the user finished dragging the pointer and it doesn't need to track the pointer changes anymore
              dragging = false;
            });

            $(".threesixty").on("mouseleave", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Tells the pointer tracking function that the user finished dragging the pointer and it doesn't need to track the pointer changes anymore
              dragging = false;
              $(this).find('.vr-details').show();
            });

            /**
            * Adds the jQuery "mousemove" event handler to the document. By using the document again we give the user a better user experience
            * by providing more playing area for the mouse interaction.
            */
            $(".threesixty_images").on("mousemove", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Starts tracking the pointer X position changes
              trackPointer(event);
              $(this).parent('.threesixty').find('.vr-details').hide();
            });

            /**
            *
            */
            $(".threesixty").on("touchstart", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Stores the pointer x position as the starting position
              pointerStartPosX = getPointerEvent(event).pageX;
              // Tells the pointer tracking function that the user is actually dragging the pointer and it needs to track the pointer changes
              dragging = true;
              $(this).find('.vr-details').hide();
            });

            /**
            *
            */
            $(".threesixty").on("touchmove", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Starts tracking the pointer X position changes
              trackPointer(event);
            });

            /**
            *
            */
            $(".threesixty").on("touchend", function (event) {
              // Prevents the original event handler behaciour
              event.preventDefault();
              // Tells the pointer tracking function that the user finished dragging the pointer and it doesn't need to track the pointer changes anymore
              dragging = false;
              $(this).find('.vr-details').show();
            });

            /**
            * Tracks the pointer X position changes and calculates the "endFrame" for the image slider frame animation.
            * This function only runs if the application is ready and the user really is dragging the pointer; this way we can avoid unnecessary calculations and CPU usage.
            */
            function trackPointer(event) {
              // If the app is ready and the user is dragging the pointer...
              if (ready && dragging) {
                  // Stores the last x position of the pointer
                  pointerEndPosX = getPointerEvent(event).pageX;
                  //console.log(monitorStartTime , new Date().getTime() , monitorInt)
                  // Checks if there is enough time past between this and the last time period of tracking
                  if(monitorStartTime < new Date().getTime() - monitorInt) {
                      // Calculates the distance between the pointer starting and ending position during the last tracking time period
                      pointerDistance = pointerEndPosX - pointerStartPosX;
                      // Calculates the endFrame using the distance between the pointer X starting and ending positions and the "speedMultiplier" values
                      endFrame = currentFrame + Math.ceil((totalFrames - 1) * speedMultiplier * (pointerDistance / $(".threesixty").width()));
                      // Updates the image slider frame animation
                      refresh();
                      // restarts counting the pointer tracking period
                      monitorStartTime = new Date().getTime();
                      // Stores the the pointer X position as the starting position (because we started a new tracking period)
                      pointerStartPosX = getPointerEvent(event).pageX;
                  }
              }
            };
          }

        });

    }
    (jQuery));