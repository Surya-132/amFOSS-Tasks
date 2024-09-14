#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream inputFile("input.txt");
    std::ofstream outputFile("output.txt");

    std::string line;
    while (getline(inputFile, line)) {
        outputFile << line << std::endl;
    }
    inputFile.close();
    outputFile.close();

    return 0;
}
