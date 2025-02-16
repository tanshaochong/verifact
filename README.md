# Verifact

Verifact is an AI-powered claim verification and fact-checking service that helps users verify the accuracy of statements and claims. Built with Next.js and cutting-edge AI technology, it provides real-time verification of factual statements.

## Features

- **Smart Claim Extraction**: Automatically identifies and extracts verifiable claims from text
- **AI-Powered Verification**: Uses advanced AI to verify claims against reliable sources
- **Real-time Processing**: Instant claim extraction and verification
- **Detailed Explanations**: Provides comprehensive verification results with sources and confidence levels
- **Modern UI/UX**: Clean, responsive interface built with Next.js and Radix UI
- **Error Handling**: Robust error handling with graceful fallbacks

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **AI Integration**: OpenAI and Perplexity APIs
- **Type Safety**: Full TypeScript implementation

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/tanshaochong/verifact.git
cd verifact
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:

```
OPENAI_API_KEY=your_openai_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

Required API Keys:

- **OpenAI API Key**: Used for claim extraction and initial verification ([Get key](https://platform.openai.com/api-keys))
- **Perplexity API Key**: Used for fact verification and source retrieval ([Get key](https://docs.perplexity.ai/))

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
verifact/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── services/        # API services
├── types/           # TypeScript types
├── lib/             # Utility functions
└── constants/       # Application constants
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
