import { InputInfo } from '../InputInfo';
import { useState, useEffect } from 'react';




export function DateComponent() {

  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  const timeOptions = { hour: 'numeric', minute: 'numeric' }

  return (


    <>

      <InputInfo
        Date={date.toLocaleDateString()}
        Hour={date.toLocaleTimeString([], timeOptions)}
      />


    </>


  )
}