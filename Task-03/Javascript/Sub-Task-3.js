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
    console.log(diamond);
}

const rows = parseInt(prompt('Enter the number of rows:'));
printDiamond(rows);
