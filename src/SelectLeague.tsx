import React from 'react'
import { useForm } from 'react-hook-form';
import { leagues } from './constants/leagues';

const SelectLeague = ({ setNowId }: { setNowId: (id: number) => void }) => {
    const {register} = useForm();
    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setNowId(Number(e.target.value))
    }
  return (
    <>
      <select {...register('league' ,{required : true})} onChange={handleSelect} >
        {leagues.map((data) => (
          <option key={data.id} value={data.id}>{data.name}</option>
        ))}
      </select>
    </>
  )
}

export default SelectLeague