## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Keshav-0907/NoteForge-AI
cd notes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp env.example .env.local
```

### 4. Run the Development Server

```bash
npm run dev
```

## Implementation 

- Framework: Built using Next.js with TypeScript for improved developer experience and type safety.
- Styling: UI is designed using Tailwind CSS and ShadCN components for a clean and responsive interface.
- Authentication: Google and Email/Password auth via Supabase Auth.
- State Management: Global UI and app state is managed using Redux Toolkit.
- AI Integration: Summarization of notes is powered by the DeepSeek API.
- Database: All notes and user data are stored in Supabase (PostgreSQL under the hood).

