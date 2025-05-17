export function validateItemName(itemName) {
    // replace anything that is not an uppercase, lowercase or space with nothing
    let value = itemName.replace(/[^A-Za-z ]/g, '');
    // remove one or more white spaces with a single space
    value = value.replace(/\s+/g, ' ');

    if (value.startsWith(' ')) {
        value = value.substring(1);
    }

    return value;
}

export function validateItemPrice(itemPrice) {
    let value = Number(itemPrice);
    if (value < 0) {
        return 0;
    } else if (value > 50000) {
        return 50000;
    } else {
        return itemPrice;
    }
}