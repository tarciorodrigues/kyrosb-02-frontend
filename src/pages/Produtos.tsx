import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

type Produto = {
  id: number;
  nome: string;
  descricao: String;
  status: String;  
  valorUnidade: number;
}


function Produtos() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produto, setProduto] = useState<any>(produtos[0]);
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
              url: '/produto',
              data: {
                id: produto.id,
                descricao: produto.descricao,
                nome: produto.nome,
                status: produto.status,
                valorUnidade: produto.valorUnidade,
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
              setProduto(null)
          } else {
            await api({
        method: 'POST',
        url: '/produto',
        data: {
          id: data.id,
          descricao: data.descricao,
          nome: data.nome,
          status: data.status,
          valorUnidade: data.valorUnidade,
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
        setProduto(null)           
    }

  function handleData() {    
    api
    .get('/produto')
    .then((res) => {
      setProdutos(res.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  const onDelete = async (id: number) => {
    
    await api({
      method: 'DELETE',
      url: `/produto${id}`,
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


  return (
    <>    
    <div className="px-4 mt-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
                <h1 className="text-xl gap-2 flex font-semibold text-gray-900">
                  <span>Produtos</span> 
                <span className='bg-blue-800 rounded-xl text-white px-2 animate-pulse '>{produtos.length}</span></h1>
                <p className="mt-2 text-sm text-gray-700">
                  Lista de todos os produtos cadastrados no sistema.
                </p>
          <div className="mt-4 pt-8 sm:mt-0  sm:flex-none">
              <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                
              <div className='flex w-full gap-4 flex-auto'>
              <input 
              {...register('nome')} 
                className='flex border w-full p-1 border-gray-500' 
                value={produto ? produto.nome : ''}
                onChange={(e) => setProduto({...produto, nome: e.target.value})} 
                name='nome' 
                placeholder='Nome'
                />
                
                <input className='flex border w-full p-1 border-gray-500' 
                {...register('descricao')}
                value={produto ? produto.descricao : ''}
                onChange={(e) => setProduto({...produto, descricao: e.target.value})} 
                name='descricao' 
                placeholder='Descrição' 
                />
              </div>

              <div className='flex w-full min-w-96 gap-4 flex-auto'>
                <input className='flex border w-full p-1 border-gray-500' 
                {...register('status')}                
                value={produto ? produto.status : ''}
                onChange={(e) => setProduto({...produto, status: e.target.value})} 
                name='status' 
                placeholder='Status'
                />

                <input className='flex border p-1 w-full border-gray-500' 
                {...register('valorUnidade')}
                value={produto ? produto.valorUnidade : 0}
                onChange={(e) => setProduto({...produto, valorUnidade: e.target.value})} 
                name='valorUnidade' 
                placeholder='Valor da Unidade'
                />
              </div>

                
                <button
                    type="submit"                    
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    {edit ? 'Salvar' : 'Adicionar produtos'}
                  </button>
                  {edit && (

                <button
                    type="button"
                    onClick={() => 
                      {setEdit(false)
                      setProduto(produtos[0])}
                    }                    
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Novo
                  </button>
                  )}
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
                      Nome do produto
                    </th>
                    <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Descrição
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Valor da unidade
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  
                  {produtos.map((produto: any) => (
                      <tr key={produto.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {produto.nome}
                        </td>
                        <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">{produto.status}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{produto.descricao}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${produto.valorUnidade}</td>                        
                        <td className="relative whitespace-nowrap py-4 pl-3 flex gap-2 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <button 
                          onClick={() => {
                            setProduto(produto)
                            setEdit(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900">
                            Editar
                          <span className="sr-only">, {produto.nome}</span>
                          </button>
                          <button onClick={() => {onDelete(produto.id)}} 
                          className="text-red-500 hover:text-indigo-900">
                            Deletar<span className="sr-only">, {produto.nome}</span>                            
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

export default Produtos