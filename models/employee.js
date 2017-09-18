NEWSCHEMA('Employee').make(schema => {

    schema.define('emp_no', 'Number(11)');
    schema.define('birth_date', 'Date', true);
    schema.define('first_name', 'String(14)', true);
    schema.define('last_name', 'String(14)', true);
    schema.define('gender', ['M', 'F'], true);
    schema.define('hire_date', 'Date', true);

    schema.setPrefix('emp-error');
    //         // schema.setValidate(function(name, value) {
    //         //     switch (name) {
    //         //         case 'birth_date':
    //         //             return !value.isEmpty();
    //         //         case 'first_name':
    //         //             return !value.isEmpty();
    //         //         case 'gender':
    //         //             return ['M', 'F'];
    //         //     }
    //         // });

    schema.setQuery((error, options, callback) => {
        const sql = DB();
        const { page, limit } = options;

        sql.debug = true;

        sql.listing('employees', 'employees')
            .make(builder => {
                builder.page(page, limit);
            });

        sql.exec(callback, 'employees');
    });

    schema.setGet((error, model, options, callback) => {
        const sql = DB();
        const { emp_no } = options;

        sql.debug = true;
            
        sql.select('employee', 'employees')
            .make(builder => {
                builder.where('emp_no', emp_no);
                builder.first();
            });
        sql.validate('employee', 'notfound');
        sql.exec(callback);
    });

    schema.setSave((error, model, options, callback) => {
        const sql = DB();

        sql.debug = true;

        if (!model.emp_no) {
            // First, get max number of emp_no
            sql.max('max_employee', 'employees', 'emp_no');
            sql.exec((error, response) => {
                const { max_employee } = response;

                // Then, insert a record
                sql.insert('employee', 'employees')
                    .make(builder => {
                        const { birth_date, first_name, last_name, gender, hire_date } = model;
                        builder.set({
                            emp_no: max_employee + 1,
                            birth_date,
                            first_name,
                            last_name,
                            gender,
                            hire_date
                        });
                    });
            });
        } else {
            sql.update('employee', 'employees')
                .make(builder => {
                    const { emp_no, birth_date, first_name, last_name, gender, hire_date } = model;
                    builder.set({ birth_date, first_name, last_name, gender, hire_date });
                    builder.where('emp_no', emp_no);
                });
        }

        sql.exec(SUCCESS(callback));
    });

    schema.setRemove((error, options, callback) => {
        const sql = DB();
        const { emp_no } = options;

        sql.debug = true;

        sql.remove('employee', 'employees').make(builder => {
            builder.where('emp_no', emp_no);
        });

        sql.validate('employee', 'notfound');
        sql.exec(SUCCESS(callback));
    });
    
});