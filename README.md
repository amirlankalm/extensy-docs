# Extensy Documentation

This is the official documentation for **Extensy**, built using **Mintlify**.

## 🛠️ Technology Stack

- **Framework**: [Mintlify](https://mintlify.com) (Built on top of **Next.js**)
- **Language**: **TypeScript** (TSX) for custom components
- **Content**: MDX (Markdown + React Components)
- **Deployment**: Vercel

## 📁 Project Structure

- `mint.json`: The main configuration file (navigation, theme, site metadata).
- `introduction.mdx`: The landing page with the hero image.
- `snippets/AIAssistant.tsx`: A custom **TypeScript** React component for the AI assistant.
- `logo/`: Brand assets (SVG).
- `images/`: Documentation assets (Hero preview).

## 🚀 Getting Started

1. **Install Mintlify CLI**:
   ```bash
   npm i -g mintlify
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```
   This will start the Next.js-powered development server at `http://localhost:3000`.

## 🤖 AI Assistant Configuration

The AI assistant uses the **Google Gemini API**. To enable it in production:

1. Add `NEXT_PUBLIC_GEMINI_API_KEY` to your **Vercel** environment variables.
2. The system persona is defined in `.mintlify/Assistant.md`.

## 📄 License

Internal use for the Extensy development team.
