import java.io.FileReader;
import java.io.FileWriter;
import java.util.Scanner;

public class SubTask4 {
    public static void main(String[] args) {
        FileReader reader = new FileReader("input.txt");
        Scanner fileScanner = new Scanner(reader);
        int n = fileScanner.nextInt();
        fileScanner.close();

        FileWriter writer = new FileWriter("output.txt");

        for (int i = 0; i < n; i+=2) {
            for (int j = 0; j < n - i - 1; j++) {
                writer.write(" ");
            }
            for (int j = 0; j <= i; j++) {
                writer.write("* ");
            }
            writer.write("\n");
        }
        for (int i = 0; i < n - 1; i+=2) {
            for (int j = 0; j <= i+1; j++) {
                writer.write(" ");
            }
            for (int j = 0; j < n - i - 2; j++) {
                writer.write("* ");
            }
            writer.write("\n");
        }

        writer.close();
    }
}
