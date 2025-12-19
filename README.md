# Intelligent Resume Builder

A modern, AI-powered resume builder built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Landing Page**: Beautiful hero section with features showcase
- **Template Selection**: Choose from multiple professional resume templates
- **Multi-Step Form**: Easy-to-use form wizard for building your resume
  - Personal Information
  - Work Experience
  - Education
  - Skills & Expertise
- **Live Preview**: See your resume in real-time as you build it
- **Download Options**: Export as PDF or Word document
- **Subscription Plans**: Free, Pro, and Enterprise tiers
- **Dark Mode Support**: Fully responsive with dark mode
- **Mobile Responsive**: Works seamlessly on all devices

## 📦 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Icons**: Material Symbols
- **Fonts**: Google Fonts (Inter)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── pages/                   # Page components
│   ├── LandingPage.tsx     # Home/landing page
│   ├── TemplateSelection.tsx
│   ├── PersonalInfoForm.tsx
│   ├── ExperienceEditor.tsx
│   ├── EducationEditor.tsx
│   ├── SkillsEditor.tsx
│   ├── ReviewDownload.tsx
│   └── SubscriptionPayment.tsx
├── components/              # Reusable components (existing)
├── store/                   # State management
├── utils/                   # Utility functions
├── App.tsx                  # Main app with routing
├── main.tsx                 # Entry point
└── index.css               # Global styles

## 🎨 Pages

### 1. Landing Page (/)
- Hero section with CTA
- Features showcase
- Footer with links

### 2. Template Selection (/templates)
- Grid of resume templates
- Template preview
- Selection interface

### 3. Personal Info (/personal-info)
- Basic information form
- Contact details
- Professional summary
- Progress indicator (20%)

### 4. Experience Editor (/experience)
- Add/remove work experiences
- Company, position, dates
- Description with achievements
- Progress indicator (40%)

### 5. Education Editor (/education)
- Add/remove education entries
- School, degree, field of study
- Dates and GPA
- Progress indicator (60%)

### 6. Skills Editor (/skills)
- Add skills with suggestions
- Remove skills
- Skill categories
- Progress indicator (80%)

### 7. Review & Download (/review)
- Live resume preview
- Download options (PDF/Word)
- Share link
- Edit functionality
- Progress indicator (100%)

### 8. Subscription (/subscription)
- Pricing plans (Free, Pro, Enterprise)
- Monthly/Annual billing toggle
- Payment form
- FAQ section

## 🎯 Navigation Flow

```
Landing → Templates → Personal Info → Experience → Education → Skills → Review
                                                                           ↓
                                                                    Subscription
```

## 🔧 Configuration

### Tailwind Config
Custom colors and themes are defined in `tailwind.config.js`:
- Primary color: Blue (#2563eb)
- Dark mode support
- Custom fonts (Inter)

### Routing
All routes are defined in `App.tsx` using React Router v6.

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📝 License

MIT

## 👨‍💻 Author

Hemanth Guvvala

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
