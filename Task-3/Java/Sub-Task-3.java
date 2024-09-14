import java.util.Scanner;

public class SubTask3 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        for (int i = 0; i < n; i+=2) {
            for (int j = 0; j < n - i - 1; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        for (int i = 0; i < n - 1; i+=2) {
            for (int j = 0; j <= i+1; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < n - i - 2; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        scanner.close();
    }
}
