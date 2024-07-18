## array 中的某一条数据更新

通过 map 的方式更新

```
this.workflowProcessor.workflowList.data.set((value) => {
  return value.map((item) => {
    if (item.id === id) {
      return { ...item, status };
    }
    return item;
  });
});
```

删除数据

```
  this.setValueObservable(draft => {
    const index = draft.findIndex(f => f?.fieldId === fieldId);
    if (index != -1) {
      draft.splice(index, 1)
    }
  })
```
