#!/bin/bash

# 定义要并发执行的包组
PACKAGE_GROUPS=(
  "@brick/types @brick/core"
  "@brick/services"
  "@brick/utils"
  "@brick/processor @brick/component"
  "@brick/lowcode-editor"
  "@brick/biz-component"
  "@brick/workflow"
)

# 获取脚本参数（如果未提供参数，则使用 "build" 作为默认值）
TARGET=${1:-build}

# 循环遍历每个包组，并在每个组内执行相应的脚本命令
for GROUP in "${PACKAGE_GROUPS[@]}"; do
  # 创建一个数组来存储后台任务
  declare -a TASKS

  # 将组内的包拆分为单独的包
  IFS=' ' read -ra PACKAGES <<< "$GROUP"

  # 判断是否为 "watch" 参数，决定任务是否阻塞执行
  if [ "$TARGET" = "watch" ]; then
    # 并发执行任务
    for PACKAGE in "${PACKAGES[@]}"; do
      eval "nohup pnpm run -F='$PACKAGE' '$TARGET' > /dev/null 2>&1 &"
      TASKS+=($!)
    done

    # 等待当前组的所有后台任务完成
    for TASK in "${TASKS[@]}"; do
      wait "$TASK"
    done
  else
    # 顺序执行任务
    for PACKAGE in "${PACKAGES[@]}"; do
      pnpm run -F="$PACKAGE" "$TARGET"
    done
  fi
done


# 备份
# #!/bin/bash

# # 定义要并发执行的包组
# PACKAGE_GROUPS=(
#   "@brick/types @brick/core"
#   "@brick/services"
#   "@brick/utils"
#   "@brick/processor @brick/component"
#   "@brick/workflow"
# )

# # 获取脚本参数（如果未提供参数，则使用 "build" 作为默认值）
# TARGET=${1:-build}

# # 循环遍历每个包组，并在每个组内并发执行相应的脚本命令
# for GROUP in "${PACKAGE_GROUPS[@]}"; do
#   # 创建一个数组来存储后台任务
#   declare -a TASKS

#   # 将组内的包拆分为单独的包
#   IFS=' ' read -ra PACKAGES <<< "$GROUP"

#   # 循环遍历当前组的包，并将任务添加到后台执行
#   for PACKAGE in "${PACKAGES[@]}"; do
#     pnpm run -F="$PACKAGE" "$TARGET" &
#     TASKS+=($!)
#   done

#   # 等待当前组的所有后台任务完成
#   for TASK in "${TASKS[@]}"; do
#     wait "$TASK"
#   done
# done