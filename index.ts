import { parseString } from '@fast-csv/parse';
import { execFileSync } from "child_process";
const iconv = require("iconv-lite");
export default function getWindowsSystemInfo(encoding = 'cp936') {
    function exec(command: string) {
        function iconvDecode(buffer: Buffer) {
            return iconv.decode(buffer, encoding);
        }
        const result = execFileSync('cmd', [`/C ${command}`], {
            windowsHide: true
        })
        return iconvDecode(result)
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
            reject(error)
        }

    })
}

