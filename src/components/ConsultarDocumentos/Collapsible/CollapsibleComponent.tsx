import React, { useState } from 'react'
import useCollapse from 'react-collapsed';
import ArrowIconDown from '../../ArrowIconsComponent/ArrowIconDown';
import ArrowIconUp from '../../ArrowIconsComponent/ArrowIconUp';
import styles from "../Collapsible/Collapsible.module.css";

const CollapsibleComponent = (props: any) => {
    const {
        getCollapseProps,
        getToggleProps,
        isExpanded
    } = useCollapse();
    
    const handleClickUp = () => {

    }

    const handleClickDown = () => {

    }

  return (
    <>
        <div className={styles.collapsible}>
            <div className={styles.header} {...getToggleProps()}>
                {isExpanded ? <ArrowIconUp onClick={handleClickUp} /> : <ArrowIconDown onClick={handleClickDown} />}
            </div>
            <div {...getCollapseProps()}>
                <div className={styles.content}>
                    {props.children}
                    <ul>
                        <li>a</li>
                    </ul>
                </div>
            </div>
        </div> 
    </>
  )
}

export default CollapsibleComponent