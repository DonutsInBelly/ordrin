$(document).ready(function() {
	loadFooter();
});

function loadFooter() {
	// load footer content
	$("#footer-stuff").load("/resources/footer.html");
};
