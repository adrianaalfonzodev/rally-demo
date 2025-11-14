import React from 'react'

export interface TableProps {
  headers: { name: string; key: string }[]
  data: any[]
  renderActions?: (row: any) => React.ReactNode
  path?: any
}
