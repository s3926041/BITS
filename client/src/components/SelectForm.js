import Form from 'react-bootstrap/Form';

function SelectForm({sort,setRequest}) {
  // const [value,setValue] = useState(0)
  const handleChange = (e) => {
      setRequest(e.target.value,1)
      console.log(e.target.value)
  }
  return (
    <>
       <Form.Select aria-label="Default select example" className='sort text-xs' value={sort} onChange={handleChange}>
      <option value="0" className='text-xs'>A to Z</option>
      <option value="1" className='text-xs'>Z to A</option>
      <option value="2" className='text-xs'>Price Low to High</option>
      <option value="3" className='text-xs'>Price High to Low</option>
    </Form.Select>
    </>
 
  );
}

export default SelectForm;

// import { Fragment, useState } from 'react'
// import { Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// const arrSort = [
//   {
//     id: 1,
//     name:'A to Z'
    
   
//   },
//   {
//     id: 2,
//     name:'Z to A'

   
//   },
//   {
//     id: 3,
//     name:'Price Ascending'
 
    
//   },
//   {
//     id: 4,
//     name:'Price Descending'
    
//   },
  
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function SelectForm({sort,setRequest}) {
//   const [selected, setSelected] = useState(arrSort[0])

//   return (
//     <Listbox value={selected} onChange={(setSelected) }>
//       {({ open }) => (
//         <>
//           <div className="relative w-[200px] mt-1">
//             <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
//               <span className="flex items-center">
//                 <span className="ml-3 block truncate">{selected.name}</span>
//               </span>
//               <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
//                 <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </span>
//             </Listbox.Button>

//             <Transition
//               show={open}
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                 {arrSort.map((item,i) => (
//                   <Listbox.Option
//                     key={i}
//                     className={({ active }) =>
//                       classNames(
//                         active ? 'text-white bg-indigo-600' : 'text-gray-900',
//                         'relative cursor-default select-none py-2 pl-3 pr-9'
//                       )
//                     }
//                     value={item}
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         <div className="flex items-center">
//                           <span
//                             className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
//                           >
//                             {item.name}
//                           </span>
//                         </div>

//                         {selected ? (
//                           <span
//                             className={classNames(
//                               active ? 'text-white' : 'text-indigo-600',
//                               'absolute inset-y-0 right-0 flex items-center pr-4'
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>
//   )
// }
