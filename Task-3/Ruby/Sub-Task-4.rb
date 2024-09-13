def generator(n)
  a = ""

  (1..n).each do |i|
    a += " " * (n - i) + "*" * (2 * i - 1) + "\n"
  end

  a += "*" * (2 * n - 1) + "\n" if n.odd?

  (n - 1).downto(1) do |i|
    a += " " * (n - i) + "*" * (2 * i - 1) + "\n"
  end

  a
end

input_file = 'input.txt'
output_file = 'output.txt'

n = File.read(input_file).to_i

if n > 0
  result = generator(n)

  File.open(output_file, 'w') do |file|
    file.write(result)
  end
end

