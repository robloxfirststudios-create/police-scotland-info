import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  {
    title: 'On Duty Bulletin',
    items: [
      ['State Codes','/docs/on-duty-bulletin/state-codes'],
      ['Status Codes','/docs/on-duty-bulletin/status-codes'],
      ['Incident Grading','/docs/on-duty-bulletin/incident-grading'],
      ['Priority Levels','/docs/on-duty-bulletin/priority-levels'],
      ['Callsigns','/docs/on-duty-bulletin/callsigns'],
      ['Airwave Radio Guide','/docs/on-duty-bulletin/airwave-radio-guide']
    ]
  },
  {
    title: 'Communication',
    items: [
      ['NATO Phonetic Alphabet','/docs/communication/nato-phonetic-alphabet'],
      ['Radio Etiquette','/docs/communication/radio-etiquette'],
      ['Emergency Messages','/docs/communication/emergency-messages'],
      ['Urgent Assistance','/docs/communication/urgent-assistance'],
      ['Plain English Guidance','/docs/communication/plain-english-guidance']
    ]
  },
  {
    title: 'Operational Procedures',
    items: [
      ['Vehicle Stops','/docs/operational-procedures/vehicle-stops'],
      ['Pursuits','/docs/operational-procedures/pursuits'],
      ['TPAC','/docs/operational-procedures/tpac'],
      ['Stinger Deployment','/docs/operational-procedures/stinger-deployment'],
      ['Road Closures','/docs/operational-procedures/road-closures'],
      ['Checkpoints','/docs/operational-procedures/checkpoints'],
      ['ANPR','/docs/operational-procedures/anpr'],
      ['Collision Procedures','/docs/operational-procedures/collision-procedures']
    ]
  }
]

export default function Sidebar(){
  const [open, setOpen] = useState(true)
  return (
    <aside className={`bg-slate-50 border-r ${open ? 'w-72' : 'w-16'} transition-all` }>
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm font-semibold">Contents</div>
        <button aria-label="Toggle sidebar" onClick={() => setOpen(v=>!v)} className="text-sm px-2 py-1 border rounded">{open ? 'Collapse' : 'Open'}</button>
      </div>
      <nav className="px-3 pb-6 overflow-y-auto" aria-label="Main navigation">
        {NAV.map((group)=> (
          <div key={group.title} className="mb-4">
            <div className="text-xs text-slate-500 font-medium px-2">{group.title}</div>
            <ul className="mt-2 space-y-1">
              {group.items.map(([label,href])=> (
                <li key={href}>
                  <Link href={href}>
                    <a className="block px-2 py-1 rounded hover:bg-slate-100 text-sm">{label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
