var ComponentForm = {
	context: {},
	criteria: {},
	
	bindActions: function() {
		if (ComponentForm.criteria != null && ComponentForm.criteria != '') {
			var container = $j('<fieldset id="criteria_fields"><legend>Selection Criteria</legend><p>When Editing Dates:</p><ul><li>T = Current Time</li><li>Y = Year</li><li>D = Day</li><li>M = Month</li></ul></fieldset>');
			var criteria = ComponentForm.criteria.split(';');
			
			for (var i=0, j=criteria.length; i<j; i++) {
				var cri = criteria[i].split(':'); // Returns Type, Field Name, value
				if (cri[0] == 'Date') {
					container.append('<label for="field_'+i+'">'+cri[1]+': </label><input id="field_'+i+'" value="'+cri[2]+'" /><br/>');
				}
				else if (cri[0] == 'List') {
					var boxes = $j('<fieldset><legend>'+cri[1]+'</legend></fieldset>');
					var options = cri[2].split('^');
					for (var k=0,l=options.length; k<l; k++) {
						var opts = options[k].split('=');
						var checked = (opts[1].charAt(0).toUpperCase() == 'Y') ? 'CHECKED' : '';
						var idx = i+k;
						boxes.append('<label for="field_'+idx+'">'+opts[0]+': </label><input id="field_'+idx+'" type="checkbox" value="'+opts[0]+' '+checked+"/><br/>");
					}
				}
			}
			
			container.append(boxes);
			$j('#componentForm').prepend(container);
		}
		
		$j('#componentForm_button_saveComponent').bind('click', function(){
			var checkStr = '', dateStr = '';
			$j('#criteria_fields input').each(function(idx, el){
				var ipt = $j(this);
				if ($j(el).attr('type') == 'checkbox') {
					if (checkStr.length == 0) {
						checkStr = 'List:';
						checkStr += ipt.siblings('legend').text() + ':';
					}
					var rpt = ipt.siblings('[for="'+this.id+'"]').text();
					rpt = rpt.substring(0,rpt.length - 2);
					checkStr += rpt;
					var checked = $j('#'+ this.id+':checked');
					if (checked.length == 0) {
						checkStr += '=N^';
					} else {
						checkStr += '=Y^';
					}
				}
				else {
					dateStr += 'Date:';
					dateStr += ipt.siblings('[for="'+this.id+'"]').text().trim();
					dateStr += ipt.attr('value') + ';';
				}
			});
			
			var criteria = '';
			if (dateStr.length > 0)
				criteria += dateStr;
			if (checkStr.length > 0) {
				checkStr = checkStr.substring(0, checkStr.length - 1);
				criteria += checkStr;
			}
			else {
				criteria = criteria.substring(0, criteria.length-1);
			}
			
			$j('#componentForm').append('<input type="hidden" value='+criteria+'" name="component.criteria" />')
			
			return true;
		});
		
		$j('#componentForm_component_template').bind('keydown', function(){
			if(this.value.indexOf('#end') > -1)
				return false;
		});
	}
};
