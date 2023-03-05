<template>
	<table border="1" class="my-table">
		<thead>
			<tr>
				<td v-for="item in thead" :key="item.key">{{ item.text }}</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in tbody" :key="item.id">
				<td
					v-for="(value, key) in item"
					:key="key"
					@click="showEditInput($event, key, index)"
				>
					{{ value }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { createApp, toRefs, reactive } from 'vue'
import EditInput from './EditInput'

const props = defineProps({
	data: {
		type: Object,
		default: () => ({
			thead: [],
			tbody: [],
		}),
	},
})

let editInputApp = null

const state = reactive({
	key: '',
	value: '',
	index: -1,
	text: '',
})

const emit = defineEmits(['submit'])

const { thead, tbody } = toRefs(props.data)

function showEditInput(event, key, index) {
	event.stopPropagation() //或者@click.stop 阻止事件冒泡，否则触发window绑定的click事件
	editInputApp && removeEditInputApp(editInputApp)
	if (!checkEditable(key)) return //判断当前数据是否可修改
	const target = event.target
	const oFrag = document.createDocumentFragment() //创建文档碎片
	editInputApp = createApp(EditInput, {
		value: target.textContent,
		setValue,
	})
	if (editInputApp) {
		editInputApp.mount(oFrag) //mount到oFrag上去
		target.appendChild(oFrag)
		target.querySelector('.edit-input').select() //选中
	}
	setData({ index, key, text: findText(key) })
}

function setData({ index, key, text, value = '' }) {
	state.index = index
	state.key = key
	state.value = value
	state.text = text
}

function setValue(value) {
	state.value = value
	emit('submit', { ...state }, removeEditInputApp)
}

function findText(key) {
	const { text } = thead.value.find((item) => item.key === key)
	return text
}

// 卸载input
function removeEditInputApp() {
	editInputApp && editInputApp.unmount()
	setData({
		index: -1,
		key: '',
		value: '',
		text: '',
	})
}

function checkEditable(key) {
	const { editable } = thead.value.find((item) => item.key === key)
	return editable
}

window.addEventListener('click', removeEditInputApp, false)
</script>

<style scoped lang="scss">
.my-table {
	width: 100%;
	border-collapse: collapse;
	tr {
		height: 44px;
		td {
			position: relative;
			text-align: center;
			cursor: pointer;
		}
	}
}
</style>
