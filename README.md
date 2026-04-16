# Dynamic Content Builder (Resume Edition)

A professional, interactive, and modular Resume Builder built as part of the Frontend Developer Intern assignment. This application allows users to dynamically compose their personal brand pages using a suite of draggable and configurable content blocks.

## 🚀 Key Features

- **Drag-and-Drop Canvas**: Seamlessly reorder sections using the power of `@dnd-kit`.
- **Dynamic Palette**: Instant addition of diverse content blocks (Experience, Education, Skills, etc.).
- **Real-time Configuration**: Fine-tune every block's details via an intuitive glassmorphic sidebar.
- **Robust Persistence**: Your work is automatically saved to `localStorage`, surviving page refreshes and browser restarts.
- **Clean UI & Responsive Preview**: A dedicated, print-ready modal for finalized document review and export.
- **Dark/Light Mode**: Smooth theme transitions tailored for a professional workspace.

## 🎨 Creative Choices (UI/UX)

- **Premium Aesthetics**: The application uses a "Glow-State" design language with subtle gradients and glassmorphism (backdrop-blur effects) to provide a premium, modern feel.
- **Intuitive Feedback**: Drag states are clearly highlighted with blue accents, and configuration fields are grouped logically to minimize cognitive load.
- **Minimalist Approach**: A clean 3-column layout (Palette | Canvas | Config) ensures that all tools are always one click away without cluttering the workspace.

## 🏗️ Technical Architecture

### Component Design
- **Block Renderer Pattern**: The app uses a modular registry (`BLOCK_RENDERERS`) that maps simple JSON data to React components. This makes it trivial to add new block types in the future.
- **Recursive Sortables**: Leverages `@dnd-kit/sortable` for high-performance reordering that handles edge cases like fast dragging and empty layouts gracefully.

### State Management
- **Centralized Source of Truth**: All canvas data is managed in a single `blocks` array in the `App` component.
- **Deep Updates**: State updates are performed using functional patterns to maintain immutability and ensure efficient React reconciliation.

### Persistence Strategy
- **Automatic Synchronization**: A dedicated `useEffect` hook monitors the block state and syncs changes to `localStorage` in real-time.
- **Graceful Hydration**: On load, the app validates saved data against current block definitions, ensuring the site never crashes even if outdated data is present in the browser.

## 🛠️ Tech Stack

- **React 19**
- **Tailwind CSS v4** (Advanced Design Tokens)
- **@dnd-kit** (Interactive D&D)
- **Lucide-react** (Iconography)
- **Vite** (Build System)

## 🏁 Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

---
*Created for Frontend Developer Intern - Assignment 3.*
