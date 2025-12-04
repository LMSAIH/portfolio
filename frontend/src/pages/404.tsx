import { Home } from "lucide-react"
import { Link } from "react-router-dom"

const NotFound = () => {
	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<div className="max-w-lg w-full text-center px-6 py-12">
				<h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
				<p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Page not found — the resource you're looking for doesn't exist or has moved.</p>

				<div className="mt-8 flex items-center justify-center gap-3">
					<Link
						to="/"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm transition"
					>
						<Home className="h-4 w-4" />
						Return to Home
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound;