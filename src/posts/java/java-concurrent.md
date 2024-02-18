# Java并发常见面试题总结

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

    `刚开始都是在创建新的线程，达到核心线程数量5个后,新的任务进来后不再创建新的线程，而是将任务加入工作队列，工作队列到达上限5个后，新的任务又会创建新的普通线程，直到达到线程池最大的线程数量10个,后面的任务则根据配置的饱和策略来处理。我们这里没有具体配置，使用的是默认的配置AbortPolicy:直接抛出异常。`

## 饱和策略
当队列和线程池都满了，说明线程池处于饱和状态，那么必须对新提交的任务采用一种特殊的策略来进行处理。
这个策略默认是 AbortPolicy，表示无法处理新的任务而抛出异常。JAVA提供了4种策略：
1. AbortPolicy：直接抛出异常；
2. CallerRunsPolicy：只用调用所在的线程运行任务；
3. 丢弃队列最近的一个任务，并执行当前任务；
4. DiscardPolicy：不处理，丢弃掉；

