const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let newContent = content.replace(/(?<!\\)`([^`\n]+)(?<!\\)`/g, '\\`$1\\`');
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Fixed backticks in ' + file);
    }
});
