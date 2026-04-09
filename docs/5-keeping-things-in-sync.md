# Keeping Things in Sync

## Intro

We’ve shown data out. We’ve handled clicks and submits coming in.

Now we’re going to wire the middle — the part where the user types, and the field and your state stay friends.

That’s two-way binding in plain English. Not a separate Angular religion — just two directions on the same control.

---

## The anchor

When this clicks for people, it usually sounds like this.

Now your app and the UI are having a conversation.

State flows down into the control. Keystrokes flow back up into state. Neither side is lying to the other. That’s what we mean by in sync.

---

## Signals — be explicit

Signals don’t use `[(ngModel)]` the way a plain field property does. You split the job on purpose.

Out to the input — current value:

In from the input — next value:

```ts
protected readonly searchTerm = signal('');
```

```html
<input
  type="search"
  [ngModel]="searchTerm()"
  (ngModelChange)="searchTerm.set($event)"
/>
```

Read the signal for display. Write with `set` when the control says the text changed.

Same pattern on our list screen — Kendo textbox, same bindings, plus `FormsModule` in the component imports so `ngModel` exists.

Why split it instead of one cute syntax? Because a signal isn’t a mutable field Angular can assign into. You want one front door for updates — `set` or `update` — so everything else that depends on `searchTerm` stays predictable.

Type once — `searchTerm` moves — `filteredRecipes` recomputes — the list updates. Conversation.

---

## The sugar you’ll still see

On a normal class property, Angular lets you write:

```html
<input [(ngModel)]="username" />
```

That’s shorthand for value down, change up. Mentally it’s the same handshake we just wrote longhand for the signal.

When you teach, connect those dots. Signals get the explicit version so nobody thinks magic is happening.

---

## When a form grows up

One search box is ngModel and a signal. Fine.

Add recipe is a different shape — several fields, validation, submit only when the whole thing is honest. That’s where reactive forms earn their keep.

You group controls in a `FormBuilder` group, bind the form in the template, and name each control:

```ts
protected readonly form = this.fb.nonNullable.group({
  name: ['', Validators.required],
  description: ['', Validators.required],
  imgUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
});
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <kendo-textbox formControlName="name" size="large" />
  <!-- description, imgUrl, ... -->
  <button kendoButton type="submit" themeColor="primary">Save recipe</button>
</form>
```

The values live in the form model. You don’t mirror every keystroke into individual signals unless you have a reason. On submit you read `getRawValue()`, call the service, navigate away.

So the progression I’d give an audience: two-way for a single piece of UI state; reactive forms when you need structure and rules.

---

## Close

Down — what the user sees. Up — what your app remembers.

Split bindings with signals on purpose. Reach for `FormGroup` when the screen is really a form, not a single filter.

Now your app and the UI are having a conversation — and you can hear both sides.
