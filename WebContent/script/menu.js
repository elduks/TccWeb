$(function(){
	$('ul.jd_menu').jdMenu({	onShow: loadMenu,
								//onHideCheck: onHideCheckMenu,
								//onHide: onHideMenu, 
								onClick: onClickMenu 
								//onAnimate: onAnimate
								});
	$('ul.jd_menu_vertical').jdMenu({onShow: loadMenu, onHide: unloadMenu, offset: 1, onAnimate: onAnimate});
});

function onAnimate(show) {
	//$(this).fadeIn('slow').show();
	if (show) {
		$(this)
			.css('visibility', 'hidden').show()
				.css('width', $(this).innerWidth())
			.hide().css('visibility', 'visible')
		.fadeIn('fast');
	} else {
		$(this).fadeOut('fast');
	}
}

var MENU_COUNTER = 1;
function loadMenu() {
	if (this.id == 'dynamicMenu') {
		$('> ul > li', this).remove();

		var ul = $('<ul></ul>');
		var t = MENU_COUNTER + 10;
		for (; MENU_COUNTER < t; MENU_COUNTER++) {
			$('> ul', this).append('<li>Item ' + MENU_COUNTER + '</li>');
		}
	}
}

function unloadMenu() {
	if (MENU_COUNTER >= 30) {
		MENU_COUNTER = 1;
	}
}

// We're passed a UL
function onHideCheckMenu() {
	return !$(this).parent().is('.LOCKED');
}

// We're passed a LI
function onClickMenu() {
    if (this.id == 'cadastro')
    {
		$.ajax({
		   url: 'cadastro.jsp',
		   success: function(data){
			$('#areaAjax').html(data)
			.hide()
			.fadeIn(500);
		   }
		});
    }
    
    if (this.id == 'autenticar')
    {
		$.ajax({
		   url: 'autenticar.jsp',
		   success: function(data){
			$('#areaAjax').html(data)
			.hide()
			.fadeIn(500);
		   }
		});
    }
}