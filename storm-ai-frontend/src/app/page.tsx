import { useState, FormEvent } from 'react';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    // Basic validation
    if (!topic.trim()) {
      setError('Topic cannot be empty.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, keywords }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGeneratedContent(data.content);

    } catch (e: any) {
      console.error('Error generating content:', e);
      setError(e.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-4">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Storm AI
        </h1>
        <p className="text-xl text-slate-400">Your AI Content Creation Assistant</p>
      </header>

      <main className="w-full max-w-2xl bg-slate-800 shadow-2xl rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-1">
              Topic / Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., The Future of Renewable Energy"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-slate-300 mb-1">
              Keywords (optional, comma-separated)
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., solar, wind, sustainability"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </div>
            ) : (
              'Generate Content'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-700 text-red-300 rounded-md">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {generatedContent && !error && (
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-slate-200">Generated Content:</h2>
            <div className="bg-slate-700 p-6 rounded-md whitespace-pre-wrap text-slate-300 prose prose-invert max-w-none">
              {generatedContent}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-10 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Storm AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
