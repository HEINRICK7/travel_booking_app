import React from 'react';
import Dropzone from 'react-dropzone';

import {DropContainer, UploadMessage} from './upload.js';

const Upload = (props) => {
    const renderDragMessage = (isDragActive, isDragReject) => {
        if(!isDragActive) {
            return <UploadMessage>Arraste Arquivos Aqui</UploadMessage>
        }
        if(isDragReject) {
            return <UploadMessage type="error">Arquivo nao Suportado</UploadMessage>
        }

        return <UploadMessage type="success">Solte os Arquivos Aqui</UploadMessage>
    }
    const {onUpload} = props
    return(
        
        <Dropzone accept="image/*" onDropAccepted={onUpload}>
            { ({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <DropContainer
                    className="dropzone" 
                    {...getRootProps()}
                     isDragActive={isDragActive}
                     isDragReject={isDragReject}
                >
                <input {...getInputProps()}/> 
                {renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
            )}
        </Dropzone>
    )
}

export default Upload;