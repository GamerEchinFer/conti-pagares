import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { promissoryNotesDeliveryPdfColumns } from '../../../constants/promissoryNotes/deliveryConfig';
import { PromissoryNotesConsultDelivery } from '../../../interfaces/promissoryNotes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const tableStyles = StyleSheet.create({
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
        fontSize: 6,
    },
    tableHead: {
        flexDirection: 'row',
    },
    tableBody: {
        flexDirection: 'column',
        height: "",
        gap: 3,
    },
    row: {
        margin: "3px 0px",
        flex: 1,
        flexDirection: 'row',
    },
    cell: {
        padding: 3,
        textAlign: "center",
    },
    cell1: {
        flexBasis: "1 1 10%",
    },
    cell2: {
        flexBasis: "1 1 20%",
        textAlign: "center"
    },
    cell3: {
        flexBasis: "1 1 14%",
    },
    cell4: {
        flexBasis: "1 1 10%",
    },
    cell5: {
        flexBasis: "1 1 8%",
    },
    cell6: {
        flexBasis: "1 1 10%",
        textAlign: "center"
    },
    cell7: {
        flexBasis: "1 1 33%",
        textAlign: "center"
    },
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F0F0F0',
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 10,
    },
    title: {
        margin: 10,
        width: '100%',
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        fontSize: 10,
        flexBasis: "6%",
    },
    footerLeft: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
    },
    footerRight: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        gap: 2,
    },
    footerEntregado: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        flexWrap: "wrap"
    },
    footerEntregadoLabel: {
        flex: "1 1 40%",
        lineHeight: 1,
    },
    footerEntregadoFirma: {
        flex: "1 1 60%",
        borderBottom: "1px dotted black",
    },
    footerEntregadoUsuario: {
        padding: 5,
        flexBasis: "60%",
        textAlign: "center",
    },
    footerRightField: {
        display: "flex",
        flex: 1,
        flexDirection: 'row',
    },
    footerRightLabel: {
        flexBasis: "40%",
    },
    footerRightFirma: {
        flexBasis: "60%",
        borderBottom: "1px dotted black",
    },
    footerRightDateDotsBorder: {
        display: "flex",
        flexDirection: "row",
        flexBasis: "50%",
        borderBottom: "1px dotted black",
        justifyContent: "space-evenly",
    },
    footerRightDateDotsItem: {

    },

});

interface PromissoryNotesDeliveryPdfProps {
    promissoryNotesSelected: PromissoryNotesConsultDelivery[];
    obsGeneral: string;
    currentUser: string;
}
const PromissoryNotesDeliveryPdf = ({ promissoryNotesSelected, currentUser, obsGeneral }: PromissoryNotesDeliveryPdfProps) => {

    const now = new Date();
    const nowDateFormated = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const nowTimeFormated = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const currentDateTime = `${nowDateFormated} ${nowTimeFormated}`;

    const validOutline = (index: number) => {
        if (index == promissoryNotesDeliveryPdfColumns.length - 1) {
            return "none";
        }
        return "1px solid #ccc";
    }
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text>BANCO CONTINENTAL S.A.E.C.A.</Text>
                        <Text>MCAL. LOPEZ C/ BLAS GARAY</Text>
                    </View>
                    <View>
                        <Text></Text>
                        <Text>FECHA/HORA {currentDateTime}</Text>
                    </View>
                </View>
                <View style={styles.title}>
                    <Text>ACUSE DE ENTREGA DE PAGARES</Text>
                </View>
                <View style={tableStyles.table}>
                    <View style={tableStyles.tableHead}>
                        {
                            promissoryNotesDeliveryPdfColumns.map(({ label, width }, index) => (
                                <View key={index} style={{ ...tableStyles.cell, flex: `1 1 ${width}%`, borderRight: validOutline(index) }}>
                                    <Text>{label}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <View style={tableStyles.tableBody}>
                        {
                            promissoryNotesSelected.map((promissoryNote, index) => (
                                <View key={index} style={tableStyles.row}>
                                    <View style={tableStyles.cell1}>
                                        <Text>{promissoryNote.cliente.codigoCliente}</Text>
                                    </View>
                                    <View style={tableStyles.cell2}>
                                        <Text>{promissoryNote.cliente.nombreCliente}</Text>
                                    </View>
                                    <View style={tableStyles.cell3}>
                                        <Text>{promissoryNote.operacion}</Text>
                                    </View>
                                    <View style={tableStyles.cell4}>
                                        <Text>{promissoryNote.monto}</Text>
                                    </View>
                                    <View style={tableStyles.cell5}>
                                        <Text>{promissoryNote.cuota}</Text>
                                    </View>
                                    <View style={tableStyles.cell6}>
                                        <Text>{promissoryNote.estado}</Text>
                                    </View>
                                    <View style={tableStyles.cell7}>
                                        <Text>
                                            {promissoryNote.observacion} {obsGeneral}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <View style={styles.footerEntregado}>
                            <Text style={styles.footerEntregadoLabel}>Entregado por: </Text>
                            <Text style={styles.footerEntregadoFirma}></Text>
                            <Text style={styles.footerEntregadoUsuario}>{currentUser}</Text>
                        </View>
                    </View>
                    <View style={styles.footerRight}>
                        <View style={styles.footerRightField}>
                            <Text style={styles.footerRightLabel}>Recibido por: </Text>
                            <Text style={styles.footerRightFirma}></Text>
                        </View>
                        <View style={styles.footerRightField}>
                            <Text style={styles.footerRightLabel}>Aclaración de firma: </Text>
                            <Text style={styles.footerRightFirma}></Text>
                        </View>
                        <View style={styles.footerRightField}>
                            <Text style={styles.footerRightLabel}>C.I. N°: </Text>
                            <Text style={styles.footerRightFirma}></Text>
                        </View>
                        <View style={styles.footerRightField}>
                            <Text style={styles.footerRightLabel}>Fecha: </Text>
                            <View style={styles.footerRightDateDotsBorder}>
                                <Text style={styles.footerRightDateDotsItem}>/</Text>
                                <Text style={styles.footerRightDateDotsItem}>/</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PromissoryNotesDeliveryPdf