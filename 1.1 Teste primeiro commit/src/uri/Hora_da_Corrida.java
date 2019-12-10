package uri;

import java.util.Scanner;

public class Hora_da_Corrida {
	private static Scanner sc;

	public static void main(String[] args) { 
		int V, N;
		
		sc = new Scanner(System.in);

		V = sc.nextInt();
		N = sc.nextInt();
		
		result(V, N);
	}
	
	public static void result(int V, int N) {
		int tam, res;
		double p;
		
		tam = V * N;
		
		for (int i = 1; i <= 9; i++) {
			p = ((i * 10) / 100.0) * tam;
			
			res = (int) ((p - (int) p > 0) ? (p + 1) : p);
			
			System.out.print(res + ((i < 9) ? " " : ""));
		}
		System.out.println();
	}
}