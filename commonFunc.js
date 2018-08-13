module.exports = global.is_empty = (_var) => {
    if ( _var == null ) {
        return true;
    }
    switch( typeof _var ) {
    case 'object':
        if ( Array.isArray( _var ) ) {
        // When object is array:
        return ( _var.length === 0 );
        } else {
        // When object is not array:
        if ( Object.keys( _var ).length > 0 || Object.getOwnPropertySymbols(_var).length > 0 ) {
            return false;
        } else
        if ( _var.valueOf().length !== undefined ) {
            return ( _var.valueOf().length === 0 );
        } else
        if ( typeof _var.valueOf() !== 'object' ) {
            return is_empty( _var.valueOf() );
        } else {
            return true;
        }
        }
        break;
    case 'string':
        return ( _var === '' );
        break;
    case 'number':
        return ( _var == 0 );
        break;
    case 'boolean':
        return ! _var;
        break;
    case 'undefined':
    case 'null':
        return true;
        break;
    case 'symbol':
        // Since ECMAScript6
    case 'function':
    default:
        return false;
        break;
    }
}

module.exports = global.var_dump = (_var) => {
    var util = require('util');
    return console.log(util.inspect(_var));
}

module.exports = global.in_array = (_var,_arr) => {
    return (_arr.includes(_var)) ? true : false;
}

module.exports = global.is_null = (_var) => {
    return _var == null ? true : false;
}