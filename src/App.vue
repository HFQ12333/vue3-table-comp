<template>
	<my-table :data="tableData" @submit="editData"></my-table>
</template>

<script setup>
import { MyTable } from './modules/my-ui/MyTable'
import { reactive } from 'vue'

const tableData = reactive({
	thead: [
		{
			key: 'id',
			text: '学号',
			editable: false,
		},
		{
			key: 'name',
			text: '姓名',
			editable: false,
		},
		{
			key: 'age',
			text: '年龄',
			editable: false,
		},
		{
			key: 'chinese',
			text: '语文',
			editable: true,
		},
		{
			key: 'math',
			text: '数学',
			editable: true,
		},
		{
			key: 'english',
			text: '英语',
			editable: true,
		},
	],
	tbody: [
		{
			id: 1,
			name: '张三',
			age: 16,
			chinese: 121,
			math: 98,
			english: 138,
		},
		{
			id: 2,
			name: '李四',
			age: 17,
			chinese: 91,
			math: 147,
			english: 118,
		},
		{
			id: 3,
			name: '王五',
			age: 18,
			chinese: 129,
			math: 139,
			english: 141,
		},
	],
})
const editData = ({ index, key, value, text }, removeInputCb) => {
	if (tableData.tbody[index][key] !== Number(value)) {
		const cfm = window.confirm(`
         您要确定将数据下表为『${index}』项
         『${text}』字段的内容修改为『${value}』吗？
      `)

		if (cfm) {
			tableData.tbody[index][key] = value
		} else {
			removeInputCb()
		}
	}
}
</script>

<style scoped></style>
