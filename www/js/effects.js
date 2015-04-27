// http://stackoverflow.com/a/21712356/625688
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
	// IE 10 or older => return version number
	return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
	// IE 11 => return version number
	var rv = ua.indexOf('rv:');
	return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
	// IE 12 => return version number
	return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function update_position($image, $overlay) {
    var offset = $image.offset();
    var x = offset.left + ($image.width() - $overlay.width()) / 2;
    var y = offset.top + ($image.height() - $overlay.height()) / 2;
    $overlay.css("left", x).css("top", y);
};

$(function() {
    var ie = detectIE();
    if (ie != false && ie < 11) {
	return;
    }

    var $overlay = $("#supernova");
    $("a > img").mouseenter(function(e) {
	var clearQueue = true;
	var jumpToEnd = true;
	$overlay.stop(clearQueue, jumpToEnd);

	var $image = $(this);
	update_position($image, $overlay);
	$overlay.fadeIn("fast");
    }).mousedown(function(e) {
	$overlay.hide();
    }).mouseup(function(e) {
	$overlay.show();
    }).mouseout(function(e) {
	$overlay.fadeOut("fast");
    });
});