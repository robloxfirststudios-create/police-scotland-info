export default function Breadcrumbs({items=[]}){
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-4">
      {items.map((it,i)=> (
        <span key={i}>
          {it.href ? <a href={it.href} className="underline">{it.label}</a> : <span>{it.label}</span>}
          {i < items.length-1 && <span className="px-2">/</span>}
        </span>
      ))}
    </nav>
  )
}
