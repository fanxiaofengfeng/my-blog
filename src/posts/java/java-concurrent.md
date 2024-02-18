# Java并发常见面试题总结


## 创建线程池有哪几个核心参数？如何合理配置线程池的大小
1. 核心参数
```java
    public ThreadPoolExecutor(int corePoolSize,//核心线程数
                              int maximumPoolSize, //最大线程数
                              long keepAliveTime,//空闲线程存活时间
                              TimeUnit unit,//存活时间的单位
                              BlockingQueue<Runnable> workQueue,//缓存异步任务的队列
                              ThreadFactory threadFactory,//
                              RejectedExecutionHandler handler//线程池满了以后的采取的拒绝策略
// )
```
1. `corePoolSize`：核心线程数，即线程池中一直保持存活的线程数量。即使它们当前没有任务执行，也会保持存活。
2. `maximumPoolSize`：最大线程数，当核心线程数被用完，且工作队列已满，并且当前的线程数量小于最大线程数。
3. `keepAliveTime`：空闲线程的存活时间，即当前线程数大于核心线程数，大于核心的线程数存活的时间
4. `unit`：存活时间的代为，可以是秒，毫秒等等。
5. `workQueue`：缓存异步任务的队列，用于保存等待执行的任务。当线程池中的线程数达到核心线程数时，新的任务会被放入这个队列中。
6. `threadFactory`: 用于创建新线程的工厂。通过指定自定义的 ThreadFactory，可以控制线程的创建过程，例如设置线程的名称、优先级等。
7. `handler`: 线程池满了以后的拒绝策略，用于处理任务无法被接收的情况。常见的拒绝策略有抛出异常、丢弃任务、调用者运行、丢弃最近的一个任务，并执行当前任务等。
## 拒绝策略
当队列和线程池都满了，说明线程池处于饱和状态，那么必须对新提交的任务采用一种特殊的策略来进行处理。
这个策略默认是 AbortPolicy，表示无法处理新的任务而抛出异常。JAVA提供了4种策略：
1. AbortPolicy：直接抛出异常；
2. CallerRunsPolicy：只用调用所在的线程运行任务；
3. DiscardOldestPolicy：丢弃队列最近的一个任务，并执行当前任务；
4. DiscardPolicy：不处理，丢弃掉；

## 线程池工作原理
我们通过一段程序来观察线程池的工作原理

1. 创建一个线程：
```java
public class ThreadPoolTest implements Runnable
{
    @Override
    public void run()
    {
        try
        {
            Thread.sleep(300);
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
    }
}
```
2. 线程池循环运行16个线程：
```java
public static void main(String[] args)
{
    LinkedBlockingQueue<Runnable> queue =
            new LinkedBlockingQueue<Runnable>(5);
    ThreadPoolExecutor threadPool = new ThreadPoolExecutor(5, 10, 60, TimeUnit.SECONDS, queue);
    for (int i = 0; i < 16 ; i++)
    {
        threadPool.execute(
                new Thread(new ThreadPoolTest(), "Thread".concat(i + "")));
        System.out.println("线程池中活跃的线程数： " + threadPool.getPoolSize());
        if (queue.size() > 0)
        {
            System.out.println("----------------队列中阻塞的线程数" + queue.size());
        }
    }
    threadPool.shutdown();
}
```
```text
线程池中活跃的线程数： 1
线程池中活跃的线程数： 2
线程池中活跃的线程数： 3
线程池中活跃的线程数： 4
线程池中活跃的线程数： 5
线程池中活跃的线程数： 5
----------------队列中阻塞的线程数1
线程池中活跃的线程数： 5
----------------队列中阻塞的线程数2
线程池中活跃的线程数： 5
----------------队列中阻塞的线程数3
线程池中活跃的线程数： 5
----------------队列中阻塞的线程数4
线程池中活跃的线程数： 5
----------------队列中阻塞的线程数5
线程池中活跃的线程数： 6
----------------队列中阻塞的线程数5
线程池中活跃的线程数： 7
----------------队列中阻塞的线程数5
线程池中活跃的线程数： 8
----------------队列中阻塞的线程数5
线程池中活跃的线程数： 9
----------------队列中阻塞的线程数5
线程池中活跃的线程数： 10
----------------队列中阻塞的线程数5
Exception in thread "main" java.util.concurrent.RejectedExecutionException: Task Thread[#46,Thread15,5,main] rejected from java.util.concurrent.ThreadPoolExecutor@4141d797[Running, pool size = 10, active threads = 10, queued tasks = 5, completed tasks = 0]
	at java.base/java.util.concurrent.ThreadPoolExecutor$AbortPolicy.rejectedExecution(ThreadPoolExecutor.java:2081)
	at java.base/java.util.concurrent.ThreadPoolExecutor.reject(ThreadPoolExecutor.java:841)
	at java.base/java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1376)
	at com.amber.coach.temp.concurrent.threadpoolexecutor.Main.main(Main.java:22)
```
从结果可以观察出：
1. 创建的线程池具体 配置为：核心线程数量为5个；全部线程数量为10个；工作队列的长度为5；
2. 运行的原理：

   *刚开始都是在创建新的线程，达到核心线程数量5个后,新的任务进来后不再创建新的线程，而是将任务加入工作队列，工作队列到达上限5个后，新的任务又会创建新的普通线程，直到达到线程池最大的线程数量10个,后面的任务则根据配置的饱和策略来处理。我们这里没有具体配置，使用的是默认的配置AbortPolicy:直接抛出异常。*

