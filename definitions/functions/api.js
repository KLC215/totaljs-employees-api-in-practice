function respond(status = 200, data) {
    Controller.res.status(status);
    Controller.json({ status, data });
}

function respondWithError(status, message) {
    //Controller.res.status(status);
    //Controller.json({ status , message });
    console.log(Controller.res);
    Controller.res.send(status, { status, message });
}

F.functions.respond = respond;

F.functions.respondCreated = (data = []) => {
    respond(201, data);
}

F.functions.respondBadRequest = (message = 'Bad Request!') => {
    respondWithError(400, message);
}

F.functions.respondNotFound = (message = 'Data not found!') => {
    respondWithError(404, message);
}

F.functions.respondConflict = (message = 'Data Conflict') => {
    respondWithError(409, message);
}

F.functions.respondServerError = (message = 'Internal Server Error!') => {
    respondWithError(500, message);
}