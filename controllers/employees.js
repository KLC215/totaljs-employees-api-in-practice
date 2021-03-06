exports.install = () => {
    F.route('/api/v1/employees', index, ['*Employee']);
    F.route('/api/v1/employees', store, ['post', 'put', '*Employee']);
    F.route('/api/v1/employees/{id}', show, ['*Employee']);
    F.route('/api/v1/employees/{id}', destroy, ['delete', '*Employee']);
}

function index() {
    const { page, limit } = FUNCTION('getPaginater')(this.query);
    
    this.$query({ page, limit }, (error, response) => {
        if (error) this.throw500("Oops! Internal Error :\(");

        const { count, items } = response;
        const pagination = new Pagination(count, page, limit);

        if (pagination.page > pagination.count) {
            this.res.send(400, { message: 'Bad Request!' });
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
