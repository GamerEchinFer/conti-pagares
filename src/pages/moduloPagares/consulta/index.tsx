import Grid from '@mui/material/Unstable_Grid2';
import FilterControls from "../../../components/shared/FilterControls/FilterControls";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import CustomModal from "../../../components/shared/CustomModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import Form from "../../../components/promissoryNotes/consult/Form";
import FormActions from "../../../components/promissoryNotes/consult/FormActions";
import { promissoryNotesServices } from "../../../services/promissoryNotesService";
import { exportDataTable } from "../../../helpers/exportFromJson";
import ModuleContentWrapper from "../../../components/shared/ui/ModuleContentWrapper";
import ExportButton from '../../../components/shared/ui/buttons/ExportButton';
import SearchButton from "../../../components/shared/ui/buttons/SearchButton";
import { headerExportMapperPromissoryNotesConsult, promissoryNotesConsultFilters } from "../../../constants/promissoryNotes/consultConfig";
import { DateRangeRequestValue } from '../../../interfaces/_common';
import { useQuery } from '@tanstack/react-query';
import { EFilterControlsTypes, FilterControlMetaData, FilterControlState } from '../../../interfaces/components/filterControls';
import { Dayjs } from 'dayjs';
import CustomMaterialDataTable from '../../../components/shared/DataTable/CustomMaterialDataTable';
import { MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_TableInstance } from 'material-react-table';
import { PromissoryNotesConsult } from '../../../models/responses/promissoryNotes';
import { internalServices } from '../../../services/internalService';
import { useKeycloak } from '@react-keycloak/web';
import { RootState, useAppDispatch } from '../../../redux/store';
import { getDatosAgente, login } from '../../../actions/Auth.actions';
import { getUsuarioKeyCloack } from '../../../redux/slices/auth/auth.slice';
import { useSelector } from 'react-redux';


const PromissoryNotesConsultPage = () => {
    const [filterState, setFilterState] = useState<FilterControlState[]>([]);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [currentRowDetail, setCurrentRowDetail] = useState<PromissoryNotesConsult | null>(null);
    const { keycloak, initialized: initializedKeycloack } = useKeycloak();

    const { access_token } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const {
        isPending,
        isLoading,
        isFetched,
        error,
        data: fetchedData,
        refetch: fetchConsult,
        isRefetching,
        isRefetchError
    } = useQuery({
        queryKey: ['promissoryNotesConsult'],
        queryFn: async () => {
            // codClient
            // nroDocumento
            // operacion
            const selectFilter = filterState.find(f => f.type == EFilterControlsTypes.Select);
            const dateRangeFilter = filterState.find(f => f.type == EFilterControlsTypes.DateRange);
            const textFieldCuotaFilter = filterState.find(f => f.type == EFilterControlsTypes.TextField);

            const operation = selectFilter?.key == "operacion" ? selectFilter.value : "999";
            const codClient = selectFilter?.key == "codClient" ? selectFilter.value : "999";
            const docNumber = selectFilter?.key == "nroDocumento" ? selectFilter.value : "999";
            const cuota = textFieldCuotaFilter?.key == "cuota" ? textFieldCuotaFilter.value : "999";
            const dateRange: DateRangeRequestValue = {
                from: dateRangeFilter?.value.from as Dayjs,
                to: dateRangeFilter?.value.from as Dayjs
            };

            let clientFullName = "";
            if (codClient != "999") {
                const respClient = await internalServices.getClientData(codClient);
                clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
            }

            if (docNumber != "999") {
                const respClient = await internalServices.getClientData("", docNumber);
                clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
            }

            const resp = await promissoryNotesServices.getConsult(operation, codClient, cuota, dateRange);

            return {
                data: resp.data,
                clientFullName
            };
        },
        enabled: false,
        retry: false
    });
    const data = fetchedData?.data;

    const handlerClickDetail = (row: any) => {
        setCurrentRowDetail(row);
        setOpenFormModal(true);
    }

    const columns: MRT_ColumnDef<PromissoryNotesConsult>[] = useMemo<MRT_ColumnDef<PromissoryNotesConsult>[]>(
        () => [
            { accessorKey: "operacion", header: "Operación", size: 50 },
            { accessorKey: "cuota", header: "Cuota", size: 50 },
            { accessorKey: "estado", header: "Estado", size: 50 },
            { accessorKey: "numeroEnvio", header: "Nro. Envío", size: 50 },
            {
                accessorKey: "codigoCliente",
                accessorFn: (originalRow) => {
                    console.log(originalRow)
                    const codcliente = originalRow.cliente.codigoCliente as string;
                    return codcliente.substring(0, 6)
                },
                header: "Código", size: 50
            },
            { accessorKey: "cliente.codigoCliente", header: "Nro Documento", size: 50 },
            { accessorKey: "cliente.nombreCliente", header: "Cliente", size: 50 },
            { accessorKey: "observacion", header: "Observación", size: 50 },
            { accessorKey: "envio.fechaEnvio", header: "Fecha", size: 50 },
        ],
        [],
    );

    const dataTableActions = useCallback((props: { cell: MRT_Cell<PromissoryNotesConsult>; row: MRT_Row<PromissoryNotesConsult>; table: MRT_TableInstance<PromissoryNotesConsult>; }) => (
        <IconButton onClick={() => handlerClickDetail(props.row.original)}><VisibilityIcon /></IconButton>
    ), []);

    const handlerCloseFormModal = () => {
        setOpenFormModal(false);
    }

    const handlerClickExport = () => {
        if (data && data.length > 0) {
            const now = new Date();
            const fileName = `pagares_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
            exportDataTable({ data, fileName: fileName, mapperFunction: headerExportMapperPromissoryNotesConsult });
        }
    };


    const handlerChangeFilter = (filterState: FilterControlState[], reason?: "onBlur" | "onEnter") => {
        setFilterState(filterState);
        if (reason == "onEnter") {
            handlerClickSearch();
        }
    }

    const handlerClickSearch = () => {
        console.log(filterState);
        if (filterState.length > 0 && filterState[0].value != "") {
            fetchConsult();
        }
    }

    const isLoadingFilter = (isLoading || isRefetching);
    const filterMetadata: FilterControlMetaData = {
        clientFullName: fetchedData?.clientFullName ?? ""
    };

    const autenticar = () => {
        if (keycloak.authenticated === false && !keycloak?.tokenParsed?.preferred_username) {
            keycloak.login()
        }
    }

    useEffect(() => {
        if (initializedKeycloack) {
            autenticar()
        }
    }, []);

    useEffect(() => {
        if (keycloak?.tokenParsed?.preferred_username) {
            dispatch(login())
            dispatch(getUsuarioKeyCloack(keycloak?.tokenParsed?.preferred_username))
        }
    }, [keycloak?.tokenParsed?.preferred_username])

    useEffect(() => {
        if (access_token && keycloak?.tokenParsed?.preferred_username) {
            dispatch(getDatosAgente(access_token as string, keycloak?.tokenParsed?.preferred_username.split('@')[0]));
        }
    }, [access_token])

    return (
        <>
            <CustomModal
                open={openFormModal}
                onClose={handlerCloseFormModal}
                title={"Detalles del pagaré"}
                content={<Form promissoryNotesConsult={currentRowDetail} />}
                actions={<FormActions promissoryNotesConsult={currentRowDetail} />}
                fullWidth
            />
            <ModuleContentWrapper title="Consultas de Pagarés" subtitle="Seleccioná el tipo de búsqueda y completa el campo para iniciar el proceso de búsqueda.">
                <Grid xs={12} container>
                    <Grid xs={9}>
                        <FilterControls filters={promissoryNotesConsultFilters} onChange={handlerChangeFilter} metaData={filterMetadata} />
                    </Grid>
                    <Grid
                        xs={3}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            gap: 1
                        }}
                    >
                        <SearchButton onClick={handlerClickSearch} isLoading={isLoadingFilter}>Buscar</SearchButton>
                        <ExportButton onClick={handlerClickExport} disabled={isLoading || data == null}>Exportar</ExportButton>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <CustomMaterialDataTable
                        data={data ?? []}
                        columns={columns}
                        actions={dataTableActions}
                        isLoading={isLoadingFilter}
                        pixelsToSubstract={18}
                    />
                </Grid>
            </ModuleContentWrapper>
        </>
    )
}


export default PromissoryNotesConsultPage;