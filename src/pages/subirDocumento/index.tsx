import { Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import BackButton from "../../components/Buttons/BackButton";
import ButtonCargar from "../../components/Buttons/ButtonCargar";
import Header from "../../components/Header";
import AddIconComponent from "../../components/SubirDocumentos/AddIconComponent";
import DocumentListComponent from "../../components/SubirDocumentos/DocumentListComponent";
import DragDropComponent from "../../components/SubirDocumentos/DragDropComponent";
import HeaderDocComponent from "../../components/SubirDocumentos/HeaderDocComponent";
import { RootState } from "../../redux/store";

const SubirDocumentoPage = () => {
    const router = useRouter();
    const etiquetasVariables = useSelector((state: RootState) => state.etiquetaVariable.response)

    const handleClickAtras = () => {
        router.push("/solicitud");
    }
    const handleClickCargar = () => {
        console.log("cargando...")
        router.push("/subir-documentos");
    }

    const handleClickAdd = () => {
        router.push("/add-document");
    }

    return (
        <>
            <HeaderDocComponent />
            <div className="flex justify-start md:flex-row flex-col max-w-2xl md:max-w-xl m-auto">
                <div className="overflow-auto h-96">
                    {
                    etiquetasVariables.map(item => (
                        <div key={item.idTipoDocumento} className="flex">
                            <div className="">
                                <DocumentListComponent item={item} />
                            </div>
                        </div>
                    ))
                    }
                    <div className="flex justify-center">
                        <AddIconComponent onClick={handleClickAdd} />
                    </div>
                </div>
                {/* <div className="border-dashed border-2 border-[#1D428A] w-80 h-96 ..."> */}
                <div>    
                    <DragDropComponent />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-8 pb-4">
                <BackButton  onClick={handleClickAtras} />
                <ButtonCargar onClick={handleClickCargar}/>
            </div>
        </>
    )
}

export default SubirDocumentoPage
