# Nexus UI — Reusable React UI Component Library

> **Week 2 Frontend Architecture Task** — Reusable, accessible, and responsive component library engineered with ReactJS, Vite, semantic HTML5, and vanilla CSS custom properties (design tokens).

![Nexus UI Showcase Preview](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop)

---

## 📌 Project Overview

This repository contains **Nexus UI**, an accessible and modular ReactJS component library built for modern web applications. The project was developed to demonstrate core principles of frontend architecture: component encapsulation, declarative props APIs, keyboard and screen reader accessibility (WAI-ARIA), responsive layouts without heavy third-party UI frameworks, and design token hierarchies.

### Objectives
* **Component Modularity:** Build self-contained, composable React components with zero unnecessary dependencies.
* **Declarative Props API:** Provide flexible props for visual variants, sizing, disabled/loading states, and event callbacks.
* **Pure CSS & Design Tokens:** Implement consistent design variables (`:root` tokens for color palettes, spacing, shadows, and radii) without Tailwind or heavy utility bundles.
* **Accessibility (a11y):** Ensure full keyboard navigability, visible focus indicators (`:focus-visible`), proper `htmlFor/id` label linkages, and ARIA roles (`role="dialog"`, `role="alert"`, `aria-modal="true"`).
* **Responsive Layouts:** Implement fluid layouts supporting mobile screens (320px+), tablets (768px+), and wide desktop viewports (1440px+).

---

## 🛠 Technologies Used

* **React 18** (Functional components, Hooks: `useState`, `useEffect`, `useRef`, `useId`)
* **Vite 5** (Fast ES-module development and production bundling)
* **JavaScript (ES6+)** (Clean, modern vanilla JavaScript)
* **HTML5 & WAI-ARIA** (Semantic elements: `<article>`, `<header>`, `<nav>`, `<button>`, `role="dialog"`, `aria-live`)
* **CSS3 Custom Properties** (Design tokens, CSS Grid, Flexbox, media queries, glassmorphism)

---

## 📁 Project Structure

```text
frontend-architecture-week2/
├── public/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.css
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   └── Card.css
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   └── Modal.css
│   │   ├── Alert/
│   │   │   ├── Alert.jsx
│   │   │   └── Alert.css
│   │   ├── Badge/
│   │   │   ├── Badge.jsx
│   │   │   └── Badge.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Select/
│   │   │   ├── Select.jsx
│   │   │   └── Select.css
│   │   └── index.js             # Central barrel export
│   │
│   ├── pages/
│   │   ├── ComponentShowcase.jsx # Interactive dashboard showcase
│   │   └── ComponentShowcase.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css                 # Global design tokens & CSS reset
│
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md
└── COMPONENT_DOCUMENTATION.md    # Comprehensive academic report
```

---

## 🚀 Getting Started & Installation

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone the repository
```bash
git clone https://github.com/Snigdhendu-Chhotaray-28/frontend-architecture-week2.git
cd frontend-architecture-week2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the Component Showcase.

### 4. Build for production
```bash
npm run build
```

---

## 🧩 Component Catalog & Props API

### 1. Button
An accessible interactive action button supporting multiple visual variants, sizing options, animated SVG loading spinners, and icon slots.

```jsx
import { Button } from './components';

<Button variant="primary" size="medium" onClick={() => alert('Clicked!')}>
  Get Started
</Button>

<Button variant="danger" loading={true}>
  Deleting...
</Button>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'danger' \| 'success' \| 'ghost'` | `'primary'` | Visual theme aesthetic |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button dimensions and font sizing |
| `disabled`| `boolean` | `false` | Disables interaction and sets `aria-disabled` |
| `loading` | `boolean` | `false` | Renders animated spinner and sets `aria-busy` |
| `fullWidth`| `boolean` | `false` | Stretches button across 100% width |
| `icon` | `ReactNode` | `null` | Optional leading/trailing icon |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Placement of the icon |

---

### 2. Input
A form field component providing automatic unique ID generation (`useId`), label-to-input association, error state styling, password show/hide toggle, and helper captions.

```jsx
import { Input } from './components';

<Input
  label="Email Address"
  type="email"
  placeholder="alex@example.com"
  required={true}
  helperText="We will never share your email address."
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Label text connected via `htmlFor` |
| `type` | `string` | `'text'` | HTML input type (`text`, `email`, `password`, etc.) |
| `required`| `boolean` | `false` | Renders `*` badge and sets `aria-required` |
| `error` | `string` | `''` | Displays error message and red focus ring |
| `helperText` | `string` | `''` | Descriptive caption beneath input |
| `startIcon` | `ReactNode` | `null` | Leading decorative icon |

---

### 3. Select / Dropdown
An accessible form select menu supporting string or object arrays, custom placeholder prompt, and error handling.

```jsx
import { Select } from './components';

<Select
  label="Job Role"
  placeholder="Select role..."
  options={[
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Engineer' }
  ]}
  required={true}
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Accessible label for dropdown |
| `options` | `Array<Object \| string>` | `[]` | Array of options (`{value, label, disabled}`) |
| `placeholder`| `string` | `'Select an option...'` | Default initial unselected prompt |
| `error` | `string` | `''` | Displays error message and alert role |
| `disabled`| `boolean` | `false` | Disables selection |

---

### 4. Card
A versatile container element for content presentation supporting cover images, badges, header actions, horizontal/vertical layouts, and hover animations.

```jsx
import { Card, Badge, Button } from './components';

<Card
  image="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
  imageAlt="React architecture"
  badge={<Badge variant="primary">Module 2</Badge>}
  title="Component Design Systems"
  description="Learn reusable React patterns."
  footer={<Button variant="primary" size="small">Explore</Button>}
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `undefined` | Main heading inside card |
| `subtitle` | `string` | `undefined` | Secondary subtitle |
| `image` | `string` | `undefined` | Cover image URL |
| `badge` | `ReactNode` | `null` | Header badge element |
| `footer` | `ReactNode` | `null` | Bottom actions slot |
| `orientation`| `'vertical' \| 'horizontal'` | `'vertical'` | Card orientation layout |
| `hoverable`| `boolean` | `true` | Enables hover elevation effect |

---

### 5. Modal Dialog
A WAI-ARIA compliant modal dialog with keyboard `Escape` dismissal, backdrop overlay click handling, body scroll locking, and focus containment.

```jsx
import { Modal, Button } from './components';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation Dialog"
  size="medium"
  footer={
    <Button variant="primary" onClick={() => setIsOpen(false)}>
      Done
    </Button>
  }
>
  <p>Dialog body content goes here.</p>
</Modal>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `isOpen` | `boolean` | `false` | Controls open/close visibility |
| `onClose` | `Function` | `undefined` | Triggered on ESC key, backdrop, or close button |
| `title` | `string` | `undefined` | Dialog title connected via `aria-labelledby` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Maximum width bounds |
| `footer` | `ReactNode` | `null` | Optional footer action buttons |

---

### 6. Alert
Contextual notification banners supporting 4 severity levels (`info`, `success`, `warning`, `error`), dismissibility, and ARIA live regions.

```jsx
import { Alert } from './components';

<Alert
  type="success"
  title="Saved!"
  message="Your profile has been updated."
  dismissible={true}
  onClose={() => console.log('Dismissed')}
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert severity and color variant |
| `title` | `string` | `undefined` | Bold title heading |
| `message` | `string` | `undefined` | Body message text |
| `dismissible`| `boolean` | `false` | Renders dismiss button |
| `onClose` | `Function` | `undefined` | Callback on close |

---

### 7. Badge
Compact status indicators and category tags with customizable color variants, sizes, pill shapes, and live status dots.

```jsx
import { Badge } from './components';

<Badge variant="success" dot={true}>Online</Badge>
<Badge variant="primary" pill={true} size="small">v1.0.0</Badge>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'primary'` | Color scheme |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Text and padding scale |
| `pill` | `boolean` | `false` | Full rounded border radius |
| `dot` | `boolean` | `false` | Renders circular status dot |

---

### 8. Navbar
A responsive navigation header with brand logo, nav links, actions slot (theme toggle/buttons), and an accessible mobile hamburger drawer.

```jsx
import { Navbar, Button } from './components';

<Navbar
  brand="Nexus UI"
  links={[
    { label: 'Home', href: '#home', active: true },
    { label: 'Components', href: '#components' }
  ]}
  actions={<Button size="small">Sign In</Button>}
/>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `brand` | `ReactNode \| string` | `'NexusUI'` | Brand logo or text |
| `links` | `Array<{label, href, active, onClick}>` | `[]` | List of navigation items |
| `actions` | `ReactNode` | `null` | Right-side actions (buttons, theme toggle) |
| `sticky` | `boolean` | `true` | Sticky header with blur backdrop |

---

## ♿ Accessibility Implementation Details

1. **Focus Visibility:** Standard `:focus-visible` styling applied across interactive elements (buttons, inputs, select fields, and modal containers) with high-contrast outlines.
2. **Semantic HTML:** Pure native semantic elements used wherever appropriate (`<button>`, `<label>`, `<article>`, `<header>`, `<nav>`, `<kbd>`).
3. **Form Association:** All inputs and select elements dynamically generate unique IDs using React's `useId()` hook to link `<label htmlFor="...">` and `<p aria-describedby="...">`.
4. **WAI-ARIA Dialog:** The `Modal` component includes `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, body scroll prevention, and keyboard `Escape` handlers.
5. **Color Independence:** Status indicators do not rely solely on color (badges utilize text + dot indicators; alerts provide semantic icons and distinct heading labels).

---

## 📱 Responsive Design Matrix

| Breakpoint | Target Devices | Behavior |
| :--- | :--- | :--- |
| **320px – 480px** | Mobile phones | Single-column cards, full-width inputs, collapsed hamburger navigation menu |
| **481px – 768px** | Tablets / Phablets | 2-column component preview grids, accessible touch targets (min 42px) |
| **769px – 1024px** | Laptops / Small Monitors | Full horizontal navbar links, horizontal card layouts |
| **1025px – 1440px+**| Desktop Displays | Max-width 1200px container, multi-column forms and showcases |

---

## 🧪 Testing Checklist

### Functional Verification
- [x] All 6 button variants render correctly with distinct hover/active states.
- [x] Button loading spinner activates and disables click interaction.
- [x] Password input visibility toggle reveals and masks text securely.
- [x] Input error states show validation message and red border.
- [x] Select component handles string and object option formats.
- [x] Modal opens, locks body scroll, and closes via ESC, backdrop, or close button.
- [x] Alerts can be dismissed individually and reset via live controls.
- [x] Client-side form validation verifies required fields, email format, and password length.

### Planned Cross-Browser Testing Checklist
- [x] **Google Chrome** (Tested on Chromium v120+)
- [ ] **Mozilla Firefox** (Planned manual verification)
- [ ] **Microsoft Edge** (Planned manual verification)
- [ ] **Apple Safari** (Planned WebKit verification)

---

## 🔮 Future Improvements

1. Add a **Toast Notification System** with queue management.
2. Introduce a **Tabs / Accordion** component for dense content layouts.
3. Provide an optional **TypeScript `.d.ts` declaration bundle** for TypeScript consumers.
4. Support automated unit tests using **Vitest** and **React Testing Library**.

---

## 📄 License

This project is created for educational and academic assessment purposes under the MIT License.
