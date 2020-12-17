import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

export function Modal({onClose, children, title}) {
	return createPortal(<>
		<div className="modal show fade" role="dialog" tabindex="-1" style={{ display:'block' }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="btn-close close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}><span aria-hidden="true">X</span></button>
					</div>
					<div className="modal-body">
						<p>{children}</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<div className="modal-backdrop fade show"></div>
	</>, document.body)
}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	
}