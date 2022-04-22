const { parseString } = require('@fast-csv/parse');
const { execFileSync } = require("child_process");
module.exports = function getWindowsSystemInfo() {
    function exec(command: string) {
       const result = execFileSync('cmd', [`/C chcp 65001>nul && ${command}`], {
            windowsHide: true
        })
        return result.toString()
    }
    return new Promise((resolve, reject) => {
        try {
            const CSV_STRING = exec(`systemInfo /fo csv`)
            parseString(CSV_STRING, { headers: true })
                .on('error', error => reject(error))
                .on('data', data => {
                    resolve(data)
                })
        } catch (error) {
            console.error(error)
        }

    })
}


