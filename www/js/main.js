function update_position($image, $overlay) {
    var offset = $image.offset();
    var x = offset.left + ($image.width() - $overlay.width()) / 2;
    var y = offset.top + ($image.height() - $overlay.height()) / 2;
    $overlay.css("left", x).css("top", y);
};

$(function() {
    var $overlay = $("#supernova");
    $("a > img").mouseenter(function(e) {
	var $image = $(this);
	
	var clearQueue = true;
	var jumpToEnd = true;
	$overlay.stop(clearQueue, jumpToEnd);

	update_position($image, $overlay);
	$overlay.fadeIn("fast");

	// reset click-through
	$overlay.off('click');
	$overlay.click(function(e) {
	    $a = $image.parent();
	    window.location.href = $a.attr('href');
	});
    });
    $overlay.mouseout(function(e) {
	$overlay.fadeOut("fast");
    });
});