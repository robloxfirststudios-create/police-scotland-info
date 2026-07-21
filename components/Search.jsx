import { useState, useEffect } from 'react'
import FlexSearch from 'flexsearch'
import Link from 'next/link'

export default function Search(){
  const [index, setIndex] = useState(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(()=>{
    fetch('/search-index.json').then(r=>r.json()).then(data=>{
      const idx = new FlexSearch.Document({
        tokenize: 'forward',
        document: { id: 'id', store: ['title','path','snippet'], index: ['title','content'] }
      })
      data.forEach(d=> idx.add(d))
      setIndex(idx)
    })
  },[])

  useEffect(()=>{
    if (!index || !query) { setResults([]); return }
    const found = index.search(query, { enrich: true })
    // flatten
    const hits = found.flatMap(r => r.result.map(id => index.get(id))).filter(Boolean)
    setResults(hits.slice(0,10))
  },[index,query])

  return (
    <div>
      <input aria-label="Search" placeholder="Search docs" value={query} onChange={(e)=>setQuery(e.target.value)} className="w-full rounded border px-3 py-2" />
      {results.length>0 && (
        <ul className="bg-white mt-2 rounded shadow max-h-64 overflow-auto">
          {results.map(r=> (
            <li key={r.id} className="p-3 border-b">
              <Link href={r.path}><a className="font-semibold text-policescotland-500">{r.title}</a></Link>
              <div className="text-sm text-slate-600">{r.snippet}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
