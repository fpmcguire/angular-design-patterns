// src/app/classic-patterns/classic-patterns.data.ts

export type ClassicPatternCategory = 'Creational' | 'Structural' | 'Behavioral';

export interface ClassicPattern {
  id: string;
  name: string;
  category: ClassicPatternCategory;
  shortDescription: string;
  description: string;
  exampleTs?: string;
  exampleHtml?: string;
}

export const CLASSIC_PATTERNS: ClassicPattern[] = [
  // --- Creational ------------------------------------------------------------
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    shortDescription: 'Ensure a class has only one instance and provide a global access point.',
    description:
      'In Angular, services provided in root (providedIn: "root") are effectively singletons, shared across the application and accessed via dependency injection.',
    exampleTs: `
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private count = 0;

  increment(): number {
    this.count++;
    console.log('CounterService count =', this.count);
    return this.count;
  }
}
    `.trim()
  },
  {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'Creational',
    shortDescription: 'Defer object creation to subclasses or dedicated factory methods.',
    description:
      'A factory method encapsulates object creation logic so callers do not need to know which concrete class is instantiated.',
    exampleTs: `
import { Injectable } from '@angular/core';

export abstract class Logger {
  abstract log(message: string): void;
}

export class ConsoleLogger extends Logger {
  log(message: string): void {
    console.log('[ConsoleLogger]', message);
  }
}

export class SilentLogger extends Logger {
  log(_message: string): void {
    // no-op
  }
}

@Injectable({ providedIn: 'root' })
export class LoggerFactory {
  createLogger(debug: boolean): Logger {
    return debug ? new ConsoleLogger() : new SilentLogger();
  }
}
    `.trim()
  },
  {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'Creational',
    shortDescription: 'Provide an interface for creating related objects without specifying their concrete classes.',
    description:
      'In Angular, you can use injection tokens or configuration services as abstract factories that choose which concrete implementations to use.',
    exampleTs: `
import { InjectionToken, inject } from '@angular/core';

export interface ButtonTheme {
  cssClass: string;
}

export const LIGHT_BUTTON_THEME: ButtonTheme = { cssClass: 'btn-light' };
export const DARK_BUTTON_THEME: ButtonTheme = { cssClass: 'btn-dark' };

export const BUTTON_THEME = new InjectionToken<ButtonTheme>('BUTTON_THEME', {
  providedIn: 'root',
  factory: () => DARK_BUTTON_THEME // choose at "factory" time
});

// Usage in a component:
// const theme = inject(BUTTON_THEME);
    `.trim()
  },

  // --- Structural ------------------------------------------------------------
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'Structural',
    shortDescription: 'Convert one interface into another that clients expect.',
    description:
      'Adapter services in Angular sit between awkward backend APIs and clean frontend models, reshaping data while hiding backend details.',
    exampleTs: `
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface LegacyUserApiModel {
  first_name: string;
  last_name: string;
}

export interface User {
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class UserAdapterService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<LegacyUserApiModel[]>('/api/users').pipe(
      map(apiUsers =>
        apiUsers.map(u => ({ fullName: \`\${u.first_name} \${u.last_name}\` }))
      )
    );
  }
}
    `.trim()
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'Structural',
    shortDescription: 'Provide a simplified interface to a complex subsystem.',
    description:
      'A facade service in Angular wraps store, HTTP, and other services to expose a simple API that components can consume.',
    exampleTs: `
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  getAll(): Observable<Product[]> {
    // imagine real HTTP here
    throw new Error('Not implemented');
  }
}

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  constructor(private api: ProductsApi) {}

  loadProducts(): Observable<Product[]> {
    return this.api.getAll();
  }
}
    `.trim()
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'Structural',
    shortDescription: 'Attach additional responsibilities to an object dynamically.',
    description:
      'Angular’s class decorators (@Component, @Injectable) are a form of decoration; you can also define custom decorators to transparently add behavior like logging.',
    exampleTs: `
import { Component } from '@angular/core';

function LogCreation(target: Function) {
  console.log('Created component:', target.name);
}

@LogCreation
@Component({
  selector: 'app-decorated',
  standalone: true,
  template: '<p>Decorated component works!</p>'
})
export class DecoratedComponent {}
    `.trim()
  },

  // --- Behavioral ------------------------------------------------------------
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    shortDescription: 'Define a family of algorithms, encapsulate each one, and make them interchangeable.',
    description:
      'Angular’s DI system makes it easy to swap strategy implementations using injection tokens or providers.',
    exampleTs: `
import { Injectable, InjectionToken, Inject } from '@angular/core';

export interface PaymentStrategy {
  pay(amount: number): void;
}

@Injectable()
export class PaypalStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log('Pay with PayPal:', amount);
  }
}

@Injectable()
export class StripeStrategy implements PaymentStrategy {
  pay(amount: number): void {
    console.log('Pay with Stripe:', amount);
  }
}

export const PAYMENT_STRATEGY = new InjectionToken<PaymentStrategy>('PAYMENT_STRATEGY');

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(@Inject(PAYMENT_STRATEGY) private strategy: PaymentStrategy) {}

  checkout(total: number) {
    this.strategy.pay(total);
  }
}
    `.trim()
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    shortDescription: 'Define a one-to-many dependency so that when one object changes, all dependents are notified.',
    description:
      'RxJS Observables in Angular are a direct implementation of the Observer pattern, used heavily for HTTP, events, and state.',
    exampleTs: `
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  readonly theme$: Observable<'light' | 'dark'> = this.themeSubject.asObservable();

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
  }
}

// Components subscribe:
// this.themeStore.theme$.subscribe(theme => ...);
    `.trim()
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    shortDescription: 'Encapsulate a request as an object to parameterize and queue actions.',
    description:
      'Command-style services in Angular wrap user actions (add, remove, save) so components only call methods like "execute" without knowing how they are implemented.',
    exampleTs: `
import { Injectable } from '@angular/core';

export interface Command {
  execute(): void;
}

@Injectable({ providedIn: 'root' })
export class LogCommand implements Command {
  execute(): void {
    console.log('LogCommand executed');
  }
}

@Injectable({ providedIn: 'root' })
export class CommandInvoker {
  run(command: Command) {
    command.execute();
  }
}
    `.trim()
  },
  {
    id: 'template-method',
    name: 'Template Method',
    category: 'Behavioral',
    shortDescription: 'Define the skeleton of an algorithm and let subclasses override specific steps.',
    description:
      'In Angular you can create abstract base components/services that implement shared flows while allowing subclasses to customize specific operations.',
    exampleTs: `
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class DataLoader<T> implements OnInit {
  data: T | null = null;

  ngOnInit(): void {
    this.load().subscribe(value => (this.data = value));
  }

  // subclasses must implement how data is loaded
  protected abstract load(): Observable<T>;
}
    `.trim()
  },
  {
    id: 'mediator',
    name: 'Mediator',
    category: 'Behavioral',
    shortDescription: 'Encapsulate how a set of objects interact, promoting loose coupling.',
    description:
      'A mediator service in Angular coordinates communication between multiple components so they do not talk to each other directly.',
    exampleTs: `
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatMediator {
  private messageSubject = new Subject<string>();
  messages$ = this.messageSubject.asObservable();

  send(message: string) {
    this.messageSubject.next(message);
  }
}
    `.trim()
  }
];
