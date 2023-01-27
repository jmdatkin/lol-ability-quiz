import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { SkillSlot } from 'types/SkillSlotSelect';

export default function SkillSlotSelect(props) {
  let [skill, setSkill] = useState(SkillSlot.INNATE);

  return (
    <RadioGroup value={props.selectedSkillSlot} onChange={props.setSelectedSkillSlot}
    className="flex space-x-4 text-2xl p-1 select-none"
    >
      <RadioGroup.Option value={SkillSlot.INNATE}
      className="block w-[4rem] h-[4rem]"
      >
        {({ checked }) => (
          <span className={`${checked ? '!bg-orange-400 ring-orange-600' : 'ring-purple-700'} block w-full h-full ring-4 hover:bg-purple-800 cursor-pointer leading-[250%] rounded-md`}>P</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={SkillSlot.Q}
      className="block w-[4rem] h-[4rem] ring-4 ring-purple-600 rounded-md"
      >
        {({ checked }) => (
          <span className={`${checked ? '!bg-orange-400 ring-orange-600' : 'ring-purple-700'} block w-full h-full ring-4 hover:bg-purple-800 cursor-pointer leading-[250%] rounded-md`}>Q</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={SkillSlot.W}
      className="block w-[4rem] h-[4rem] ring-4 ring-purple-600 rounded-md"
      >
        {({ checked }) => (
          <span className={`${checked ? '!bg-orange-400 ring-orange-600' : 'ring-purple-700'} block w-full h-full ring-4 hover:bg-purple-800 cursor-pointer leading-[250%] rounded-md`}>W</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={SkillSlot.E}
      className="block w-[4rem] h-[4rem] ring-4 ring-purple-600 rounded-md"
      >
        {({ checked }) => (
          <span className={`${checked ? '!bg-orange-400 ring-orange-600' : 'ring-purple-700'} block w-full h-full ring-4 hover:bg-purple-800 cursor-pointer leading-[250%] rounded-md`}>E</span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={SkillSlot.R}
      className="block w-[4rem] h-[4rem] ring-4 ring-purple-600 rounded-md"
      >
        {({ checked }) => (
          <span className={`${checked ? '!bg-orange-400 ring-orange-600' : 'ring-purple-700'} block w-full h-full ring-4 hover:bg-purple-800 cursor-pointer leading-[250%] rounded-md`}>R</span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  )
}