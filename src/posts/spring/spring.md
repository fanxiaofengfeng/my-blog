# Spring Bean的生命周期

Spring Bean 的生命周期指的是 Spring容器在创建、初始化和销毁一个Bean实例时所经历的一系列过程。


这些过程包括bean的实例化、依赖注入、初始化和销毁等。

在这个过程中，Spring 生命周期分为注册阶段，合并阶段，实例化阶段，初始化阶段，摧毁阶段。
1. 通过Spring框架的beanFactory工厂利用反射机制创建bean对象
2. 根据set方法或者有参构造方法给bean对象的属性进行依赖注入
3. 判断当前bean对象是否实现相关的aware接口，诸如beanNameAware、beanFactoryAware接口，如果有的话执行对应的方法；
4. 执行bean对象的后置处理器postprocessbeforinitialation
5. 执行初始化方法initmethod
6. 执行bean对象的后置处理器postprocessafterinitialztion
7. 判断当前bean对象是否为单例，是则放到spring对象容器中，多例直接返回bean对象
8. 使用bean对象
9. 关闭容器，调用destroy方法摧毁对象。