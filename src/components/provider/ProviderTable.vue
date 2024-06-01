<script setup>
const emit = defineEmits(['inspect', 'edit', 'delete', 'pageChanged'])

const props = defineProps({
    data: Array,
    total: Number,
    pageSize: Number,
})
</script>

<template>
    <el-table :data="data" stripe style="width: 100%;">
        <el-table-column prop="code" label="供应商编码" width="100"/>
        <el-table-column prop="name" label="供应商名称" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column prop="fax" label="传真" />
        <el-table-column prop="creationTime" label="创建时间" />
        <el-table-column label="操作" width="200">
            <template #default="scope">
                <el-button size="small" plain @click="emit('inspect', scope.$index)">
                    查看
                </el-button>
                <el-button size="small" plain type="warning" @click="emit('edit', scope.$index)">
                    编辑
                </el-button>
                <el-button size="small" plain type="danger" @click="emit('delete', scope.$index)">
                    删除
                </el-button>
            </template>
        </el-table-column>

        <template #append>
            <el-pagination background layout="prev, pager, next" :total="props.total" :page-size="props.pageSize"
                @current-change="page => emit('pageChanged', page)" />
        </template>
    </el-table>
</template>

<style scoped>
.el-table {
    border-radius: 5px;
}

.el-pagination {
    margin: 20px;
    justify-content: right;
}
</style>