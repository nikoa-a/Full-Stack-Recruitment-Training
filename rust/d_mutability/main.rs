fn main() {
  let x = 5;
  println!("{}", x);
  // x = 6

  let mut x = 5;
  println!("{}", x);
  x = 6;
  println!("{}", x);

  // Shadowing a variable

  let z = 5;
  let z = z + 1;
  {
    let z = z + 2;
    println!("Variable z is {} in inner scope", z);
  }
  println!("Variable z is {} in outer scope", z);
}