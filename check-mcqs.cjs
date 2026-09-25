const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

let errorFound = false;

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to find mcqs: [ ... ] blocks
    // This is hard to parse accurately with regex alone, so let's look for "correctAnswer" or missing "correctIndex"
    
    if (content.includes('correctAnswer:')) {
        console.log(`ERROR: Found correctAnswer in ${file}`);
        errorFound = true;
    }
    
    if (content.includes('correct_index:')) {
        console.log(`ERROR: Found correct_index in ${file}`);
        errorFound = true;
    }
    
    // Let's count "question:" and "correctIndex:"
    const qCount = (content.match(/question:/g) || []).length;
    const cCount = (content.match(/correctIndex:/g) || []).length;
    
    if (qCount !== cCount) {
        console.log(`ERROR: Mismatch in ${file}: ${qCount} questions vs ${cCount} correctIndex`);
        errorFound = true;
    }
});

if (!errorFound) {
    console.log("No obvious MCQ errors found based on counts.");
}
