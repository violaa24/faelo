const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const requiredFiles = [
    'public/index.html',
    'public/css/style.css',
    'public/js/script.js',
    'src/server.js',
    'src/app.js',
    'database/schema.sql',
    '.env.example'
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(projectRoot, file)));

if (missingFiles.length > 0) {
    console.error(`Missing required files: ${missingFiles.join(', ')}`);
    process.exitCode = 1;
} else {
    console.log('Project structure check passed.');
}
