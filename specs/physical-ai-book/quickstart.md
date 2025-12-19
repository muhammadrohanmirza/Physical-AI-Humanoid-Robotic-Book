# Quickstart Guide: Physical AI Book

## Getting Started

This guide will help you set up, develop, and contribute to the Physical AI book project.

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Git for version control
- A text editor or IDE (VS Code recommended)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run start
   # or
   yarn start
   ```
   This will start a local development server at `http://localhost:3000` with hot reloading.

4. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```
   This will create an optimized build in the `build` directory.

### Project Structure

```
my-physical-ai-book/
├── docs/
│   ├── intro.md
│   ├── chapter1/
│   │   ├── lesson1.md
│   │   ├── lesson2.md
│   │   └── lesson3.md
│   └── exercises/
├── src/
│   ├── components/
│   ├── css/
│   └── pages/
├── static/
│   ├── img/
│   └── files/
├── docusaurus.config.js
├── sidebars.js
├── package.json
└── README.md
```

### Adding New Content

1. **To add a new lesson:**
   - Create a new `.md` file in the appropriate chapter directory under `docs/`
   - Follow the established lesson template
   - Update `sidebars.js` to include the new lesson in the navigation

2. **To add a new chapter:**
   - Create a new directory in `docs/` with the chapter name
   - Add lesson files to the new chapter directory
   - Update `sidebars.js` to include the new chapter in the navigation

### Content Guidelines

- Each lesson should follow the structure: Introduction → Theory → Practical Example → Hands-on Exercise → Summary
- Use clear, beginner-friendly language
- Include code examples with appropriate syntax highlighting
- Add hands-on exercises at the end of each lesson
- Link to related concepts and chapters where appropriate

### Running Tests

To validate your content and check for build issues:

```bash
npm run build
# Review the output for any errors or warnings
```

### Contributing

1. Create a new branch for your changes
2. Add or modify content following the established format
3. Ensure the build completes without errors
4. Submit a pull request with a clear description of your changes