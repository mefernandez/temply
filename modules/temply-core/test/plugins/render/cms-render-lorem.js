module.exports = function(data, $element, callback) {
	$element.text(data[0]);
	callback();
}