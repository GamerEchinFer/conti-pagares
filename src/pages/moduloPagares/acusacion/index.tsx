import Grid from '@mui/material/Unstable_Grid2';
import FilterControls from "../../../components/shared/FilterControls/FilterControls";
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import CustomModal from "../../../components/shared/CustomModal";
import { useMemo, useState, useCallback } from 'react';
import Visualizer from "../../../components/promissoryNotes/accusation/Visualizer";
import FormActions from "../../../components/promissoryNotes/accusation/FormActions";
import { promissoryNotesServices } from "../../../services/promissoryNotesService";
import { exportDataTable } from "../../../helpers/exportFromJson";
import ModuleContentWrapper from "../../../components/shared/ui/ModuleContentWrapper";
import ExportButton from '../../../components/shared/ui/buttons/ExportButton';
import SearchButton from "../../../components/shared/ui/buttons/SearchButton";
import { headerExportMapperPromissoryNotesAccusation, promissoryNotesAccusationFilters } from "../../../constants/promissoryNotes/accusationConfig";
import InfoLabel from '../../../components/shared/form/InfoLabel';
import { DateRangeRequestValue } from '../../../interfaces/_common';
import { EFilterControlsTypes, FilterControlMetaData, FilterControlState } from '../../../interfaces/components/filterControls';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import CustomMaterialDataTable from '../../../components/shared/DataTable/CustomMaterialDataTable';
import { MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_TableInstance } from 'material-react-table';
import { PromissoryNotesFolderDocument } from '../../../models/responses/promissoryNotes';
import { internalServices } from '../../../services/internalService';

const index = () => {
    const [filterState, setFilterState] = useState<FilterControlState[]>([]);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [currentRowDetail, setCurrentRowDetail] = useState<PromissoryNotesFolderDocument | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const { isLoading, isFetched, data: fetchedData, refetch: fetchConsult, isRefetching } = useQuery({
        queryKey: ['promissoryNotesAccusation'],
        queryFn: async () => {
            const radioFilter = filterState.find(f => f.type == EFilterControlsTypes.Select);
            const dateRangeFilter = filterState.find(f => f.type == EFilterControlsTypes.DateRange);

            const codClient = radioFilter?.key == "codClient" ? radioFilter.value : "999";
            const dateRange: DateRangeRequestValue = {
                from: dateRangeFilter?.value.from as Dayjs,
                to: dateRangeFilter?.value.from as Dayjs
            };
            const resp = await internalServices.getFolderDocuments(codClient, dateRange);

            let clientFullName = "";
            if (codClient != "999") {
                const respClient = await internalServices.getClientData(codClient);
                clientFullName = `${respClient.data.primerNombre} ${respClient.data.segundoNombre} ${respClient.data.primerApellido} ${respClient.data.segundoApellido}`;
            }

            return {
                data: resp.data,
                clientFullName
            };
        },
        enabled: false,
        retry: false
    });
    const data = fetchedData?.data;

    const handlerClickDetail = (row: PromissoryNotesFolderDocument) => {
        setOpenFormModal(true);
        setCurrentRowDetail(row);
    }

    // cliente - nombrecliente - fechaAlta - Ver - estado - tipodocu
    const columns: MRT_ColumnDef<PromissoryNotesFolderDocument>[] = useMemo<MRT_ColumnDef<PromissoryNotesFolderDocument>[]>(
        () => [
            { accessorKey: "nombre", header: "Cliente" },
            { accessorKey: "fechaDocumento", header: "Fecha" },
            { accessorKey: "estado", header: "Estado" },
            { accessorKey: "tipoDocumento", header: "Tipo documento" },
        ],
        [],
    );

    const dataTableActions = useCallback((props: { cell: MRT_Cell<PromissoryNotesFolderDocument>; row: MRT_Row<PromissoryNotesFolderDocument>; table: MRT_TableInstance<PromissoryNotesFolderDocument>; }) => (
        <IconButton onClick={() => handlerClickDetail(props.row.original)}><VisibilityIcon /></IconButton>
    ), []);

    const handlerCloseFormModal = () => {
        setOpenFormModal(false);
    }

    const handlerClickExport = () => {
        if (data && data.length > 0) {
            const now = new Date();
            const fileName = `pagares_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
            exportDataTable({ data, fileName: fileName, mapperFunction: headerExportMapperPromissoryNotesAccusation });
        }
    };

    const handlerChangeFilter = (filterState: FilterControlState[], reason?: "onBlur" | "onEnter") => {
        setFilterState(filterState);
        if (reason == "onEnter") {
            handlerClickSearch();
        }
    }

    const handlerClickSearch = () => {
        if (filterState.length > 0 && filterState[0].value != "") {
            console.log("Refetch", filterState);
            fetchConsult();
        }
    }

    const handlerUrlChange = (url: string) => {
        setUrl(url);
    };

    const path = currentRowDetail?.rutaDocumento ?? "";
    const isLoadingFilter = isLoading || isRefetching;
    const filterMetadata: FilterControlMetaData = {
        clientFullName: fetchedData?.clientFullName ?? ""
    };

    return (
        <>
            <CustomModal
                open={openFormModal}
                onClose={handlerCloseFormModal}
                renderTitle={() => <InfoLabel label={"Cliente"} value={fetchedData?.clientFullName ?? ""} />}
                content={<Visualizer path={path} onUrlChange={handlerUrlChange} />}
                actions={<FormActions url={url ?? ""} />}
                fullWidth
            />
            <ModuleContentWrapper title="Acuses Digitalizados" subtitle="Seleccioná el tipo de búsqueda y completa el campo para iniciar el proceso de búsqueda.">
                <Grid xs={12} container>
                    <Grid xs={9}>
                        <FilterControls
                            filters={promissoryNotesAccusationFilters}
                            onChange={handlerChangeFilter}
                            metaData={filterMetadata}
                        />
                    </Grid>
                    <Grid xs={3} sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: 1
                    }}>
                        <SearchButton
                            onClick={handlerClickSearch}
                            isLoading={isLoading}
                            sx={{
                                paddingRight: "6px",
                                paddingLeft: "7px"
                            }}
                        >
                            Verificar acuse
                        </SearchButton>
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


export default index