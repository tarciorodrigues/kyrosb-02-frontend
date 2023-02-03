import React from 'react'

interface NavButtonProps {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function NavButton({ title, isActive, onClick }: NavButtonProps) {
  return (
    <button
    onClick={onClick} 
    className={`
    ${isActive && 'bg-[#036756]'}
    hover:bg-[#036756] text-white py-2 px-2 rounded font-bold
    `}>
        {title}
    </button>
  )
}

export default NavButton