def pyramid(rows):
    for i in range(0,rows,2):
        print(" " * (rows - i - 1) + "* " * (i + 1))
    for j in range(rows - 2, 0, -2):
        print(" " * (rows - j) + "* " * j)
rows = int(input("Enter the number of rows: "))
pyramid(rows)
