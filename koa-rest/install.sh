if [ ! -d "./node_modules" ]; then
  # 删除所有原有依赖和锁版本文件
  echo "开始删除原有依赖"
  rm -rf ./node_modules
  rm -f ./package-lock.json
  rm -f ./yarn.lock
  echo "删除完毕"
fi

# 安装非开发依赖
echo "开始安装依赖"
npm install --production
echo "依赖安装完毕"

# 启动
echo "启动服务器"
npm run dev