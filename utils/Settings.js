const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Settings {

    constructor(opts){
        const userPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userPath, opts.configName +'.json');
        this.data = parseDataFile(path,opts.defaults);
    }

    get(key){
        return this.data[key];
    }

    set(key, val){
        this.data[key] = val;
        fs.writeFileSync(this.path,JSON.stringify(this.data));
    }
    

}


function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        return defaults;
    }
}

module.exports = Settings;