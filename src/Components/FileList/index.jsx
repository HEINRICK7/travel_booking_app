import React from 'react';

import { Progress } from 'antd';
import { FiCheckCircle, FiLink} from 'react-icons/fi'
import { MdError} from 'react-icons/md'
import { Container, FileInfo, Preview} from './fileList.js'


const FileList = ({files}) => {
    return (
        <Container>
            {files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                <FileInfo >
                    <Preview src={uploadedFile.preview}/>
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>
                            {uploadedFile.readableSize}{""}
                            {!!uploadedFile.url && (
                                <button onclick={() => {}}>excluir</button>
                            )}
                        </span>
                    </div>
                </FileInfo>
                    <div style={{

                        width:'40%',
                        display: 'inline',
                        
                        }}>
                        <div style={{width: 150, float: 'right'}}>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                             <Progress percent={uploadedFile.progress} size="small" status="active" /> 
                        )}    
                       
                        </div>
                        {uploadedFile.url && (
                            <a 
                                href="https://myconnectapp.s3.amazonaws.com/dfd51058edd8876682816f37e129cf26-atalaia.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FiLink style={{marginRight: 8}} size={24} color="#222"/> 
                            </a>
                        )}
                       <div style={{

                            width:'100%',
                            display: 'inline',
                            marginLeft: 50,

                        }}>
                        {uploadedFile.uploaded && <FiCheckCircle size={24} color="#78e5d5"/> }          
                        {uploadedFile.error && <MdError size={24} color="#e57878" /> } 
                         
                        </div> 
                       
                    </div>

                
            </li>
            ))}
        </Container>
    );
}

export default FileList;
