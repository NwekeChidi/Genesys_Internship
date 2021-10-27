const helper = {};

helper.generateRandomString = (stringLength) => {
    stringLength = typeof(stringLength) === 'number' ? stringLength : 20;
    let str = "";
    let validChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (i=0; i<stringLength; i++){
        let randomChar = validChars.charAt(Math.floor(Math.random()*validChars.length));
        str+=randomChar;
    }
    return str;
}

module.exports = helper;