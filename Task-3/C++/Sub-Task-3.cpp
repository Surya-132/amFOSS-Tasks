#include <iostream>

int main() {
    int n;
    std::cout << "Enter a number: ";
    std::cin >> n;

    if (n % 2 == 0) {
        n++;
    }

    for (int i = 1; i <= n; i += 2) {
        std::cout << std::string((n - i) / 2, ' ') + std::string(i, '*') << std::endl;
    }

    for (int i = n - 2; i >= 1; i -= 2) {
        std::cout << std::string((n - i) / 2, ' ') + std::string(i, '*') << std::endl;
    }

    return 0;
}
