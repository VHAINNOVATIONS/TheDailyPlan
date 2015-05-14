var $j = jQuery.noConflict();

var TemplateForm = {
	context: {},
	components: {},
	
	bindActions: function() {
		$j("#component_selector td select option").mouseup( function(){
			if ($j("table.pickList td select option:selected").length == 1) {
				$j("#templateForm_button_editComponent").show();
			}
			else {
				var selected = $j("table.pickList td select option:selected");
				var allEq = true;
				for (var i=0,j=selected.length; i < j; i++) {
					if (i == 0)
						continue;
					if (selected[i].value != selected[i - 1].value) {
						allEq = false;
						$j("#templateForm_button_editComponent").hide();
						break;
					}
				}
				if (allEq)
					$j("#templateForm_button_editComponent").show();
			}
		});
		
		$j("#templateForm_button_editComponent").bind("click", function(){
			var name = $j("table.pickList td select option:selected")[0].value;
			for (var i=0, j=TemplateForm.components.length; i < j; i++) {
				var component = TemplateForm.components[i];
				if (component.name == name) {
					$j("#templateForm_componentId").attr("value", component.id);
					break;
				}
			}
			return true;
		});
		
		// Clean up Selection list
		$j("#components option").each(function(){
			var name = this.value;
			$j("#availableComponents option[value='"+name+"']").remove();
		});
	}
};
