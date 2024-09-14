use std::io;
fn main() {
    let mut input = String::new();
    println!("Enter the number of rows: ");
    io::stdin().read_line(&mut input).expect("Failed to read line");

    let rows: usize = match input.trim().parse() {
        Ok(num) => num,
        Err(_) => {
            eprintln!("Please enter a valid number");
            return;
        }
    };
    for i in (0..rows).step_by(2) {
        for _j in 0..(rows - i - 1) {
            print!(" ");
        }
        for _j in 0..(i + 1) {
            print!("* ");
        }
        println!();
    }
    for i in (0..(rows - 1)).step_by(2) {
        for _j in 0..(i + 2 ) {
            print!(" ");
        }
        for _j in 0..(rows - i - 2) {
            print!("* ");
        }
        println!();
    }
}
