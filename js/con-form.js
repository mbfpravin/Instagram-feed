/*Email validation*/

function isValidEmailAddress(r) {
    var e = RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
    return e.test(r)
}
function nameValidate($this){
   input_value = $this.value;
  if (input_value == undefined){
    input_value = $this.val();
  }
  input_value = input_value.replace(/\s\s+/g, ' ').trim();
  if(checkEmpty($this)){
      $(this).closest('.form-field').find('.error-message').slideUp();
      return 1;
    }
}

function ValidatePAN()
{
   var pan_no = document.getElementById("dealer_pan");
  
 if (pan_no.value != "") {
            PanNo = pan_no.value;
            var panPattern = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
            if (PanNo.search(panPattern) == -1) {
              //  alert("Invalid Pan No");
             
                pan_no.value='';
                return false;
            }
          
        }
}

/*Telephone validation*/
function isNumber(elementRef) {
  keyCode=elementRef.charCode;
  if ((keyCode >= 48) && (keyCode <= 57) || (keyCode <= 32)) {
      return true;
  }  else if (keyCode == 43) {
      if (jQuery('#'+elementRef.target.id).val().trim().length == 0){
          return true;
      } else {
          return false;
      }
  }
  return false;
}

/*Name validation*/
function onlyAlphabets(e) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }else if (e) {
            var charCode = e.which;
        } else {
            return true;
        }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode==0 || charCode==8){
            return true;
        }else{
          return false;
        }
    }
    catch (err) {
      alert(err.Description);
    }
}


/*validate email with charCode*/
jQuery(document).on('keypress','#email,#applicantemail',function(e){
    $(this).attr('maxlength','100');
    try {
        if (window.event) {
          var charCode = window.event.keyCode;
        } else if (e) {
          var charCode = e.which;
        } else { return true; }
        if ((charCode > 63 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58) || charCode==0 || charCode==8 || charCode==46 || charCode==45 || charCode==95){
          return true;
        } else {
          return false;
        }
    }
    catch (err) {
      alert(err.Description);
    }
});


//  jQuery(document).on('keypress','#telephone,#applicanttelephone',function(e){
//   if (event.keyCode == 32) {
//         return false;
//     }
// });

// jQuery(document).on('keypress','.input-item',function(e){
//   if (event.keyCode == 32) {
//         return false;
//     }
// });

// jQuery(document).on('keypress','.alu-spdes,.alu-sp,#club_name,#dealer_phone,#dealer_contact,#description,#albumname,#telephone,#firstname,#city,#state,#country,#message,#reg_name,#dealer_full_name,#dealer_ship_name,#dealer_address1,#dealer_address2,#dealer_state,#dealer_city,#departure_from,#arrived_at,#story_title,#your_story',function(e){
//   try {
//   if (window.event) {
//     var charCode = window.event.keyCode;
//   }
//   else if (e) {
//     var charCode = e.which;
//   }
//   else { return true; }
//   if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode==0 || charCode==8)
//   return true;
//   else if ((charCode === 32 && !this.value.length))
//   return false;
//   else if (charCode == 32)
//   return true;
//   else
//     return false;
//   }
//   catch (err) {
//    // alert(err.Description);
//   }
// });

/*allow only one space*/
var lastkey;
var ignoreChars = ' '+String.fromCharCode(0);

jQuery(document).on('keypress','#reg_name,#last_name',function(e){
 e = e || window.event;
 var char = String.fromCharCode(e.charCode);
 if (ignoreChars.indexOf(char) == 0 && ignoreChars.indexOf(lastkey) == 0) {
   lastkey = char;
   return false;
 } else {
   lastkey = char;
   return true;
 }
});


/*********Mobile Validation*********/
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("android") > -1 && !(ua.indexOf('chrome firefox') > -1)) {
    $(document).on('keyup keypress','#dealer_ship_name,#applicantname,#message,#address,#applicantmessage',function(e) {
        var regex = /^[a-zA-Z]$/;
        var regexSpace = /^[a-zA-Z\s]$/;
        var str = $(this).val();
        var subStr = str.substr(str.length - 1);
        if (!regex.test(subStr)) {
            if (str.length == 1) {
                $(this).val(str.substr(0, (str.length - 1)));
            }
            else if (str.length > 1) {
                if (!regexSpace.test(subStr)) {
                    $(this).val(str.substr(0, (str.length - 1)));
                }
            }
            else {
                $(this).val();
            }
        }
    });
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("android") > -1 && !(ua.indexOf('chrome firefox') > -1)) {
    $(document).on('keyup keypress','#email','#applicantemail',function(e) {
        var regex = /^[a-zA-Z0-9@_-]$/;
        var regexSpace = /^[a-zA-Z0-9.@_!#$%^&()=,[]|{}]$/;
        var str = $(this).val();
        var subStr = str.substr(str.length - 1);
        if (!regex.test(subStr)) {
            if (str.length == 1) {
                $(this).val(str.substr(0, (str.length - 1)));
            }
            else if (str.length > 1) {
                if (!regexSpace.test(subStr)) {
                    $(this).val(str.substr(0, (str.length - 1)));
                }
            }
            else {
                $(this).val();
            }
        }
    });
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("android") > -1 && !(ua.indexOf('chrome firefox') > -1)) {
    jQuery('#telephone,#applicanttelephone,#dealer_phone','#reg_phone_number','#dealer_contact').prop('type','tel');
    $('#telephone','#dealer_phone','#reg_phone_number','#dealer_contact').bind('input keyup keypress', function(e) {
        var regex = /^[0-9]*$/;
        var regexSpace = /^[+0-9]*$/;
        var str = $(this).val();
        var subStr = str.substr(str.length - 1);
        if (regex.test(subStr)) {
           $(this).val();
        }
        else {
            if (str.length == 1) {
               $(this).val(str.substr(0, (str.length - 1)));
            } 
            else if (str.length > 1) {
                if (!regexSpace.test(subStr)) {
                   $(this).val(str.substr(0, (str.length - 1)));
                }
            }
            else {
                $(this).val();
            }
        }
    }); 
}

function trim (el) {
    el.value = el.value.
       replace (/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
       replace (/[ ]{2,}/gi," ").       // replaces multiple spaces with one space 
       replace (/\n +/,"\n");           // Removes spaces after newlines
    return;
}
  

$(function(){

jQuery( document ).on('click',"#sign-up",function(event) {
       var reg_phone_number=jQuery('#reg_phone_number').val();
       var reg_name=jQuery('#reg_name').val();
       var last_name=jQuery('#last_name').val();
       var upass=jQuery('#reg_pwd').val();
       var regex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
       var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i;
       var x=0;


 if (reg_name=='' || reg_name == undefined) {
           jQuery('#err_name').parents('.form-row').addClass('error-row');
           jQuery('#err_name').text("Enter your User Name").show();

           x++;

        } else {
           jQuery('#err_name').parents('.form-field').removeClass('error-row');
           jQuery('#err_name').hide();
        }

 if (last_name=='' || last_name == undefined) {
           jQuery('#errl_name').parents('.form-row').addClass('error-row');
           jQuery('#errl_name').text("Enter your Last Name").show();

           x++;

        } else {
           jQuery('#errl_name').parents('.form-field').removeClass('error-row');
           jQuery('#errl_name').hide();
        }



        if (email!='') {
            if (!regex.test(email)) {
                jQuery('#err_email').hide();
               jQuery('#err_email').parents('.form-field').addClass('error-row');
              jQuery('#err_email').text("Enter a valid Email Address").show();
               x++;
            } else {
                jQuery('#err_email').parents('.form-field').removeClass('error-row');
               jQuery('#err_email').hide();
           }
        } else {
           jQuery('#err_email').hide();
           jQuery('#err_email').text("Enter your Email Address").show();
           jQuery('#err_email').parents('.form-field').addClass('error-row');
           x++;
        }



if (reg_phone_number=='' || reg_phone_number == undefined) {
        jQuery('#err_phone_number').parents('.form-field').addClass('error-row');
        jQuery('#err_phone_number').text("Enter your Phone Number").show();
        x++;
        } else {
          if(reg_phone_number.length<10) {
          jQuery('#err_phone_number').parents('.form-row').addClass('error-row');
          jQuery('#err_phone_number').text("Enter a valid Phone Number").show();
          x++;
          } else {
          jQuery('#err_phone_number').parents('.form-row').removeClass('error-row');
          jQuery('#err_phone_number').hide();
          }
          }



           if (upass=='' || upass == undefined) {
           jQuery('#err_register_password').parents('.form-row').addClass('error-row');
           jQuery('#err_register_password').text("Enter your Password").show();

           x++;

        } else {
           jQuery('#err_register_password').parents('.form-field').removeClass('error-row');
           jQuery('#err_register_password').hide();
        }


        if (x==0) {
           return true;
        }
        return false;
     
    });



jQuery( document ).on('click',"#sign-in",function(event) {
       
       var user_name=jQuery('#user_name').val();
       var pass_word=jQuery('#pass_word').val();
       var regex = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
       var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i;
       var x=0;


 if (user_name=='' || user_name == undefined) {
           jQuery('#err_name1').parents('.form-row').addClass('error-row');
           jQuery('#err_name1').text("Enter your User Name").show();

           x++;

        } else {
           jQuery('#err_name1').parents('.form-field').removeClass('error-row');
           jQuery('#err_name1').hide();
        }


           if (pass_word=='' || pass_word == undefined) {
           jQuery('#err_register_password1').parents('.form-row').addClass('error-row');
           jQuery('#err_register_password1').text("Enter your Password").show();

           x++;

        } else {
           jQuery('#err_register_password1').parents('.form-field').removeClass('error-row');
           jQuery('#err_register_password1').hide();
        }


        if (x==0) {
           return true;
        }
        return false;
     
    });





 });