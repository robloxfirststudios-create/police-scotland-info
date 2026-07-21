export default function Toc({headings=[]}){
  return (
    <nav aria-label="Table of contents" className="text-sm text-slate-600">
      <div className="font-medium mb-2">On this page</div>
      <ul className="space-y-1">
        {headings.map((h)=> (
          <li key={h.id}><a href={`#${h.id}`} className="hover:underline">{h.text}</a></li>
        ))}
      </ul>
    </nav>
  )
}
