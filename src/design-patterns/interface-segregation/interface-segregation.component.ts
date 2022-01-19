import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-interface-segregation',
  templateUrl: './interface-segregation.component.html',
  styleUrls: ['./interface-segregation.component.scss']
})
export class InterfaceSegregationComponent implements OnInit {
  impFirst: string[] = ['namespace DesignPatterns;', '', '// Created IPrinter interface', 'public interface IPrinter', '{', 'void Normal(string content);', 'void Scan(string content);', 'void Fax(string content);', 'void Duplex(string content);', '}', '', '// Created Liquid Printer class implementing IPrinter interface', 'public class LiquidPrinter : IPrinter', '{', 'public void Fax(string content) => throw new NotImplementedException();', 'public void Normal(string content) => Console.WriteLine($"Liquid printer print:## {content}");', 'public void Duplex(string content) => throw new NotImplementedException();', 'public void Scan(string content) => Console.WriteLine($"Liquid printer scan:## {content}");', '}', '', '// Created Laser Printer class implementing IPrinter interface', 'public class LaserPrinter : IPrinter', '{', 'public void Fax(string content) => Console.WriteLine($"Laser printer fax:## {content}");', 'public void Normal(string content) => Console.WriteLine($"Laser printer print:## {content}");', 'public void Duplex(string content) => Console.WriteLine($"Laser printer duplex print:## {content}");', 'public void Scan(string content) => Console.WriteLine($"Laser printer scan:## {content}");', '}', '', 'public class Program', '{', 'public static void Main(string[] args)', '{', 'IPrinter printer = new LaserPrinter();', 'printer.PrintDuplex("Hello interface segregation principle");', 'printer.Fax("Hello interface segregation principle");', '', 'printer = new LiquidPrinter();', '// Below call will end up throwing error as Liquid printer do not know how to handle those task.', 'printer.PrintDuplex("Hello interface segregation principle");', 'printer.Fax("Hello interface segregation principle");', '}', '}', '', '// Let walk through our implementation.', '// Here the IPrinter interface is holding too many functions (methods) definition. When a class such as LiquidPrinter implements the IPrinter', '// interface it do not know what to do with the Fax and PrintDuplex functions (methods), simply because this type of printer do not know', '// support those functionalities. On the other hand LaserPrinter implements all the functions (methods) of IPrinter interface because this type', '// of printer do support those functionalities. The Interface Segregation Principle says we should logically segregate a big interface into small', '// interfaces. Let see how we can improve this solution in next implementation.'];
  impSecond: string[] = ['namespace DesignPatterns;', '', '// Modified IPrinter interface', 'public interface IPrinter', '{', 'void Normal(string content);', 'void Scan(string content);', '}', '', '// Created ISender interface', 'public interface ISender', '{', 'void Fax(string content);', 'void Email(string content);', '}', '', '// Created IDuplexPrinter interface', 'public interface IDuplexPrinter', '{', 'void Duplex(string content);', '}', '', '// Modified Liquid Printer class implementing IPrinter interface', 'public class LiquidPrinter : IPrinter', '{', 'public void Normal(string content) => Console.WriteLine($"Liquid printer print:## {content}");', 'public void Scan(string content) => Console.WriteLine($"Liquid printer scan:## {content}");', '}', '', '// Modified Laser Printer class implementing IPrinter, ISender, IDuplexPrinter interface', 'public class LaserPrinter : IPrinter, ISender, IDuplexPrinter', '{', 'public void Fax(string content) => Console.WriteLine($"Laser printer fax:## {content}");', 'public void Email(string content) => Console.WriteLine($"Laser printer email:## {content}");', 'public void Normal(string content) => Console.WriteLine($"Laser printer print:## {content}");', 'public void Duplex(string content) => Console.WriteLine($"Laser printer duplex print:## {content}");', 'public void Scan(string content) => Console.WriteLine($"Laser printer scan:## {content}");', '}', '', 'public class Program', '{', 'public static void Main(string[] args)', '{', 'var laserPrinter = new LaserPrinter();', 'laserPrinter.Duplex("Hello interface segregation principle");', 'laserPrinter.Fax("Hello interface segregation principle");', '', 'var liquidPrinter = new LiquidPrinter();', 'liquidPrinter.Normal("Hello interface segregation principle");', 'liquidPrinter.Scan("Hello interface segregation principle");', '}', '}', '', '// Let walk through our implementation again.', '// This time we follow the Interface Segregation Principle (ISP) and split the IPrinter interface into small new interfaces. With this now the', '// LiquidPrinter only implements the functionalities it supports. This help the classes not to hold unimplemented functions (methods) hung around.', '// Also not forcing a class to implement any functionality it does not support.'];
  impThird: string[] = ['// Created IPrinter interface', 'interface IPrinter', '{', 'Normal(content: string): void;', 'Scan(content: string): void;', 'Fax(content: string): void;', 'Duplex(content: string): void;', '}', '', '// Created Liquid Printer class implementing IPrinter interface', 'class LiquidPrinter implements IPrinter', '{', 'public Normal(content: string): void { console.log(`Liquid printer print:## ${content}`); }', 'public Scan(content: string): void { console.log(`Liquid printer scan:## ${content}`); }', 'public Duplex(content: string): void { throw new Error("Not Implemented"); }', 'public Fax(content: string): void { throw new Error("Not Implemented"); }', '}', '', '// Modified Laser Printer class implementing IPrinter interface', 'class LaserPrinter implements IPrinter', '{', 'public Fax(content: string): void { console.log(`Laser printer fax:## ${content}`); }', 'public Normal(content: string): void { console.log(`Laser printer print:## ${content}`); }', 'public Duplex(content: string): void { console.log(`Laser printer duplex print:## ${content}`); }', 'public Scan(content: string): void { console.log(`Laser printer scan:## ${content}`); }', '}', '', 'var printer: IPrinter = new LaserPrinter();', 'printer.Duplex("Hello interface segregation principle");', 'printer.Fax("Hello interface segregation principle");', '', 'printer = new LiquidPrinter();', '// Below call will end up throwing error as Liquid printer do not know how to handle those task.', 'printer.Duplex("Hello interface segregation principle");', 'printer.Fax("Hello interface segregation principle");', '', '', '// Let walk through our implementation.', '// Here the IPrinter interface is holding too many functions (methods) definition. When a class such as LiquidPrinter implements the IPrinter', '// interface it do not know what to do with the Fax and PrintDuplex functions (methods), simply because this type of printer do not know', '// support those functionalities. On the other hand LaserPrinter implements all the functions (methods) of IPrinter interface because this type', '// of printer do support those functionalities. The Interface Segregation Principle says we should logically segregate a big interface into small', '// interfaces. Let see how we can improve this solution in next implementation.'];
  impFourth: string[] = ['// Modified IPrinter interface', 'interface IPrinter', '{', 'Normal(content: string): void;', 'Scan(content: string): void;', '}', '', '// Created ISender interface', 'interface ISender', '{', 'Fax(content: string): void;', 'Email(content: string): void;', '}', '', '// Created IDuplexPrinter interface', 'interface IDuplexPrinter', '{', 'Duplex(content: string): void;', '}', '', '// Modified Liquid Printer class implementing IPrinter interface', 'class LiquidPrinter implements IPrinter', '{', 'public Normal(content: string): void { console.log(`Liquid printer print:## ${content}`); }', 'public Scan(content: string): void { console.log(`Liquid printer scan:## ${content}`); }', '}', '', '// Modified Laser Printer class implementing IPrinter, ISender, IDuplexPrinter interface', 'class LaserPrinter implements IPrinter, ISender, IDuplexPrinter', '{', 'public Fax(content: string): void { console.log(`Laser printer fax:## ${content}`); }', 'public Email(content: string): void { console.log(`Laser printer email:## ${content}`); }', 'public Normal(content: string): void { console.log(`Laser printer print:## ${content}`); }', 'public Duplex(content: string): void { console.log(`Laser printer duplex print:## ${content}`); }', 'public Scan(content: string): void { console.log(`Laser printer scan:## ${content}`); }', '}', '', 'var laserPrinter = new LaserPrinter();', 'laserPrinter.Duplex("Hello interface segregation principle");', 'laserPrinter.Fax("Hello interface segregation principle");', '', 'var liquidPrinter = new LiquidPrinter();', 'liquidPrinter.Normal("Hello interface segregation principle");', 'liquidPrinter.Scan("Hello interface segregation principle");', '', '// Let walk through our implementation again.', '// This time we follow the Interface Segregation Principle (ISP) and split the IPrinter interface into small new interfaces. With this now the', '// LiquidPrinter only implements the functionalities it supports. This help the classes not to hold unimplemented functions (methods) hung around.', '// Also not forcing a class to implement any functionality it does not support.'];

  constructor() { }

  ngOnInit(): void { }
}