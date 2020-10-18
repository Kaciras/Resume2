# 2020年简历

个人简历网站，可以在线浏览：

[Web前端开发工程师](https://resume.kaciras.com/web)

# 个人信息加密

本项目支持对敏感信息加密，仅在URL参数带有正确的密钥时才显示，否则显示演示信息。

在项目目录下创建`secret.json`并填写个人信息：

```json
{
	"name": "姓名",
	"degree": ["某某学校", "专业", "本科"],
	"addresses": {
		"电话和微信": 66666,
		"QQ": 88888,
		"Email": "example@example.com"
	}
}
```

该文件被`.gitignore`所排除，默认不会上传，也不会包含在构建的输出里。

然后对其进行`AES-128-GCM`加密，指定一个密码：

```shell script
node script/secret-file.mjs encrypt secret.json <password>
```

该命令将生成`secret.json.encrypt`文件，包含了加密后的内容，该文件被包含在构建输出里，也可以把它上传到公共仓库。

访问网站时在URL里带上`key=<password>`参数将解密该文件，并将其内容显示在简历的个人信息栏。
