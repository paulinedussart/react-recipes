export function Loader({content}) {
	return (
		<div>
			<div className="btn btn-green" type="button" disabled>
				<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
			  Loading of {content} ...
			</div>
		</div>
	)
}