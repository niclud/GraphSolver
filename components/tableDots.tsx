import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableColumn,
  TableBody,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { DeleteIcon } from "./icons";

export default function TableDots(props: {
  dots: any;
  setDot: (params: any) => void;
}) {
  const formateDot = (initialize: boolean = false) => {
    let variable = props.dots.match(/{([^}]*)}/);
    if (!variable) return;

    console.log(props.dots);
    variable = variable[1];
    variable = variable.split(";");
    variable.shift();
    variable.pop();
    const array = variable.map((e: any, index: any) => {
      let peso = e.match(/\[label=(\d+)\]/);
      let origen = e.match(/^[^-]*/)[0];
      let destino = "";
      if (e.includes("->")) {
        destino = e.match(/->([^[]*)/)[1];
      } else {
        destino = e.match(/--([^[]*)/)[1];
      }
      return {
        id: index,
        origen: origen.trim(),
        destino: destino.trim(),
        peso: peso ? peso[1] : "",
        dot: e,
      };
    });
    if (!initialize) setDotsTable(array);
    return array;
  };
  const [dotsTable, setDotsTable] = useState(formateDot(true));

  const renderCell = useCallback(
    (dot: any, columnKey: any) => {
      const cellValue = dot[columnKey];
      switch (columnKey) {
        case "acciones":
          return (
            <div className="w-max">
              <Tooltip content="Eliminar Nodo" color="danger">
                <span className="cursor-pointer text-danger">
                  <DeleteIcon onClick={() => eliminarDot(dot.dot)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [dotsTable]
  );

  const eliminarDot = (dot: string) => {
    console.log("Dot to delete:", dot);
    dot += ";";
    props.setDot(dot);
  };

  const columns = [
    {
      key: "origen",
      label: "ORIGEN",
    },
    {
      key: "destino",
      label: "DESTINO",
    },
    {
      key: "peso",
      label: "PESO",
    },
    {
      key: "acciones",
      label: "ACCIONES",
    },
  ];

  useEffect(() => {
    formateDot();
  }, [props.dots]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No graph found"} items={dotsTable}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
