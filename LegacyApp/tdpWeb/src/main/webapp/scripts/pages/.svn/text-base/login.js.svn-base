var $j = jQuery.noConflict();

var Login = {
	context: {},
	data: {},

	bindActions: function() {
//	    if (getCookie("username") != null) {
//	        $("j_username").value = getCookie("username");
//	        $("j_password").focus();
//	    } else {
	        $j("#j_username").focus();
//	    }
	    // Bind functions
		$j(".toggle").bind("click", Login.toggle);
		
	    // Load latest Testimonial
		var url = Login.context+'/services/rest/testimonials/';
		Login.startLookup();
		$j.ajax({
			  url: url,
			  dataType: 'json',
			  timeout: 9000,
			  success: Login.ajaxSuccess,
			  error: Login.ajaxError
		});

	},
	
	startLookup: function() {
		$j(".ajax-message").css('display','inline-block');
		$j("#home_testimonial_box").css("display","none");
	},
	
	endLookup: function() {
		$j(".ajax-message").css("display", "none");
		$j("#home_testimonial_box").css("display","block");
	},

	ajaxSuccess: function(data, textStatus, XMLHttpRequest) {
		if (data[0]) {
			Login.data = data;
			// Load up the div with the last testimonial
			$j("#home_testimonial_box h2").text(data[data.length - 1].title);
			$j("#home_testimonial_box h1").text('"'+data[data.length - 1].quote+'"');
			$j("#home_testimonial_box img").attr("src", data[data.length - 1].imageLink);
			$j("#home_testimonial_box a.image").attr("href", data[data.length - 1].imageLink);
			$j("#home_testimonial_box #show_all").click(function(){
				$j('#testimonials-dialog').dialog({
			           modal: true,
			           resizable: true,
			           show: 'slide',
			           title: 'Testimonials',
			           width: 600,
			           zindex: 1014,
			           buttons: { "Close": function() { $j(this).dialog("close"); } }
			    });
				return false;
			});
			$j("#home_testimonial_box p#home_testimonial_text").html(data[data.length - 1].testimonial);
			
			// Load Modal with all testimonials
			var accordian = $j('<div id="accordion"></div>');
			var template = '<div class="home_testimonial_box"><h1>$2</h1><a href="$3" target="new"><img src="$3" width="170" height="184" alt="Placeholder" /></a><p class="home_testimonial_text">$4</p></div>';
			for (var i=data.length-1, j=0; i >= j; i--) {
				accordian.append('<h3><a href="#">'+data[i].title+'</a></h3>');
				accordian.append(template.replace('$2', data[i].quote).replace('$3', data[i].imageLink).replace('$3', data[i].imageLink).replace('$4', data[i].testimonial));
			}
			$j('#testimonials-dialog').append(accordian);
			accordian.accordion({
				autoHeight: false,
				navigation: true
			});
		}

		Login.endLookup();
	},
	
	ajaxError: function(XMLHttpRequest, textStatus, errorThrown) {
		alert("An error has occurred: " + textStatus);
		Login.endLookup();
	},
	
	toggle: function() {
		var action = $j("#partial_text").attr("class");
		if (action == "expanded") {
			$j("#partial_text").attr("class", "collapsed");
			$j("#full_text").attr("class", "expanded");
		}
		else {
			$j("#partial_text").attr("class", "expanded");
			$j("#full_text").attr("class", "collapsed");
		}
	},
    
    saveUsername: function(theForm) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 24 * 30 * 60 * 60 * 1000); // sets it for approx 30 days.
        setCookie("username",theForm.j_username.value,expires,"<c:url value="/"/>");
        var spinner = $j("#home_login_button div.spinner").get()[0];
        spinner.innerHTML = '<img src="styles/simplicity/images/loading.gif"/>';
        $j(spinner).show();

        $j("#home_login_button input").attr("disabled", "disabled");
    },
    
    validateForm: function(form) {                                                               
         return validateRequired(form);;
    }
    
};

function required() { 
    this.aa = new Array("j_username", '<s:text name="errors.requiredField"><s:param><s:text name="label.username"/></s:param></s:text>', new Function ("varName", " return this[varName];"));
    this.ab = new Array("j_password", '<s:text name="errors.requiredField"><s:param><s:text name="label.password"/></s:param></s:text>', new Function ("varName", " return this[varName];"));
} 
