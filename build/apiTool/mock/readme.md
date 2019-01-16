### 1.中文句子：

```javascript
Random.csentence(5, 30), // Random.csentence( min, max ) 随机生成中文句子，min:最小字数，max:最大字数，可用于 title,name 等
```

### 2.图片：

```javascript
Random.dataImage('300x250', 'mock 的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
```

### 3.中文姓名：

```javascript
Random.cname(); // Random.cname() 随机生成一个常见的中文姓名
```

###4.日期时间：

```javascript
Random.date() + " " + Random.time(); // Random.date()指示生成的日期字符串的格式,默认为 yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
```

### 5.布尔值：

```javascript
Random.boolean（1,2，false） //随机生成布尔值 1/3 的可能性是 false 2/3 是 true ,Random.boolean() true false 各一半
```

### 6.自然数：

```javascript
Random.natural(min?,max?)//随机生成一个自然数，什么叫自然数，就是大于等于 0 的
```

### 7.整数：

```javascript
Random.Integer(min?,max?)//生成一个随机的整数，可以是负数。
```

### 8.字符串：Random.string(pool?,min?,max?)

- 随机生成一个字符串,pool 的值可以是：
- upper: 26 个大写字母
- lower: 26 个小写字母
- number: 0 到 9 十个数字
- sympol: "!@#\$%^&\*()[]"


### 9.从指定数组随机选一个元素

```javascript
Random.pick(arr)
var arr = [1,4,5,6,7,8];
var pick = Random.pick(arr);
```