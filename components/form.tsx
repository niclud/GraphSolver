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

export const Form = (props: { handleSubmit: any; options: any; handleGraphType: any }) => {
  const getNameAndValueInit = () => {
    return {
      origen: "",
      destino: "",
      peso: 0,
    };
  };

  const [values, setValues] = React.useState(getNameAndValueInit());
  const [isInvalid, setIsInvalid] = React.useState({ origen: false, destino: false });

  const handleChange = (evt: any) => {
    const { name, value } = evt.target;

    // Validación para caracteres especiales
    const regex = /^[a-zA-Z0-9]*$/;
    if (name === "origen" || name === "destino") {
      if (!regex.test(value)) {
        setIsInvalid((prevInvalid) => ({
          ...prevInvalid,
          [name]: true,
        }));
      } else {
        setIsInvalid((prevInvalid) => ({
          ...prevInvalid,
          [name]: false,
        }));
      }
    }

    const newValues = {
      ...values,
      [name]: value,
    };

    // Sincroniza el estado de nuevo
    setValues(newValues);
  };

  const getIsDisableButton = () => {
    return (
      !values.origen ||
      !values.destino ||
      !values.peso ||
      values.peso < 0 ||
      isInvalid.origen ||
      isInvalid.destino
    );
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
            color={isInvalid[input.name as keyof typeof isInvalid] ? "danger" : "secondary"}
            variant="bordered"
            isRequired
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={String(values[input.name])}
            onChange={handleChange}
            className="w-full min-w-[200px]"
            min={0}
            isInvalid={isInvalid[input.name as keyof typeof isInvalid]}
            errorMessage={isInvalid[input.name as keyof typeof isInvalid] ? "Solo se permiten letras y números." : ""}
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