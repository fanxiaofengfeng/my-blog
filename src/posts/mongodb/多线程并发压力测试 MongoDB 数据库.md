# 多线程并发压力测试 MongoDB 数据库

## 业务背景

业务需要调用并一次传入500个ID来查询MongoDB数据库数据，进行测试并计算时间的长短。

## 目标

通过并发执行多个线程来模拟对 MongoDB 数据库的压力测试。每个线程会执行一次数据库查询操作，并记录查询结果的大小和查询耗时。

## 问题解决思路

`CountDownLatch` 是 Java 并发包中提供的一个同步辅助类，它允许一个或多个线程等待其他线程完成操作后再继续执行。它通过一个计数器来实现，该计数器初始化为一个正整数，并且在线程中使用 `countDown()` 方法来递减计数器的值，使用 `await()` 方法来阻塞线程直到计数器的值为零。

## Coding

Controller

```java
@RestController
@Slf4j
public class HelloTestController {

    @Resource(name = "exactSortMongoTemplate") // 将 MongoDB 客户端对象自动注入到 Spring Bean 中
    private MongoTemplate mongoTemplate; 

    /**
     * 通过MongoDB进行压测
     * @return ContentMongoExactSortDocument对象列表
     * @throws InterruptedException 如果线程被中断时抛出InterruptedException异常
     */
    @PostMapping(value = "/getContentByMongoTest")
    @ResponseBody
    public void getContentByMongoTest() throws InterruptedException {
        int count = 1; // 压测次数
        int temp = 0; // 计数器
        while (temp < count) {
            log.info("第" + temp + "次压测");

            CountDownLatch latch = new CountDownLatch(1); // 创建一个计数器，用于控制线程的并发执行
            for (int i = 0; i < 5; i++) { // 创建5个线程
                Set<Integer> set = new HashSet<>();
                while (set.size() < 500) {
                    set.add(361000000 + (int) (Math.random() * 100000)); // 生成500个整数，前三位是361
                }

                new Thread(new Test(mongoTemplate, latch, set)).start(); // 创建并启动线程，传递必要的参数
            }
            latch.countDown(); // 释放计数器，使线程开始执行
            temp++; // 增加计数器的值
        }
    }
}

```

Test

```java
/**
 * 业务逻辑
 */
@Slf4j
public class Test implements Runnable {
    private MongoTemplate mongoTemplate;
    private CountDownLatch latch;
    private Set<Integer> set;

    /**
     * 构造方法
     * @param mongoTemplate MongoDB模板对象
     * @param latch 计数器
     * @param set 整数集合
     */
    public Test(MongoTemplate mongoTemplate, CountDownLatch latch, Set<Integer> set) {
        this.latch = latch;
        this.set = set;
        this.mongoTemplate = mongoTemplate;
    }

    /**
     * 线程执行的主要逻辑
     */
    @SneakyThrows
    @Override
    public void run() {
        latch.await(); // 等待计数器减到0，使线程开始执行

        // 执行任务逻辑
        Criteria criteria = Criteria.where("_id").in(set);
        // 创建 Query 对象并设置查询条件
        Query query = new Query();
        query.addCriteria(criteria);

        StopWatch w = new StopWatch();
        w.start();
        List<ContentMongoExactSortDocument> result = mongoTemplate.find(query, ContentMongoExactSortDocument.class, "zb_content_document");
        w.stop();
        double t1 = w.getLastTaskInfo().getTimeSeconds();
        String name = Thread.currentThread().getName();
        log.info(name + " getContentByMongo t1: " + t1);
        log.info("size: " + result.size());
    }
}

```

## 代码分析

在上面的代码中，`CountDownLatch` 被用来控制线程的并发执行。具体来说，这是它的运行方式：

1. 在主线程中创建一个 `CountDownLatch` 对象，计数器初始值为 1：`CountDownLatch latch = new CountDownLatch(1);`
2. 主线程进入循环，创建并启动多个压测线程。
3. 每个压测线程在执行任务之前调用 `latch.await()` 方法，该方法会阻塞线程，直到计数器的值为零。
4. 主线程在创建完所有线程后，调用 `latch.countDown()` 方法，计数器减一，此时计数器的值为零。
5. 所有等待中的压测线程同时开始执行任务。

## 压测分析

第一次执行，如下图，可以看到平均时间在660毫秒


第二次，如下图，平均时间是110毫秒


第三次，如下图，平均时间是78毫秒


第四次，如下图，平均时间是100毫秒


第五次，如下图，平均时间是20毫秒


## 分析结果

MongoDB会将最常访问的数据缓存在内存中，这样可以快速响应频繁的查询请求。当你进行多次查询时，部分数据已经被加载到内存中，后续的查询可以直接从内存中读取，大大提高了查询速度。

