function snackbar (message, time, code) {

	if (code === 'success') {
		var notification = document.getElementById('success-snackbar');
	} else if (code === 'error') {
		var notification = document.getElementById('error-snackbar');
	}

	var data = {
		message: message,
		timeout: time * 1000,
	};
	notification.MaterialSnackbar.showSnackbar(data);
}
