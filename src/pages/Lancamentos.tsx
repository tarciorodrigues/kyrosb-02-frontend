import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

type Lancamento = {
  id: number;
  idCliente: number;
  idProduto: number;
  quantidadeVendida: number;
  dataDaVenda: string;
}


function Lancamentos() {

  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [lancamento, setLancamento] = useState<any>(lancamentos[0])
  const [produtos, setProdutos] = useState<any>()
  const [clientes, setClientes] = useState<any>()

  const [edit, setEdit] = useState(false)
  const [openProduto, setOpenProduto] = useState(false)
  const [comboProduto, setComboProduto] = useState<any>(lancamento)
  const [openCliente, setOpenCliente] = useState(false)
  const [comboCliente, setComboCliente] = useState<any>(lancamento)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  console.log(
    'lancamentos =>', lancamentos,
    'lancamento =>', lancamento,
    'comboProduto =>', comboProduto,
    'comboCliente =>', comboCliente,
    )



  const onSubmit = async (data: any) => {
          if (edit){
            await api({
              method: 'PUT',
              url: '/lancamento',
              data: {
                id: lancamento.id,
                idCliente: comboCliente.idCliente,
                idProduto: comboProduto.idProduto,
                quantidadeVendida: lancamento.quantidadeVendida,
                valorTotalDaVenda: lancamento.valorTotalDaVenda,
                dataDaVenda: lancamento.dataDaVenda,
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
              setLancamento(null)
          } else {
            console.log('data', data)
            await api({
        method: 'POST',
        url: '/lancamento',
        data: {
          id: data.id,
          idCliente: comboCliente.idCliente,
          idProduto: comboProduto.idProduto,
          valorTotalDaVenda: data.valorTotalDaVenda,
          quantidadeVendida: data.quantidadeVendida,
          dataDaVenda: data.dataDaVenda,
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
        setLancamento(null)           
    }

  function handleData() {    
    api
    .get('/lancamento')
    .then((res) => {
      setLancamentos(res.data)
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  function handleDataProduto() {    
    api
    .get(`/produto`)
    .then((res) => {
      setProdutos(res.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  function handleDataCliente() {    
    api
    .get(`/cliente`)
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
      url: `/lancamento${id}`,
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
    handleDataProduto()
    handleDataCliente()      
  }, []);

  console.log('clientes', clientes)



  return (
    <>    
    <div className="px-4 mt-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h1 className="text-xl gap-2 flex font-semibold text-gray-900">
                  <span>Lançamentos</span> 
                <span className='bg-blue-800 rounded-xl text-white px-2 animate-pulse '>
                  {lancamentos.length}</span></h1>
                <p className="mt-2 text-sm text-gray-700">
                  Lista de todos os lançamentos cadastrados no sistema.
                </p>
          <div className="mt-4 pt-8 sm:mt-0  sm:flex-none">
              <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col gap-4'>
                <div className='flex flex-col w-full gap-2 flex-auto'>

                <div className='flex w-full gap-4'>

                <input 
                {...register('quantidadeVendida')} 
                  className='flex border p-1 w-full border-gray-500' 
                  value={lancamento ? lancamento.quantidadeVendida : 1}
                  onChange={(e) => setLancamento({...lancamento, quantidadeVendida: e.target.value})} 
                  name='quantidadeVendida' 
                  placeholder='Quantidade da venda'
                  />

                <input className='flex border p-1 w-full border-gray-500' 
                {...register('valorTotalDaVenda')}
                value={lancamento && lancamento.valorTotalDaVenda}
                onChange={(e) => setLancamento({...lancamento, valorTotalDaVenda: e.target.value})} 
                name='valorTotalDaVenda' 
                placeholder='Valor Total da Venda'
                />

                <input className='flex border w-full p-1 border-gray-500' 
                {...register('dataDaVenda')}
                value={lancamento && lancamento.dataDaVenda}
                onChange={(e) => setLancamento({...lancamento, dataDaVenda: e.target.value})} 
                name='dataDaVenda' 
                placeholder='Data da Venda'
                />
                
                
                </div>

                <div className='flex gap-4 h-9 justify-center w-full'>

                <div className='flex w-full border p-1 cursor-pointer border-gray-500'>
                <button type="button" onClick={() => setOpenProduto(!openProduto)} className='flex w-full'>
                {openProduto && (
                  <div className='flex flex-col gap-2 bg-white border border-gray-500 absolute  items-start'>
                    {produtos.map((produto: any) => (
                      <button onClick={() => setComboProduto({...comboProduto, idProduto: produto.id, nome:produto.nome})} 
                      className='flex gap-2 p-2 hover:bg-gray-200'>
                        <span>{produto.nome}</span>                        
                      </button>  
                    ))}
                  </div>
                )}
                <div className='flex text-gray-900 '>
                  {comboProduto ? comboProduto.nome : 'Selecione um produto'}
                <input className='hidden text-white ' 
                {...register('idProduto')}
                value={comboProduto && comboProduto.idProduto}
                onChange={(e) => setLancamento({...lancamento, idProduto: e.target.value})} 
                name='idProduto' 
                placeholder='' 
                />                
                </div>
                </button>
                </div>         
                
                <div className='flex w-full border p-1 cursor-pointer border-gray-500'>
                <button type="button" onClick={() => setOpenCliente(!openCliente)} className='flex w-full'>
                {openCliente && (
                  <div className='flex flex-col gap-2 bg-white border border-gray-500 absolute  items-start'>
                    {clientes.map((cliente: any) => (
                      <button onClick={() => setComboCliente({...comboCliente, idCliente: cliente.id, nome:cliente.nome})} 
                      className='flex gap-2 p-2 hover:bg-gray-200'>
                        <span>{cliente.nome}</span>                        
                      </button>  
                    ))}
                  </div>
                )}
                <div className='flex text-gray-900 '>
                  {comboCliente ? comboCliente.nome : 'Selecione um cliente'}
                <input className='hidden text-white ' 
                {...register('idCliente')}
                value={comboCliente && comboCliente.idCliente}
                onChange={(e) => setLancamento({...lancamento, idCliente: e.target.value})} 
                name='idCliente' 
                placeholder='' 
                />                
                </div>
                </button>
                </div>
                                      

                </div>
                </div>

                <div className='flex gap-4'>

                <button
                    type="submit"                    
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                  >
                    {edit ? 'Salvar' : 'Novo lançamento'}
                  </button>
                  {edit && (

                <button
                    type="button"
                    onClick={() => 
                    { setEdit(false)
                      setLancamento(lancamento[0])
                      setComboProduto({...lancamento, nome: 'Selecione o novo produto'})
                      setComboCliente({...lancamento, nome: 'Selecione o novo cliente'})

                    }
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
                    Quantidade
                    </th>
                    <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Produto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Cliente
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Data da Venda
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Valor Total
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">                  
                  {lancamentos.map((lancamento: any) => (
                      <tr key={lancamento.id}>
                        <td className="whitespace-nowrap justify-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                          {lancamento.quantidadeVendida}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {produtos && produtos.map((produto: any) => 
                            <span key={produto.id}>
                            {produto.id === lancamento.idProduto &&                              
                                produto.nome
                              }
                            </span>)}
                        </td>
                        <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {clientes && clientes.map((cliente: any) => 
                            <span key={cliente.id}>
                            {cliente.id === lancamento.idCliente &&                              
                                cliente.nome
                              }
                            </span>)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lancamento.dataDaVenda}</td>                        
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${lancamento.valorTotalDaVenda}</td>                        
                        <td className="relative whitespace-nowrap py-4 pl-3 flex gap-2 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                          <button 
                          onClick={() => {
                            setLancamento(lancamento)
                            setComboProduto({...lancamento, nome: 'Selecione o novo produto'})
                            setComboCliente({...lancamento, nome: 'Selecione o novo cliente'})
                            setEdit(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900">
                            Editar
                          <span className="sr-only">, {lancamento.idProduto}</span>
                          </button>
                          <button onClick={() => {onDelete(lancamento.id)}} 
                          className="text-red-500 hover:text-indigo-900">
                            Deletar<span className="sr-only">, {lancamento.idProduto}</span>                            
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

export default Lancamentos