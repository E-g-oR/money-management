import React, { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}
const CardsList:FC<Props> = ({children}) => {
  return (
    <div className="grid grid-cols lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {children}
    </div>
  );
}

export default CardsList