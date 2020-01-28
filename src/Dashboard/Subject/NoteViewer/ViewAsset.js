import React from 'react';
import PDFViewer from './PDFView';
import PDFJSBackend from './PDFJS';

const ViewAsset = () => {
 
    return (
      <div className="ViewAsset">
        <PDFViewer 
          backend={PDFJSBackend}
          src='/pdf/ApplicationDetails.pdf'
        />
      </div>
    );  
  
}

export default ViewAsset;