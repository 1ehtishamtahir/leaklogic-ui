# 🎨 LeakLogic AI - Color Palette

## Spline-Inspired Branding Colors

### Background
```css
Deep Indigo (Scene BG):    #001031
```

### Wave Colors (Top to Bottom)
```css
Violet/Purple (Top):       #7B2FF7
Magenta (Mid):             #E8299C
Hot Pink (Transition):     #FF4D8D
Orange (Lower):            #FF7A3D
Peach (Bottom):            #FFA85C
```

---

## Tailwind Color System

### Primary (Violet)
```css
primary:                   #7B2FF7
primary-light:             #9D5CFF
primary-dark:              #6020D9
```

### Danger (Pink/Magenta)
```css
danger:                    #FF4D8D
danger-light:              #FF70A6
danger-dark:               #E8299C
```

### Warning (Orange/Peach)
```css
warning:                   #FFA85C
warning-light:             #FFBC7D
warning-dark:              #FF7A3D
```

### Accent (Magenta)
```css
accent:                    #E8299C
accent-light:              #FF4DB8
accent-dark:               #C91A7F
```

### Success (Functional Green)
```css
success:                   #10B981
success-light:             #34D399
success-dark:              #059669
```

### Dark Backgrounds
```css
dark-primary:              #001031
dark-900:                  #0F0F10
dark-800:                  #18181B
dark-700:                  #27272A
sidebar:                   #09090B
```

---

## Gradients

### Rainbow (Full Spectrum)
```css
linear-gradient(135deg, #7B2FF7 0%, #E8299C 33%, #FF4D8D 66%, #FF7A3D 100%)
```

### Primary (Violet to Magenta)
```css
linear-gradient(135deg, #7B2FF7 0%, #E8299C 100%)
```

### Secondary (Magenta to Pink)
```css
linear-gradient(135deg, #E8299C 0%, #FF4D8D 100%)
```

### Warm (Orange to Peach)
```css
linear-gradient(135deg, #FF7A3D 0%, #FFA85C 100%)
```

### Hero Background
```css
linear-gradient(135deg, rgba(123, 47, 247, 0.2) 0%, rgba(232, 41, 156, 0.2) 100%)
```

---

## Usage Guidelines

### Primary Actions
- **Color**: Violet (#7B2FF7)
- **Use**: CTAs, buttons, active links, hover states
- **Gradient**: `bg-gradient-primary`

### Warnings & Alerts
- **Color**: Peach/Orange (#FFA85C)
- **Use**: Medium priority alerts, informational badges
- **Gradient**: `bg-gradient-warm`

### Critical Issues / Profit Leaks
- **Color**: Hot Pink (#FF4D8D) or Magenta (#E8299C)
- **Use**: Negative metrics, urgent actions, refund leaks
- **Gradient**: `bg-gradient-secondary`

### Success / Positive
- **Color**: Green (#10B981)
- **Use**: Success messages, positive metrics, confirmations
- **Keep functional green for accessibility**

### Accents & Highlights
- **Color**: Magenta (#E8299C)
- **Use**: Decorative elements, badges, icons
- **Creates vibrant contrast on dark backgrounds**

---

## Glow Effects

```css
glow-primary:    0 0 30px rgba(123, 47, 247, 0.5)
glow-magenta:    0 0 30px rgba(232, 41, 156, 0.5)
glow-pink:       0 0 30px rgba(255, 77, 141, 0.5)
glow-success:    0 0 30px rgba(16, 185, 129, 0.5)
```

---

## Animations

### Rainbow Border
```css
animate-rainbow  /* Cycles through all Spline colors */
```

### Glow Pulse
```css
animate-glow     /* Pulses with violet glow */
```

### Float
```css
animate-float    /* Gentle up/down motion */
```

---

## Implementation Examples

### Button with Gradient
```tsx
<button className="bg-gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-glow-primary">
  Analyze Data
</button>
```

### Card with Accent Border
```tsx
<div className="glass-effect border border-accent/20 rounded-xl p-6">
  Content
</div>
```

### Rainbow Animation
```tsx
<div className="border-2 animate-rainbow rounded-lg">
  Animated Border
</div>
```

### Gradient Text
```tsx
<h1 className="bg-gradient-primary bg-clip-text text-transparent">
  LeakLogic AI
</h1>
```

---

## Color Psychology

- **Violet/Purple** - Innovation, technology, premium
- **Magenta** - Energy, creativity, modern
- **Pink** - Urgency, attention, alerts
- **Orange** - Warmth, caution, activity
- **Peach** - Friendly, accessible, inviting
- **Deep Indigo** - Trust, depth, sophistication

---

This palette creates a **vibrant, modern, tech-forward** aesthetic that stands out while maintaining excellent readability on dark backgrounds!
