export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate)
  
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
  
    const getOrdinal = (n: number) => {
      if (n > 3 && n < 21) return 'th'
      switch (n % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    }
  
    return `${day}${getOrdinal(day)} ${month} ${year}`
  }
  