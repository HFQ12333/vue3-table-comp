import MyTable from './MyTable/MyTable'

const components = {
	MyTable,
}

export default {
	install(app) {
		for (let c in components) {
			app.component(c, components[c])
		}
	},
}
