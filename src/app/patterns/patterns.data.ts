export type PatternCategory =
  | "Component & UI"
  | "State & Data"
  | "Interaction & Composition"
  | "Rendering & Performance"
  | "API & Data Integration"
  | "Core / Architectural";

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
  // ---------------------------------------------------------------------------
  // Component & UI patterns
  // ---------------------------------------------------------------------------
  {
    id: "container-presenter",
    name: "Container–Presenter Components",
    category: "Component & UI",
    shortDescription: "Split smart (data) and dumb (view-only) components.",
    description:
      "A container component handles state, services, and data fetching, while a presenter component receives data via @Input() and emits user events via @Output(), keeping UI simple and testable.",
    exampleTs:
      'import { Component, EventEmitter, Input, Output } from "@angular/core";\n\n' +
      '@Component({\n' +
      '  selector: "app-user-list-container",\n' +
      "  standalone: true,\n" +
      "  imports: [UserListComponent],\n" +
      "  template: `\n" +
      "    <app-user-list\n" +
      '      [users]="users"\n' +
      '      (selectUser)="onSelect($event)">\n' +
      "    </app-user-list>\n" +
      "  `\n" +
      "})\n" +
      "export class UserListContainerComponent {\n" +
      '  users = ["Ana", "Bruno", "Carlos"];\n\n' +
      "  onSelect(user: string) {\n" +
      '    console.log("Selected", user);\n' +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-user-list",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <ul>\n" +
      '      <li *ngFor="let u of users" (click)="selectUser.emit(u)">\n' +
      "        {{ u }}\n" +
      "      </li>\n" +
      "    </ul>\n" +
      "  `\n" +
      "})\n" +
      "export class UserListComponent {\n" +
      "  @Input() users: string[] = [];\n" +
      "  @Output() selectUser = new EventEmitter<string>();\n" +
      "}\n"
  },
  {
    id: "compound-components",
    name: "Compound Components via Content Projection",
    category: "Component & UI",
    shortDescription: "Parent component coordinates projected child UIs.",
    description:
      "Expose multiple sub-areas (header, body, footer, etc.) through <ng-content> and let consumers assemble complex UIs while the parent manages behavior.",
    exampleTs:
      'import { Component } from "@angular/core";\n\n' +
      '@Component({\n' +
      '  selector: "app-card",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      '    <div class="card">\n' +
      '      <div class="card-header">\n' +
      '        <ng-content select="[card-title]"></ng-content>\n' +
      "      </div>\n" +
      '      <div class="card-body">\n' +
      '        <ng-content select="[card-body]"></ng-content>\n' +
      "      </div>\n" +
      '      <div class="card-footer">\n' +
      '        <ng-content select="[card-footer]"></ng-content>\n' +
      "      </div>\n" +
      "    </div>\n" +
      "  `\n" +
      "})\n" +
      "export class CardComponent {}\n",
    exampleHtml:
      '<app-card>\n' +
      '  <h2 card-title>Profile</h2>\n' +
      '  <div card-body>Body content…</div>\n' +
      '  <button card-footer>Save</button>\n' +
      "</app-card>\n"
  },
  {
    id: "reactive-vs-template-forms",
    name: "Controlled vs. Uncontrolled (Reactive vs Template-Driven)",
    category: "Component & UI",
    shortDescription: "Compare reactive (controlled) and template-driven (less controlled) forms.",
    description:
      "Reactive forms centralize form state in TypeScript and treat the UI as a projection of that state, while template-driven forms rely on template directives and implicit form models.",
    exampleTs:
      'import { Component } from "@angular/core";\n' +
      'import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";\n' +
      'import { FormsModule, NgForm } from "@angular/forms";\n\n' +
      '@Component({\n' +
      '  selector: "app-form-demo",\n' +
      "  standalone: true,\n" +
      "  imports: [ReactiveFormsModule, FormsModule],\n" +
      "  template: `\n" +
      "    <!-- Reactive (controlled) -->\n" +
      '    <form [formGroup]="reactiveForm" (ngSubmit)="submitReactive()">\n' +
      '      <input formControlName="email" placeholder="Reactive email" />\n' +
      "    </form>\n\n" +
      "    <!-- Template-driven (less controlled) -->\n" +
      '    <form #f="ngForm" (ngSubmit)="submitTemplate(f)">\n' +
      '      <input name="email" ngModel placeholder="Template email" />\n' +
      "    </form>\n" +
      "  `\n" +
      "})\n" +
      "export class FormDemoComponent {\n" +
      "  reactiveForm: FormGroup;\n\n" +
      "  constructor(private fb: FormBuilder) {\n" +
      "    this.reactiveForm = this.fb.group({\n" +
      '      email: ["", [Validators.required, Validators.email]]\n' +
      "    });\n" +
      "  }\n\n" +
      "  submitReactive() {\n" +
      "    console.log(this.reactiveForm.value);\n" +
      "  }\n\n" +
      "  submitTemplate(form: NgForm) {\n" +
      "    console.log(form.value);\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "structural-directive",
    name: "Structural Directive Pattern (*ngIf / *ngFor) – DEPRECATED",
    category: "Component & UI",
    shortDescription: "DEPRECATED: classic structural directives like *ngIf / *ngFor.",
    description:
      "DEPRECATED in favor of Angular's built-in control flow syntax (@if, @for, @switch): structural directives like *ngIf and *ngFor used to add/remove DOM parts, but modern Angular apps should migrate to the new control-flow blocks.",
    exampleTs:
      'import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";\n\n' +
      '@Directive({\n' +
      '  selector: "[appIfAdmin]",\n' +
      "  standalone: true\n" +
      "})\n" +
      "export class IfAdminDirective {\n" +
      "  private hasView = false;\n\n" +
      "  @Input() set appIfAdmin(isAdmin: boolean) {\n" +
      "    if (isAdmin && !this.hasView) {\n" +
      "      this.vcr.createEmbeddedView(this.tpl);\n" +
      "      this.hasView = true;\n" +
      "    } else if (!isAdmin && this.hasView) {\n" +
      "      this.vcr.clear();\n" +
      "      this.hasView = false;\n" +
      "    }\n" +
      "  }\n\n" +
      "  constructor(\n" +
      "    private tpl: TemplateRef<unknown>,\n" +
      "    private vcr: ViewContainerRef\n" +
      "  ) {}\n" +
      "}\n",
    exampleHtml:
      '<div *appIfAdmin="isAdmin">\n' +
      "  Only admins see this block.\n" +
      "</div>\n"
  },
  // NEW: modern control-flow pattern for @if / @else / @else if
  {
    id: "control-flow-if-else",
    name: "Built-in Control Flow: @if / @else",
    category: "Component & UI",
    shortDescription: "Use @if, @else, and @else if blocks instead of *ngIf.",
    description:
      "Angular 17+ introduces built-in control flow where @if, @else if, and @else replace *ngIf for more readable, type-safe template branching without extra <ng-template> gymnastics.",
    exampleTs:
      'import { Component } from "@angular/core";\n\n' +
      '@Component({\n' +
      '  selector: "app-login-message",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    @if (isLoggedIn) {\n" +
      "      <p>Welcome back, {{ userName }}!</p>\n" +
      "    } @else {\n" +
      "      <p>Please log in to continue.</p>\n" +
      "    }\n" +
      "  `\n" +
      "})\n" +
      "export class LoginMessageComponent {\n" +
      "  isLoggedIn = true;\n" +
      '  userName = "Ana";\n' +
      "}\n"
  },
  {
    id: "attribute-directive",
    name: "Attribute Directive Pattern",
    category: "Component & UI",
    shortDescription: "Attach behavior or styles to existing elements.",
    description:
      "Attribute directives (like a custom appHighlight) modify host element appearance or behavior without changing its component class.",
    exampleTs:
      'import { Directive, ElementRef, HostListener } from "@angular/core";\n\n' +
      '@Directive({\n' +
      '  selector: "[appHighlight]",\n' +
      "  standalone: true\n" +
      "})\n" +
      "export class HighlightDirective {\n" +
      "  constructor(private el: ElementRef) {\n" +
      '    this.el.nativeElement.style.backgroundColor = "yellow";\n' +
      "  }\n\n" +
      '  @HostListener("mouseenter") onEnter() {\n' +
      '    this.el.nativeElement.style.backgroundColor = "gold";\n' +
      "  }\n\n" +
      '  @HostListener("mouseleave") onLeave() {\n' +
      '    this.el.nativeElement.style.backgroundColor = "yellow";\n' +
      "  }\n" +
      "}\n",
    exampleHtml: '<p appHighlight>Highlighted text</p>\n'
  },
  {
    id: "pipes",
    name: "Pipe Pattern",
    category: "Component & UI",
    shortDescription: "Encapsulate display transformations as pipes.",
    description:
      "Angular pipes turn transformation logic (formatting, mapping) into reusable, declarative building blocks for templates.",
    exampleTs:
      'import { Pipe, PipeTransform } from "@angular/core";\n\n' +
      '@Pipe({\n' +
      '  name: "initials",\n' +
      "  standalone: true\n" +
      "})\n" +
      "export class InitialsPipe implements PipeTransform {\n" +
      "  transform(fullName: string): string {\n" +
      "    return fullName\n" +
      '      .split(" ")\n' +
      "      .map(p => p[0])\n" +
      "      .join(\"\")\n" +
      "      .toUpperCase();\n" +
      "  }\n" +
      "}\n",
    exampleHtml:
      '<p>{{ "Ana Maria Silva" | initials }}</p>\n' +
      "<!-- AMS -->\n"
  },
  {
    id: "renderless-components",
    name: "Renderless / Headless Components",
    category: "Component & UI",
    shortDescription: "Provide behavior, leave the markup to the consumer.",
    description:
      "Renderless components or directives expose state and events (e.g., dropdown open/close) without enforcing a specific DOM structure.",
    exampleTs:
      'import { Directive, Signal, signal } from "@angular/core";\n\n' +
      '@Directive({\n' +
      '  selector: "[appDropdownLogic]",\n' +
      '  exportAs: "dropdown",\n' +
      "  standalone: true\n" +
      "})\n" +
      "export class DropdownLogicDirective {\n" +
      "  private _isOpen = signal(false);\n" +
      "  isOpen: Signal<boolean> = this._isOpen.asReadonly();\n\n" +
      "  toggle() {\n" +
      "    this._isOpen.update(v => !v);\n" +
      "  }\n" +
      "}\n",
    exampleHtml:
      '<div appDropdownLogic #dd="dropdown">\n' +
      '  <button (click)="dd.toggle()">Toggle</button>\n' +
      "  <div *ngIf=\"dd.isOpen()\">\n" +
      "    Projected dropdown content...\n" +
      "  </div>\n" +
      "</div>\n"
  },
  {
    id: "provider-context",
    name: "Provider / Injected Context Pattern",
    category: "Component & UI",
    shortDescription: "Use Angular DI hierarchy as a context system.",
    description:
      "Provide a service at a component level to create a context that all descendants can inject, avoiding prop drilling.",
    exampleTs:
      'import { Component, Injectable, inject } from "@angular/core";\n' +
      'import { BehaviorSubject } from "rxjs";\n\n' +
      '@Injectable()\n' +
      "export class ThemeService {\n" +
      '  private themeSubject = new BehaviorSubject<"light" | "dark">("light");\n' +
      "  theme$ = this.themeSubject.asObservable();\n\n" +
      "  toggle() {\n" +
      "    this.themeSubject.next(\n" +
      '      this.themeSubject.value === "light" ? "dark" : "light"\n' +
      "    );\n" +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-theme-shell",\n' +
      "  standalone: true,\n" +
      "  providers: [ThemeService],\n" +
      "  template: `\n" +
      "    <button (click)=\"toggle()\">Toggle theme</button>\n" +
      "    <ng-content></ng-content>\n" +
      "  `\n" +
      "})\n" +
      "export class ThemeShellComponent {\n" +
      "  private theme = inject(ThemeService);\n\n" +
      "  toggle() {\n" +
      "    this.theme.toggle();\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "standalone-components",
    name: "Standalone Component Architecture",
    category: "Component & UI",
    shortDescription: "Feature components without NgModules.",
    description:
      "Standalone components with route-level lazy loading simplify architecture and make features more tree-shakeable.",
    exampleTs:
      'import { Component } from "@angular/core";\n\n' +
      '@Component({\n' +
      '  selector: "app-hello",\n' +
      "  standalone: true,\n" +
      "  template: `Hello {{ name }}!`\n" +
      "})\n" +
      "export class HelloComponent {\n" +
      '  name = "world";\n' +
      "}\n"
  },

  // ---------------------------------------------------------------------------
  // State & Data patterns
  // ---------------------------------------------------------------------------
  {
    id: "rxjs-observable",
    name: "RxJS Observable Pattern",
    category: "State & Data",
    shortDescription: "Represent async data as streams.",
    description:
      "Use Observables to model async sequences (HTTP, events, timers) and build reactive UIs with operators and the async pipe.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { Observable } from "rxjs";\n\n' +
      "export interface User {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "}\n\n" +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class UserService {\n" +
      "  users$: Observable<User[]> = this.http.get<User[]>(\"/api/users\");\n\n" +
      "  constructor(private http: HttpClient) {}\n" +
      "}\n"
  },
  {
    id: "ngrx-store",
    name: "NgRx Store Pattern",
    category: "State & Data",
    shortDescription: "Redux-style global state for Angular.",
    description:
      "Centralize state and state changes in a single store using actions, reducers, and selectors; components subscribe to derived slices.",
    exampleTs:
      'import { createAction, createReducer, on } from "@ngrx/store";\n' +
      'import { Store } from "@ngrx/store";\n' +
      'import { Component } from "@angular/core";\n\n' +
      'export const increment = createAction("[Counter] Increment");\n\n' +
      "export const counterReducer = createReducer(\n" +
      "  0,\n" +
      "  on(increment, state => state + 1)\n" +
      ");\n\n" +
      '@Component({\n' +
      '  selector: "app-counter",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <p>Count: {{ counter$ | async }}</p>\n" +
      "    <button (click)=\"inc()\">Increment</button>\n" +
      "  `\n" +
      "})\n" +
      "export class CounterComponent {\n" +
      "  counter$ = this.store.select(\"counter\");\n\n" +
      "  constructor(private store: Store) {}\n\n" +
      "  inc() {\n" +
      "    this.store.dispatch(increment());\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "component-store",
    name: "Component Store Pattern",
    category: "State & Data",
    shortDescription: "Local, component-scoped state containers.",
    description:
      "NgRx Component Store offers a small, observable state container ideal for feature or component-level state.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { ComponentStore } from "@ngrx/component-store";\n' +
      'import { Component } from "@angular/core";\n' +
      'import { NgFor } from "@angular/common";\n\n' +
      "interface TodosState {\n" +
      "  todos: string[];\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class TodosStore extends ComponentStore<TodosState> {\n" +
      "  readonly todos$ = this.select(state => state.todos);\n\n" +
      "  readonly addTodo = this.updater((state, todo: string) => ({\n" +
      "    ...state,\n" +
      "    todos: [...state.todos, todo]\n" +
      "  }));\n\n" +
      "  constructor() {\n" +
      '    super({ todos: [] });\n' +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-todos",\n' +
      "  standalone: true,\n" +
      "  imports: [NgFor],\n" +
      "  providers: [TodosStore],\n" +
      "  template: `\n" +
      "    <input #t />\n" +
      "    <button (click)=\"store.addTodo(t.value)\">Add</button>\n" +
      "    <ul>\n" +
      "      <li *ngFor=\"let todo of store.todos$ | async\">\n" +
      "        {{ todo }}\n" +
      "      </li>\n" +
      "    </ul>\n" +
      "  `\n" +
      "})\n" +
      "export class TodosComponent {\n" +
      "  constructor(public store: TodosStore) {}\n" +
      "}\n"
  },
  {
    id: "behavior-subject-service",
    name: "Service with BehaviorSubject",
    category: "State & Data",
    shortDescription: "Shared state in a service with BehaviorSubject.",
    description:
      "Expose app-wide or feature-wide state via BehaviorSubject in a service and let consumers subscribe to its observable stream.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { BehaviorSubject, Observable } from "rxjs";\n\n' +
      "export interface AuthUser {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "}\n\n" +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class AuthService {\n" +
      "  private userSubject = new BehaviorSubject<AuthUser | null>(null);\n" +
      "  user$: Observable<AuthUser | null> = this.userSubject.asObservable();\n\n" +
      "  login(user: AuthUser) {\n" +
      "    this.userSubject.next(user);\n" +
      "  }\n\n" +
      "  logout() {\n" +
      "    this.userSubject.next(null);\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "async-pipe",
    name: "Async Pipe Pattern",
    category: "State & Data",
    shortDescription: "Subscribe in the template, not in the component class.",
    description:
      "Use | async to subscribe to Observables directly in templates and automatically handle subscription cleanup.",
    exampleTs:
      'import { Component } from "@angular/core";\n' +
      'import { interval, map } from "rxjs";\n\n' +
      '@Component({\n' +
      '  selector: "app-clock",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    Time: {{ time$ | async }}\n" +
      "  `\n" +
      "})\n" +
      "export class ClockComponent {\n" +
      "  time$ = interval(1000).pipe(\n" +
      "    map(() => new Date().toLocaleTimeString())\n" +
      "  );\n" +
      "}\n"
  },
  {
    id: "mvvm",
    name: "MVVM (Components + Services)",
    category: "State & Data",
    shortDescription: "ViewModel services drive the template state.",
    description:
      "Treat the component as the View and move stateful logic into a ViewModel service that exposes observables and commands.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { Observable } from "rxjs";\n' +
      'import { Component } from "@angular/core";\n' +
      'import { NgIf } from "@angular/common";\n\n' +
      "interface Profile {\n" +
      "  name: string;\n" +
      "  email: string;\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class ProfileViewModel {\n" +
      "  profile$: Observable<Profile> = this.http.get<Profile>(\"/api/profile\");\n\n" +
      "  constructor(private http: HttpClient) {}\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-profile",\n' +
      "  standalone: true,\n" +
      "  imports: [NgIf],\n" +
      "  providers: [ProfileViewModel],\n" +
      "  template: `\n" +
      "    <ng-container *ngIf=\"vm.profile$ | async as p\">\n" +
      "      <h2>{{ p.name }}</h2>\n" +
      "      <p>{{ p.email }}</p>\n" +
      "    </ng-container>\n" +
      "  `\n" +
      "})\n" +
      "export class ProfileComponent {\n" +
      "  constructor(public vm: ProfileViewModel) {}\n" +
      "}\n"
  },

  // ---------------------------------------------------------------------------
  // Interaction & Composition patterns
  // ---------------------------------------------------------------------------
  {
    id: "command-service",
    name: "Command Pattern with Services",
    category: "Interaction & Composition",
    shortDescription: "Wrap user actions in command-style service methods.",
    description:
      "Encapsulate user-triggered operations in services (AddToCartCommand, SaveProfileCommand) to keep components thin and testable.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { Observable } from "rxjs";\n' +
      'import { Component } from "@angular/core";\n\n' +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class CartCommands {\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  addToCart(productId: number): Observable<void> {\n" +
      "    return this.http.post<void>(\"/api/cart\", { productId });\n" +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-product",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <button (click)=\"add(1)\">Add to cart</button>\n" +
      "  `\n" +
      "})\n" +
      "export class ProductComponent {\n" +
      "  constructor(private commands: CartCommands) {}\n\n" +
      "  add(id: number) {\n" +
      "    this.commands.addToCart(id).subscribe();\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "mediator-coordinator",
    name: "Mediator Pattern with Coordinator Service",
    category: "Interaction & Composition",
    shortDescription: "Coordinate interaction between sibling components.",
    description:
      "A mediator service coordinates events between multiple independent components (e.g., filters and charts in a dashboard).",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { Subject } from "rxjs";\n' +
      'import { Component } from "@angular/core";\n\n' +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class DashboardMediator {\n" +
      "  private refreshSubject = new Subject<void>();\n" +
      "  refresh$ = this.refreshSubject.asObservable();\n\n" +
      "  requestRefresh() {\n" +
      "    this.refreshSubject.next();\n" +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-filter",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <button (click)=\"applyFilter()\">Apply filter</button>\n" +
      "  `\n" +
      "})\n" +
      "export class FilterComponent {\n" +
      "  constructor(private mediator: DashboardMediator) {}\n\n" +
      "  applyFilter() {\n" +
      "    this.mediator.requestRefresh();\n" +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-chart",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <p>Chart data...</p>\n" +
      "  `\n" +
      "})\n" +
      "export class ChartComponent {\n" +
      "  constructor(private mediator: DashboardMediator) {\n" +
      "    this.mediator.refresh$.subscribe(() => this.loadData());\n" +
      "  }\n\n" +
      "  loadData() {\n" +
      "    console.log(\"Reload chart data\");\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "strategy-injection-token",
    name: "Strategy Pattern via Injection Tokens",
    category: "Interaction & Composition",
    shortDescription: "Swap algorithms by providing different services.",
    description:
      "Define a strategy interface and use DI tokens to inject different implementations (e.g., StripeStrategy vs PaypalStrategy).",
    exampleTs:
      'import { Injectable, InjectionToken, Inject, Component } from "@angular/core";\n\n' +
      "export interface PaymentStrategy {\n" +
      "  pay(amount: number): void;\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class PaypalStrategy implements PaymentStrategy {\n" +
      "  pay(amount: number) {\n" +
      '    console.log("PayPal payment", amount);\n' +
      "  }\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class StripeStrategy implements PaymentStrategy {\n" +
      "  pay(amount: number) {\n" +
      '    console.log("Stripe payment", amount);\n' +
      "  }\n" +
      "}\n\n" +
      'export const PAYMENT_STRATEGY = new InjectionToken<PaymentStrategy>("PAYMENT_STRATEGY");\n\n' +
      '@Component({\n' +
      '  selector: "app-checkout",\n' +
      "  standalone: true,\n" +
      "  providers: [\n" +
      "    { provide: PAYMENT_STRATEGY, useClass: PaypalStrategy }\n" +
      "  ],\n" +
      "  template: `\n" +
      "    <button (click)=\"checkout()\">Checkout</button>\n" +
      "  `\n" +
      "})\n" +
      "export class CheckoutComponent {\n" +
      "  constructor(@Inject(PAYMENT_STRATEGY) private strategy: PaymentStrategy) {}\n\n" +
      "  checkout() {\n" +
      "    this.strategy.pay(100);\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "template-method-base-class",
    name: "Template Method Pattern via Base Classes",
    category: "Interaction & Composition",
    shortDescription: "Base component defines algorithm skeleton.",
    description:
      "Abstract base components implement shared algorithm steps and rely on subclasses to override key hooks.",
    exampleTs:
      'import { Component, OnInit } from "@angular/core";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { Observable } from "rxjs";\n' +
      'import { NgFor } from "@angular/common";\n\n' +
      "export abstract class ListBaseComponent<T> implements OnInit {\n" +
      "  items: T[] = [];\n\n" +
      "  abstract fetchItems(): Observable<T[]>;\n\n" +
      "  ngOnInit() {\n" +
      "    this.fetchItems().subscribe(items => (this.items = items));\n" +
      "  }\n" +
      "}\n\n" +
      "interface UserBase {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-user-list-base",\n' +
      "  standalone: true,\n" +
      "  imports: [NgFor],\n" +
      "  template: `\n" +
      "    <ul>\n" +
      "      <li *ngFor=\"let u of items\">{{ u.name }}</li>\n" +
      "    </ul>\n" +
      "  `\n" +
      "})\n" +
      "export class UserListBaseComponent extends ListBaseComponent<UserBase> {\n" +
      "  constructor(private http: HttpClient) {\n" +
      "    super();\n" +
      "  }\n\n" +
      "  fetchItems(): Observable<UserBase[]> {\n" +
      "    return this.http.get<UserBase[]>(\"/api/users\");\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "chain-of-responsibility-interceptors",
    name: "Chain of Responsibility (HTTP Interceptors)",
    category: "Interaction & Composition",
    shortDescription: "Chain HTTP request/response handlers.",
    description:
      "Multiple HTTP interceptors each handle part of a request/response, forming a chain similar to Chain of Responsibility.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";\n' +
      'import { Observable } from "rxjs";\n\n' +
      "@Injectable()\n" +
      "export class AuthInterceptor implements HttpInterceptor {\n" +
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
      "    const cloned = req.clone({\n" +
      "      setHeaders: { Authorization: \"Bearer token\" }\n" +
      "    });\n" +
      "    return next.handle(cloned);\n" +
      "  }\n" +
      "}\n\n" +
      "@Injectable()\n" +
      "export class LoggingInterceptor implements HttpInterceptor {\n" +
      "  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {\n" +
      '    console.log("Request", req.url);\n' +
      "    return next.handle(req);\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "adapter-service",
    name: "Adapter Pattern via Services",
    category: "Interaction & Composition",
    shortDescription: "Normalize awkward backend APIs.",
    description:
      "Adapter services translate backend API shapes into clean frontend models so components remain unaffected by backend quirks.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { map, Observable } from "rxjs";\n\n' +
      "interface ApiUser {\n" +
      "  first_name: string;\n" +
      "  last_name: string;\n" +
      "}\n\n" +
      "export interface User {\n" +
      "  fullName: string;\n" +
      "}\n\n" +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class UserAdapterService {\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  getUsers(): Observable<User[]> {\n" +
      "    return this.http.get<ApiUser[]>(\"/api/users\").pipe(\n" +
      "      map(apiUsers =>\n" +
      "        apiUsers.map(u => ({ fullName: `${u.first_name} ${u.last_name}` }))\n" +
      "      )\n" +
      "    );\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "class-decorators",
    name: "Decorator Pattern via Class Decorators",
    category: "Interaction & Composition",
    shortDescription: "Decorators add metadata/behavior to classes.",
    description:
      "Angular decorators like @Component and @Injectable are special cases; custom decorators can also wrap or log component behavior.",
    exampleTs:
      'import { Component } from "@angular/core";\n\n' +
      "function LogClass(constructor: Function) {\n" +
      "  console.log(\"Component created:\", constructor.name);\n" +
      "}\n\n" +
      "@LogClass\n" +
      '@Component({\n' +
      '  selector: "app-logged",\n' +
      "  standalone: true,\n" +
      '  template: `I am logged`\n' +
      "})\n" +
      "export class LoggedComponent {}\n"
  },

  // ---------------------------------------------------------------------------
  // Rendering & Performance patterns
  // ---------------------------------------------------------------------------
  {
    id: "onpush-change-detection",
    name: "OnPush Change Detection",
    category: "Rendering & Performance",
    shortDescription: "Render only when inputs or observables change.",
    description:
      "ChangeDetectionStrategy.OnPush tells Angular to skip checks unless @Input() references change or an observable emits.",
    exampleTs:
      'import { Component, ChangeDetectionStrategy, Input } from "@angular/core";\n\n' +
      '@Component({\n' +
      '  selector: "app-user-card",\n' +
      "  standalone: true,\n" +
      "  changeDetection: ChangeDetectionStrategy.OnPush,\n" +
      "  template: `{{ user.name }}`\n" +
      "})\n" +
      "export class UserCardComponent {\n" +
      "  @Input() user!: { name: string };\n" +
      "}\n"
  },
  {
    id: "trackby-ngfor",
    name: "trackBy for *ngFor – DEPRECATED",
    category: "Rendering & Performance",
    shortDescription: "DEPRECATED: use @for with track expressions instead of *ngFor + trackBy.",
    description:
      "DEPRECATED in modern Angular: trackBy with *ngFor was the classic way to minimize DOM churn, but Angular 17+ encourages @for with an inline track expression for better performance and readability.",
    exampleTs:
      'import { Component } from "@angular/core";\n' +
      'import { NgFor } from "@angular/common";\n\n' +
      "interface Item {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-items",\n' +
      "  standalone: true,\n" +
      "  imports: [NgFor],\n" +
      "  template: `\n" +
      "    <li *ngFor=\"let item of items; trackBy: trackById\">\n" +
      "      {{ item.name }}\n" +
      "    </li>\n" +
      "  `\n" +
      "})\n" +
      "export class ItemsComponent {\n" +
      "  items: Item[] = [\n" +
      "    { id: 1, name: \"One\" },\n" +
      "    { id: 2, name: \"Two\" }\n" +
      "  ];\n\n" +
      "  trackById(index: number, item: Item) {\n" +
      "    return item.id;\n" +
      "  }\n" +
      "}\n"
  },
  // NEW: modern @for control-flow pattern with track expression
  {
    id: "control-flow-for",
    name: "Built-in Control Flow: @for",
    category: "Rendering & Performance",
    shortDescription: "Use @for with track expressions instead of *ngFor / trackBy.",
    description:
      "Angular's built-in @for block replaces *ngFor and accepts an inline track expression, offering a faster diffing algorithm and cleaner syntax.",
    exampleTs:
      'import { Component } from "@angular/core";\n\n' +
      "interface Item {\n" +
      "  id: number;\n" +
      "  name: string;\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-items-for",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    @for (item of items; track item.id) {\n" +
      "      <div>{{ item.name }}</div>\n" +
      "    }\n" +
      "  `\n" +
      "})\n" +
      "export class ItemsForComponent {\n" +
      "  items: Item[] = [\n" +
      "    { id: 1, name: \"One\" },\n" +
      "    { id: 2, name: \"Two\" }\n" +
      "  ];\n" +
      "}\n"
  },
  {
    id: "virtual-scroll-cdk",
    name: "Virtual Scrolling (CDK)",
    category: "Rendering & Performance",
    shortDescription: "Render only the visible slice of long lists.",
    description:
      "Angular CDK virtual scroll shows just the visible portion of a long list to reduce DOM size.",
    exampleTs:
      'import { Component } from "@angular/core";\n' +
      'import { ScrollingModule } from "@angular/cdk/scrolling";\n\n' +
      '@Component({\n' +
      '  selector: "app-virtual-list",\n' +
      "  standalone: true,\n" +
      "  imports: [ScrollingModule],\n" +
      "  template: `\n" +
      '    <cdk-virtual-scroll-viewport itemSize="50" style="height: 300px">\n' +
      "      <div *cdkVirtualFor=\"let item of items\">\n" +
      "        {{ item }}\n" +
      "      </div>\n" +
      "    </cdk-virtual-scroll-viewport>\n" +
      "  `\n" +
      "})\n" +
      "export class VirtualListComponent {\n" +
      "  items = Array.from({ length: 1000 }).map((_, i) => `Item ${i}`);\n" +
      "}\n"
  },
  {
    id: "lazy-loading-routes",
    name: "Lazy Loading Routes",
    category: "Rendering & Performance",
    shortDescription: "Load feature code only when needed.",
    description:
      "Lazy route configuration with loadChildren or loadComponent delays loading of feature bundles until the route is visited.",
    exampleTs:
      'import { Routes } from "@angular/router";\n\n' +
      "export const routes: Routes = [\n" +
      "  {\n" +
      '    path: "profile",\n' +
      "    loadComponent: () =>\n" +
      '      import("./profile/profile.component").then(m => m.ProfileComponent)\n' +
      "  }\n" +
      "];\n"
  },
  {
    id: "debounce-throttle-rxjs",
    name: "Debounce / Throttle with RxJS",
    category: "Rendering & Performance",
    shortDescription: "Limit how often expensive logic runs.",
    description:
      "Use debounceTime, throttleTime, and distinctUntilChanged to avoid flooding the UI with updates from rapid events (typing, scrolling).",
    exampleTs:
      'import { Component } from "@angular/core";\n' +
      'import { Subject } from "rxjs";\n' +
      'import { debounceTime, distinctUntilChanged } from "rxjs/operators";\n\n' +
      '@Component({\n' +
      '  selector: "app-search",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <input (input)=\"search$.next($event.target.value)\" placeholder=\"Search\" />\n" +
      "  `\n" +
      "})\n" +
      "export class SearchComponent {\n" +
      "  search$ = new Subject<string>();\n\n" +
      "  constructor() {\n" +
      "    this.search$\n" +
      "      .pipe(\n" +
      "        debounceTime(300),\n" +
      "        distinctUntilChanged()\n" +
      "      )\n" +
      "      .subscribe(value => console.log(\"Search for\", value));\n" +
      "  }\n" +
      "}\n"
  },

  // ---------------------------------------------------------------------------
  // API & Data Integration patterns
  // ---------------------------------------------------------------------------
  {
    id: "facade",
    name: "Facade Pattern",
    category: "API & Data Integration",
    shortDescription: "One simple API for complex underlying layers.",
    description:
      "A facade service wraps NgRx, repositories, and HTTP calls behind a simple, UI-friendly interface.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { Store } from "@ngrx/store";\n' +
      'import { Observable } from "rxjs";\n\n' +
      "import { Product } from \"./product.model\";\n" +
      "import { loadProducts, addProduct } from \"./product.actions\";\n" +
      "import { selectProducts, selectProductsLoading } from \"./product.selectors\";\n\n" +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class ProductsFacade {\n" +
      "  products$: Observable<Product[]> = this.store.select(selectProducts);\n" +
      "  loading$: Observable<boolean> = this.store.select(selectProductsLoading);\n\n" +
      "  constructor(private store: Store) {}\n\n" +
      "  loadProducts() {\n" +
      "    this.store.dispatch(loadProducts());\n" +
      "  }\n\n" +
      "  addProduct(product: Product) {\n" +
      "    this.store.dispatch(addProduct({ product }));\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "repository",
    name: "Repository Pattern",
    category: "API & Data Integration",
    shortDescription: "Abstract persistence and HTTP access.",
    description:
      "Repository services encapsulate fetching, caching, and mapping data so the rest of the app deals with domain models only.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { Observable } from "rxjs";\n\n' +
      "export interface ProductRepoModel {\n" +
      "  id: string;\n" +
      "  name: string;\n" +
      "}\n\n" +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class ProductRepository {\n" +
      "  constructor(private http: HttpClient) {}\n\n" +
      "  findAll(): Observable<ProductRepoModel[]> {\n" +
      "    return this.http.get<ProductRepoModel[]>(\"/api/products\");\n" +
      "  }\n\n" +
      "  findById(id: string): Observable<ProductRepoModel> {\n" +
      "    return this.http.get<ProductRepoModel>(`/api/products/${id}`);\n" +
      "  }\n" +
      "}\n"
  },
  {
    id: "ngrx-effects",
    name: "Effects Pattern (NgRx Effects)",
    category: "API & Data Integration",
    shortDescription: "Side-effectful async operations for the store.",
    description:
      "NgRx Effects run async logic (HTTP calls, logging, routing) in response to actions, separate from reducers and components.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { Actions, createEffect, ofType } from "@ngrx/effects";\n' +
      'import { HttpClient } from "@angular/common/http";\n' +
      'import { catchError, map, of, switchMap } from "rxjs";\n\n' +
      "import {\n" +
      "  loadProducts,\n" +
      "  loadProductsSuccess,\n" +
      "  loadProductsFailure\n" +
      "} from \"./product.actions\";\n" +
      "import { Product } from \"./product.model\";\n\n" +
      "@Injectable()\n" +
      "export class ProductsEffects {\n" +
      "  loadProducts$ = createEffect(() =>\n" +
      "    this.actions$.pipe(\n" +
      "      ofType(loadProducts),\n" +
      "      switchMap(() =>\n" +
      "        this.http.get<Product[]>(\"/api/products\").pipe(\n" +
      "          map(products => loadProductsSuccess({ products })),\n" +
      "          catchError(() => of(loadProductsFailure()))\n" +
      "        )\n" +
      "      )\n" +
      "    )\n" +
      "  );\n\n" +
      "  constructor(private actions$: Actions, private http: HttpClient) {}\n" +
      "}\n"
  },

  // ---------------------------------------------------------------------------
  // Core / Architectural pattern
  // ---------------------------------------------------------------------------
  {
    id: "dependency-injection",
    name: "Dependency Injection (DI)",
    category: "Core / Architectural",
    shortDescription: "Supply dependencies from the outside using Angular DI.",
    description:
      "Dependency Injection in Angular uses injectors and providers so components and services receive ready-to-use dependencies instead of constructing them manually.",
    exampleTs:
      'import { Injectable } from "@angular/core";\n' +
      'import { Component } from "@angular/core";\n\n' +
      "@Injectable({ providedIn: \"root\" })\n" +
      "export class LoggerService {\n" +
      "  log(msg: string) {\n" +
      "    console.log(\"[LOG]\", msg);\n" +
      "  }\n" +
      "}\n\n" +
      '@Component({\n' +
      '  selector: "app-home",\n' +
      "  standalone: true,\n" +
      "  template: `\n" +
      "    <button (click)=\"sayHi()\">Say hi</button>\n" +
      "  `\n" +
      "})\n" +
      "export class HomeComponent {\n" +
      "  constructor(private logger: LoggerService) {}\n\n" +
      "  sayHi() {\n" +
      "    this.logger.log(\"Hello from HomeComponent\");\n" +
      "  }\n" +
      "}\n"
  }
];
