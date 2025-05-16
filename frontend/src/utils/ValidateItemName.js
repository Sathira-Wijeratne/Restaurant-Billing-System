export function validateItemName(itemName){
    // replace anything that is not an uppercase, lowercase or space with nothing
    let value = itemName.replace(/[^A-Za-z ]/g, '');
    // remove one or more white spaces with a single space
    value = value.replace(/\s+/g, ' ');

    return value;
}