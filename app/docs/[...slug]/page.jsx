import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const DOCS_DIR = path.join(process.cwd(), 'docs')

async function renderMarkdown(filePath) {
  const source = await fs.promises.readFile(filePath, 'utf8')
  const { content, data } = matter(source)
  const processed = await remark().use(html).process(content)
  return { html: processed.toString(), meta: data }
}

function findDocPath(slugParts) {
  const candidate = path.join(DOCS_DIR, ...slugParts, 'index.md')
  return candidate
}

export async function generateStaticParams() {
  // read docs tree and produce params for static generation
  function walk(dir, base = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    let results = []
    for (const e of entries) {
      if (e.isDirectory()) {
        results = results.concat(walk(path.join(dir, e.name), base.concat(e.name)))
      } else if (e.isFile() && e.name === 'index.md') {
        results.push({ slug: base })
      }
    }
    return results
  }
  const pages = walk(DOCS_DIR)
  return pages
}

export default async function DocPage({ params }) {
  const slug = params.slug || ['on-duty-bulletin','state-codes']
  const filePath = findDocPath(slug)
  if (!fs.existsSync(filePath)) {
    return (
      <div className="bg-white p-6 rounded shadow">Page not found</div>
    )
  }
  const { html, meta } = await renderMarkdown(filePath)
  return (
    <article className="prose max-w-none bg-white p-6 rounded shadow">
      <h1>{meta.title || slug[slug.length-1].replace(/-/g,' ')}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="flex justify-between mt-8">
        <a href="#" className="text-sm underline">Previous</a>
        <a href="#" className="text-sm underline">Next</a>
      </div>
    </article>
  )
}
