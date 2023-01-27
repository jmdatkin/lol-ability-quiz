import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ComboBox(props: any) {
    const [selectedItem, setSelectedItem] = useState(props.data[0])
    const [query, setQuery] = useState('')

    const filteredData =
        query === ''
            ? props.data
            : props.data.filter((item) => {
                return item.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className="relative">
            <Combobox value={selectedItem} onChange={setSelectedItem}>
                <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredData.map((item, idx) => {
                        <Combobox.Option key={idx} value={item}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                            }
                        >
                            {({ active }) => (
                                <span
                                    className={`${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                        }`}
                                >
                                    {item}
                                </span>
                            )}
                        </Combobox.Option>
                    })}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}