var responseArray = {};
var saved = {};
saved.code = 'saved';
saved.message = 'Saved!';
responseArray.saved = saved;
var forbidden = {};
forbidden.code = 'forbidden';
forbidden.message = 'Forbidden';
responseArray.forbidden = forbidden;
var error = {};
error.code = 'error';
error.message = 'Error';
responseArray.error = error;
var login = {};
login.code = 'loggedOut';
login.message = 'Logged out. You must login again.';
responseArray.login = login;
var alreadySubmitted = {};
alreadySubmitted.code = 'alreadySubmitted';
alreadySubmitted.message = 'Already submitted';
responseArray.alreadySubmitted = alreadySubmitted;

function redirect (req, res, ajax, reason, err) {
	console.log(ajax + reason + err + JSON.stringify(responseArray, null, 4));
	if (err) {
		console.log(err);
	}
	if (ajax) {
		return res.json(responseArray[reason]);
	} else {
		return res.redirect('/' + reason);
	}
}

var verifyUserAuth = function (req, res, ajax, callback) {
	if (req.isAuthenticated()) {
		User.findOne({ 'email': req.user.email }, function (err, user) {
			if (err) {
				redirect(req, res, ajax, 'error', err);
			}
			if (user.length === 0) {
				redirect(req, res, ajax, 'error', 'null');
			}
			callback(user);
		});
	} else {
		redirect(req, res, ajax, 'login', 'null');
	}
};

function isAdmin (user) {
	return user.admin;
}

module.exports = {
	verifyUserAuth: verifyUserAuth,
	isAdmin: isAdmin,
	redirect: redirect
};

