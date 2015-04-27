function update_position($image, $overlay) {
    var offset = $image.offset();
    var x = offset.left + ($image.width() - $overlay.width()) / 2;
    var y = offset.top + ($image.height() - $overlay.height()) / 2;
    $overlay.css("left", x).css("top", y);
};

function copy_attributes($image, $overlay) {
    var attributes = [ "alt", "title" ];
    $.each(attributes, function(index, attribute) {
	var value = $image.attr(attribute);
	$overlay.attr(attribute, value);
    });
}

function is_left_click(event) {
    return (event.which == 1);
}

$(function() {
    var time = $.now();
    var minimumElapsedTime = 100;
    
    var href = null;
    var $overlay = $("#supernova");
    var mouseup = function(e) {
	if (is_left_click(e)) {
	    $overlay.show();
	    window.location.href = href;
	}
    };
    $("a > img").mouseenter(function(e) {
	var now = $.now();
	if ((now - time) < minimumElapsedTime) {
	    // fix firefox bug where hiding the overlay triggers this event
	    return;
	}
	
	var $image = $(this);
	$a = $image.parent();
	href = $a.attr('href');

	var clearQueue = true;
	var jumpToEnd = true;
	$overlay.stop(clearQueue, jumpToEnd);

	copy_attributes($image, $overlay);
	update_position($image, $overlay);
	$overlay.fadeIn("fast");
    }).mouseup(mouseup);
    $overlay.mousedown(function(e) {
	if (is_left_click(e)) {
	    time = $.now();
	    $overlay.hide();
	}
    }).mouseup(/* fix ie bug */mouseup).mouseout(function(e) {
	$overlay.fadeOut("fast");
    });
});