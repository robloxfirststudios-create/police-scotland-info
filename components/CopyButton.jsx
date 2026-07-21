export default function CopyButton({text}){
  async function copy(){
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied')
    } catch (e) {
      alert('Copy failed')
    }
  }
  return (
    <button onClick={copy} className="ml-2 px-2 py-1 border rounded text-xs">Copy</button>
  )
}
