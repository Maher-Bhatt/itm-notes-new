const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // First, fix the easy ones: correctAnswer: 1 -> correctIndex: 1
    content = content.replace(/correctAnswer:\s*(\d+)/g, 'correctIndex: $1');
    
    // Now fix the string ones: correctAnswer: '...'
    const mcqRegex = /options:\s*\[([\s\S]*?)\],\s*correctAnswer:\s*(['"])(.*?)\2/g;
    content = content.replace(mcqRegex, (match, optionsStr, quote, answerStr) => {
        const opts = optionsStr.split(',').map(s => {
            let t = s.trim();
            if (t.startsWith("'") && t.endsWith("'")) return t.slice(1, -1);
            if (t.startsWith('"') && t.endsWith('"')) return t.slice(1, -1);
            return t;
        });
        const idx = opts.findIndex(o => o === answerStr);
        if (idx !== -1) {
            return `options: [${optionsStr}],\n              correctIndex: ${idx}`;
        }
        return match; 
    });

    // Also replace correct_index if any
    content = content.replace(/correct_index:/g, 'correctIndex:');
    
    fs.writeFileSync(filePath, content);
    console.log('Processed ' + file);
});
