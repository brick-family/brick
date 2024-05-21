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
