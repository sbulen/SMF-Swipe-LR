// This code adds swipe left/right functionality to SMF,
// specifically, to trigger next/previous topic navigation.
// Helpful when browsing a board on a smartphone.

document.addEventListener('touchstart', swipelr_touch_start, false);
document.addEventListener('touchmove', swipelr_touch_move, false);

var swipelr_x_pos = null;

function get_touches(e)
{
	// Handle both browser api & jquery
	return e.touches || e.originalEvent.touches;
}

function swipelr_touch_start(e)
{
	const swipelr_start = get_touches(e)[0];
	swipelr_x_pos = swipelr_start.clientX;
};

function swipelr_touch_move(e)
{
	// Bail if not set yet somehow...
	if (!swipelr_x_pos)
		return;

	// Bail if next/prev links aren't available...
	var swipelr_np_links = document.getElementsByClassName('nextlinks');
	if (swipelr_np_links.length == 0)
		return;

	// New finger location...
	var swipelr_x_new = e.touches[0].clientX;

	// It can't be too sensitive...  Make sure they really mean it...
	if (Math.abs(swipelr_x_new - swipelr_x_pos) < 50)
		return;

	// Get the two prev/next links...
	var swipelr_eles = swipelr_np_links[0].getElementsByTagName('a');

	// right = previous; left = next
	if (swipelr_x_new > swipelr_x_pos)
		swipelr_eles[0].click();
	else
		swipelr_eles[1].click();

	// reset for next one
	swipelr_x_pos = null;
};
