"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("@fast-csv/parse");
const child_process_1 = require("child_process");
function getWindowsSystemInfo() {
    function exec(command) {
        const result = (0, child_process_1.execFileSync)('cmd', [`/C chcp 65001>nul && ${command}`], {
            windowsHide: true
        });
        return result.toString();
    }
    return new Promise((resolve, reject) => {
        try {
            const CSV_STRING = exec(`systemInfo /fo csv`);
            (0, parse_1.parseString)(CSV_STRING, { headers: true })
                .on('error', error => reject(error))
                .on('data', data => {
                resolve(data);
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = getWindowsSystemInfo;
