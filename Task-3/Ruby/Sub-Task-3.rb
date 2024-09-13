
def print_pattern(n)
  (1..n).each do |i|
    puts " " * (n - i) + "*" * (2 * i - 1)
  end
  (n - 1).downto(1) do |i|
    puts " " * (n - i) + "*" * (2 * i - 1)
  end
end

print "Enter the value of n: "
n = gets.to_i
print_pattern(n)