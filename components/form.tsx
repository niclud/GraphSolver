"use client";
//"use server";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import React from "react";

export type InputType = {
    label: string;
    type: string;
    placeholder: string;
    name: 'origen' | 'destino' | 'peso';
}

export type InputValue = {
    name: string;
    value: string | number ;
}

let inputs: InputType[] = [
{
  label: "Origen",
  type: "text",
  placeholder: "Origen",
  name: "origen",
},
{
  label: "Destino",
  type: "text",
  placeholder: "Destino",
  name: "destino",
},
{
  label: "Peso",
  type: "number",
  placeholder: "Peso",
  name: "peso",
},
]
export const Form = (props: {handleSubmit: any}) => {
    
    const getNameAndValueInit = () => {
         return {
            origen: '',
            destino: '',
            peso: 0
         }
    };
    const [values, setValues] = React.useState(getNameAndValueInit());

    const handleChange = (evt: any) => {

    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    // Sincroniza el estado de nuevo
    setValues(newValues);
    }

    const getIsDisableButton = () => {
        return !values.origen || !values.destino || (!values.peso && values.peso >= 0);
    }

  return (
    
    <form className="grid grid-flow-col gap-5">
        {inputs.map((input) => <Input 
            key={input.name} 
            size="md" 
            color="secondary" 
            variant="bordered" 
            isRequired 
            label={input.label} 
            type={input.type} 
            placeholder={input.placeholder}
            name={input.name}
            value={String(values[input.name])}
            onChange={handleChange} />)}
    
        <Button onClick={() => props.handleSubmit(values)} isDisabled={getIsDisableButton()} color="secondary">Agregar</Button>  
    </form>
  );
};

