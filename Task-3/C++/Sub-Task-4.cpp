#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream inputFile("input.txt");
    std::ofstream outputFile("output.txt");

    int n;
    inputFile >> n;
    if (n % 2 == 0) {
        n++;
    }

    for (int i = 1; i <= n; i += 2) {
        outputFile << std::string((n - i) / 2, ' ') + std::string(i, '*') << std::endl;
    }

    for (int i = n - 2; i >= 1; i -= 2) {
        outputFile << std::string((n - i) / 2, ' ') + std::string(i, '*') << std::endl;
    }

    inputFile.close();
    outputFile.close();

    return 0;
}
