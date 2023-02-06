import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

interface ClienteContextType {
  clientes: any | null;
  setClientes: React.Dispatch<React.SetStateAction<any | null>>;
}

type Cliente = {
    id: number;
    nome: string;
    endereco: String;
    nascimento: String;
    cpfCnpj: String;
    pfPJ: String;
  }

export const ClienteContext = createContext<ClienteContextType>({} as ClienteContextType);

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  function handleData() {    
    api
    .get('/cliente')
    .then((res) => {
      setClientes(res.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    handleData()
    
  }, []);



  return (
    <ClienteContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClienteContext.Provider>
  );
}
