exports.install = function () {
    F.route('/', index);
}

function index() {
    var self = this;
    var now = new Date();

    self.json({ success: true, message: 'Success!', time: now });
}