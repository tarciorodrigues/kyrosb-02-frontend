import { useState } from 'react'
import NavButton from './NavButton'

type HeaderProps = {
  navButtonActive: String;
  setNavButtonActive: (navButtonActive: String) => void;
}

function Header({ navButtonActive, setNavButtonActive }: HeaderProps) {

  const [navButton, setNavButton] = useState('clientes')


  return (
    <header className='flex justify-center items-center rounded-md p-5'>
      <div className='flex items-center justify-center rounded-md'>
            <div className='bg-emerald-900 rounded-3xl p-6 space-x-2'>
                
                <NavButton title='Clientes' onClick={() => setNavButton('clientes')}/>
                <NavButton title='Produtos' onClick={() => setNavButton('produtos')}/>
                <NavButton title='Lançamentos' onClick={() => setNavButton('lancamentos')}/>
            </div>
        </div>

       
    </header>
  )
}

export default Header