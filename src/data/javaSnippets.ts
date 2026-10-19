/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Java Döngüler: 4 ve 5'in Kuvvetleri - Hazırlayan: Enes Öztürk
 */

export interface JavaSnippet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fileName: string;
  code: string;
}

export const JAVA_SNIPPETS: JavaSnippet[] = [
  {
    id: 'odev-standart',
    title: 'Ödev Çözümü: Ayrı For Döngüleri (Standart & Önerilen)',
    subtitle: 'En anlaşılır ve temiz kod standardı',
    description: 'Girilen n değerine kadar önce 4\'ün kuvvetleri, ardından 5\'in kuvvetleri ayrı döngülerle ekrana yazdırılır. i *= 4 ve j *= 5 adımlarıyla logaritmik hızda çalışır.',
    fileName: 'KuvvetlerOdev.java',
    code: `/**
 * Patika Java 101 - Döngüler Ödevi
 * Girilen sayıya kadar olan 4 ve 5'in kuvvetlerini ekrana yazdıran program
 * 
 * @author Enes Öztürk
 * @version 1.0.0
 */
import java.util.Scanner;

public class KuvvetlerOdev {
    public static void main(String[] args) {
        int n;
        Scanner input = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("   4 ve 5'in Kuvvetlerini Bulan Program");
        System.out.println("   Hazırlayan: Enes Öztürk");
        System.out.println("==================================================");

        System.out.print("Lütfen sınır sayısını giriniz: ");
        n = input.nextInt();

        if (n < 1) {
            System.out.println("Uyarı: Pozitif bir tam sayı (en az 1) girmelisiniz!");
        } else {
            // 4'ün Kuvvetleri: 4^0=1, 4^1=4, 4^2=16, 4^3=64, ...
            System.out.println("\\n--- " + n + " Sayısına Kadar 4'ün Kuvvetleri ---");
            for (int i = 1; i <= n; i *= 4) {
                System.out.println(i);
            }

            // 5'in Kuvvetleri: 5^0=1, 5^1=5, 5^2=25, 5^3=125, ...
            System.out.println("\\n--- " + n + " Sayısına Kadar 5'in Kuvvetleri ---");
            for (int j = 1; j <= n; j *= 5) {
                System.out.println(j);
            }
        }

        input.close();
        System.out.println("\\nİşlem başarıyla tamamlandı. (Enes Öztürk)");
    }
}`
  },
  {
    id: 'odev-tek-dongu',
    title: 'İleri Düzey Çözüm: Tek Döngüde Çift Değişken',
    subtitle: 'Senkron sütun formatında yazdırma',
    description: 'Tek bir for döngüsünde iki sayaç (i ve j) tanımlanarak 4 ve 5\'in kuvvetleri aynı anda yan yana tablo şeklinde yazdırılır.',
    fileName: 'TekDonguKuvvetler.java',
    code: `/**
 * Tek Döngü ile Senkron 4 ve 5'in Kuvvetleri
 * @author Enes Öztürk
 */
import java.util.Scanner;

public class TekDonguKuvvetler {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("Sınır sayısını giriniz: ");
        int n = scan.nextInt();

        System.out.printf("%-15s %-15s%n", "4'ün Kuvveti", "5'in Kuvveti");
        System.out.println("---------------------------------");

        long p4 = 1;
        long p5 = 1;

        while (p4 <= n || p5 <= n) {
            String col4 = (p4 <= n) ? String.valueOf(p4) : "-";
            String col5 = (p5 <= n) ? String.valueOf(p5) : "-";
            System.out.printf("%-15s %-15s%n", col4, col5);

            if (p4 <= n) p4 *= 4;
            if (p5 <= n) p5 *= 5;
        }

        scan.close();
    }
}`
  },
  {
    id: 'temel-2nin-kuvvetleri',
    title: 'Temel Konu: 2\'nin Kuvvetleri Programı',
    subtitle: 'Dersin başlangıç örneği',
    description: 'Girilen sayıya kadar 2\'nin kuvvetlerini (1, 2, 4, 8, 16, 32, ...) ekrana yazdıran klasik Java döngü örneği.',
    fileName: 'IkininKuvvetleri.java',
    code: `/**
 * Java 101 - 2'nin Kuvvetlerini Bulan Program
 * @author Enes Öztürk
 */
import java.util.Scanner;

public class IkininKuvvetleri {
    public static void main(String[] args) {
        int n;
        Scanner input = new Scanner(System.in);

        System.out.print("Sınır sayısını giriniz: ");
        n = input.nextInt();

        System.out.println("\\n2'nin Kuvvetleri (2^k <= " + n + "):");
        for (int i = 1; i <= n; i *= 2) {
            System.out.println(i);
        }

        input.close();
    }
}`
  },
  {
    id: 'while-dongusu',
    title: 'Alternatif Çözüm: While Döngüsü ile',
    subtitle: 'Koşul odaklı yaklaşım',
    description: 'For yerine while döngüsü kullanarak aynı mantığı uygulayan alternatif yöntem.',
    fileName: 'WhileKuvvetler.java',
    code: `/**
 * While Döngüsü ile 4 ve 5'in Kuvvetleri
 * @author Enes Öztürk
 */
import java.util.Scanner;

public class WhileKuvvetler {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Bir sayı giriniz: ");
        int sinir = sc.nextInt();

        int k4 = 1;
        System.out.println("4'ün Kuvvetleri:");
        while (k4 <= sinir) {
            System.out.println(k4);
            k4 *= 4; // k4 = k4 * 4
        }

        int k5 = 1;
        System.out.println("\\n5'in Kuvvetleri:");
        while (k5 <= sinir) {
            System.out.println(k5);
            k5 *= 5; // k5 = k5 * 5
        }

        sc.close();
    }
}`
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Java'da döngü başlangıcında neden 'int i = 0' yerine 'int i = 1' kullanmalıyız?",
    codeSnippet: "for (int i = 1; i <= n; i *= 4)",
    options: [
      "Çünkü 0 bir çift sayıdır ve 4'e bölünemez.",
      "i=0 başlarsa, 'i *= 4' işlemi (0 * 4 = 0) değerini hiç değiştiremez ve sonsuz döngü oluşur. Ayrıca 4^0 = 1'dir.",
      "Java derleyicisi 0 ile başlayan döngülerde derleme hatası verir.",
      "Sadece for döngüsünün sözdizimi kuralı olduğu için."
    ],
    correctIndex: 1,
    explanation: "Matematiksel olarak herhangi bir tabanın 0. kuvveti 1'dir (4⁰ = 1). Ayrıca i = 0 başlatılırsa her adımda 0 * 4 = 0 olacağından i asla artamaz ve program sonsuz döngüde kilitlenir."
  },
  {
    id: 2,
    question: "Kullanıcı n = 100 girdiğinde, 4'ün kuvvetleri döngüsü ekrana sırasıyla hangi sayıları basar?",
    options: [
      "4, 8, 12, 16, 20, ..., 100 (4'ün katları)",
      "1, 4, 16, 64",
      "1, 4, 16, 64, 256",
      "0, 4, 16, 64"
    ],
    correctIndex: 1,
    explanation: "4⁰ = 1, 4¹ = 4, 4² = 16, 4³ = 64. Bir sonraki kuvvet 4⁴ = 256 olup 100'den büyük olduğu için döngü sonlanır. Bu nedenle ekrana 1, 4, 16, 64 yazdırılır."
  },
  {
    id: 3,
    question: "Kullanıcı n = 100 girdiğinde, 5'in kuvvetleri döngüsü ekrana sırasıyla hangi sayıları basar?",
    options: [
      "5, 10, 15, 20, ..., 100",
      "1, 5, 25, 125",
      "1, 5, 25",
      "0, 5, 25"
    ],
    correctIndex: 2,
    explanation: "5⁰ = 1, 5¹ = 5, 5² = 25. Bir sonraki kuvvet 5³ = 125 olup 100'den büyük olduğu için koşul (j <= 100) sağlanmaz ve döngü biter. Ekrana 1, 5, 25 yazdırılır."
  },
  {
    id: 4,
    question: "'i *= 4' ifadesi ile 'i += 4' ifadesi arasındaki fark nedir?",
    options: [
      "Aralarında fark yoktur, ikisi de 4 ekler.",
      "'i += 4' 4'ün kuvvetlerini, 'i *= 4' 4'ün katlarını bulur.",
      "'i *= 4' i'yi her adımda 4 ile çarpar (geometrik/kuvvet artışı), 'i += 4' ise 4 ekler (aritmetik/kat artışı).",
      "'i *= 4' yalnızca çift sayılarda çalışır."
    ],
    correctIndex: 2,
    explanation: "'i *= 4' ifadesi i = i * 4 anlamına gelir ve üslü artışı sağlar (1, 4, 16, 64...). 'i += 4' ise i = i + 4 olup doğrusal artışla 4'ün katlarını verir (1, 5, 9, 13...)."
  }
];

export interface CalculationResult {
  power: number;
  exponent: number;
  step: number;
  condition: string;
}

export function computePowers(base: number, limit: number): CalculationResult[] {
  if (limit < 1 || isNaN(limit)) return [];
  const results: CalculationResult[] = [];
  let current = 1;
  let exp = 0;
  let step = 1;

  while (current <= limit) {
    results.push({
      power: current,
      exponent: exp,
      step: step,
      condition: `${current} <= ${limit} (Doğru)`
    });
    
    // Check overflow
    if (current > Math.floor(Number.MAX_SAFE_INTEGER / base)) break;
    current *= base;
    exp++;
    step++;
  }

  return results;
}
