import java.util.Random;
import java.util.Scanner;

public class GuessTheNumber {
    static Random random = new Random();
    private static int getRandom(){
        return random.nextInt(100);
    }
    public static void main(String[]Args) {
        System.out.println("Kan du gæte hvilket tal jeg tænker på?");

        Scanner scanner = new Scanner(System.in);

        int number = getRandom();
        int guess;
        do{
            guess = scanner.nextInt();
            if (guess > number){
                System.out.println("Det var for højt");
            }
            if (guess < number){
                System.out.println("Det var for lavt");
            }

        } while(guess != number);
        System.out.println("Du gættede forkert");
    }
}