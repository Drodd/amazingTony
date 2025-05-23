# 剪刀手托尼 - 理发小游戏

## 游戏介绍

《剪刀手托尼》是一款基于网页的轻松休闲游戏，玩家将扮演一名技艺精湛的理发师Tony，通过理解客人的需求并选择合适的发型来获得好评和收入。游戏界面简洁美观，操作简单，玩家需要在有限的工作时间内服务尽可能多的客人，获得高额收入。

## 游戏特点

- **多样的客人需求**：不同的客人会有不同的发型需求，包括剪短、修剪、彻底改变等
- **丰富的反馈机制**：根据玩家选择的发型是否满足客人需求，会有不同的反馈和动画效果

## 游戏玩法

1. 点击"开始游戏"进入游戏
2. 客人会提出发型需求，如"剪短一点"、"与众不同"等
3. 根据需求，玩家通过左右箭头选择合适的发型
4. 点击"开剪"按钮进行理发
5. 如果符合客人需求，客人会给出好评，玩家获得收入
6. 每次理发消耗1小时，从12:00开始，21:00结束
7. 结束后会统计满意客人数量和总收入
8. 点击"下一天"开始新的一天

## 客人需求类型解析

- **剪短一点**：选择短发型（长度为1）
- **修剪一下**：选择比当前发型更短但风格相同的发型
- **与众不同**：选择特定款式的发型（发型1、2、7）
- **低调一点**：选择较为普通的发型（发型3、4、5、6、8）
- **彻底改变**：选择与当前发型长度和风格都不同的发型
- **好打理**：选择特定款式的发型（发型4、5、6、7）

## 技术实现

### 前端技术

- 纯原生JavaScript实现，无需任何框架
- CSS3高级特性：毛玻璃效果、过渡动画、关键帧动画
- 响应式设计，适配不同尺寸的屏幕

### 主要功能模块

1. **游戏初始化**：设置游戏状态、加载资源、调整界面尺寸
2. **游戏流程控制**：处理游戏开始、进行中和结束的状态转换
3. **客人需求生成**：根据当前发型智能生成合理的需求
4. **发型选择系统**：通过左右箭头在不同发型间切换
5. **剪发动画效果**：遮罩动画、震动效果，增强游戏体验
6. **反馈系统**：根据选择结果显示不同的客人反馈
7. **结算系统**：统计并动态显示游戏成果

### 文件结构

- `index.html`：游戏主页面结构
- `style.css`：样式表，包含所有界面样式和动画效果
- `script.js`：游戏逻辑控制脚本
- `img/`：图片资源目录，包含背景、人物和发型等素材

## 开发计划

- [x] 基础游戏逻辑实现
- [x] 美化游戏界面
- [x] 增强动画效果
- [x] 毛玻璃背景实现
- [x] 结算界面动画效果
- [ ] 增加更多发型选择
- [ ] 添加不同客人角色
- [ ] 加入背景音乐和音效
- [ ] 游戏数据存储功能
- [ ] 成就系统

## 如何运行

1. 克隆或下载项目代码
2. 直接在浏览器中打开`index.html`文件
3. 点击"开始游戏"按钮开始游戏

## 浏览器兼容性

游戏使用现代Web技术开发，推荐使用以下浏览器获得最佳体验：
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 致谢

感谢所有参与游戏测试和提供反馈的朋友们，你们的建议让游戏变得更好！

---

享受游戏，成为最受欢迎的理发师吧！ 