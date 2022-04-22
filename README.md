# windows-systeminfo
A nodejs wrapper for native windows systemInfo command.

```javascript
const test = require('@lxfater/windows-systeminfo')
// Put your system (like cp936) cmd PageCode to get the correct information
// Using chcp command  to get your current PageCode
test('cp936').then((x) => {
    console.log(x)
})
```
