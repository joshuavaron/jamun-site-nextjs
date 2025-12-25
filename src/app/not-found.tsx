import Link from "next/link";

// Global not-found page for invalid routes (including invalid locales)
// This is a server component without translations since it handles cases
// where the locale itself is invalid

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page not found</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
