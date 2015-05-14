
var DailyPlanPreview = {
	context: {},
	fontSize: {},
	selected: {},

	bindActions: function() {

		$j('#selectPatient').change(function(){
			$j('#selectPatientForm').submit();
		});

		$j('#changeTemplate_selectedTemplateId').change(function(){
			$j('#changeTemplate').submit();
		});
		
		$j('#report_category h4').addClass('report '+DailyPlanPreview.fontSize.toUpperCase());
		
		$j('#report_font a').bind('click', function(){
			$j("#modal-container").modal({
				closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
				position: ["15%",],
				overlayId: 'modal-overlay',
				onOpen: DailyPlanPreview.open,
				onClose: DailyPlanPreview.close
			});
			
		});
		
		$j('#report_print a').bind('click', function(){
			var patQuery = '?patient=';
			var fontQuery = '&font=';
			var tplQuery = '&template=';
			var patients = $j('select#selectPatient option');
			for(var i=0, j=patients.length; i < j; i++) {
				var patId = patients[i].value;
				patQuery += patId + (i < j-1 ? ',' : '');
				fontQuery += DailyPlanPreview.selectedFontFor(patId) + (i < j-1 ? ',' : '');
				tplQuery += DailyPlanPreview.selectedTemplateFor(patId) + (i < j-1 ? ',' : '');;
			}
			var pdfTarget = DailyPlanPreview.context + "/PdfServlet" + patQuery + fontQuery + tplQuery;
			window.open(pdfTarget, 'allPatients', 'titlebar=no,toolbar=no,menubar=no,top=0,left=0,width=1000');
		});
		
		$j('.patient_tab a.tab').bind('click', function(){
			$j('a.tab').removeClass('selected');
			var id = $j(this).addClass('selected').attr('rel');
			$j('tr div.content').hide();
			$j('#'+id+' div.content').show();
			$j('input[name="selectedTab"]').attr("value", id);
		});
		
		$j("span.expandable").tooltip({ 
		    track: true, 
		    delay: 0, 
		    showURL: false, 
		    opacity: 1, 
		    fixPNG: true, 
		    showBody: " - ", 
		    extraClass: "pretty fancy", 
		    top: -15, 
		    left: 5 
		}); 
		
		if (DailyPlanPreview.selected) {
			$j('.patient_tab a[rel="'+DailyPlanPreview.selected+'"]').click();
		}
	},
		
	selectedFontFor: function (patient) {
		var fonts = $j('#selectPatientForm_fonts').attr('value').split(',');
		var exp = '^' + patient + ':';
		for (var i = 0, j = fonts.length; i < j; i++) {
			if (fonts[i].trim().match(exp)) {
				return fonts[i].substr(fonts[i].indexOf(':')+1);
			}
		}
	},
	
	selectedTemplateFor: function (patient) {
		var templates = $j('#selectPatientForm_defaultTemplates').attr('value').split(',');
		var exp = '^' + patient + ':';
		for (var i = 0, j = templates.length; i < j; i++) {
			if (templates[i].trim().match(exp)) {
				return templates[i].substr(templates[i].indexOf(':')+1);
			}
		}
	},
	
	setFont: function (fontSize) {
		var fonts = $j('#selectPatientForm_fonts').attr('value').split(',');
		var patient = $j('#selectPatient').val();
		var exp = '^' + patient + ':';
		var fontlist = '';
		for (var i = 0, j = fonts.length; i < j; i++) {
			if (i > 0) fontlist += ', ';
			if (fonts[i].trim().match(exp)) {
				fontlist += patient + ':' + fontSize;
			}
			else {
				fontlist += fonts[i];
			}
		}
		$j('#selectPatientForm_fonts').attr('value', fontlist);
	},
	
	open: function (dialog) {
		// add padding to the buttons in firefox/mozilla
		if ($j.browser.mozilla) {
			$j('#modal-container .modal-button').css({
				'padding-bottom': '2px'
			});
		}
		// input field font size
		if ($j.browser.safari) {
			$j('#modal-container .modal-input').css({
				'font-size': '.9em'
			});
		}
		
		if ($j.browser.msie) {
			$j('#pdfDoc').hide();
		}

		var h = 320;

		var title = $j('#modal-container .modal-title').html();
		$j('#modal-container .modal-title').html('Loading...');
		dialog.overlay.fadeIn(200, function () {
			dialog.container.fadeIn(200, function () {
				dialog.data.fadeIn(200, function () {
					$j('#modal-container .modal-content').animate({
						height: h
					}, function () {
						$j('#modal-container .modal-title').html(title);
						$j('#modal-container form').fadeIn(200, function () {
							$j('#modal-container #'+DailyPlanPreview.fontSize).click();
							$j('#modal-container .modal-send').click(function () {
								var selected = $j('#modal-container input:checked').attr('value');
								$j('#table_list').attr('class', selected);
								$j('.report').attr('class', 'report '+selected);
								var displayFont = $j('#modal-container input:checked').attr('id');
								var fontButtonDescr = 'Change ' + displayFont + ' Font Size';
								$j('#report_font span').text(fontButtonDescr);
								DailyPlanPreview.fontSize = displayFont;
								DailyPlanPreview.setFont(selected);
								$j('#selectPatientForm').submit();
								
								DailyPlanPreview.close(dialog);
								
								if ($j.browser.msie) {
									$j('#pdfDoc').show();
								}
								
								return false;
							});

							// fix png's for IE 6
							if ($j.browser.msie && $j.browser.version < 7) {
								$j('#modal-container .modal-button').each(function () {
									if ($j(this).css('backgroundImage').match(/^url[("']+(.*\.png)[)"']+$/i)) {
										var src = RegExp.$1;
										$j(this).css({
											backgroundImage: 'none',
											filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +  src + '", sizingMethod="crop")'
										});
									}
								});
							}
						});
					});
				});
			});
		});
	},
	
	close: function (dialog) {
		$j('#modal-container .modal-message').fadeOut();
		$j('#modal-container .modal-title').html('Goodbye...');
		$j('#modal-container form').fadeOut(200);
		$j('#modal-container .modal-content').animate({
			height: 40
		}, function () {
			dialog.data.fadeOut(200, function () {
				dialog.container.fadeOut(200, function () {
					dialog.overlay.fadeOut(200, function () {
						$j.modal.close();
					});
				});
			});
		});
	}

};
