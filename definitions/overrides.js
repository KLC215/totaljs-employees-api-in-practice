global.SUCCESS = (success, data, status = 200) => {

    if(typeof(success) === 'function') {
        return (err, value) => {
            success(err, SUCCESS(err, value));
        }
    }

    let error;

    if(success instanceof Error) {
        error = success.toString();
        success = false;
    } else if(success instanceof ErrorBuilder) {
        if(success.hasErrors()) {
            error = success.output();
            success = false;
        } else {
            success = true;
        }
    } else if(success == null) {
        success = true;
    }

    if(error) {
        return { status, message: error }
    }
    if(success) {
        return { status, data };
    }

    return { status, message: '' };


}