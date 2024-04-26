# 使用DataX同步数据记录



## 从mongo同步到阿里adb

```json
{
  "job": {
    "setting": {
      "speed": {
        "channel": 2  // 设定任务的并发通道数为 2
      }
    },
    "content": [
      {
        "reader": {
          "name": "mongodbreader",  // 指定读取数据的读取器为 MongoDB
          "parameter": {
            "address": ["10.xx.xx.xxx:270xx"],  // MongoDB 的地址和端口
            "dbName": "zb_content",  // 数据库名称
            "collectionName": "yfb_company_document",  // 集合名称
            "query": "",   // 查询条件，这里限制返回的文档数量为 10
            "column": [  // 指定读取的字段名称和类型
              {
                "name": "companyComplete",
                "type": "string"
              }
            ]
          }
        },
        "writer": {
          "name": "adbmysqlwriter",  // 指定写入数据的写入器为 MySQL
          "parameter": {
            "writeMode": "replace",  // 写入模式为替换
            "username": "adsxxx",   // MySQL 的用户名
            "password": "Zy8jRb0azlrxxx",   // MySQL 的密码
            "column": [   // 指定写入的字段名称和类型
              {
                "name": "unit",
                "type": "string",
                "value": "${companyComplete}"   // 写入值为从读取器中读取的 companyComplete 字段值
              }
            ],
            "connection": [   // 指定 MySQL 的连接信息
              {
                "jdbcUrl": "jdbc:mysql://am-bp1y5gn3n5xxx.ads.aliyuncs.com:3306/yfb_temp",   // MySQL 的 JDBC URL
                "table": [   // 指定写入的表名称
                  "yfb_tianxxx"
                ]
              }
            ]
          }
        }
      }
    ]
  }
}

```

