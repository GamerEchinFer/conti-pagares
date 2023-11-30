import React, { memo, useMemo, useState } from 'react'
import CustomMaterialDataTable from '../../shared/DataTable/CustomMaterialDataTable';
import { MRT_ColumnDef, MRT_Row, MRT_RowSelectionState, MRT_TableInstance } from 'material-react-table';
import { SimpleRowSelectionState } from '../../../interfaces/_common';
import { PromissoryNotesConsultDelivery } from '../../../interfaces/promissoryNotes';
import { ColumnDef, Updater, OnChangeFn } from '@tanstack/react-table';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ModalPromissoryNotesDelivery from './ModalPromissoryNotesDelivery';
import { promissoryNotesDeliveryActions } from '../../../redux/slices/delivery.slice';
import { useDispatch } from 'react-redux';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';
import { errorNotify } from '../../../helpers/notify';
import { promissoryNotesHelper } from '../../../helpers/promissoryNotes';

interface DeliveryDataTableProps {
    data: PromissoryNotesConsultDelivery[];
    isLoading: boolean;
    columns: MRT_ColumnDef<PromissoryNotesConsultDelivery>[];
    nestedFields: ColumnDef<PromissoryNotesConsultDelivery>[];
}
const DeliveryDataTable = memo(({ data, isLoading, columns, nestedFields }: DeliveryDataTableProps) => {
    const dispatch = useDispatch();
    const initialRowSelection = useMemo(() => ({}), []); // Estado inicial memoizado
    const initialSubRowSelection = useMemo(() => ({}), []); // Estado inicial memoizado
    const initialCurrentRowsSelected = useMemo<PromissoryNotesConsultDelivery[]>(() => ([]), []); // Estado inicial memoizado

    const { getRowId } = promissoryNotesHelper;

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>(initialRowSelection);
    const [subRowSelection, setSubRowSelection] = useState<SimpleRowSelectionState>(initialSubRowSelection);
    const [currentRowsSelected, setCurrentRowsSelected] = useState<PromissoryNotesConsultDelivery[]>(initialCurrentRowsSelected);

    // const handleChangeRowSelection = (updaterOrValue: Updater<SimpleRowSelectionState>) => {
    //     setRowSelection((old) => {
    //         if (typeof updaterOrValue == "function") {
    //             const newValue = updaterOrValue(old);
    //             const codClienteSelectedKey = Number(Object.keys(newValue)[0]);
    //             const codClientSelectedValue = newValue[codClienteSelectedKey];

    //             const subRowsSelection = data?.find(d => d.nroEnvio == codClienteSelectedKey)?.subRows?.reduce((acc, curr) => {
    //                 acc[`${curr.operacion}_${curr.nroEnvio.toString()}`] = codClientSelectedValue;
    //                 return acc;
    //             }, {} as SimpleRowSelectionState);
    //             setSubRowSelection(subRowsSelection ?? {});
    //             return newValue;
    //         }
    //         return updaterOrValue;
    //     });
    // }

    const handleChangeRowSelection = useMemo(() => {
        const updaterOrValueHandler = (updaterOrValue: Updater<SimpleRowSelectionState>) => {
            setRowSelection((old) => {
                if (typeof updaterOrValue === "function") {
                    const newValue = updaterOrValue(old);
                    const codClienteSelectedKey = String(Object.keys(newValue)[0]);
                    const codClientSelectedValue = newValue[codClienteSelectedKey];

                    const subRowsSelection = data
                        ?.find((d) => d.cliente.codigoCliente == codClienteSelectedKey)
                        ?.subRows?.reduce((acc, curr) => {
                            acc[`${getRowId(curr)}`] = codClientSelectedValue;
                            return acc;
                        }, {} as SimpleRowSelectionState);
                    setSubRowSelection(subRowsSelection ?? {});
                    return newValue;
                }
                return updaterOrValue;
            });
        };

        const handleRowSelectionChange: OnChangeFn<SimpleRowSelectionState> = (updater) => {
            // Aquí puedes realizar cualquier lógica adicional si es necesario
            updaterOrValueHandler(updater);
        };

        return handleRowSelectionChange;
    }, [data, rowSelection, setRowSelection]);

    const handleChangeSubRowSelection = (
        updaterOrValue: Updater<SimpleRowSelectionState>,
        parentRow: MRT_Row<PromissoryNotesConsultDelivery>,
        table: MRT_TableInstance<PromissoryNotesConsultDelivery>
    ) => {
        setSubRowSelection((old) => {
            console.log("oldValues: ", old);
            if (typeof updaterOrValue == "function") {
                const currentKeysSelected = Object.keys(old);
                console.log("currentKeysSelected: ", currentKeysSelected);
                const currentCodClientsSelected = currentKeysSelected.map(key => key.split("_")[1]);
                console.log("currentCodClientsSelected: ", currentCodClientsSelected);

                const newValue = updaterOrValue(old);
                const newSelectedKey = Object.keys(newValue);
                console.log("newSelectedKey: ", newSelectedKey);
                const codClientSelected = newSelectedKey.length > 1 ? newSelectedKey[newSelectedKey.length - 1].split("_")[1] : "";
                console.log("codClientSelected: ", codClientSelected);

                console.log("parentRow: ", parentRow.original);
                //validacion de seleccion de hijo solo de un padre
                const validCodClientSelected = currentCodClientsSelected.some(
                    codClient => codClient != codClientSelected
                );

                console.log("validCodClientSelected: ", validCodClientSelected);
                if (validCodClientSelected && codClientSelected != "") {
                    errorNotify("No se puede seleccionar un Código Cliente diferente");
                    return old;
                }

                return updaterOrValue(old);
            }

            return updaterOrValue;
        });
    }

    const handlerClickDelivery = () => {
        console.log(subRowSelection);
        const promissoryNotesByCodClientSelected = data?.filter(d => {
            const keysSubRowSelection = Object.keys(subRowSelection);
            //el key de subRowSelection esta compuesto por ${row.operacion}_${row.cliente.codigoCliente}_${row.cuota}
            const codClientsSelected = keysSubRowSelection.map(key => key.split("_")[1]);//todos los codigos de cliente
            const someSubRowSelected = codClientsSelected.some(key => key == d.cliente.codigoCliente.toString());
            return someSubRowSelected;
        });

        const promissoryNotesSelected = promissoryNotesByCodClientSelected?.reduce((acc, curr) => {
            const promissoryNoteSelected = curr.subRows?.filter(sr => {
                const keysSubRowSelection = Object.keys(subRowSelection);
                const operacionSelected = keysSubRowSelection.map(key => key.split("_")[0]);
                const codClientsSelected = keysSubRowSelection.map(key => key.split("_")[1]);
                const cuotaSelected = keysSubRowSelection.map(key => key.split("_")[2]);

                const operacion = operacionSelected.some(os => os == sr.operacion);
                const codClient = codClientsSelected.some(cc => cc == curr.cliente.codigoCliente.toString());
                const cuota = cuotaSelected.some(c => c == sr.cuota.toString());
                return operacion && codClient && cuota;
            });
            if (!promissoryNoteSelected) return acc;
            acc = [...acc, ...promissoryNoteSelected]
            return acc;
        }, [] as PromissoryNotesConsult[]);
        // console.log("data: ", data);

        if (promissoryNotesSelected.length == 0) {
            errorNotify("Debe seleccionar al menos un pagaré");
            return;
        }
        console.log("promissoryNotesSelected: ", promissoryNotesSelected);

        dispatch(promissoryNotesDeliveryActions.setResetDatos());
        dispatch(promissoryNotesDeliveryActions.setPromissoryNotesConsultDelivery(promissoryNotesSelected));
        dispatch(promissoryNotesDeliveryActions.setPromissoryNotesForm(promissoryNotesSelected));
        dispatch(promissoryNotesDeliveryActions.setPromissoryNoteObservation(""));
        dispatch(promissoryNotesDeliveryActions.setFormShowModal(true));
    }
    return (
        <>
            <ModalPromissoryNotesDelivery />
            <CustomMaterialDataTable
                data={data ?? []}
                columns={columns}
                isLoading={isLoading}
                // enableRowVirtualization
                // enableStickyHeader

                //SELECTABLE
                enableRowSelection
                onRowSelectionChange={handleChangeRowSelection}

                //NESTED TABLE
                enableNestedTable
                nestedFields={nestedFields}
                onSubRowSelectionChange={handleChangeSubRowSelection}
                subRowSelection={subRowSelection}
                nestedTableProps={{
                    getRowId: (row: PromissoryNotesConsultDelivery) => `${getRowId(row)}`,
                }}

                state={{
                    rowSelection: rowSelection
                }}

                muiSelectCheckboxProps={((props) => {
                    const currentState = props.table.getState();
                    const currentCodigoCliente = props.row.original.cliente.codigoCliente;
                    const keysSubRowSelection = Object.keys(subRowSelection);
                    const keysSubRowSelectionMapped = keysSubRowSelection.map(key => key.split("_")[1]);
                    const someSubRowSelected = keysSubRowSelectionMapped.some(key => key == currentCodigoCliente.toString());
                    const currentRowSelected = currentState.rowSelection[currentCodigoCliente];

                    const someAnotherRowSelected = Object.keys(currentState.rowSelection)
                        .some(key => key != currentCodigoCliente.toString());

                    return {
                        //indeterminado cuando hay hijos seleccionados y el padre no
                        indeterminate: someSubRowSelected && !currentRowSelected,
                        onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                            if (someAnotherRowSelected) {
                                errorNotify("No se puede seleccionar un Código Cliente diferente");
                                return;
                            }
                            props.row.toggleSelected();

                        }
                    }
                })}

                getRowId={(originalRow: PromissoryNotesConsultDelivery) => {
                    return originalRow.cliente.codigoCliente.toString();
                }}
            />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 2,
                }}
            >

                <Button variant={"contained"} onClick={handlerClickDelivery}>Entregar</Button>
            </Box>
        </>
    )
});

export default DeliveryDataTable