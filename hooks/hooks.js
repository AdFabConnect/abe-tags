'use strict';

var hooks = {
  beforeSave: function beforeSave(obj, abe) {
    if(typeof obj.json.content.abe_tags === 'undefined' || obj.json.content.abe_tags === null) {
    	obj.json.content.abe_tags = []
    }

    return obj;
  },
  afterEditorFormBlocks: function afterEditorFormBlocks(blocks, json, text, abe) {
    blocks['Tags'] = {
    	input_tags:[
				{
					type: 'text',
					key: 'abe_tags',
					desc: 'Search tags',
					maxLength: '',
					tab: 'Tags',
					placeholder: '',
					value: json.abe_tags,
					source: null,
					display: '',
					reload: false,
					order: '99999',
					required: '',
					editable: false,
					visible: '',
					block: '',
					autocomplete: ''
				}
			]
    }

    return blocks;
  },
  afterEditorInput: function afterEditorInput(htmlString, params, abe) {
		if(typeof params.value !== 'undefined' && params.value !== null && params.value !== '' && params.key === 'abe_tags') {
			htmlString =  '<div class="form-group">'
      htmlString += '  <label for="abe_tags">'
      htmlString += '    Search tags'
      htmlString += '  </label>'
			htmlString += '  <div class="input-group">';
			htmlString += '    <div class="input-group-addon tags">';
			htmlString += '        <span class="glyphicon glyphicon-tags" aria-hidden="true"></span>';
			htmlString += '    </div>';
			htmlString += '    <input type="text" value="" class="abe_tags_fake form-control" id="abe_tags_fake" />';
			htmlString += '    <span class="input-group-btn">';
      htmlString += '      <button class="btn btn-primary" id="add_abe_tags" type="button">Add</button>';
      htmlString += '    </span>';
			htmlString += '  </div>';
			htmlString += '  <div class="tags-wrapper">';
			Array.prototype.forEach.call(params.value, (val) => {
				htmlString += '  <div class="abe_tags_fake_item">' + val + '<span class="glyphicon glyphicon-remove" data-tags-remove="true"></span></div>';
			})
			htmlString += '  </div>';
      htmlString += '</div>'
		}

		return htmlString;
	}
};

exports.default = hooks;
