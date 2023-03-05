import MyTable from './MyTable'

export { MyTable }

export default {
	install(app) {
		app.component('MyTable', MyTable)
	},
}
