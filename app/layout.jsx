import '../styles/globals.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'Police Scotland Knowledge Base',
  description: 'Public documentation site inspired by GitBook-style layout for Police Scotland (roleplay use).'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="reading-progress" style={{ width: 0 }} />
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 max-w-5xl mx-auto">
            {children}
          </main>
          <aside className="hidden xl:block w-64 p-6">
            {/* Table of contents placeholder rendered per page */}
          </aside>
        </div>
      </body>
    </html>
  )
}
