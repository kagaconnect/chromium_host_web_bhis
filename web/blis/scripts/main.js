const doc = document;
const rootEl = doc.documentElement;
const body = doc.body;

var backNavigation = "landing.htm";

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
	return System.IO.Path.Combine(System.Environment.get_CurrentDirectory(),"web","blis");
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
		var page = System.IO.Path.Combine("web","blis","views",backNavigation);
		loadSubPage(System.IO.Path.Combine(System.Environment.get_CurrentDirectory(),page), false);
	},1000);
}

function closeLoadingPage(){
	$.fn.pagepiling.moveTo('mainPage');	
}

function getVersion(){
	return 3.6;
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
				
				$(".BLIS-Title").html("Basic Laboratory Information System v"+getVersion());
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

init();
