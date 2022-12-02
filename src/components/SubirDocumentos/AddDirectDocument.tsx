import React, { useState } from 'react'

const AddDirectDocument = () => {
    const [archive, setArchive] = useState(false);

    const handleDragOver = (event:any) => {
        event.preventDefault();
    };

    const handleDrop = (event:any) => {
        event.preventDefault();
        console.log(Array.from(event.dataTransfer.files));
        setArchive(event.dataTransfer.files);
    };

  
    // if (archive) return (
    //    {Object.values(archive).map((file: any, idx) =>
    //             <div key={idx} className="p-2" value={archive.name}>
    //            </div>)
    //     } 
    // )

return (
    <>
        {!archive && (
          <div></div>
        )}
    </>
  )
}

export default AddDirectDocument