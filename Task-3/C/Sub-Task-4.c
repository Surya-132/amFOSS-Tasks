#include <stdio.h>

int main() {
    int n, i, j;
    FILE *inputFile, *outputFile;
  
    inputFile = fopen("input.txt", "r");
    fscanf(inputFile, "%d", &n);
    fclose(inputFile);

    outputFile = fopen("output.txt", "w");

    for (i = 1; i <= n; i++) {
        for (j = i; j < n; j++) {
            fprintf(outputFile, " ");
        }
        for (j = 1; j <= (2 * i - 1); j++) {
            fprintf(outputFile, "*");
        }
        fprintf(outputFile, "\n");
    }

    for (i = n - 1; i >= 1; i--) {
        for (j = n; j > i; j--) {
            fprintf(outputFile, " ");
        }
        for (j = 1; j <= (2 * i - 1); j++) {
            fprintf(outputFile, "*");
        }
        fprintf(outputFile, "\n");
    }

    fclose(outputFile);

    return 0;
}
