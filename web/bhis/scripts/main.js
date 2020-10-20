const doc = document;
const rootEl = doc.documentElement;
const body = doc.body;

var backNavigation = "landing.htm";
var activeSection = "section-0";

rootEl.classList.remove('no-js');
rootEl.classList.add('js');

/*async function fetchImage(url, callback, headers, abort) {
	let _headers = headers;
  const f = await fetch(url, {
    method: "GET",
    headers: _headers,
    mode: "cors"
    //signal: signal
  });
  const blob = await f.blob();
  callback(blob);
}

L.TileLayerWithHeaders = L.TileLayer.extend({
  initialize: function (url, options, headers, abort) {
    L.TileLayer.prototype.initialize.call(this, url, options);
    this.headers = headers;
    this.abort = abort;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");
    img.setAttribute("role", "presentation");

    fetchImage(
      url,
      resp => {
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
        };
        reader.readAsDataURL(resp);
        done(null, img);
      },
      this.headers,
      this.abort
    );
    return img;
  }
});

L.tileLayer = function (url, options, headers, abort) {
  return new L.TileLayerWithHeaders(url, options, headers, abort);
};*/
		
$('#pagepiling').pagepiling({
	anchors: ['mainPage', 'loadingPage'],
	afterRender: function(){
		
	},
	afterLoad: function(anchorLink, index){
		
	}
});

//https://github.com/alvarotrigo/pagePiling.js/
$.fn.pagepiling.setAllowScrolling(false);
$.fn.pagepiling.setKeyboardScrolling(false);

// Open/close
$(document).on('click', '.select-dropdown', function(event) {
	var options = $(this).find('.option');
	if(options.length > 1){
	
		$('.select-dropdown').not($(this)).removeClass('open');
		$(this).toggleClass('open');
		if ($(this).hasClass('open')) {
			$(this).find('.option').attr('tabindex', 0);
			$(this).find('.selected').focus();
		} else {
			$(this).find('.option').removeAttr('tabindex');
			$(this).focus();
		}
	}
});
// Close when clicking outside
$(document).on('click', function(event) {
	if ($(event.target).closest('.select-dropdown').length === 0) {
		$('.select-dropdown').removeClass('open');
		$('.select-dropdown .option').removeAttr('tabindex');
	}
	event.stopPropagation();
});
// Option click
$(document).on('click', '.select-dropdown .option', function(event) {
  $(this).closest('.list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  $(this).closest('.select-dropdown').find('.current').text(text);
  $(this).closest('.select-dropdown').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.select-dropdown', function(event) {
  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
  // Space or Enter
  if (event.keyCode == 32 || event.keyCode == 13) {
	if ($(this).hasClass('open')) {
	  focused_option.trigger('click');
	} else {
	  $(this).trigger('click');
	}
	return false;
	// Down
  } else if (event.keyCode == 40) {
	if (!$(this).hasClass('open')) {
	  $(this).trigger('click');
	} else {
	  focused_option.next().focus();
	}
	return false;
	// Up
  } else if (event.keyCode == 38) {
	if (!$(this).hasClass('open')) {
	  $(this).trigger('click');
	} else {
	  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
	  focused_option.prev().focus();
	}
	return false;
  // Esc
  } else if (event.keyCode == 27) {
	if ($(this).hasClass('open')) {
	  $(this).trigger('click');
	}
	return false;
  }
});

function getRootPath(){
	return System.IO.Path.Combine(System.Environment.get_CurrentDirectory(),"web","bhis");
}

function isObjectSet(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function createPagerClickEvent(id, host, callback, prefix){
	$('#'+(!isEmpty(prefix) ? prefix : '')+'Page_'+id).removeClass('Disabled');						
	$('#'+(!isEmpty(prefix) ? prefix : '')+'Page_'+id).off("click");
	$('#'+(!isEmpty(prefix) ? prefix : '')+'Page_'+id).click(function(){
		if(!$(this).hasClass('Disabled')){
			$(host).find('.Pager').each(function(){
				$(this).removeClass('Selected');
			});
			$(this).addClass('Selected');
			
			var _id = $(this).attr('id').replace((!isEmpty(prefix) ? prefix : '')+'Page_','');	
			if(callback != undefined && callback != null)callback(_id);
		}
	});
}


function preparePager(id, column, table, callback, prefix){
	$(id).html('');
	
	var pagerList = [];
	var con = new SqlLiteConnection(System.IO.Path.Combine(getRootPath(),"databases","bhis_dict.db"),"","");
	if(con != null){
		con.open();

		var query  = "SELECT distinct ";
		query += "(case when (substr(`"+column+"` ,1,1) GLOB '*[^0-9]*') = 0 then '0_9' ";
		query += "	  else upper(substr(`"+column+"` ,1,1)) ";
		query += "end) as `Tag`  ";
		query += "FROM `"+table+"`  ";
		query += "ORDER BY `"+column+"` ";
		
		var comm = con.createCommand(query);
		if(comm != null){
			var reader = comm.executeReader();
			if(reader != null){
				while(reader.read()){
					var row = JSON.parse(reader.getValues());	
					if(row != undefined && row != null)pagerList.push(row.Tag);
				}
				reader.close();
				con.close();				
			}
			else con.close();
		}
		else con.close();
	}

	var pages  = '<div id="Page_0_9" class="Animation-3ms FlexDisplay Flex FlexGrow FlexRow Button NonStandard Pager '+(pagerList.includes('0_9') ? '' : 'Disabled')+'" style="height:32px;">';
		pages += '	<span class="text" style="text-align:center; display:inline-block; width:100%; font-size:11px; margin:2px 0px 0px 0px;">0-9</span>';
		pages += '</div>';
	$(id).html(pages);
	
	if(pagerList.includes('0_9')){
		createPagerClickEvent('0_9', id, callback, prefix);
	}

	for(x=65;x<65+26;x++){
		var c = String.fromCharCode(x);
		var pages = '<div id="Page_'+c+'" class="Animation-3ms FlexDisplay Flex FlexGrow FlexRow Button NonStandard Pager Divider-Left '+(pagerList.includes(c) ? '' : 'Disabled')+'" style="height:32px;">';
			pages += '	<span class="text" style="text-align:center; display:inline-block; width:100%; font-size:11px; margin:2px 0px 0px 0px;">'+c+'</span>';
			pages += '</div>';
		$(id).append(pages);
		
		if(pagerList.includes(c)){
			createPagerClickEvent(c, id, callback, prefix);
		}
	}
		
	return pagerList;
}

function reset_custom_dropdown(id,value) {
	var select = $(id);
	
    $(".select-dropdown"+id).remove();
	select.val(value).trigger("change");
	
	
	
	select.after('<div class="select-dropdown ' + (select.attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
	var dropdown = select.next();
	var options = select.find('option');
	var selected = select.find('option:selected');
	dropdown.find('.current').html(selected.data('display-text') || selected.text());
	options.each(function(j, o) {
		var display = $(o).data('display-text') || '';
		dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
	});
  
}

function groupBy(array, key){
  // Return the end result
  return array.reduce((result, currentValue) => {
	// If an array already present for key, push it to the array. Else create an array and push the object
	(result[currentValue[key]] = result[currentValue[key]] || []).push(
	  currentValue
	);
	// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
	return result;
  }, []).filter(function(m){ return m.length>0;}); // empty object is the initial value for result object
}

function create_custom_dropdowns() {
  $('select').each(function(i, select) {
	if (!$(this).next().hasClass('select-dropdown')) {
	  $(this).after('<div class="select-dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
	  var dropdown = $(this).next();
	  var options = $(select).find('option');
	  var selected = $(this).find('option:selected');
	  dropdown.find('.current').html(selected.data('display-text') || selected.text());
	  options.each(function(j, o) {
		var display = $(o).data('display-text') || '';
		dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
	  });
	}
  });
}

function init(){
	$.fn.pagepiling.moveTo('loadingPage');
	
	setTimeout(function(){ 
		var page = System.IO.Path.Combine("web","bhis","views",backNavigation);
		loadSubPage(System.IO.Path.Combine(System.Environment.get_CurrentDirectory(),page), false);
	},1000);
}

function closeLoadingPage(){
	$.fn.pagepiling.moveTo('mainPage');	
}

function getVersion(){
	return 3.6;
}

function pad2(n) { 
	return n < 10 ? '0' + n : n 
}

function loadSubPage(sub_file,canNavigate){
	if(System.IO.File.Exists(sub_file)){
		if(canNavigate){
			$.fn.pagepiling.moveTo('loadingPage');
		}
		System.IO.File.ReadAllText(sub_file, function(content){
			setTimeout(function(){ 
				$('#mainPage').html(content);
				create_custom_dropdowns();
				
				$(".BHIS-Title").html("Basic Health Information System v"+getVersion());
				//closeLoadingPage();				
			},1000);
		});					
	}
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function SelectItemByValue(item,value){
	if(value != ""){
		item.find('.selected').removeClass('selected');
		item.find("li[data-value="+value+"]").addClass('selected');
		
		var selected = item.find('.selected');
		var text = selected.data('display-text') || selected.text();
		item.find('.current').text(text);
		item.prev('select').val(selected.data('value')).trigger('change');
	} 
}

function SelectItemByText(item,value){ 
	if(value != ""){
		item.find('.selected').removeClass('selected');
		item.find("li[data-display-text="+value+"]").addClass('selected');
		
		var selected = item.find('.selected');
		var text = selected.data('display-text') || selected.text();
		item.find('.current').text(text);
		item.prev('select').val(selected.data('value')).trigger('change');
	}
}

function isDecimalKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
        return false;
    return true;
}

function getDateTime(id){
	var str = $(id).val();
	if(str.trim().length > 0){

		try{
			var parts = str.split(" ");
			if(parts.length == 2){
				var _dt = parts[0];
				var _tm = parts[1];
				
				if(_dt != undefined && _dt != null && _tm != undefined && _tm != null){
					var _dt_parts = _dt.split("/");
					var _tm_parts = _tm.split(":");
					
					if(_dt_parts.length == 3 && _tm_parts.length > 1){
						return new Date(parseInt(_dt_parts[2], 10),
							  parseInt(_dt_parts[1], 10) - 1,
							  parseInt(_dt_parts[0], 10),
							  parseInt(_tm_parts[0], 10),
							  parseInt(_tm_parts[1], 10));
					}
				}				
			}
		}
		catch(e){}
	}
	return null;
}

function InitDatePicker(dt, options){
	if(dt.datepicker != null && typeof(dt.datepicker) === "function"){
		dt.datepicker(options);
		return dt.datepicker().data('datepicker');
	}
	return null;
}

function focusEvents(item,focusIn,focusOut){
	item.focus(focusIn);
	item.focusout(focusOut);
}

function isValidDate(dateStr) {
 
    
    var msg = "";
    // Checks for the following valid date formats:
    // MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY
    // Also separates date into month, day, and year variables
 
    // To require a 2 & 4 digit year entry, use this line instead:
    //var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;
    // To require a 4 digit year entry, use this line instead:
    var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;
 
    var matchArray = dateStr.match(datePat); // is the format ok?
    if (matchArray == null) {
        msg = "Date is not in a valid format.";
        return msg;
    }
 
    month = matchArray[1]; // parse date into variables
    day = matchArray[3];
    year = matchArray[4];
 
    
    if (month < 1 || month > 12) { // check month range
        msg = "Month must be between 1 and 12.";
        return msg;
    }
 
    if (day < 1 || day > 31) {
        msg = "Day must be between 1 and 31.";
        return msg;
    }
 
    if ((month==4 || month==6 || month==9 || month==11) && day==31) {
        msg = "Month "+month+" doesn't have 31 days!";
        return msg;
    }
 
    if (month == 2) { // check for february 29th
    var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    if (day>29 || (day==29 && !isleap)) {
        msg = "February " + year + " doesn't have " + day + " days!";
        return msg;
    }
    }
 
    if (day.charAt(0) == '0') day= day.charAt(1);
    
    //Incase you need the value in CCYYMMDD format in your server program
    //msg = (parseInt(year,10) * 10000) + (parseInt(month,10) * 100) + parseInt(day,10);
    
    return msg;  // date is valid
}

function ShowDialog(icon, title, content, options, width="50%", minWidth="290px", maxWidth="560px"){
	var dialogBox = document.createElement('div');
	dialogBox.className 	= "dialog";
	dialogBox.style.width 	= "100%";
	dialogBox.style.height 	= "100%";
	dialogBox.style.zIndex 	= 9414160;	
	
	var dialogOverlay = document.createElement('div');
		dialogOverlay.className			= "dialog__overlay";
		dialogOverlay.style.padding		= "0px";
	
	var dialogContent = document.createElement('div');
		dialogContent.className 		= "dialog__content Round Animation-3ms";
		dialogContent.style.width 		= width;
		dialogContent.style.minWidth	= minWidth;
		dialogContent.style.maxWidth	= maxWidth;
		dialogContent.style.padding		= "0px";
		
		var dialogContentBody = document.createElement('div');
			dialogContentBody.className	= "FlexDisplay FlexColumn Flex Animation-3ms";
			
			var dialogHeader = document.createElement('div');
				dialogHeader.className		= "FlexDisplay FlexRow Divider-Bottom";
				dialogHeader.style.width	= "100%";
				dialogHeader.style.height 	= "40px";
				
				var dialogIconHeader = document.createElement('div');
					dialogIconHeader.className		= "FlexDisplay FlexRow";
					dialogIconHeader.style.width	= "24px";
					dialogIconHeader.style.height 	= "100%";
					
					var dialogIcon = document.createElement('span');
						dialogIcon.className			= "dialog__icon";
						dialogIcon.style.whiteSpace		= "nowrap";
						dialogIcon.style.margin			= "6px 8px 8px 8px";
						dialogIcon.style.fontWeight		= "bolder";
						dialogIcon.style.color			= "gray";
						dialogIcon.style.pointerEvents	= "none";
						dialogIcon.innerHTML = icon;
				
				var dialogTitleHeader = document.createElement('div');
					dialogTitleHeader.className		= "FlexDisplay FlexRow Flex";
					dialogTitleHeader.style.width	= "100%";
					dialogTitleHeader.style.height 	= "100%";
					
					var dialogTitle = document.createElement('span');
						dialogTitle.className			= "dialog__title";
						dialogTitle.style.whiteSpace	= "nowrap";
						dialogTitle.style.margin		= "6px 8px 8px 8px";
						dialogTitle.style.fontWeight	= "bolder";
						dialogTitle.style.color			= "gray";
						dialogTitle.style.fontSize		= "14px";
						dialogTitle.style.pointerEvents	= "none";
						dialogTitle.innerHTML = title;
					
				var dialogButton = document.createElement('div');
					dialogButton.className		= "FlexDisplay btn-clear";
					dialogButton.style.fontSize	= "24px";
					dialogButton.style.minWidth	= "40px";
					dialogButton.style.maxWidth	= "40px";
					dialogButton.style.height 	= "100%";
					dialogButton.setAttribute("data-dialog-close", '');
					
					var mdiClose = document.createElement('span');
						mdiClose.className			= "mdi mdi-close";
						mdiClose.style.margin		= "6px 0px 0px 0px";
						mdiClose.style.cursor		= "pointer";
				
			var dialogBody = document.createElement('div');
				dialogBody.className	= "dialog__body Animation-3ms";
				dialogBody.style.width 	= "100%";
				dialogBody.style.height = "auto";
				dialogBody.innerHTML = content;
		
	dialogBox.appendChild(dialogOverlay);
	dialogBox.appendChild(dialogContent);
	dialogContent.appendChild(dialogContentBody);
	dialogContentBody.appendChild(dialogHeader);
	
	dialogHeader.appendChild(dialogIconHeader);
	dialogIconHeader.appendChild(dialogIcon);
	
	dialogHeader.appendChild(dialogTitleHeader);
	dialogTitleHeader.appendChild(dialogTitle);
	
	dialogHeader.appendChild(dialogButton);
	dialogButton.appendChild(mdiClose);
	
	dialogContentBody.appendChild(dialogBody);
	
	document.body.appendChild(dialogBox);
	
	var dlg = new DialogFx(dialogBox, options);
	dlg.toggle.bind(dlg);
	dlg.toggle();
	return dlg;
}

function SqlLiteConnection(host, user, pass){
	if(DB != undefined && DB != null){
		return DB.connection(host, user, pass, "sqlite");
	}
	return null;
}

function isEmpty(value){
	if(value == undefined || value == null) return true;
	
	return value != undefined && value != null && value.trim().length == 0;
}

function splitWords(words, sentence, sentences, len){
	var word = words.shift();
	if(word != undefined && word != null){
		if((sentence + word).length < len)sentence += word+' ';
		else {
			sentences.push(sentence);
			sentence = word+' ';
		}
		return splitWords(words, sentence, sentences, len);
	}
	
	sentence = sentence.trim();
	sentences.push(sentence);
	
	return sentences;
}

init();
