const fs = require('fs');

function printDiamond(rows) {
    let diamond = '';
    for (let i = 1; i <= rows; i += 2) {
        let spaces = ' '.repeat((rows - i) / 2);
        let stars = '*'.repeat(i);
        diamond += spaces + stars + spaces + '\n';
    }
    for (let i = rows - 2; i > 0; i -= 2) {
        let spaces = ' '.repeat((rows - i) / 2);
        let stars = '*'.repeat(i);
        diamond += spaces + stars + spaces + '\n';
    }
    return diamond;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const rows = parseInt(data);
    const diamond = printDiamond(rows);
    fs.writeFile('output.txt', diamond, err => {
        if (err) throw err;
    });
});
