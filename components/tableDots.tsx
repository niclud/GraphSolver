import React, { Key, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableCell,
    TableColumn,
    TableBody,
    TableRow
} from "@nextui-org/table";

export default function TableDots(props: { dots: any }) {
    const [dotsTable, setDotsTable] = React.useState(props.dots)

    // const renderCell = React.useCallback((dot: any, columnKey: React.Key) => {
    //     const cellValue = dot[columnKey];

    //     // switch (columnKey) {
    //     //     return (
    //     //       <div className="relative flex justify-end items-center gap-2">
    //     //         <Dropdown>
    //     //           <DropdownTrigger>
    //     //             <Button isIconOnly size="sm" variant="light">
    //     //               <VerticalDotsIcon className="text-default-300" />
    //     //             </Button>
    //     //           </DropdownTrigger>
    //     //           <DropdownMenu>
    //     //             <DropdownItem>View</DropdownItem>
    //     //             <DropdownItem>Edit</DropdownItem>
    //     //             <DropdownItem>Delete</DropdownItem>
    //     //           </DropdownMenu>
    //     //         </Dropdown>
    //     //       </div>
    //     //     );
    //     //   default:
    //     //     return cellValue;
    //     // }
    //     return cellValue
    // }, []);


    const formateDot = () => {
        let variable = props.dots.match(/{([^}]*)}/);
        console.log(props.dots)
        variable = variable[1]
        variable = variable.split(';')
        variable.shift()
        variable.pop()
        const array = variable.map((e: any) => {

            let match = e.match(/\[label=(\d+)\]/);
            return ({
                id: e[0],
                origen: e[0],
                destino: e[3],
                peso: match[1]

            })
        })
        console.log(variable)
        console.log(array)

    }

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
    ];


    React.useEffect(() => {
        formateDot()
    }, [props.dots])
    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContentPlacement="outside"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={dotsTable}>
                {(item: any) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
                {/* <TableRow>
                    <TableCell>{props.dots}</TableCell>
                    <TableCell>{props.dots}</TableCell>
                    <TableCell>{props.dots}</TableCell>

                </TableRow> */}
            </TableBody>
        </Table>
    )
}