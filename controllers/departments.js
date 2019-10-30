exports.install = () => {
    F.route('/api/v1/departments', index, ['*Department']);
    F.route('/api/v1/departments', store, ['post', 'put', '*Department']);
    F.route('/api/v1/departments/{dept_no}', show, ['*Department']);
    F.route('/api/v1/departments/{dept_no}', destroy, ['delete', '*Department']);
}

function index() {
    const { page, limit } = FUNCTION('getPaginater')(this.query);

    this.$query({ page, limit }, (error, response) => {
        if (error) this.throw500();

        const { count, items } = response;
        const pagination = new Pagination(count, page, limit);

        if (pagination.page > pagination.count) {
            this.res.send(400, { message: 'Bad Request!' });
        }

        this.json({
            pagination,
            departments: items
        });
    });
}

function store() {
    this.$save((err, response) => {
        // if (err) {
        //     const errName = err.items.name;
        //     const errMessage = err.items.error;
        //     this.json(SUCCESS(false, {
        //         error: errName,
        //         message: errMessage
        //     }));
        // }
        if(err) {
            console.log(err);
        }
        
        const { success, error, value } = response;

        if (!success) {
            this.json(SUCCESS(false, { message: error.name }));
        }
        this.json(SUCCESS());
    });
}

function show(dept_no) {
    this.$get({ dept_no }, (error, response) => {
        if (error) this.throw404();

        const { department } = response;
        const pagination = new Pagination(1, 1, 1);

        this.json({ pagination, department });
    });
}

function destroy(dept_no) {
    this.$remove({ dept_no }, (err, response) => {
        if (err) this.throw500();

        const { success, value, error } = response;

        if (!success) {
            this.json(SUCCESS(false, { message: error.name }));
        }
        this.json(SUCCESS());
    });
}