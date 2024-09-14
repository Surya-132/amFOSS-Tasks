input_file = 'input.txt'
output_file = 'output.txt'

begin
  content = File.read(input_file)

  File.open(output_file, 'w') do |file|
    file.write(content)
  end
end
