import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [theme, setTheme] = useState('light')
  const searchRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === '/') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center gap-4 p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-policescotland-500 flex items-center justify-center text-white font-bold">PS</div>
          <div>
            <div className="text-sm font-semibold">Police Scotland Knowledge Base</div>
            <div className="text-xs text-slate-500">Public documentation portal</div>
          </div>
        </div>

        <div className="flex-1">
          <input ref={searchRef} aria-label="Search" placeholder="Search (press /)" className="w-full rounded border px-3 py-2" />
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border rounded text-sm">Light</button>
          <button className="px-3 py-2 border rounded text-sm">Dark</button>
          <a className="ml-2 inline-block bg-policescotland-500 text-white px-3 py-2 rounded text-sm" href="mailto:issues@policescotland.example">Report an Issue</a>
        </div>
      </div>
    </header>
  )
}
