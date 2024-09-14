#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter the number for the diamond pattern: ");
    scanf("%d", &n);

    for (i = 1; i <= n; i+=2) {
        
        for (j = i; j < n; j+=2) {
            printf(" ");
        }
        for (j = 1; j <= (2 * i - 1); j+=2) {
            printf("*");
        }
        printf("\n");
    }
    for (i = n - 1; i > 1; i-=2) {
        
        for (j = n; j > i; j-=2) {
            printf(" ");
        }
        for (j = 1; j < (2 * i - 1); j+=2) {
            printf("*");
        }
        printf("\n");
    }

    return 0;
}
