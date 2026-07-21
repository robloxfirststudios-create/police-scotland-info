export function Info({children}){
  return (<div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded">{children}</div>)
}
export function Warning({children}){
  return (<div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded">{children}</div>)
}
export function Success({children}){
  return (<div className="border-l-4 border-green-500 bg-green-50 p-3 rounded">{children}</div>)
}
