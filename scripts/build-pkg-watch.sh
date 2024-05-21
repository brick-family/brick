#!/bin/bash

# 定义要并发执行的命令列表
COMMANDS=(
  "pnpm run -F=@brick/types build:watch"
  "pnpm run -F=@brick/core build:watch"
  "pnpm run -F=@brick/utils build:watch"
  "pnpm run -F=@brick/services build:watch"
  "pnpm run -F=@brick/processor build:watch"
  "pnpm run -F=@brick/component build:watch"
  "pnpm run -F=@brick/workflow build:watch"
  "pnpm run -F=@brick/lowcode-editor build:watch"
  "pnpm run -F=@brick/biz-component build:watch"
)

# 循环遍历命令列表，并在后台执行每个命令
for CMD in "${COMMANDS[@]}"; do
  eval "$CMD" &
done

# 等待所有后台任务完成
wait