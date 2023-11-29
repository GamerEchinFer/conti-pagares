import React from 'react'

type PDFComponentProps = {
    base64: string
}

const PDFComponent = ({ base64 }: PDFComponentProps) => {

    return (
        <>
            {
                base64.length > 0
                    ? (
                        <embed
                            src={base64}
                            type="application/pdf" width="80%" height="550px"
                        />
                    )
                    : null
            }
        </>
    )
}

export default PDFComponent