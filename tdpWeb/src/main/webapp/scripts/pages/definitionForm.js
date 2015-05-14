var $j = jQuery.noConflict();

var DefinitionForm = {
	context: {},
	data: {},
	
	ajaxSuccess: function(data, textStatus, XMLHttpRequest) {
		if (data[1]) {
			DefinitionForm.data = data;
			// create a modal dialog with the data
			$j("#modal-container").modal({
				closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
				position: ["15%",],
				overlayId: 'modal-overlay',
				onOpen: DefinitionForm.open,
				onClose: DefinitionForm.close
			});
		}
		else if(data[0]) {
			$j("#definitionForm_definition_definition").val(data[0].definition);
			$j("#originalDefinition").val(data[0].definition);
			$j("#definitionForm_definition_status").attr('value', 'MEDLINEPLUS');
		}
		else {
			alert("No definition found in MedlinePlus matching the abbreviation: "+$j("#definitionForm_definition_abbreviation").val());
		}
		DefinitionForm.endLookup();
	},
	
	ajaxError: function(XMLHttpRequest, textStatus, errorThrown) {
		alert("An error has occurred: " + textStatus);
		DefinitionForm.endLookup();
	},
	
	startLookup: function() {
		$j(".ajax-message").css('display','inline-block');
		$j("#lookupButton").attr("disabled","disabled")
	},
	
	endLookup: function() {
		$j(".ajax-message").css("display", "none");
		$j("#lookupButton").removeAttr("disabled");
	},

	lookupMedlineDef: function() {
		var abbreviation = $j("#definitionForm_definition_abbreviation").val();
		if (abbreviation == '') {
			alert("Please enter an abbreviation for lookup");
			return false;
		}
		var url = DefinitionForm.context+'/services/rest/definitions/medlineAbbreviation/'+ abbreviation;
		DefinitionForm.startLookup();
		$j.ajax({
			  url: url,
			  dataType: 'json',
			  timeout: 9000,
			  success: DefinitionForm.ajaxSuccess,
			  error: DefinitionForm.ajaxError
		});
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

		// dynamically determine height
		var h = 180;
		
		// Load data
		for (var i = 0, ii = DefinitionForm.data.length; i < ii; i++) {
			$j("#modal-container tbody").append("<tr><td><input id='radio_"+i+"' type='radio' name='def-selector' value='"+i+"'</td><td class='definition'>"+DefinitionForm.data[i].definition+"</td></tr>");
			h += (DefinitionForm.data[i].definition.length / 45 + 1) * 26;
		}

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

							$j('#modal-container .modal-send').click(function () {
								var selected = $j('#modal-container input:checked');
								if(selected.length) {
									var medlineIndex = selected[0].value;
									$j("#definitionForm_definition_definition").val(DefinitionForm.data[medlineIndex].definition);
									$j("#originalDefinition").val(DefinitionForm.data[medlineIndex].definition);
									$j("#definitionForm_definition_medlinePlusIndex").attr('value', medlineIndex);
									$j("#definitionForm_definition_status").attr('value', 'MEDLINEPLUS');
									DefinitionForm.close(dialog);
									$j("#definitionForm_definition_definition").focus();
									return false;
								}
								else {
									alert("Please select the most appropriate definition");
									return false;
								}
							});

							// fix png's for IE 6
							if ($j.browser.msie && $.browser.version < 7) {
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
	},
	
	bindActions: function() {
		$j(".ajax-message").html("<div id='loading'/><div id='loading-message'>Looking up definition in MedlinePlus dictionary</div>");
		$j("#lookupButton").bind("click",function(){
			DefinitionForm.lookupMedlineDef();
			return false;
		});
		$j("#definitionForm_definition_abbreviation").bind("blur",function(){
			var def = $j("#definitionForm_definition_definition").val();
			if (def != '') {
				return false;
			}
			DefinitionForm.lookupMedlineDef();
		});
		
		$j("#definitionForm_button_save").bind("click", function(){
			if ($j("#definitionForm_definition_status").attr("value") != "MISSING") {
				if ($j("#originalDefinition").val() != $j("#definitionForm_definition_definition").val()) {
					$j("#definitionForm_definition_status").attr("value","OVERRIDE");
				}
			}
			return true;
		});
	}
};
