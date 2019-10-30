NEWSCHEMA('Department').make(schema => {

    schema.define('dept_no', 'String(4)');
    schema.define('dept_name', 'String(40)', true);

    schema.setPrefix('dept-error');

    schema.setQuery((error, options, callback) => {
        const sql = DB();
        const { page, limit } = options;

        sql.debug = true;

        sql.listing('departments', 'departments')
            .make(builder => {
                builder.page(page, limit);
            });

        sql.exec(callback, 'departments');
    });

    schema.setGet((error, model, options, callback) => {
        const sql = DB();
        const { dept_no } = options;

        sql.debug = true;

        sql.select('department', 'departments')
            .make(builder => {
                builder.where('dept_no', dept_no);
                builder.first();
            });
        sql.validate('department', 'notfound');
        sql.exec(callback);
    });

    schema.setSave((error, model, options, callback) => {
        const sql = DB();

        sql.debug = true;
        console.log(!model.dept_no);
        if (!model.dept_no) {
            // First, get max number of emp_no
            sql.count('count', 'departments');
            sql.exec((error, response) => {
                const { count } = response;
                const dept_no = FUNCTION('generateLettersNumbersIdInString')('d', 4, count);
                // Then, insert a record
                sql.insert('department', 'departments')
                    .make(builder => {
                        const { dept_name } = model;
                        builder.set({
                            dept_no,
                            dept_name
                        });
                    });
            });
        } else {
            sql.update('department', 'departments')
                .make(builder => {
                    const { dept_name } = model;
                    builder.set({ dept_name });
                    builder.where('dept_no', dept_no);
                });
        }

        sql.exec(SUCCESS(callback));
    });

    schema.setRemove((error, options, callback) => {
        const sql = DB();
        const { dept_no } = options;

        sql.debug = true;

        sql.remove('department', 'departments').make(builder => {
            builder.where('dept_no', dept_no);
        });

        sql.validate('department', 'notfound');
        sql.exec(SUCCESS(callback));
    });

});