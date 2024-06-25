"use client";
//"use server";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";

export type InputType = {
  label: string;
  type: string;
  placeholder: string;
  name: "origen" | "destino" | "peso";
};

export type InputValue = {
  name: string;
  value: string | number;
};

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
];
export const Form = (props: { handleSubmit: any, options: any, handleGraphType: any }) => {
  const getNameAndValueInit = () => {
    return {
      origen: "",
      destino: "",
      peso: 0,
    };
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
  };

  const getIsDisableButton = () => {
    return !values.origen || !values.destino || !values.peso || values.peso < 0;
  };

  return (
    <form className="flex flex-col sm:flex-row w-full justify-center items-center flex-wrap gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
        <Select
          label="Tipo de grafo"
          placeholder="Select an option"
          color="secondary"
          className="w-full"
          isRequired
          onChange={(e) => {
            props.handleGraphType(e.target.value);
          }}
        >
          {props.options.map((op: any) => (
            <SelectItem key={op.key}>{op.label}</SelectItem>
          ))}
        </Select>
        {inputs.map((input) => (
          <Input
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
            onChange={handleChange}
            className="w-full"
            min={0}
          />
        ))}

      </div>

      <Button
        onClick={() => props.handleSubmit(values)}
        isDisabled={getIsDisableButton()}
        color="secondary"
      >
        Agregar
      </Button>
    </form>
  );
};
