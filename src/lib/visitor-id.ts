const VISITOR_ID_KEY = 'zi_visitor_id'

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY)

  if (!visitorId) {
    visitorId = generateUUID()
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }

  return visitorId
}

export function formatCompact(num: number): string {
  return new Intl.NumberFormat('en', { 
    notation: 'compact', 
    maximumFractionDigits: 1 
  }).format(num)
}
