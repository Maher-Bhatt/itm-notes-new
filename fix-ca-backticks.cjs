const fs = require('fs');
const file = 'src/data/computer-architecture.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace any triple backtick that is not preceded by a backslash
content = content.replace(/(?<!\\)```/g, '\\`\\`\\`');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed CA triple backticks');
