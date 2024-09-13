def pyramid(rows):
    result = ""
    for i in range(0, rows, 2):
        result += " " * (rows - i - 1) + "* " * (i + 1) + "\n"
    for j in range(rows - 2, 0, -2):
        result += " " * (rows - j) + "* " * j + "\n"
    return result

with open("input.txt", 'r') as file:
    rows = int(file.read().strip()) 
with open("output.txt", 'w') as file2:
    file2.write(pyramid(rows))
