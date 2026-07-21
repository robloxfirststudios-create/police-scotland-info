// Main JS for static Police Scotland knowledge base

(function(){
  const searchInput = document.getElementById('global-search')
  const searchResults = document.getElementById('search-results')
  const toggleSidebarBtn = document.getElementById('toggle-sidebar')
  const sidebar = document.getElementById('sidebar')
  const themeToggle = document.getElementById('theme-toggle')
  const printBtn = document.getElementById('print-btn')
  const readingProgress = document.getElementById('reading-progress')

  // Keyboard shortcut to focus search ('/')
  window.addEventListener('keydown', (e)=>{
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault()
      searchInput.focus()
      searchInput.select()
    }
  })

  // Theme toggle (simple)
  const currentTheme = localStorage.getItem('ps-theme') || 'light'
  document.documentElement.setAttribute('data-theme', currentTheme)
  themeToggle.textContent = currentTheme === 'light' ? 'Dark' : 'Light'
  themeToggle.addEventListener('click', ()=>{
    const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', now)
    localStorage.setItem('ps-theme', now)
    themeToggle.textContent = now === 'light' ? 'Dark' : 'Light'
  })

  // Sidebar collapse
  toggleSidebarBtn && toggleSidebarBtn.addEventListener('click', ()=>{
    const collapsed = sidebar.classList.toggle('collapsed')
    toggleSidebarBtn.textContent = collapsed ? 'Open' : 'Collapse'
  })

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const text = btn.getAttribute('data-copy') || ''
      try{
        await navigator.clipboard.writeText(text)
        btn.textContent = 'Copied'
        setTimeout(()=>btn.textContent = 'Copy',1200)
      }catch(e){
        alert('Copy failed')
      }
    })
  })

  // Print
  printBtn && printBtn.addEventListener('click', ()=> window.print())

  // Reading progress
  const content = document.getElementById('content')
  function updateProgress(){
    if (!content) return
    const total = content.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const pct = Math.min(100, Math.max(0, (scrolled/Math.max(1,total))*100))
    readingProgress.style.width = pct + '%'
  }
  window.addEventListener('scroll', updateProgress)
  window.addEventListener('resize', updateProgress)
  updateProgress()

  // Simple search using Fetch + basic scoring (fallback if FlexSearch not present)
  let INDEX = []
  fetch('/search-index.json').then(r=>r.json()).then(data=>{ INDEX = data })

  function simpleSearch(q){
    if (!q) return []
    q = q.toLowerCase()
    const hits = INDEX.map(item=>{
      const score = (item.title.toLowerCase().includes(q)?3:0) + (item.content.toLowerCase().includes(q)?2:0) + (item.snippet.toLowerCase().includes(q)?1:0)
      return Object.assign({score},item)
    }).filter(h=>h.score>0).sort((a,b)=>b.score-a.score)
    return hits.slice(0,10)
  }

  let searchTimeout = null
  searchInput && searchInput.addEventListener('input', (e)=>{
    const q = e.target.value
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(()=>{
      const hits = simpleSearch(q)
      if (!hits.length){ searchResults.hidden = true; searchResults.innerHTML = ''; return }
      searchResults.hidden = false
      searchResults.innerHTML = hits.map(h=>`<a class="result" href="${h.path}"><strong>${h.title}</strong><div class=muted>${h.snippet}</div></a>`).join('')
    }, 180)
  })

  // Close search when clicking outside
  document.addEventListener('click', (e)=>{
    if (!searchResults.contains(e.target) && e.target !== searchInput){ searchResults.hidden = true }
  })

  // Anchor links smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}) }
    })
  })

  // Expandable sections (data-expand)
  document.querySelectorAll('[data-expand]').forEach(btn=>{
    const target = document.getElementById(btn.getAttribute('data-expand'))
    if (!target) return
    btn.addEventListener('click', ()=>{
      const open = target.classList.toggle('open')
      btn.setAttribute('aria-expanded', open)
    })
  })

})();
