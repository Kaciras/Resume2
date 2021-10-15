# Kaciras 的简历网站

![Deploy](https://github.com/Kaciras/Resume2/workflows/Deploy/badge.svg)

个人简历网站，在线浏览：[Web前端开发工程师](https://resume.kaciras.com/web)

浏览器支持：
* Firefox >= 72
* Chrome / Edge >= 80
* Safari >= 13.1
* 国产浏览器未知，请用最新版。

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

# 个人信息加密

本项目支持对敏感信息加密，需要加密的文件放在`/secret`目录下，该目录被`.gitignore`所排除，也不会包含在构建的输出里。

例如创建`secret/info.json`并填写个人信息：

```json
{
	"name": "姓名",
	"degree": "某某学校，专业，本科，2014-2018",
	"addresses": {
		"电话和微信": 66666,
		"QQ": 88888,
		"Email": "example@example.com"
	}
}
```

调用以下命令，对`/secret`里所有的文件用`AES-128-GCM`加密：

```shell script
node script/secret-files.mjs encrypt <password>
```

加密后的文件被保存到`/public`目录，它将包含在构建输出中并上传，当 URL 存在`key=<password>`参数并且密码正确时才能加载这些文件。
