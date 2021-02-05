module.exports = {
    // 解析路径, path.resolve
    resolve (...filePath) {
        const path = require('path');;
        return path.resolve(__dirname, ...filePath);
    }
}