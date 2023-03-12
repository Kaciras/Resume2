# Kaciras 的简历网站

![Deploy](https://github.com/Kaciras/Resume2/workflows/Deploy/badge.svg)

个人简历网站，[Web前端开发工程师](https://resume.kaciras.com/web)

浏览器支持：

* Firefox >= 103
* Chrome / Edge >= 92
* Safari >= 15.4

# 构建

本项目使用`pnpm`作为依赖管理器，运行以下命令安装依赖并启动开发服务器：

```shell
pnpm install
pnpm run dev
```

构建项目：

```shell
pnpm run build
```

# 信息加密

本项目支持对信息加密，需要加密的文件放在`/secret`目录下，该目录被不会包含在构建的输出里。

例如创建`secret/info.json`并填写个人信息：

```json
{
	"name": "姓名",
	"education": "某某学校，专业，本科，2014-2018",
	"phone": 66666,
	"mail": "example@example.com"
}
```

调用以下命令，对`/secret`里所有的文件用`AES-128-GCM`加密：

```shell script
node script/secret-files.js encrypt <password>
```

加密后的文件被保存到`/public`目录，它将包含在构建中并上传，当 URL 存在`key=<password>`参数且密码正确时才能加载这些文件。
