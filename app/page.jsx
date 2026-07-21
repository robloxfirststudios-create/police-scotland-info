import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <header className="bg-white rounded p-6 shadow">
        <h1 className="text-2xl font-semibold">Welcome to the Police Scotland Knowledge Base</h1>
        <p className="text-sm text-slate-600 mt-2">A public, read-only documentation portal for common procedures, reference and training.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-medium">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/docs/on-duty-bulletin/state-codes"><a className="text-policescotland-500">State Codes</a></Link></li>
            <li><Link href="/docs/communication/radio-etiquette"><a className="text-policescotland-500">Radio Etiquette</a></Link></li>
            <li><Link href="/docs/criminal-procedures/arrest-procedure"><a className="text-policescotland-500">Arrest Procedure</a></Link></li>
          </ul>
        </div>

        <div className="col-span-2 p-4 bg-white rounded shadow">
          <h3 className="font-medium">Featured Procedures</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <article className="p-3 border rounded">
              <h4 className="font-semibold">Officer Safety: Dynamic Risk Assessment</h4>
              <p className="text-sm text-slate-600 mt-1">Guidance on continuous assessment of threat and appropriate tactical responses.</p>
            </article>

            <article className="p-3 border rounded">
              <h4 className="font-semibold">Stop and Search</h4>
              <p className="text-sm text-slate-600 mt-1">Procedure for conducting lawful stop and search in Scotland.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium">Emergency Quick Reference</h3>
          <ul className="mt-2 text-sm">
            <li><strong>999</strong> — Emergency services
            </li>
            <li><strong>State 0</strong> — Officer in immediate danger
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
