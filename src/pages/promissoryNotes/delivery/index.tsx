import React, { useMemo, useState } from 'react'
import ModuleContentWrapper from '../../../components/shared/ui/ModuleContentWrapper';
import Grid from '@mui/material/Unstable_Grid2';
import FilterControls from '../../../components/shared/FilterControls/FilterControls';
import SearchButton from '../../../components/shared/ui/buttons/SearchButton';
import ExportButton from '../../../components/shared/ui/buttons/ExportButton';
import { exportDataTable } from '../../../helpers/exportFromJson';
import { promissoryNotesDeliveryFilters } from '../../../constants/promissoryNotes/deliveryConfig';
import { MRT_ColumnDef } from 'material-react-table';
import { FilterControlMetaData, FilterControlState } from '../../../interfaces/components/filterControls';
import { useQuery } from '@tanstack/react-query';
import { PromissoryNotesConsultDelivery } from '../../../interfaces/promissoryNotes';
import { ColumnDef } from '@tanstack/react-table';
import IndeterminateCheckbox from '../../../components/shared/DataTable/IndeterminateCheckbox';
import DeliveryDataTable from '../../../components/promissoryNotes/delivery/DeliveryDataTable';
import { exampleDataDelivery } from '../../../data/exampleDataDelivery';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';

interface GroupedPromissoryNotes {
    [key: string]: PromissoryNotesConsultDelivery;
}

const index = () => {
    const [filterState, setFilterState] = useState<FilterControlState[]>([]);
    const initialData = useMemo<PromissoryNotesConsultDelivery[]>(() => ([]), []); // Estado inicial memoizado

    const { isPending, isLoading, isFetched, error, data: fetchedData,
        refetch: fetchConsult, isRefetching, isRefetchError } = useQuery({
            queryKey: ['promissoryNotesConsult'],
            queryFn: async () => {
                // codClient
                // nroDocumento
                // operacion
                // const selectFilter = filterState.find(f => f.type == EFilterControlsTypes.Select);
                // const dateRangeFilter = filterState.find(f => f.type == EFilterControlsTypes.DateRange);
                // const textFieldCuotaFilter = filterState.find(f => f.type == EFilterControlsTypes.TextField);

                // const operation = selectFilter?.key == "operacion" ? selectFilter.value : "999";
                // const codClient = selectFilter?.key == "codClient" ? selectFilter.value : "999";
                // const docNumber = selectFilter?.key == "nroDocumento" ? selectFilter.value : "999";
                // const cuota = textFieldCuotaFilter?.key == "cuota" ? textFieldCuotaFilter.value : "999";
                // const dateRange: DateRangeRequestValue = {
                //     from: dayjs("01/01/1900"),
                //     to: dayjs()
                // };

                // let clientFullName = "";
                // if (codClient != "999") {
                //     const respClient = await internalServices.getClientData(codClient);
                //     clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
                // }

                // if (docNumber != "999") {
                //     const respClient = await internalServices.getClientData("", docNumber);
                //     clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
                // }

                // const resp = await promissoryNotesServices.getConsult(operation, codClient, cuota, dateRange);
                // console.log("resp: ", resp.data);
                const promissoryNotes = exampleDataDelivery;
                const groupedData: GroupedPromissoryNotes = promissoryNotes.reduce<GroupedPromissoryNotes>((acc, obj) => {
                    const codigoCliente = obj.cliente.codigoCliente;
                    const promissoryNotesDelivery = { ...obj as PromissoryNotesConsult };
                    if (Object.keys(acc).includes(codigoCliente) == false) {
                        acc[codigoCliente] = { ...obj as PromissoryNotesConsultDelivery };
                        acc[codigoCliente].subRows = [];
                    }
                    acc[codigoCliente].subRows?.push(promissoryNotesDelivery as PromissoryNotesConsult);
                    return acc;
                }, {});
                return {
                    data: Object.values(groupedData),
                    clientFullName: "Example"
                };
            },
            enabled: false,
            retry: false
        });
    const data = fetchedData?.data;

    // *) Nro Envio - cliente - nombre - Estado - Usuario - fecharecepcion
    // *) NroEnvio - operacion - cuota - tipodoc - clienteRetiro - FechaEntrega - UsuarioEntrega
    const columns: MRT_ColumnDef<PromissoryNotesConsultDelivery>[] = useMemo<MRT_ColumnDef<PromissoryNotesConsultDelivery>[]>(
        () => [
            // {
            // accessorKey: "select",
            // header: "Seleccionaraaaaaa",
            // id: "select",
            // Header: ({ table }) => (
            //     <IndeterminateCheckbox
            //         indeterminate={table.getIsSomeRowsSelected()}
            //         checked={table.getIsAllRowsSelected()}
            //         onChange={table.getToggleAllRowsSelectedHandler()}
            //     />
            // ),
            // Cell: ({ row }) => (
            //     <div className="px-1">
            //         <IndeterminateCheckbox
            //             {...{
            //                 checked: row.getIsSelected(),
            //                 disabled: !row.getCanSelect(),
            //                 indeterminate: row.getIsSomeSelected(),
            //                 onChange: row.getToggleSelectedHandler(),
            //             }}
            //         />
            //     </div>
            // ),
            // },
            {
                accessorKey: "nroEnvio",
                header: "Nro. Envío",
                id: "nroEnvio",
            },
            {
                accessorKey: "cliente.codigoCliente",
                header: "Cliente",
            },
            {
                accessorKey: "cliente.nombreCliente",
                header: "Nombre",
            },
            {
                accessorKey: "estado",
                header: "Estado",
            },
            // {
            //     accessorKey: "",
            //     header: "Cliente",
            // },
            // {
            //     accessorKey: "nombreClienteRecibe",
            //     header: "Cliente",
            // },
            // {
            //     accessorKey: "monto",
            //     header: "Cliente",
            // },
        ],
        [],
    );

    const nestedFields = useMemo<ColumnDef<PromissoryNotesConsultDelivery>[]>(
        () => [
            {
                id: 'select',
                header: "Seleccionar",
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                accessorKey: "nroEnvio",
                header: "Envío",
            },
            {
                accessorKey: "operacion",
                header: "Operación",
            },
            {
                accessorKey: "cuota",
                header: "Cuota",
            },
            {
                accessorKey: "cliente.tipoDocumento",
                header: "Documento",
            },
            {
                accessorKey: "cliente.codigoCliente",
                header: "Retiró",
            },
            {
                accessorKey: "entrega.fechaEntrega",
                header: "Fecha",
            },
            {
                accessorKey: "entrega.nombreUsuario",
                header: "Usuario",
            }
        ],
        []
    );

    const handlerChangeFilter = (filterState: FilterControlState[]) => {
        setFilterState(filterState);
    }



    const handlerClickExport = () => {
        if (data && data.length > 0) {
            exportDataTable({ data, fileName: "example" });
        }
    };

    const handlerClickSearch = () => {
        fetchConsult();
        if (filterState.length > 0 && filterState[0].value != "") {

        }
    }

    const isLoadingFilter = isLoading || isRefetching;
    const filterMetadata: FilterControlMetaData = {
        clientFullName: fetchedData?.clientFullName ?? ""
    };
    console.log("dataresp: ", data);
    return (
        <>
            <ModuleContentWrapper title="Entrega de Pagarés" subtitle="Seleccioná el tipo de búsqueda y completa el campo para iniciar el proceso de búsqueda.">
                <Grid xs={12} container>
                    <Grid xs={9}>
                        <FilterControls filters={promissoryNotesDeliveryFilters} onChange={handlerChangeFilter} metaData={filterMetadata} />
                    </Grid>
                    <Grid xs={3} sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: 1
                    }}>
                        <SearchButton onClick={handlerClickSearch} isLoading={isLoadingFilter}>Buscar</SearchButton>
                        <ExportButton onClick={handlerClickExport} disabled={isLoading || data == null}>Exportar</ExportButton>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <DeliveryDataTable
                        data={data ?? initialData}
                        columns={columns}
                        isLoading={isLoadingFilter}
                        nestedFields={nestedFields}
                    />
                </Grid>
            </ModuleContentWrapper>
        </>

    )
}

export default index