export function isNullOrEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}