export type PatternCategory =
  | 'Component & UI'
  | 'State & Data'
  | 'Interaction & Composition'
  | 'Rendering & Performance'
  | 'API & Data Integration'
  | 'Core / Architectural';

export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  shortDescription: string;
  description: string;
  exampleTs?: string;
  exampleHtml?: string;
}

export const PATTERNS: Pattern[] = [
  // --- Component & UI patterns ---
  {
    id: 'container-presenter',
    name: 'Container–Presenter Components',
    category: 'Component & UI',
    shortDescription: 'Split smart (data) and dumb (view-only) components.',
    description:
      'A container component handles state, services, and data fetching, while a presenter component receives data via @Input() and emits user events via @Output(), keeping UI simple and testable.',
    exampleTs: `
@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [UserListComponent],
  template: \`
    <app-user-list
      [users]="users"
      (selectUser)="onSelect($event)">
    </app-user-list>
  \`
})
export class UserListContainerComponent {
  users = ['Ana', 'Bruno', 'Carlos'];

  onSelect(user: string) {
    console.log('Selected', user);
  }
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: \`
    <ul>
      <li *ngFor="let u of users" (click)="selectUser.emit(u)">
        {{ u }}
      </li>
    </ul>
  \`
})
export class UserListComponent {
  @Input() users: string[] = [];
  @Output() selectUser = new EventEmitter<string>();
}
`.trim()
  },
  {
    id: 'compound-components',
    name: 'Compound Components via Content Projection',
    category: 'Component & UI',
    shortDescription: 'Parent component coordinates projected child UIs.',
    description:
      'Expose multiple sub-areas (header, body, footer, etc.) through <ng-content> and let consumers assemble complex UIs while the parent manages behavior.'
  },
  {
    id: 'reactive-vs-template-forms',
    name: 'Controlled vs. Uncontrolled (Reactive vs Template-Driven)',
    category: 'Component & UI',
    shortDescription: 'Compare reactive (controlled) and template-driven (less controlled) forms.',
    description:
      'Reactive forms centralize form state in TypeScript and treat the UI as a projection of that state, while template-driven forms rely on template directives and implicit form models.'
  },
  {
    id: 'structural-directive',
    name: 'Structural Directive Pattern',
    category: 'Component & UI',
    shortDescription: 'Encapsulate DOM shape changes in custom directives.',
    description:
      'Structural directives like *ngIf and *ngFor add or remove DOM parts; custom structural directives let you reuse complex visibility/branching logic.',
    exampleTs: `
@Directive({
  selector: '[appIfAdmin]',
  standalone: true
})
export class IfAdminDirective {
  private hasView = false;

  @Input() set appIfAdmin(isAdmin: boolean) {
    if (isAdmin && !this.hasView) {
      this.vcr.createEmbeddedView(this.tpl);
      this.hasView = true;
    } else if (!isAdmin && this.hasView) {
      this.vcr.clear();
      this.hasView = false;
    }
  }

  constructor(
    private tpl: TemplateRef<unknown>,
    private vcr: ViewContainerRef
  ) {}
}
`.trim(),
    exampleHtml: `
<div *appIfAdmin="isAdmin">
  Only admins see this block.
</div>
`.trim()
  },
  {
    id: 'attribute-directive',
    name: 'Attribute Directive Pattern',
    category: 'Component & UI',
    shortDescription: 'Attach behavior or styles to existing elements.',
    description:
      'Attribute directives (like a custom appHighlight) modify host element appearance or behavior without changing its component class.'
  },
  {
    id: 'pipes',
    name: 'Pipe Pattern',
    category: 'Component & UI',
    shortDescription: 'Encapsulate display transformations as pipes.',
    description:
      'Angular pipes turn transformation logic (formatting, mapping) into reusable, declarative building blocks for templates.'
  },
  {
    id: 'renderless-components',
    name: 'Renderless / Headless Components',
    category: 'Component & UI',
    shortDescription: 'Provide behavior, leave the markup to the consumer.',
    description:
      'Renderless components or directives expose state and events (e.g., dropdown open/close) without enforcing a specific DOM structure.'
  },
  {
    id: 'provider-context',
    name: 'Provider / Injected Context Pattern',
    category: 'Component & UI',
    shortDescription: 'Use Angular DI hierarchy as a context system.',
    description:
      'Provide a service at a component level to create a context that all descendants can inject, avoiding prop drilling.'
  },
  {
    id: 'standalone-components',
    name: 'Standalone Component Architecture',
    category: 'Component & UI',
    shortDescription: 'Feature components without NgModules.',
    description:
      'Standalone components with route-level lazy loading simplify architecture and make features more tree-shakeable.'
  },

  // --- State & Data ---
  {
    id: 'rxjs-observable',
    name: 'RxJS Observable Pattern',
    category: 'State & Data',
    shortDescription: 'Represent async data as streams.',
    description:
      'Use Observables to model async sequences (HTTP, events, timers) and build reactive UIs with operators and the async pipe.',
    exampleTs: `
@Injectable({ providedIn: 'root' })
export class UserService {
  users$ = this.http.get<User[]>('/api/users');

  constructor(private http: HttpClient) {}
}
`.trim()
  },
  {
    id: 'ngrx-store',
    name: 'NgRx Store Pattern',
    category: 'State & Data',
    shortDescription: 'Redux-style global state for Angular.',
    description:
      'Centralize state and state changes in a single store using actions, reducers, and selectors; components subscribe to derived slices.'
  },
  {
    id: 'component-store',
    name: 'Component Store Pattern',
    category: 'State & Data',
    shortDescription: 'Local, component-scoped state containers.',
    description:
      'NgRx Component Store offers a small, observable state container ideal for feature or component-level state.'
  },
  {
    id: 'behavior-subject-service',
    name: 'Service with BehaviorSubject',
    category: 'State & Data',
    shortDescription: 'Shared state in a service with BehaviorSubject.',
    description:
      'Expose app-wide or feature-wide state via BehaviorSubject in a service and let consumers subscribe to its observable stream.'
  },
  {
    id: 'async-pipe',
    name: 'Async Pipe Pattern',
    category: 'State & Data',
    shortDescription: 'Subscribe in the template, not in the component class.',
    description:
      'Use | async to subscribe to Observables directly in templates and automatically handle subscription cleanup.'
  },
  {
    id: 'mvvm',
    name: 'MVVM (Components + Services)',
    category: 'State & Data',
    shortDescription: 'ViewModel services drive the template state.',
    description:
      'Treat the component as the View and move stateful logic into a ViewModel service that exposes observables and commands.'
  },

  // --- Interaction & Composition ---
  {
    id: 'command-service',
    name: 'Command Pattern with Services',
    category: 'Interaction & Composition',
    shortDescription: 'Wrap user actions in command-style service methods.',
    description:
      'Encapsulate user-triggered operations in services (AddToCartCommand, SaveProfileCommand) to keep components thin and testable.'
  },
  {
    id: 'mediator-coordinator',
    name: 'Mediator Pattern with Coordinator Service',
    category: 'Interaction & Composition',
    shortDescription: 'Coordinate interaction between sibling components.',
    description:
      'A mediator service coordinates events between multiple independent components (e.g., filters and charts in a dashboard).'
  },
  {
    id: 'strategy-injection-token',
    name: 'Strategy Pattern via Injection Tokens',
    category: 'Interaction & Composition',
    shortDescription: 'Swap algorithms by providing different services.',
    description:
      'Define a strategy interface and use DI tokens to inject different implementations (e.g., StripeStrategy vs PaypalStrategy).'
  },
  {
    id: 'template-method-base-class',
    name: 'Template Method Pattern via Base Classes',
    category: 'Interaction & Composition',
    shortDescription: 'Base component defines algorithm skeleton.',
    description:
      'Abstract base components implement shared algorithm steps and rely on subclasses to override key hooks.'
  },
  {
    id: 'chain-of-responsibility-interceptors',
    name: 'Chain of Responsibility (HTTP Interceptors)',
    category: 'Interaction & Composition',
    shortDescription: 'Chain HTTP request/response handlers.',
    description:
      'Multiple HTTP interceptors each handle part of a request/response, forming a chain similar to Chain of Responsibility.'
  },
  {
    id: 'adapter-service',
    name: 'Adapter Pattern via Services',
    category: 'Interaction & Composition',
    shortDescription: 'Normalize awkward backend APIs.',
    description:
      'Adapter services translate backend API shapes into clean frontend models so components remain unaffected by backend quirks.'
  },
  {
    id: 'class-decorators',
    name: 'Decorator Pattern via Class Decorators',
    category: 'Interaction & Composition',
    shortDescription: 'Decorators add metadata/behavior to classes.',
    description:
      'Angular decorators like @Component and @Injectable are special cases; custom decorators can also wrap or log component behavior.'
  },

  // --- Rendering & Performance ---
  {
    id: 'onpush-change-detection',
    name: 'OnPush Change Detection',
    category: 'Rendering & Performance',
    shortDescription: 'Render only when inputs or observables change.',
    description:
      'ChangeDetectionStrategy.OnPush tells Angular to skip checks unless @Input() references change or an observable emits.',
    exampleTs: `
@Component({
  selector: 'app-user-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`{{ user.name }}\`
})
export class UserCardComponent {
  @Input() user!: { name: string };
}
`.trim()
  },
  {
    id: 'trackby-ngfor',
    name: 'trackBy for *ngFor',
    category: 'Rendering & Performance',
    shortDescription: 'Avoid recreating DOM elements unnecessarily.',
    description:
      'Providing a trackBy function for *ngFor lets Angular reuse DOM elements when array items move or update.',
    exampleHtml: `
<li *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</li>
`.trim(),
    exampleTs: `
trackById(index: number, item: { id: number }) {
  return item.id;
}
`.trim()
  },
  {
    id: 'virtual-scroll-cdk',
    name: 'Virtual Scrolling (CDK)',
    category: 'Rendering & Performance',
    shortDescription: 'Render only the visible slice of long lists.',
    description:
      'Angular CDK virtual scroll shows just the visible portion of a long list to reduce DOM size.'
  },
  {
    id: 'lazy-loading-routes',
    name: 'Lazy Loading Routes',
    category: 'Rendering & Performance',
    shortDescription: 'Load feature code only when needed.',
    description:
      'Lazy route configuration with loadChildren or loadComponent delays loading of feature bundles until the route is visited.'
  },
  {
    id: 'debounce-throttle-rxjs',
    name: 'Debounce / Throttle with RxJS',
    category: 'Rendering & Performance',
    shortDescription: 'Limit how often expensive logic runs.',
    description:
      'Use debounceTime, throttleTime, and distinctUntilChanged to avoid flooding the UI with updates from rapid events (typing, scrolling).'
  },

  // --- API & Data Integration ---
  {
    id: 'facade',
    name: 'Facade Pattern',
    category: 'API & Data Integration',
    shortDescription: 'One simple API for complex underlying layers.',
    description:
      'A facade service wraps NgRx, repositories, and HTTP calls behind a simple, UI-friendly interface.'
  },
  {
    id: 'repository',
    name: 'Repository Pattern',
    category: 'API & Data Integration',
    shortDescription: 'Abstract persistence and HTTP access.',
    description:
      'Repository services encapsulate fetching, caching, and mapping data so the rest of the app deals with domain models only.'
  },
  {
    id: 'ngrx-effects',
    name: 'Effects Pattern (NgRx Effects)',
    category: 'API & Data Integration',
    shortDescription: 'Side-effectful async operations for the store.',
    description:
      'NgRx Effects run async logic (HTTP calls, logging, routing) in response to actions, separate from reducers and components.'
  },

  // --- Core / Architectural ---
  {
    id: 'dependency-injection',
    name: 'Dependency Injection (DI)',
    category: 'Core / Architectural',
    shortDescription: 'Supply dependencies from the outside using Angular DI.',
    description:
      'Dependency Injection in Angular uses injectors and providers so components and services receive ready-to-use dependencies instead of constructing them manually.',
    exampleTs: `
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(msg: string) {
    console.log('[LOG]', msg);
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  template: \`
    <button (click)="sayHi()">Say hi</button>
  \`
})
export class HomeComponent {
  constructor(private logger: LoggerService) {}

  sayHi() {
    this.logger.log('Hello from HomeComponent');
  }
}
`.trim()
  }
];
