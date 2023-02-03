import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

type Cliente = {
  id: number;
  nome: string;
  endereco: String;
  nascimento: String;
  cpfCnpj: String;
  pfPJ: String;
}


function Clientes() {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cliente, setCliente] = useState<any>(clientes[0]);
  const [edit, setEdit] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();


  const onSubmit = async (data: any) => {
          if (edit){
            await api({
              method: 'PUT',
              url: '/cliente',
              data: {
                id: cliente.id,
                nome: cliente.nome,
                endereco: cliente.endereco,
                nascimento: cliente.nascimento,
                cpfCnpj: cliente.cpfCnpj,
                pfPJ: cliente.pfPJ,
              },
            })
              .then((data) => {
                console.log(data);
              })
              .catch((err) => {
                console.log(err);
              });
              handleData();
              reset();
              setEdit(false)
              setCliente(null)
          } else {
            await api({
        method: 'POST',
        url: '/cliente',
        data: {
          id: data.id,
          endereco: data.endereco,
          nome: data.nome,
          nascimento: data.nascimento,
          cpfCnpj: data.cpfCnpj,
          pfPJ: data.pfPJ,
        },
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })}
        handleData();
        reset();
        setCliente(null)           
    }

  /* const onUpdate = async (e: any) => {
    console.log('chamou onUpdate => ', e)
    await api({
      method: 'PUT',
      url: '/cliente',
      data: {
        id: e.id,
        endereco: e.endereco,
        nome: e.nome,
        nascimento: e.nascimento,
        cpfCnpj: e.cpfCnpj,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
      handleData();
      reset();           
  }         */  

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

  const onDelete = async (id: number) => {
    
    await api({
      method: 'DELETE',
      url: `/cliente${id}`,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
      handleData();
  };

  useEffect(() => {
    handleData()
    
  }, []);

  console.log('cliente', cliente)


  return (
    <>    
    <div className="px-4 mt-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h1 className="text-xl gap-2 flex font-semibold text-gray-900">
                  <span>Clientes</span> 
                <span className='bg-blue-800 rounded-xl text-white px-2 animate-pulse '>
                  {clientes.length}</span></h1>
                <p className="mt-2 text-sm text-gray-700">
                  Lista de todos os clientes cadastrados no sistema.
                </p>
          <div className="mt-4 pt-8 sm:mt-0  sm:flex-none">
              <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col gap-4'>
                <div className='flex flex-col w-full gap-2 pr-32 flex-auto'>

                <input 
                {...register('nome')} 
                  className='flex border p-1 border-gray-500' 
                  value={cliente ? cliente.nome : ''}
                  onChange={(e) => setCliente({...cliente, nome: e.target.value})} 
                  name='nome' 
                  placeholder='Nome'
                  />
                
                <input className='flex border p-1 border-gray-500' 
                {...register('endereco')}
                value={cliente ? cliente.endereco : ''}
                onChange={(e) => setCliente({...cliente, endereco: e.target.value})} 
                name='endereco' 
                placeholder='Endereço' 
                />

                <div className='flex gap-4 justify-center w-full'>
                <input className='flex border w-full p-1 border-gray-500' 
                {...register('nascimento')}                
                value={cliente ? cliente.nascimento : ''}
                onChange={(e) => setCliente({...cliente, nascimento: e.target.value})} 
                name='nascimento' 
                placeholder='Nascimento'
                />

                <input className='flex border w-full p-1 border-gray-500' 
                {...register('cpfCnpj')}
                value={cliente && cliente.cpfCnpj}
                onChange={(e) => setCliente({...cliente, cpfCnpj: e.target.value})} 
                name='cpfCnpj' 
                placeholder='CPF/CNPJ'
                />

                <input className='flex border p-1 w-full border-gray-500' 
                {...register('pfPJ')}
                value={cliente && cliente.pfPJ}
                onChange={(e) => setCliente({...cliente, pfPJ: e.target.value})} 
                name='pfPJ' 
                placeholder='PF/PJ'
                />
                </div>
                </div>

                <div className='flex gap-4'>

                <button
                    type="submit"                    
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    {edit ? 'Salvar' : 'Adicionar clientes'}
                  </button>
                  {edit && (

                <button
                    type="button"
                    onClick={() => 
                      {setEdit(false)
                      setCliente(clientes[0])}
                    }                    
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Novo
                  </button>
                  )}
                </div>

                </div>                
                
                
              </form>          
            
          </div>            
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                    Nome
                    </th>
                    <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Nascimento
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Endereço
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     CPF/CNPJ
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     PF/PJ
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  
                  {clientes.map((cliente: any) => (
                      <tr key={cliente.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {cliente.nome}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cliente.endereco}</td>
                        <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cliente.nascimento}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cliente.cpfCnpj}</td>                        
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cliente.pfPJ}</td>                        
                        <td className="relative whitespace-nowrap py-4 pl-3 flex gap-2 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <button 
                          onClick={() => {
                            setCliente(cliente)
                            setEdit(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900">
                            Editar
                          <span className="sr-only">, {cliente.nome}</span>
                          </button>
                          <button onClick={() => {onDelete(cliente.id)}} 
                          className="text-red-500 hover:text-indigo-900">
                            Deletar<span className="sr-only">, {cliente.nome}</span>                            
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Clientes