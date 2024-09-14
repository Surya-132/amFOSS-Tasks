#include <stdio.h>

int main() {
    FILE *inputFile, *outputFile;
    char buffer[10]; 
  
    inputFile = fopen("input.txt", "r");

    outputFile = fopen("output.txt", "w");

    while (fgets(buffer, sizeof(buffer), inputFile) != NULL) {
        fputs(buffer, outputFile);
    }
    fclose(inputFile);
    fclose(outputFile);

    return 0;
}
