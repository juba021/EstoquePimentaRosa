function snackbar (message, time) {
	var notification = document.querySelector('.mdl-js-snackbar');
	var data = {
		message: message,
		timeout: time * 1000
	};
	notification.MaterialSnackbar.showSnackbar(data);
}
