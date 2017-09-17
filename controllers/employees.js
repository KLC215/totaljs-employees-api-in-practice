exports.install = function () {
    F.route('/api/v1/employees', index, ['*Employee']);
    F.route('/api/v1/employees', store, ['post', 'put', '*Employee']);
    F.route('/api/v1/employees/{id}', show, ['*Employee']);
    F.route('/api/v1/employees/{id}', destroy, ['delete', '*Employee']);
}

function index() {
    // Get page & limit parameters for url
    let { page, limit } = this.query;
    // Set default page
    page = U.parseInt(page || 1);
    // Set items per page
    limit = U.parseInt(limit || 25);

    this.$query({ page, limit }, (error, response) => {
        if (error) this.throw500("Oops! Internal Error :\(");

        const { count, items } = response;
        const pagination = new Pagination(count, page, limit);

        if (pagination.page > pagination.count) {
            this.res.send(400, { message: 'Bad Request!' });
            //return;
        }

        this.json({
            pagination,
            employees: items
        });
    });
}
function store() {
    this.$save((err, response) => {
        if (err) this.throw500();

        const { success, error, value } = response;

        if (!success) {
            this.json(SUCCESS(false, { message: error.name }));
        }
        this.json(SUCCESS());

    });
}
function show(id) {
    const emp_no = U.parseInt(id);

    this.$get({ emp_no }, (error, response) => {
        if (error) this.throw404();

        const { employee } = response;
        const pagination = new Pagination(1, 1, 1);

        this.json({ pagination, employee });
    });
}
// function update() {

// }
function destroy(id) {
    const emp_no = U.parseInt(id);

    this.$remove({ emp_no }, (err, response) => {
        if (err) this.throw500();

        const { success, value, error } = response;

        if (!success) {
            this.json(SUCCESS(false, { message: error.name }));
        }
        this.json(SUCCESS());
    });
}
