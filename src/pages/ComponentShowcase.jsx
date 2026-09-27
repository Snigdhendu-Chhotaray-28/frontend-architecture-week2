import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Modal,
  Alert,
  Badge,
  Navbar,
  Select,
} from '../components';
import './ComponentShowcase.css';

/**
 * Reusable Code Snippet Viewer with Copy functionality
 */
const CodePreview = ({ code, language = 'jsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span>{language}</span>
        <button type="button" className="copy-btn" onClick={handleCopy} aria-label="Copy code">
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const ComponentShowcase = () => {
  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Button interactive demo states
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Input interactive demo state
  const [sampleInput, setSampleInput] = useState('');
  const [inputErrorDemo, setInputErrorDemo] = useState(false);

  // Select interactive demo state
  const [selectedRole, setSelectedRole] = useState('');

  // Modal interactive demo state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('medium');

  // Alert interactive demo states
  const [showAlerts, setShowAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    error: true,
  });

  // Form Demo State & Client-Side Validation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    experienceLevel: 'intermediate',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTheme = () => {
    const nextTheme = !isDarkTheme;
    setIsDarkTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme ? 'dark' : 'light');
  };

  // Handle Form Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle Form Submit with Client Validation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email format (e.g. user@example.com).';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.role) {
      errors.role = 'Please select your role from the list.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormSubmitted(false);
      return;
    }

    // Simulate submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormErrors({});
    }, 1200);
  };

  const navLinks = [
    { label: 'Buttons', href: '#buttons' },
    { label: 'Inputs', href: '#inputs' },
    { label: 'Select', href: '#select' },
    { label: 'Cards', href: '#cards' },
    { label: 'Badges', href: '#badges' },
    { label: 'Alerts', href: '#alerts' },
    { label: 'Modal', href: '#modal' },
    { label: 'Form Demo', href: '#form-demo' },
    { label: 'Testing', href: '#testing' },
  ];

  return (
    <div className="showcase-page">
      {/* 1. Global Navigation Bar Demo */}
      <Navbar
        brand="Nexus UI"
        links={navLinks}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="secondary"
              size="small"
              onClick={toggleTheme}
              ariaLabel="Toggle theme"
            >
              {isDarkTheme ? '☀️ Light' : '🌙 Dark'}
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsModalOpen(true)}
            >
              Quick Modal
            </Button>
          </div>
        }
      />

      {/* Hero Header */}
      <header className="showcase-hero">
        <div className="container">
          <div className="hero-badge-container">
            <Badge variant="primary" pill dot>
              Week 2 Internship Task • Component Architecture
            </Badge>
          </div>
          <h1 className="hero-title">
            Reusable <span className="hero-gradient-text">React UI Library</span>
          </h1>
          <p className="hero-subtitle">
            A modular, highly accessible, and cleanly engineered React component library built
            with pure CSS, design tokens, and semantic HTML.
          </p>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <span className="hero-stat-num">8+</span>
              <span className="hero-stat-label">UI Components</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-num">100%</span>
              <span className="hero-stat-label">Pure CSS Tokens</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-num">WCAG</span>
              <span className="hero-stat-label">Accessible Semantics</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-num">0</span>
              <span className="hero-stat-label">Heavy Frameworks</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Navigation Pills */}
      <nav className="quick-nav" aria-label="Quick Jump Links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="quick-nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <main className="container">
        {/* ====================================================================
            2. BUTTON COMPONENT SECTION
            ==================================================================== */}
        <section id="buttons" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 01</span>
            <h2 className="section-title">Button</h2>
            <p className="section-desc">
              Customizable action triggers supporting semantic variants, sizes, loading spinners,
              icon slots, full-width layouts, and keyboard focus states.
            </p>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Live Variants & Interactive Controls</span>
              <div className="demo-card__controls">
                <label className="demo-toggle-label">
                  <input
                    type="checkbox"
                    checked={btnLoading}
                    onChange={(e) => setBtnLoading(e.target.checked)}
                  />
                  Toggle Loading
                </label>
                <label className="demo-toggle-label">
                  <input
                    type="checkbox"
                    checked={btnDisabled}
                    onChange={(e) => setBtnDisabled(e.target.checked)}
                  />
                  Toggle Disabled
                </label>
                <Badge variant="neutral">Clicks: {clickCount}</Badge>
              </div>
            </div>

            <div className="demo-card__body">
              <Button
                variant="primary"
                loading={btnLoading}
                disabled={btnDisabled}
                onClick={() => setClickCount((c) => c + 1)}
              >
                Primary
              </Button>
              <Button
                variant="secondary"
                loading={btnLoading}
                disabled={btnDisabled}
                onClick={() => setClickCount((c) => c + 1)}
              >
                Secondary
              </Button>
              <Button
                variant="outline"
                loading={btnLoading}
                disabled={btnDisabled}
                onClick={() => setClickCount((c) => c + 1)}
              >
                Outline
              </Button>
              <Button
                variant="success"
                loading={btnLoading}
                disabled={btnDisabled}
                onClick={() => setClickCount((c) => c + 1)}
              >
                Success
              </Button>
              <Button
                variant="danger"
                loading={btnLoading}
                disabled={btnDisabled}
                onClick={() => setClickCount((c) => c + 1)}
              >
                Danger
              </Button>
              <Button
                variant="ghost"
                loading={btnLoading}
                disabled={btnDisabled}
                onClick={() => setClickCount((c) => c + 1)}
              >
                Ghost
              </Button>
            </div>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Sizes & Icon Adornments</span>
            </div>
            <div className="demo-card__body">
              <Button variant="primary" size="small">
                Small Size
              </Button>
              <Button variant="primary" size="medium">
                Medium (Default)
              </Button>
              <Button variant="primary" size="large">
                Large Size
              </Button>
              <Button
                variant="secondary"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                }
              >
                Download Icon
              </Button>
            </div>
          </div>

          <CodePreview
            code={`import { Button } from './components';

// Primary Button with click handler
<Button variant="primary" size="medium" onClick={handleClick}>
  Save Changes
</Button>

// Loading State (shows animated SVG spinner and sets aria-busy)
<Button variant="primary" loading={true}>
  Submitting...
</Button>

// Danger Outline with icon
<Button variant="danger" icon={<TrashIcon />}>
  Delete Account
</Button>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost'</code></td>
                  <td><code>'primary'</code></td>
                  <td>Visual style aesthetic of the button</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'small' | 'medium' | 'large'</code></td>
                  <td><code>'medium'</code></td>
                  <td>Dimensions, padding, and font size</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disables button interaction and applies opacity</td>
                </tr>
                <tr>
                  <td><code>loading</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Renders spinner, disables clicks, sets <code>aria-busy</code></td>
                </tr>
                <tr>
                  <td><code>fullWidth</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Stretches button across 100% of container width</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>null</code></td>
                  <td>Optional leading or trailing icon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            3. INPUT / FORM FIELD SECTION
            ==================================================================== */}
        <section id="inputs" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 02</span>
            <h2 className="section-title">Input / Form Field</h2>
            <p className="section-desc">
              Accessible input component with automatic <code>htmlFor/id</code> association,
              password visibility toggle, helper text, error styling, and start/end icon slots.
            </p>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Live Form Field Variations</span>
              <label className="demo-toggle-label">
                <input
                  type="checkbox"
                  checked={inputErrorDemo}
                  onChange={(e) => setInputErrorDemo(e.target.checked)}
                />
                Simulate Error State
              </label>
            </div>

            <div className="demo-card__body demo-card__body--grid">
              <Input
                label="Full Name"
                placeholder="e.g. Alex Mercer"
                required
                value={sampleInput}
                onChange={(e) => setSampleInput(e.target.value)}
                helperText="Enter your official legal name."
                error={inputErrorDemo ? 'Please enter a valid legal name.' : ''}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="alex@example.com"
                required
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                helperText="We will never share your email."
              />

              <Input
                label="Password Field (With Toggle)"
                type="password"
                placeholder="Create a strong password"
                required
                helperText="Click the eye icon to reveal password."
              />

              <Input
                label="Disabled Input"
                defaultValue="system_generated_key_8849"
                disabled
                helperText="This field is read-only and disabled."
              />
            </div>
          </div>

          <CodePreview
            code={`import { Input } from './components';

// Accessible Text Input with Helper Text
<Input
  label="Email Address"
  type="email"
  placeholder="user@example.com"
  required={true}
  helperText="Used for account login and notifications"
/>

// Password Input with built-in show/hide toggle
<Input
  label="Password"
  type="password"
  placeholder="Enter secret"
  required={true}
/>

// Field with Error Message (triggers role="alert" and aria-invalid)
<Input
  label="Username"
  error="Username is already taken"
/>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Descriptive text connected with <code>htmlFor</code></td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td><code>string</code></td>
                  <td><code>'text'</code></td>
                  <td>HTML input type (text, email, password, number, etc.)</td>
                </tr>
                <tr>
                  <td><code>required</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Marks required indicator (*) and sets <code>aria-required</code></td>
                </tr>
                <tr>
                  <td><code>error</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Displays validation error text and red focus border</td>
                </tr>
                <tr>
                  <td><code>helperText</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Supporting guidance text rendered beneath input</td>
                </tr>
                <tr>
                  <td><code>startIcon / endIcon</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>null</code></td>
                  <td>Decorative icon slots inside the input frame</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            4. SELECT / DROPDOWN COMPONENT SECTION
            ==================================================================== */}
        <section id="select" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 03</span>
            <h2 className="section-title">Select / Dropdown</h2>
            <p className="section-desc">
              Custom-styled select dropdown supporting arrays of string or object options,
              custom placeholders, error handling, and keyboard accessibility.
            </p>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Live Select Examples</span>
              {selectedRole && <Badge variant="secondary">Selected: {selectedRole}</Badge>}
            </div>

            <div className="demo-card__body demo-card__body--grid">
              <Select
                label="Target Role"
                placeholder="Choose your specialization..."
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
                options={[
                  { value: 'frontend', label: 'Frontend Developer' },
                  { value: 'backend', label: 'Backend Engineer' },
                  { value: 'fullstack', label: 'Fullstack Architect' },
                  { value: 'uiux', label: 'UI/UX Designer' },
                  { value: 'devops', label: 'DevOps Specialist' },
                ]}
                helperText="Select the domain best matching your career goals."
              />

              <Select
                label="Country / Region"
                options={['India', 'United States', 'United Kingdom', 'Germany', 'Japan', 'Canada']}
                placeholder="Select country..."
              />

              <Select
                label="Disabled Selection"
                disabled
                options={['Enterprise Tier (Locked)', 'Custom Plan']}
                helperText="Plan selection currently locked."
              />

              <Select
                label="Error State Example"
                error="Please choose a valid deployment environment."
                options={['Production', 'Staging', 'Local Sandbox']}
              />
            </div>
          </div>

          <CodePreview
            code={`import { Select } from './components';

const roleOptions = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Engineer' },
  { value: 'fullstack', label: 'Full Stack Architect' }
];

<Select
  label="Specialization"
  options={roleOptions}
  value={role}
  onChange={(e) => setRole(e.target.value)}
  placeholder="Select an option..."
  required={true}
  helperText="Select your primary skill"
/>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Accessible field label</td>
                </tr>
                <tr>
                  <td><code>options</code></td>
                  <td><code>Array&lt;Object | string&gt;</code></td>
                  <td><code>[]</code></td>
                  <td>List of options with value, label, and optional disabled flag</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td><code>string</code></td>
                  <td><code>'Select an option...'</code></td>
                  <td>First disabled option serving as placeholder</td>
                </tr>
                <tr>
                  <td><code>error</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Validation error message and styling</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disables user interaction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            5. CARD COMPONENT SECTION
            ==================================================================== */}
        <section id="cards" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 04</span>
            <h2 className="section-title">Card</h2>
            <p className="section-desc">
              Versatile container for grouping related content with cover media, meta badges,
              titles, descriptions, action footers, and subtle hover lifts.
            </p>
          </div>

          <div className="demo-grid-2">
            {/* Vertical Card 1 */}
            <Card
              image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
              imageAlt="React.js code concept"
              badge={<Badge variant="primary" size="small">React Architecture</Badge>}
              title="Modern Component Library"
              subtitle="Design Systems & Modularity"
              description="Learn how to structure reusable React components with clean props interfaces, pure CSS tokens, and semantic accessibility."
              footer={
                <>
                  <Badge variant="success" dot size="small">Active Module</Badge>
                  <Button variant="primary" size="small">Explore Module</Button>
                </>
              }
            />

            {/* Vertical Card 2 */}
            <Card
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
              imageAlt="Clean code editor screen"
              badge={<Badge variant="secondary" size="small">Performance</Badge>}
              title="State & Hooks Pattern"
              subtitle="Predictable State Flows"
              description="Master React hooks such as useState, useEffect, and custom hooks for building responsive, bullet-proof user interfaces."
              footer={
                <>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏱ 15 min read</span>
                  <Button variant="outline" size="small">Read Guide</Button>
                </>
              }
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            {/* Horizontal Card */}
            <Card
              orientation="horizontal"
              image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
              imageAlt="Web development workspace"
              badge={<Badge variant="warning" size="small">Responsive UI</Badge>}
              title="Cross-Device Layout Patterns"
              subtitle="Mobile-First Engineering"
              description="Seamlessly scale interfaces across mobile (320px), tablet (768px), and wide monitors using CSS Grid and Flexbox."
              footer={
                <>
                  <Badge variant="neutral" size="small">Level: Intermediate</Badge>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="ghost" size="small">Preview</Button>
                    <Button variant="primary" size="small">Start Project</Button>
                  </div>
                </>
              }
            />
          </div>

          <CodePreview
            code={`import { Card, Badge, Button } from './components';

<Card
  image="/assets/cover.jpg"
  imageAlt="React project preview"
  badge={<Badge variant="primary">Architecture</Badge>}
  title="Component Design System"
  subtitle="Week 2 Assignment"
  description="Reusable UI components designed with modern React patterns."
  footer={
    <>
      <Badge variant="success">Completed</Badge>
      <Button variant="primary" size="small">View Details</Button>
    </>
  }
/>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Main card headline</td>
                </tr>
                <tr>
                  <td><code>subtitle</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Secondary caption or category text</td>
                </tr>
                <tr>
                  <td><code>image</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Image URL rendered with 16:9 aspect ratio</td>
                </tr>
                <tr>
                  <td><code>badge</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>null</code></td>
                  <td>Corner badge slot</td>
                </tr>
                <tr>
                  <td><code>footer</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>null</code></td>
                  <td>Bottom actions and meta container</td>
                </tr>
                <tr>
                  <td><code>orientation</code></td>
                  <td><code>'vertical' | 'horizontal'</code></td>
                  <td><code>'vertical'</code></td>
                  <td>Card alignment direction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            6. BADGE COMPONENT SECTION
            ==================================================================== */}
        <section id="badges" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 05</span>
            <h2 className="section-title">Badge</h2>
            <p className="section-desc">
              Compact status indicators and category tags with customizable color variants,
              sizes, pill shapes, and live status dots.
            </p>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Variants & Styles</span>
            </div>
            <div className="demo-card__body">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="neutral">Neutral</Badge>

              <Badge variant="success" dot>
                Online
              </Badge>
              <Badge variant="danger" dot>
                Busy
              </Badge>
              <Badge variant="primary" pill>
                Pill Shape
              </Badge>
            </div>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Sizes Comparison</span>
            </div>
            <div className="demo-card__body">
              <Badge variant="primary" size="small">
                Small Badge
              </Badge>
              <Badge variant="primary" size="medium">
                Medium (Default)
              </Badge>
              <Badge variant="primary" size="large">
                Large Badge
              </Badge>
            </div>
          </div>

          <CodePreview
            code={`import { Badge } from './components';

// Status Badge with active dot indicator
<Badge variant="success" dot={true}>
  Live Deployment
</Badge>

// Rounded Pill Badge
<Badge variant="primary" pill={true} size="small">
  New Feature
</Badge>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'</code></td>
                  <td><code>'primary'</code></td>
                  <td>Color palette tone</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'small' | 'medium' | 'large'</code></td>
                  <td><code>'medium'</code></td>
                  <td>Padding and text size</td>
                </tr>
                <tr>
                  <td><code>pill</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Applies full rounded radius</td>
                </tr>
                <tr>
                  <td><code>dot</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Renders circular pulse status dot</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            7. ALERT COMPONENT SECTION
            ==================================================================== */}
        <section id="alerts" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 06</span>
            <h2 className="section-title">Alert</h2>
            <p className="section-desc">
              Contextual feedback banners for communicating informative, successful, warning,
              or error messages with accessible ARIA live attributes and dismissibility.
            </p>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Interactive Alert Banners</span>
              <Button
                variant="ghost"
                size="small"
                onClick={() =>
                  setShowAlerts({
                    info: true,
                    success: true,
                    warning: true,
                    error: true,
                  })
                }
              >
                🔄 Reset All Alerts
              </Button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {showAlerts.info && (
                <Alert
                  type="info"
                  title="System Update Notice"
                  message="Component tokens have been upgraded to the latest WCAG AA accessibility standards."
                  dismissible
                  onClose={() => setShowAlerts((prev) => ({ ...prev, info: false }))}
                />
              )}

              {showAlerts.success && (
                <Alert
                  type="success"
                  title="Profile Synchronized"
                  message="All your account preferences and settings were saved successfully."
                  dismissible
                  onClose={() => setShowAlerts((prev) => ({ ...prev, success: false }))}
                />
              )}

              {showAlerts.warning && (
                <Alert
                  type="warning"
                  title="Storage Capacity Warning"
                  message="You have utilized 85% of your allotted cloud storage. Consider archiving old logs."
                  dismissible
                  onClose={() => setShowAlerts((prev) => ({ ...prev, warning: false }))}
                />
              )}

              {showAlerts.error && (
                <Alert
                  type="error"
                  title="Connection Error"
                  message="Unable to reach the remote repository. Please check your network connection."
                  dismissible
                  onClose={() => setShowAlerts((prev) => ({ ...prev, error: false }))}
                />
              )}
            </div>
          </div>

          <CodePreview
            code={`import { Alert } from './components';

// Success Alert with Dismiss button
<Alert
  type="success"
  title="Saved!"
  message="Your settings have been updated."
  dismissible={true}
  onClose={() => console.log('Alert closed')}
/>

// Error Notification Banner
<Alert
  type="error"
  title="Validation Failed"
  message="Please fix the indicated errors before submitting."
/>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>type</code></td>
                  <td><code>'info' | 'success' | 'warning' | 'error'</code></td>
                  <td><code>'info'</code></td>
                  <td>Alert severity theme and built-in icon</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Bold headline text</td>
                </tr>
                <tr>
                  <td><code>message</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Descriptive message body</td>
                </tr>
                <tr>
                  <td><code>dismissible</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Shows close button on right corner</td>
                </tr>
                <tr>
                  <td><code>onClose</code></td>
                  <td><code>Function</code></td>
                  <td><code>—</code></td>
                  <td>Callback when user clicks dismiss</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            8. MODAL DIALOG COMPONENT SECTION
            ==================================================================== */}
        <section id="modal" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Component 07</span>
            <h2 className="section-title">Modal Dialog</h2>
            <p className="section-desc">
              Accessible overlay dialog supporting keyboard Escape key dismissal, backdrop click
              closing, background scroll locking, focus trapping, and customizable footer actions.
            </p>
          </div>

          <div className="demo-card">
            <div className="demo-card__header">
              <span className="demo-card__title">Interactive Modal Launcher</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Size:</span>
                <Button
                  variant={modalSize === 'small' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setModalSize('small')}
                >
                  Small
                </Button>
                <Button
                  variant={modalSize === 'medium' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setModalSize('medium')}
                >
                  Medium
                </Button>
                <Button
                  variant={modalSize === 'large' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setModalSize('large')}
                >
                  Large
                </Button>
              </div>
            </div>

            <div className="demo-card__body" style={{ justifyContent: 'center' }}>
              <Button
                variant="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                🚀 Open {modalSize.toUpperCase()} Modal Dialog
              </Button>
            </div>
          </div>

          {/* Actual Rendered Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Interactive Modal Demonstration"
            size={modalSize}
            footer={
              <>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => {
                    alert('Action confirmed successfully!');
                    setIsModalOpen(false);
                  }}
                >
                  Confirm Action
                </Button>
              </>
            }
          >
            <p style={{ marginBottom: '1rem' }}>
              This modal dialog is designed following strict WAI-ARIA modal dialog specifications:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Keyboard Accessibility:</strong> Press <kbd style={{ background: '#334155', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>ESC</kbd> to close.</li>
              <li><strong>Backdrop Click:</strong> Clicking outside the modal container smoothly closes the dialog.</li>
              <li><strong>Scroll Lock:</strong> The document body scroll is locked while the dialog is active.</li>
              <li><strong>ARIA Attributes:</strong> Configured with <code>role="dialog"</code> and <code>aria-modal="true"</code>.</li>
            </ul>
            <Input
              label="Modal Test Input Field"
              placeholder="Test keyboard typing inside modal..."
              helperText="Focus is contained within the dialog."
            />
          </Modal>

          <CodePreview
            code={`import { Modal, Button } from './components';

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="medium"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed with this update?</p>
</Modal>`}
          />

          <div className="table-responsive">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>isOpen</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Controls open/close visibility state</td>
                </tr>
                <tr>
                  <td><code>onClose</code></td>
                  <td><code>Function</code></td>
                  <td><code>—</code></td>
                  <td>Callback when modal closes (ESC key, backdrop click, close button)</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Dialog header title connected via <code>aria-labelledby</code></td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'small' | 'medium' | 'large'</code></td>
                  <td><code>'medium'</code></td>
                  <td>Maximum width sizing constraint</td>
                </tr>
                <tr>
                  <td><code>footer</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>null</code></td>
                  <td>Optional footer action buttons bar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ====================================================================
            9. COMPLETE FORM DEMO: REGISTRATION & FEEDBACK
            ==================================================================== */}
        <section id="form-demo" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Interactive Integration</span>
            <h2 className="section-title">Full Form Integration Demo</h2>
            <p className="section-desc">
              A complete user registration & feedback form demonstrating how the reusable Input,
              Select, Button, and Alert components seamlessly integrate with client-side validation.
            </p>
          </div>

          <div className="form-demo-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Developer Registration</h3>
              <Badge variant="primary" dot>Live Validation</Badge>
            </div>

            {formSubmitted && (
              <Alert
                type="success"
                title="Registration Complete!"
                message={`Welcome aboard, ${formData.fullName}! Your registration as a ${formData.role} has been received.`}
                dismissible
                onClose={() => setFormSubmitted(false)}
              />
            )}

            {Object.keys(formErrors).length > 0 && (
              <Alert
                type="error"
                title="Validation Errors"
                message="Please correct the highlighted errors below before proceeding."
              />
            )}

            <form className="form-demo-form" onSubmit={handleFormSubmit} noValidate>
              <Input
                label="Full Name"
                name="fullName"
                placeholder="e.g. John Doe"
                required
                value={formData.fullName}
                onChange={handleFormChange}
                error={formErrors.fullName}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleFormChange}
                error={formErrors.email}
              />

              <Input
                label="Account Password"
                name="password"
                type="password"
                placeholder="Min 6 characters"
                required
                value={formData.password}
                onChange={handleFormChange}
                error={formErrors.password}
                helperText="Must contain at least 6 characters."
              />

              <Select
                label="Primary Role"
                name="role"
                required
                value={formData.role}
                onChange={handleFormChange}
                error={formErrors.role}
                options={[
                  { value: 'Frontend Developer', label: 'Frontend Developer' },
                  { value: 'Backend Developer', label: 'Backend Developer' },
                  { value: 'Fullstack Engineer', label: 'Fullstack Engineer' },
                  { value: 'Student / Researcher', label: 'Student / Researcher' },
                ]}
              />

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                >
                  Submit Registration
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      fullName: '',
                      email: '',
                      password: '',
                      role: '',
                      experienceLevel: 'intermediate',
                      message: '',
                    });
                    setFormErrors({});
                    setFormSubmitted(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* ====================================================================
            10. TESTING & ACCESSIBILITY CHECKLIST
            ==================================================================== */}
        <section id="testing" className="showcase-section">
          <div className="section-header">
            <span className="section-tag">Quality Assurance</span>
            <h2 className="section-title">Testing & Accessibility Report</h2>
            <p className="section-desc">
              Comprehensive checklist covering responsive breakpoints, keyboard accessibility,
              ARIA compliance, and cross-browser verification.
            </p>
          </div>

          <div className="checklist-grid">
            <div className="checklist-card">
              <h3 className="checklist-card__title">
                <span>📱</span> Responsive Breakpoint Matrix
              </h3>
              <ul className="checklist-list">
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> 320px - Mobile Portrait (Cards wrap, single column)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> 375px - Standard Mobile (Touch friendly tap targets)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> 768px - Tablet (Two column grid, desktop navbar toggle)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> 1024px - Desktop (Optimal horizontal layout)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> 1440px - Large Desktop (1200px max-width container)
                </li>
              </ul>
            </div>

            <div className="checklist-card">
              <h3 className="checklist-card__title">
                <span>♿</span> Accessibility & WAI-ARIA
              </h3>
              <ul className="checklist-list">
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> Visible Focus Rings (<code>:focus-visible</code> standard)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> Form Label Association (<code>htmlFor</code> / <code>id</code>)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> Keyboard Navigation (Tab, Enter, Space, Escape)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> Semantic Tags (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>)
                </li>
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> ARIA Live & Roles (<code>role="dialog"</code>, <code>role="alert"</code>)
                </li>
              </ul>
            </div>

            <div className="checklist-card">
              <h3 className="checklist-card__title">
                <span>🌐</span> Browser Compatibility Plan
              </h3>
              <ul className="checklist-list">
                <li className="checklist-item checklist-item--verified">
                  <span>✔</span> Google Chrome / Chromium Engines (Verified)
                </li>
                <li className="checklist-item checklist-item--manual">
                  <span>🔍</span> Mozilla Firefox (Manual verification checklist)
                </li>
                <li className="checklist-item checklist-item--manual">
                  <span>🔍</span> Microsoft Edge (Manual verification checklist)
                </li>
                <li className="checklist-item checklist-item--manual">
                  <span>🔍</span> Apple Safari (WebKit backdrop-filter verified)
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="showcase-footer">
        <p><strong>Nexus UI Component Library</strong> — Week 2 Academic & Internship Task</p>
        <p>Built with ReactJS, Vite, Vanilla CSS Tokens, and Semantic HTML5.</p>
      </footer>
    </div>
  );
};

export default ComponentShowcase;
