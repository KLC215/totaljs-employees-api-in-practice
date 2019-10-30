const _string = require('lodash/string');

F.functions.generateLettersNumbersIdInString = (prefix, dataLength, id) => {
    id += 1;

    let idLength = id.toString().length;
    
    return _string.padEnd(prefix, dataLength - idLength, "0") + id;
}