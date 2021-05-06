# Kaciras 的简历网站

![Deploy](https://github.com/Kaciras/Resume2/workflows/Deploy/badge.svg)

个人简历网站，在线浏览：[Web前端开发工程师](https://resume.kaciras.com/web)

# 构建

本项目使用`pnpm`作为依赖管理器，运行以下命令安装依赖并启动开发服务器：

```shell
pnpm install
pnpm run dev
```

# 个人信息加密

本项目支持对敏感信息加密，仅在 URL 参数带有正确的密钥时才显示，否则显示演示信息。

在项目目录下创建`secret.json`并填写个人信息：

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

该文件被`.gitignore`所排除，也不会包含在构建的输出里。 对其使用`AES-128-GCM`加密，指定一个密码：

```shell script
node script/secret-file.mjs encrypt secret.json <password>
```

该命令将生成`public/secret.json.aes`文件，包含了加密后的内容，该文件被包含在构建输出中并上传到公共仓库。访问时在URL里带上`key=<password>`参数解密该文件，将其内容显示在个人信息栏。
