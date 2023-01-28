import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'

export default function ComboBox(props) {
  const items = props.items;

  const [selected, setSelected] = useState(items[0])
  const [query, setQuery] = useState('')


  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/'/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
      <Combobox value={props.selectedChampion} onChange={props.setSelectedChampion}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md text-2xl ring-4 ring-purple-600 hover:bg-orange-400 hover:ring-orange-600">
            <Combobox.Input
              // className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              className="w-full border-none outline-none py-4 pl-5 pr-10 ring"
              onChange={(event) => setQuery(event.target.value)}
              onFocus={(event) => event.target.select()}
            />
            <Combobox.Button className="w-full absolute inset-y-0 right-0 flex items-center border-none outline-none">
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute max-h-60 mt-1 w-full text-left text-xl overflow-auto rounded-bl-md rounded-br-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-purple-600 text-white' : 'text-white'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
  )
}
