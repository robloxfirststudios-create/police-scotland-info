import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DOCS_DIR = path.join(process.cwd(), 'docs')

export function getAllDocs() {
  const results = []
  function walk(dir, breadcrumb = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        walk(full, breadcrumb.concat(e.name))
      } else if (e.isFile() && e.name === 'index.md') {
        const md = fs.readFileSync(full, 'utf8')
        const { data } = matter(md)
        results.push({
          path: '/docs/' + breadcrumb.join('/') ,
          title: data.title || breadcrumb[breadcrumb.length-1],
          description: data.description || '',
          breadcrumb
        })
      }
    }
  }
  walk(DOCS_DIR)
  return results
}

export function getDocByPath(relPath) {
  const file = path.join(DOCS_DIR, relPath, 'index.md')
  if (!fs.existsSync(file)) return null
  const md = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(md)
  return { meta: data, content }
}
