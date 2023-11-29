import { Checkbox } from '@mui/material'
import React, { HTMLProps, useEffect, useRef, useState } from 'react'

const IndeterminateCheckbox = ({
    indeterminate,
    className = '',
    checked,
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        console.log("Indeterminate changed");
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !checked && indeterminate
        }

    }, [ref, indeterminate])

    console.log("IndeterminateCheckboxxxx:", checked, indeterminate);
    return (
        <>
            <Checkbox
                inputProps={{ ...rest }}
                inputRef={ref}
                checked={checked}
                indeterminate={indeterminate}
                className={className + ' cursor-pointer'}
                color={"primary"}
                onChange={rest.onChange}
            />
        </>
    )
}

export default IndeterminateCheckbox