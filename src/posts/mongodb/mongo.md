## MongoDB 语法

### 插入方法

MongoDB提供了以下插入方法[文件](https://www.mongodb.com/docs/v4.4/core/document/#std-label-bson-document-format)到集合中：

|                                                              |                                                              |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`db.collection.insertOne()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne) | 将单个文档插入到集合中。                                     |
| [`db.collection.insertMany()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany) | [`db.collection.insertMany()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany)插入*多个* [文件](https://www.mongodb.com/docs/v4.4/core/document/#std-label-bson-document-format)到集合中。 |
| [`db.collection.insert()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insert/#mongodb-method-db.collection.insert) | [`db.collection.insert()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.insert/#mongodb-method-db.collection.insert)插入单个文档或 多个文档到一个集合中。 |

#### 插入的其他方法

以下方法还可以向集合添加新文档：

- [`db.collection.update()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.update/#mongodb-method-db.collection.update)与选项一起使用时。`upsert: true`
- [`db.collection.updateOne()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne)与选项一起使用时。`upsert: true`
- [`db.collection.updateMany()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany)与选项一起使用时。`upsert: true`
- [`db.collection.findAndModify()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify)与选项一起使用时。`upsert: true`
- [`db.collection.findOneAndUpdate()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.findOneAndUpdate/#mongodb-method-db.collection.findOneAndUpdate)与选项一起使用时。`upsert: true`
- [`db.collection.findOneAndReplace()`](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.findOneAndReplace/#mongodb-method-db.collection.findOneAndReplace)与选项一起使用时。`upsert: true`
- [`db.collection.save()`.](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.save/#mongodb-method-db.collection.save)
- [`db.collection.bulkWrite()`.](https://www.mongodb.com/docs/v4.4/reference/method/db.collection.bulkWrite/#mongodb-method-db.collection.bulkWrite)

### 查询文档

![在这里插入图片描述](assets/fe3db32cb2e64ab9889cd3ed5d5137a5-1704246654171-8.png)

![在这里插入图片描述](assets/8de55df8a2b340a399c1cea2300f06b8.png)

![在这里插入图片描述](assets/8de55df8a2b340a399c1cea2300f06b8-1704246687456-13.png)

### 查询语法举例

```java
//zb_fetcher_document为表名
db.zb_fetcher_document.find().limit(10)
db.zb_fetcher_document.findOne()
db.zb_fetcher_document.getIndexes()
//匹配查询
db.zb_fetcher_document.find({'_id': 365681909})
//多条件查询
db.zb_fetcher_document.find({
    _id: 365681909, title: '河南牧业经济学院2023年8至9月政府采购意向'
})
//设置返回字段 1返回，0不返回
db.zb_fetcher_document.find({
    _id: 365681909, title: '河南牧业经济学院2023年8至9月政府采购意向'
}, {
    _id: 0, areaid: 1
})
//设置排序顺序，按照areaid升序，按照_id降序
db.zb_fetcher_document
    .find({updatetime: 1702828800}, {title: 1, _id: 1, areaid: 1})
    .sort({areaid: 1, _id: -1})
//分页：查询第二页，每页10条数据，skip跳过条数，limit取10条
db.zb_fetcher_document
    .find({updatetime: 1702828800}).skip(10).limit(10)
```

### 逻辑查询

```java
//逻辑查询 查询updatetime=1702828800且areaid小于10000,或者catid=43
db.zb_fetcher_document.find({
    $and: [
        {updatetime: 1702828800},
        {'areaid': {$lt: 10000}},
        {$or: [{catid: 43}]}
    ]
})
    
    
```



### 单聚合查询

```java
//统计数量
db.zb_fetcher_document.count()
//字段去重
db.zb_fetcher_document.distinct("name")
```

### 聚合查询

```java
//聚合管道
db.zb_fetcher_document.find().count()
//$match: 过滤数据
//$group: 分组统计结果
//$project: 修改输出文档的结构
//匹配updatetime是1702828800的数据，
// 按照areaid分组，根据areaid分组，统计数量，
// 将_id命名为areaid，将原来的areaid命名为sum，不显示_id
// 根据sum倒序显示，顺序是1，倒序是-1
db.zb_fetcher_document.aggregate(
    [
        {$match: {updatetime: 1702828800}},
        {
            $addFields: {
                fullName: {$concat: ["$extractProjName", "&&&", "$extractZhaoBiaoUnit"]}
            }
        },
        {$group: {_id: "$areaid", areaid: {$sum: 1}, fullName: {$first: "$fullName"}}},
        {
            $project: {
                areaid: "$_id",
                sum: "$areaid",
                _id: 0,
                fullName: 1
            }
        },
        {$sort: {sum: -1}},
        {$skip: 5},
        {$limit: 5}
    ]
    )
```



### 索引查询

```java
#创建MongoDB的索引
db.col.createIndex(keys, options)
#查看集合索引
db.col.getIndexes()
#查看集合索引大小
db.col.totalIndexSize()
#删除集合所有索引
db.col.dropIndexes()
#删除集合指定索引
db.col.dropIndex("索引名称")
```

## MongoDB索引