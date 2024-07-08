import React from 'react'

const PdfViewer = ({ pdfUrl }) => {
	return (
		<iframe
			src={pdfUrl}
			width='100%'
			height='100%'
			style={{ border: 'none' }}
			title='PDF Viewer'
			className='h-full'
		/>
	)
}

export default PdfViewer
