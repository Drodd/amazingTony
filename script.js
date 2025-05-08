document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const startPage = document.getElementById('start-page');
    const startGameBtn = document.getElementById('start-game-btn');
    const gameContainer = document.getElementById('game-container');
    const timeDisplay = document.getElementById('time-display');
    const endDayModal = document.getElementById('end-day-modal');
    const satisfiedCustomers = document.getElementById('satisfied-customers');
    const totalIncome = document.getElementById('total-income');
    const nextDayBtn = document.getElementById('next-day-btn');
    const loadingStatus = document.getElementById('loading-status');
    
    const bg = document.getElementById('bg');
    const barber = document.getElementById('barber');
    const customerContainer = document.getElementById('customer-container');
    const customer = document.getElementById('customer');
    const hair = document.getElementById('hair');
    const cutHairBtn = document.getElementById('next-customer'); // 修改按钮变量名
    const customerRequest = document.getElementById('customer-request');
    const requestText = document.getElementById('request-text');
    const customerFeedback = document.getElementById('customer-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const frame = document.getElementById('frame');
    const hairSelection = document.getElementById('hair-selection');
    const gameControls = document.getElementById('game-controls');
    
    // 游戏状态变量
    let currentTime = 12; // 初始时间为12点
    let satisfiedCount = 0; // 满意客人数量
    
    // 检查元素存在
    console.log('开剪按钮元素:', cutHairBtn);
    console.log('游戏控制容器:', gameControls);
    
    // 初始隐藏UI元素
    customerRequest.classList.add('hidden');
    customerFeedback.classList.add('hidden');
    hairSelection.classList.add('hidden');
    gameControls.classList.add('hidden');
    
    // 确保开剪按钮样式正确
    cutHairBtn.style.display = '';  // 重置样式使其遵循父元素
    
    // 输出初始状态
    console.log('初始化时开剪按钮可见状态:', !gameControls.classList.contains('hidden'));
    console.log('初始化时开剪按钮Display:', getComputedStyle(cutHairBtn).display);
    
    // 创建遮罩图片元素
    const imgMask = document.createElement('img');
    imgMask.id = 'mask';
    imgMask.src = 'img/img_mask.png';
    imgMask.alt = '遮罩';
    imgMask.style.position = 'absolute';
    imgMask.style.opacity = '0';
    imgMask.style.zIndex = '100'; // 使用更高的z-index值，确保在hair层(4)的上方
    imgMask.style.transition = 'opacity 0.5s ease';
    
    // 添加到游戏场景
    document.getElementById('game-scene').appendChild(imgMask);
    
    // 原始尺寸
    const originalSizes = {
        bg: { width: 1024, height: 1536 },
        barber: { width: 766, height: 1302 },
        customer: { width: 661, height: 948 },
        hair1: { width: 386, height: 546, offsetX: 0, offsetY: 0 },
        hair2: { width: 361, height: 362, offsetX: 0, offsetY: 0 },
        hair3: { width: 338, height: 624, offsetX: 0, offsetY: 0 },
        hair4: { width: 390, height: 468, offsetX: 0, offsetY: 0 },
        hair5: { width: 457, height: 430, offsetX: 0, offsetY: 0 },
        hair6: { width: 448, height: 496, offsetX: 0, offsetY: 0 },
        hair7: { width: 448, height: 418, offsetX: 0, offsetY: 0 },
        hair8: { width: 364, height: 390, offsetX: 0, offsetY: 0 },
        mask: { width: 631, height: 494, offsetX: -10, offsetY: -50 } // 调整偏移量使遮罩更准确覆盖头发区域
    };
    
    // 发型配置，包括相对于客人的偏移值、长度和风格属性
    const hairStyles = [
        { 
            src: 'img/img_hair1.png', 
            width: originalSizes.hair1.width, 
            height: originalSizes.hair1.height,
            offsetX: 170, // 发型1相对于客人的X偏移
            offsetY: 30,  // 发型1相对于客人的Y偏移
            length: 3,    // 长度属性
            style: 1      // 风格属性
        },
        { 
            src: 'img/img_hair2.png', 
            width: originalSizes.hair2.width, 
            height: originalSizes.hair2.height,
            offsetX: 180, // 发型2相对于客人的X偏移
            offsetY: 30,  // 发型2相对于客人的Y偏移
            length: 1,    // 长度属性
            style: 1      // 风格属性
        },
        { 
            src: 'img/img_hair3.png', 
            width: originalSizes.hair3.width, 
            height: originalSizes.hair3.height,
            offsetX: 190, // 发型3相对于客人的X偏移
            offsetY: 5,   // 发型3相对于客人的Y偏移
            length: 3,    // 长度属性
            style: 2      // 风格属性
        },
        { 
            src: 'img/img_hair4.png', 
            width: originalSizes.hair4.width, 
            height: originalSizes.hair4.height,
            offsetX: 170, // 发型4相对于客人的X偏移
            offsetY: 15,  // 发型4相对于客人的Y偏移
            length: 2,    // 长度属性
            style: 3      // 风格属性
        },
        { 
            src: 'img/img_hair5.png', 
            width: originalSizes.hair5.width, 
            height: originalSizes.hair5.height,
            offsetX: 195, // 发型5相对于客人的X偏移
            offsetY: 15,  // 发型5相对于客人的Y偏移
            length: 3,    // 长度属性
            style: 3      // 风格属性
        },
        { 
            src: 'img/img_hair6.png', 
            width: originalSizes.hair6.width, 
            height: originalSizes.hair6.height,
            offsetX: 140, // 发型6相对于客人的X偏移
            offsetY: -5,  // 发型6相对于客人的Y偏移
            length: 2,    // 长度属性
            style: 4      // 风格属性
        },
        { 
            src: 'img/img_hair7.png', 
            width: originalSizes.hair7.width, 
            height: originalSizes.hair7.height,
            offsetX: 130, // 发型7相对于客人的X偏移
            offsetY: -10, // 发型7相对于客人的Y偏移
            length: 1,    // 长度属性
            style: 4      // 风格属性
        },
        { 
            src: 'img/img_hair8.png', 
            width: originalSizes.hair8.width, 
            height: originalSizes.hair8.height,
            offsetX: 200, // 发型8相对于客人的X偏移
            offsetY: 0,   // 发型8相对于客人的Y偏移
            length: 3,    // 长度属性
            style: 2      // 风格属性
        }
    ];
    
    // 客人需求类型
    const requestTypes = [
        { 
            type: 'cut_short', 
            texts: [
                '闺蜜说我头发太长了',
                '夏天快到了，热死了',
                '同事都说我该理发了'
            ]
        },
        { 
            type: 'trim', 
            texts: [
                '我觉得之前的发型挺好的',
                '不想改变太多'
            ]
        },
        { 
            type: 'unique', 
            texts: [
                '朋友都说我太普通了',
                '下周要参加一个重要派对',
                '我想在人群中脱颖而出'
            ]
        },
        { 
            type: 'low_key', 
            texts: [
                '公司要求不能太张扬',
                '我比较内向',
                '家人说我现在的发型太夸张',
            ]
        },
        { 
            type: 'completely_change', 
            texts: [
                '刚分手',
                '新工作新开始',
                '朋友都认不出我最好',
                '想调整一下心情'
            ]
        },
        { 
            type: 'easy_care', 
            texts: [
                '没时间每天弄头发',
                '我很懒',
                '上班太忙'
            ]
        }
    ];
    
    // 反馈文案
    const feedbacks = {
        positive: [
            '太棒了！这个发型很适合我！',
            '谢谢你，我很满意这个造型！',
            '哇！简直完美，我很喜欢！',
            '看起来比我想象的还要好！',
            '你真是个理发天才！',
            '这样就对了，果然专业！',
            '这次换发型真是明智的决定！',
            '照照镜子，我自己都被惊艳到了！',
            '值得特意过来一趟，真不错！'
        ],
        negative: [
            '呃...这不是我想要的效果...',
            '我觉得有点失望，不太满意...',
            '这发型好像不太适合我...',
            '我想我需要去别家修复一下...',
            '这和我要求的完全不一样啊！',
            '我朋友看到一定会笑话我的...',
            '这...可以退款吗？',
            '你是不是没听清我的要求？',
            '我头型不适合这个发型啊...',
            '下次我还是去我以前的理发店吧...'
        ]
    };
    
    let currentHairIndex = 0; // 当前发型索引
    let selectedHairIndex = null; // 玩家选择的发型索引
    let currentRequest = null; // 当前客人需求
    let scale = 1; // 缩放比例
    let isAnimating = false; // 动画状态标志
    let gameActive = true; // 游戏是否活跃
    let displayedHairIndex = 0; // 思考气泡中显示的发型索引
    
    // 获取发型选择元素
    const prevHairBtn = document.getElementById('prev-hair');
    const nextHairBtn = document.getElementById('next-hair');
    const displayedHair = document.getElementById('displayed-hair');
    
    // 获取思考气泡元素
    const thoughtBubble = document.querySelector('.thought-bubble');
    
    // 调整遮罩图片的大小和位置
    function updateMaskPosition() {
        const maskWidth = originalSizes.mask.width * scale * 1.1;
        const maskHeight = originalSizes.mask.height * scale * 1.1;
        
        // 获取客人容器的位置信息
        const customerRect = customerContainer.getBoundingClientRect();
        
        // 计算遮罩图片的绝对位置
        const maskLeft = customerRect.left + (originalSizes.mask.offsetX * scale);
        const maskTop = customerRect.top + (originalSizes.mask.offsetY * scale);
        
        imgMask.style.width = `${maskWidth}px`;
        imgMask.style.height = `${maskHeight}px`;
        // 使用绝对定位确保遮罩位于正确的层级
        imgMask.style.position = 'absolute';
        imgMask.style.left = `${maskLeft}px`;
        imgMask.style.top = `${maskTop}px`;
    }
    
    // 调整游戏场景尺寸和元素位置
    function resizeGame() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // 计算缩放比例（基于背景图，确保完全在屏幕内）
        const bgWidthRatio = windowWidth / originalSizes.bg.width;
        const bgHeightRatio = windowHeight / originalSizes.bg.height;
        scale = Math.min(bgWidthRatio, bgHeightRatio);
        
        // 计算背景图缩放后的实际尺寸
        const scaledBgWidth = originalSizes.bg.width * scale;
        const scaledBgHeight = originalSizes.bg.height * scale;
        
        // 计算背景图的居中位置（用于计算其他元素的相对位置）
        const bgLeft = (windowWidth - scaledBgWidth) / 2;
        const bgTop = (windowHeight - scaledBgHeight) / 2;
        
        // 理发师位置（相对于背景图，而不是窗口）
        const barberWidth = originalSizes.barber.width * scale;
        const barberHeight = originalSizes.barber.height * scale;
        // 理发师位于背景图底部居中
        const barberLeft = bgLeft + (scaledBgWidth - barberWidth) / 3;
        const barberTop = bgTop + scaledBgHeight - barberHeight - (scaledBgHeight * 0);
        
        barber.style.width = `${barberWidth}px`;
        barber.style.height = `${barberHeight}px`;
        barber.style.left = `${barberLeft}px`;
        barber.style.top = `${barberTop}px`;
        barber.style.bottom = 'auto'; // 清除之前的bottom设置
        
        // 调整游戏时间显示位置（相对于背景图）
        const gameTime = document.getElementById('game-time');
        const gameTimeLeft = bgLeft + scaledBgWidth * 0.09; // 背景图左侧8%位置
        const gameTimeTop = bgTop + scaledBgHeight * 0.05;  // 背景图顶部11%位置
        
        gameTime.style.transform = `translate(${gameTimeLeft}px, ${gameTimeTop}px)`;
        
        // 动态调整时间显示字号
        const timeDisplay = document.getElementById('time-display');
        timeDisplay.style.fontSize = `${100 * scale}px`;
        
        // 调整下班时间文字大小
        const endTime = document.querySelector('.end-time');
        endTime.style.fontSize = `${40 * scale}px`;
        
        // 客人容器位置（相对于背景图）
        const customerWidth = originalSizes.customer.width * scale;
        const customerHeight = originalSizes.customer.height * scale;
        // 客人位于背景图下部居右
        const customerContainerLeft = bgLeft + (scaledBgWidth - customerWidth) / 1.2;
        const customerContainerTop = bgTop + (scaledBgHeight * 0.35);
        
        customerContainer.style.width = `${customerWidth}px`;
        customerContainer.style.height = `${customerHeight}px`;
        customerContainer.style.left = `${customerContainerLeft}px`;
        customerContainer.style.top = `${customerContainerTop}px`;
        
        // 客人图片大小
        customer.style.width = `${customerWidth}px`;
        customer.style.height = `${customerHeight}px`;
        
        // 更新发型
        updateHair();
        
        // 更新思考气泡中的发型
        updateDisplayedHair();
        
        // 更新遮罩图片位置
        updateMaskPosition();
        
        // 调整客户需求气泡位置和大小
        customerRequest.style.fontSize = `${48 * scale}px`;
        customerRequest.style.padding = `${25 * scale}px ${15 * scale}px`;
        customerRequest.style.borderRadius = `${50 * scale}px`;
        customerRequest.style.width = `${scaledBgWidth * 0.8}px`;
        customerRequest.style.boxSizing = 'border-box';
        customerRequest.style.left = `${bgLeft + scaledBgWidth / 2}px`;
        customerRequest.style.bottom = `${windowHeight - (bgTop + scaledBgHeight * 0.82)}px`;
        
        // 查看气泡实际宽度（用于调试）
        console.log('设置的气泡宽度:', `${scaledBgWidth * 0.8}px`);
        console.log('实际气泡宽度:', getComputedStyle(customerRequest).width);
        
        // 调整客户反馈气泡位置和大小
        customerFeedback.style.fontSize = `${48 * scale}px`;
        customerFeedback.style.padding = `${25 * scale}px ${15 * scale}px`;
        customerFeedback.style.borderRadius = `${50 * scale}px`;
        customerFeedback.style.width = `${scaledBgWidth * 0.8}px`;
        customerFeedback.style.boxSizing = 'border-box';
        customerFeedback.style.left = `${bgLeft + scaledBgWidth / 2}px`;
        customerFeedback.style.bottom = `${windowHeight - (bgTop + scaledBgHeight * 0.82)}px`;
        
        // 调整思考气泡位置和大小
        const thoughtBubble = document.querySelector('.thought-bubble');
        thoughtBubble.style.padding = `${25 * scale}px`;
        thoughtBubble.style.borderRadius = `${100 * scale}%`;
        thoughtBubble.style.top = `${bgTop + scaledBgHeight * 0.06}px`;
        thoughtBubble.style.left = `${bgLeft + scaledBgWidth * 0.48}px`;
        
        // 调整发型导航按钮大小
        const hairNavButtons = document.querySelectorAll('.hair-nav-button');
        hairNavButtons.forEach(button => {
            button.style.width = `${100 * scale}px`;
            button.style.height = `${100 * scale}px`;
            button.style.fontSize = `${48 * scale}px`;
        });
        
        // 调整发型显示容器大小
        const displayedHairContainer = document.querySelector('.displayed-hair-container');
        displayedHairContainer.style.width = `${200 * scale}px`;
        displayedHairContainer.style.height = `${200 * scale}px`;
        
        // 调整开剪按钮大小和位置
        cutHairBtn.style.padding = `${12 * 3 * scale}px ${25 * 5 * scale}px`;
        cutHairBtn.style.fontSize = `${48 * scale}px`;
        cutHairBtn.style.borderRadius = `${80 * scale}px`;
        
        gameControls.style.padding = `${10 * scale}px ${15 * scale}px`;
        gameControls.style.borderRadius = `${100 * scale}px`;
        gameControls.style.bottom = `${bgTop + scaledBgHeight * 0.06}px`;
        gameControls.style.left = `${bgLeft + scaledBgWidth / 2}px`;
    }
    
    // 更新发型
    function updateHair() {
        const currentHair = hairStyles[currentHairIndex];
        hair.src = currentHair.src;
        
        const hairWidth = currentHair.width * scale;
        const hairHeight = currentHair.height * scale;
        
        // 根据客人的偏移量计算发型位置
        const hairLeft = currentHair.offsetX * scale;
        const hairTop = currentHair.offsetY * scale;
        
        hair.style.width = `${hairWidth}px`;
        hair.style.height = `${hairHeight}px`;
        hair.style.left = `${hairLeft}px`;
        hair.style.top = `${hairTop}px`;
    }
    
    // 更新思考气泡中显示的发型
    function updateDisplayedHair() {
        const currentHair = hairStyles[displayedHairIndex];
        displayedHair.src = currentHair.src;
        selectedHairIndex = displayedHairIndex; // 设置选中的发型
    }
    
    // 切换到前一个发型
    function prevHair() {
        displayedHairIndex = (displayedHairIndex - 1 + hairStyles.length) % hairStyles.length;
        updateDisplayedHair();
    }
    
    // 切换到后一个发型
    function nextHair() {
        displayedHairIndex = (displayedHairIndex + 1) % hairStyles.length;
        updateDisplayedHair();
    }
    
    // 生成随机客人需求
    function generateRandomRequest() {
        const currentHair = hairStyles[currentHairIndex];
        
        // 创建可用需求类型数组
        let availableRequests = [...requestTypes];
        
        // 如果当前发型长度为1(最短)，移除"剪短一点"和"修剪一下"的需求
        if (currentHair.length === 1) {
            availableRequests = availableRequests.filter(request => 
                request.type !== 'cut_short' && request.type !== 'trim'
            );
        }
        
        // 处理特殊需求的可用性
        
        // 若当前发型已经是hair1、2、7中的一个，则不能选择"与众不同"需求
        if ([0, 1, 6].includes(currentHairIndex)) {
            availableRequests = availableRequests.filter(request => 
                request.type !== 'unique'
            );
        }
        
        // 若当前发型已经是hair3、4、5、6、8中的一个，则不能选择"低调一点"需求
        if ([2, 3, 4, 5, 7].includes(currentHairIndex)) {
            availableRequests = availableRequests.filter(request => 
                request.type !== 'low_key'
            );
        }
        
        // 若当前发型已经是hair4、5、6、7中的一个，则不能选择"好打理"需求
        if ([3, 4, 5, 6].includes(currentHairIndex)) {
            availableRequests = availableRequests.filter(request => 
                request.type !== 'easy_care'
            );
        }
        
        // 如果没有可用需求，默认使用"彻底改变"
        if (availableRequests.length === 0) {
            const defaultRequest = requestTypes.find(req => req.type === 'completely_change');
            const randomText = defaultRequest.texts[Math.floor(Math.random() * defaultRequest.texts.length)];
            return { type: 'completely_change', text: randomText };
        }
        
        // 从可用需求中随机选择一个类型
        const selectedRequestType = availableRequests[Math.floor(Math.random() * availableRequests.length)];
        // 从该类型的多个对白中随机选择一个
        const randomText = selectedRequestType.texts[Math.floor(Math.random() * selectedRequestType.texts.length)];
        
        return { type: selectedRequestType.type, text: randomText };
    }
    
    // 验证玩家选择的发型是否符合客人需求
    function validateHairSelection() {
        if (selectedHairIndex === null) return false;
        
        const currentHair = hairStyles[currentHairIndex];
        const selectedHair = hairStyles[selectedHairIndex];
        
        switch(currentRequest.type) {
            case 'cut_short':
                return selectedHair.length === 1; // 剪短一点：长度必须为1
                
            case 'trim':
                // 修剪一下：长度必须小于当前发型，风格必须相同
                return selectedHair.length < currentHair.length && 
                       selectedHair.style === currentHair.style;
                
            case 'unique':
                // 与众不同：选择hair1、2、7，但不能与客人当前发型相同
                return [0, 1, 6].includes(selectedHairIndex) && selectedHairIndex !== currentHairIndex;
                
            case 'low_key':
                // 低调一点：选择hair3、4、5、6、8，但不能与客人当前发型相同
                return [2, 3, 4, 5, 7].includes(selectedHairIndex) && selectedHairIndex !== currentHairIndex;
                
            case 'completely_change':
                // 彻底改变：与客人当前发型的长度、风格都不同
                return selectedHair.length !== currentHair.length && 
                       selectedHair.style !== currentHair.style;
                
            case 'easy_care':
                // 好打理：选择hair4、5、6、7，但不能与客人当前发型相同
                return [3, 4, 5, 6].includes(selectedHairIndex) && selectedHairIndex !== currentHairIndex;
                
            default:
                return false;
        }
    }
    
    // 剪头发流程
    function cutHair() {
        if (isAnimating || !gameActive) return;
        
        if (selectedHairIndex === null) {
            alert('请先选择一个发型！');
            return;
        }
        
        const isValid = validateHairSelection();
        
        // 设置动画状态
        isAnimating = true;
        
        // 隐藏UI元素
        hideUIElement(customerRequest);
        hideUIElement(hairSelection);
        hideUIElement(gameControls);
        
        // 移除思考气泡的呼吸动画
        thoughtBubble.classList.remove('thought-bubble-breathing');
        
        // 显示遮罩图片并添加动画
        console.log('显示遮罩图片'); // 调试日志
        animateMask();
        
        // 延迟更换发型，使遮罩动画有显示时间
        setTimeout(() => {
            console.log('更换发型'); // 调试日志
            // 更换发型
            currentHairIndex = selectedHairIndex;
            updateHair();
            
            // 隐藏遮罩图片
            hideMask();
            
            // 延迟显示客人反馈，等待遮罩淡出
            setTimeout(() => {
                console.log('显示反馈'); // 调试日志
                // 显示客人反馈
                showCustomerFeedback(isValid);
                
                // 完成剪头发流程，重置动画状态
                isAnimating = false;
            }, 500);
        }, 1500); // 延长动画时间，让理发师动作更明显
    }
    
    // 显示客人反馈
    function showCustomerFeedback(isPositive) {
        const feedbackArray = isPositive ? feedbacks.positive : feedbacks.negative;
        const randomFeedback = feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
        
        feedbackText.textContent = randomFeedback;
        
        // 使用气泡入场动画显示反馈
        showUIElement(customerFeedback);
        customerFeedback.classList.add('bubble-in');
        
        // 根据反馈类型为客户图片添加动画效果
        if (isPositive) {
            // 正反馈时添加点头动画，客户和发型使用不同的动画类
            customer.classList.add('positive-feedback');
            hair.classList.add('hair-positive-feedback');
            
            // 动画结束后移除类
            setTimeout(() => {
                customer.classList.remove('positive-feedback');
                hair.classList.remove('hair-positive-feedback');
            }, 500);
            
            // 增加满意客人计数
            satisfiedCount++;
        } else {
            // 负反馈时添加晃动动画
            customer.classList.add('negative-feedback');
            hair.classList.add('negative-feedback');
            
            // 动画结束后移除类
            setTimeout(() => {
                customer.classList.remove('negative-feedback');
                hair.classList.remove('negative-feedback');
            }, 500);
        }
        
        // 更新游戏时间
        currentTime++;
        updateTimeDisplay();
        
        // 1秒后隐藏反馈，生成新客人或结束游戏
        setTimeout(() => {
            customerFeedback.classList.remove('bubble-in');
            hideUIElement(customerFeedback);
            
            if (currentTime >= 21) {
                // 工作日结束，显示结算窗口
                endDay();
            } else if (gameActive) {
                generateNewCustomer();
            } else {
                // 如果游戏不再活跃，确保重置动画状态
                isAnimating = false;
            }
        }, 1000);
    }
    
    // 更新时间显示
    function updateTimeDisplay() {
        timeDisplay.textContent = `${currentTime}:00`;
    }
    
    // 结束工作日
    function endDay() {
        // 计算总收入
        const income = satisfiedCount * 59;
        
        // 更新结算数据
        satisfiedCustomers.textContent = '0';
        totalIncome.textContent = '0';
        
        // 显示结算窗口
        endDayModal.classList.remove('hidden');
        
        // 增加仪式感：延迟显示数字，逐渐增加到最终值
        setTimeout(() => {
            // 1. 满意客人数量动画
            let currentCount = 0;
            const customerInterval = setInterval(() => {
                if (currentCount < satisfiedCount) {
                    currentCount++;
                    satisfiedCustomers.textContent = currentCount;
                } else {
                    clearInterval(customerInterval);
                    
                    // 2. 收入动画 (在客人数显示完成后)
                    let currentIncome = 0;
                    const incomeStep = Math.ceil(income / 20); // 分20步显示
                    const incomeInterval = setInterval(() => {
                        if (currentIncome < income) {
                            currentIncome = Math.min(currentIncome + incomeStep, income);
                            totalIncome.textContent = currentIncome;
                        } else {
                            clearInterval(incomeInterval);
                        }
                    }, 50);
                }
            }, 100);
        }, 500); // 延迟开始动画
    }
    
    // 重置游戏数据开始新的一天
    function resetGame() {
        // 重置游戏状态
        currentTime = 12;
        satisfiedCount = 0;
        updateTimeDisplay();
        
        // 隐藏结算窗口
        endDayModal.classList.add('hidden');
        
        // 启动新一轮游戏
        initCustomer();
    }
    
    // 获取随机发型索引（确保与当前不同）
    function getRandomHairIndex() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * hairStyles.length);
        } while (newIndex === currentHairIndex);
        
        return newIndex;
    }
    
    // 添加遮罩图片的动画效果
    function animateMask() {
        // 更新遮罩位置确保准确
        updateMaskPosition();
        
        // 先显示遮罩(淡入)
        imgMask.style.opacity = '1';
        
        // 添加缩放+晃动动画，增强频率
        imgMask.style.animation = 'maskAnimation 0.6s ease infinite';
        
        // 添加理发师震动效果
        barber.classList.add('barber-cutting');
    }
    
    // 隐藏遮罩图片
    function hideMask() {
        // 淡出动画
        imgMask.style.opacity = '0';
        
        // 移除缩放+晃动动画
        setTimeout(() => {
            imgMask.style.animation = '';
            
            // 移除理发师震动效果
            barber.classList.remove('barber-cutting');
        }, 500);
    }
    
    // 生成新客人（随机发型）并展示入场动画
    function generateNewCustomer() {
        if (isAnimating || !gameActive) return;
        isAnimating = true;
        
        // 确保所有UI元素隐藏
        hideUIElement(customerRequest);
        hideUIElement(customerFeedback);
        hideUIElement(hairSelection);
        hideUIElement(gameControls);
        
        // 移除思考气泡的呼吸动画
        thoughtBubble.classList.remove('thought-bubble-breathing');
        
        // 移除可能的动画类
        customerRequest.classList.remove('bubble-in');
        customerFeedback.classList.remove('bubble-in');
        
        // 播放客人出场动画
        customerContainer.classList.add('slide-out');
        
        setTimeout(() => {
            // 随机选择新发型
            currentHairIndex = getRandomHairIndex();
            updateHair();
            
            // 生成新的客人需求
            currentRequest = generateRandomRequest();
            requestText.textContent = currentRequest.text;
            
            // 将客人移到屏幕右侧准备入场
            customerContainer.classList.remove('slide-out');
            customerContainer.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                // 播放入场动画
                customerContainer.classList.add('slide-in');
                
                // 动画结束后显示对话气泡
                setTimeout(() => {
                    // 客人入场动画结束
                    customerContainer.classList.remove('slide-in');
                    customerContainer.style.transform = '';
                    
                    // 显示对话气泡，添加入场动画
                    showUIElement(customerRequest);
                    customerRequest.classList.add('bubble-in');
                    
                    // 对话气泡动画结束后显示思考气泡和开剪按钮
                    setTimeout(() => {
                        // 显示思考气泡和开剪按钮
                        showUIElement(hairSelection);
                        showUIElement(gameControls);
                        
                        // 使用淡入效果
                        hairSelection.style.opacity = '0';
                        gameControls.style.opacity = '0';
                        
                        setTimeout(() => {
                            hairSelection.style.opacity = '1';
                            gameControls.style.opacity = '1';
                            // 为思考气泡添加呼吸动画效果
                            thoughtBubble.classList.add('thought-bubble-breathing');
                            
                            // 确保开剪按钮显示
                            gameControls.classList.remove('hidden');
                            gameControls.style.display = 'flex';
                            cutHairBtn.style.display = 'block';
                            
                            console.log('按钮显示完成后状态:', getComputedStyle(cutHairBtn).display);
                            console.log('控制容器显示后状态:', getComputedStyle(gameControls).display);
                            
                            // 重置动画状态
                            isAnimating = false;
                        }, 50);
                    }, 500); // 对话气泡动画时间
                }, 800); // 客人入场动画时间
            }, 50);
        }, 800);
    }
    
    // 显示UI元素的函数
    function showUIElement(element) {
        element.classList.remove('hidden');
        console.log(`显示元素: ${element.id || element.className}`);
    }
    
    // 隐藏UI元素的函数
    function hideUIElement(element) {
        element.classList.add('hidden');
        console.log(`隐藏元素: ${element.id || element.className}`);
    }
    
    // 初始化客人入场
    function initCustomer() {
        // 确保初始隐藏UI元素
        hideUIElement(customerRequest);
        hideUIElement(customerFeedback);
        hideUIElement(hairSelection);
        hideUIElement(gameControls);
        
        // 确保思考气泡没有呼吸动画类
        thoughtBubble.classList.remove('thought-bubble-breathing');
        
        // 随机选择初始发型
        currentHairIndex = Math.floor(Math.random() * hairStyles.length);
        updateHair();
        
        // 生成初始客人需求
        currentRequest = generateRandomRequest();
        requestText.textContent = currentRequest.text;
        
        // 将客人放在屏幕外准备入场
        customerContainer.style.transform = 'translateX(100%)';
        
        // 短暂延迟后开始入场动画
        setTimeout(() => {
            // 客人入场
            customerContainer.classList.add('slide-in');
            
            // 动画结束后显示对话气泡
            setTimeout(() => {
                // 客人入场动画结束
                customerContainer.classList.remove('slide-in');
                customerContainer.style.transform = '';
                
                // 显示对话气泡，添加入场动画
                showUIElement(customerRequest);
                customerRequest.classList.add('bubble-in');
                
                // 对话气泡动画结束后显示思考气泡和开剪按钮
                setTimeout(() => {
                    // 显示思考气泡和开剪按钮
                    showUIElement(hairSelection);
                    showUIElement(gameControls);
                    
                    // 可以为思考气泡和按钮添加淡入效果
                    hairSelection.style.opacity = '0';
                    gameControls.style.opacity = '0';
                    
                    // 使用淡入动画
                    hairSelection.style.transition = 'opacity 0.5s ease';
                    gameControls.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        hairSelection.style.opacity = '1';
                        gameControls.style.opacity = '1';
                        // 为思考气泡添加呼吸动画效果
                        thoughtBubble.classList.add('thought-bubble-breathing');
                        
                        // 确保开剪按钮显示
                        gameControls.classList.remove('hidden');
                        gameControls.style.display = 'flex';
                        cutHairBtn.style.display = 'block';
                        
                        console.log('按钮显示完成后状态:', getComputedStyle(cutHairBtn).display);
                        console.log('控制容器显示后状态:', getComputedStyle(gameControls).display);
                        
                        // 重置动画状态
                        isAnimating = false;
                    }, 50);
                }, 500); // 对话气泡动画时间
            }, 800); // 客人入场动画时间
        }, 500); // 初始延迟
    }
    
    // 初始化发型选择事件
    function initHairstyleSelection() {
        prevHairBtn.addEventListener('click', prevHair);
        nextHairBtn.addEventListener('click', nextHair);
        
        // 初始化显示的发型
        updateDisplayedHair();
    }
    
    // 事件监听
    cutHairBtn.addEventListener('click', cutHair);
    
    // 开始游戏按钮点击事件
    startGameBtn.addEventListener('click', () => {
        // 显示加载状态
        startGameBtn.classList.add('hidden');
        loadingStatus.classList.remove('hidden');
        
        // 先加载游戏容器，但保持隐藏状态，让游戏场景在背景加载
        gameContainer.classList.remove('hidden');
        gameContainer.style.opacity = '0';
        
        // 预先显示游戏界面（透明），以便浏览器加载资源
        setTimeout(() => {
            // 加载所有游戏资源，确保背景图已经加载
            const gameAssets = [
                bg, barber, customer, hair, frame
            ];
            
            let assetsLoaded = 0;
            const totalAssets = gameAssets.length;
            
            // 检查资源是否已加载
            const checkAssets = () => {
                assetsLoaded++;
                if (assetsLoaded >= totalAssets) {
                    // 所有资源加载完成，再隐藏开始页面显示游戏
                    gameContainer.style.opacity = '1';
                    startPage.classList.add('hidden');
                    initGame();
                }
            };
            
            // 检查每个图片资源是否已加载
            gameAssets.forEach(asset => {
                if (asset.complete) {
                    checkAssets();
                } else {
                    asset.onload = checkAssets;
                    // 如果加载失败，也继续进行
                    asset.onerror = checkAssets;
                }
            });
        }, 500); // 给加载动画一些显示时间
    });

    // 下一天按钮点击事件
    nextDayBtn.addEventListener('click', resetGame);

    // 支持触摸事件
    cutHairBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        cutHair();
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', resizeGame);
    
    // 初始化游戏
    function initGame() {
        // 重置游戏状态
        currentTime = 12;
        satisfiedCount = 0;
        updateTimeDisplay();
        gameActive = true;
        
        // 创建遮罩图片元素
        imgMask.id = 'mask';
        imgMask.src = 'img/img_mask.png';
        imgMask.alt = '遮罩';
        imgMask.style.position = 'absolute';
        imgMask.style.opacity = '0';
        imgMask.style.zIndex = '100'; // 使用更高的z-index值，确保在hair层(4)的上方
        imgMask.style.transition = 'opacity 0.5s ease';
        
        // 确保添加到DOM
        document.getElementById('game-scene').appendChild(imgMask);
        
        // 确保样式和类正确设置
        console.log('初始化游戏...');
        
        // 重置所有UI元素状态
        hideUIElement(customerRequest);
        hideUIElement(customerFeedback);
        hideUIElement(hairSelection);
        hideUIElement(gameControls);
        
        // 记录初始化后状态
        console.log('游戏初始化后开剪按钮状态:', getComputedStyle(cutHairBtn).display);
        console.log('游戏初始化后控制容器状态:', getComputedStyle(gameControls).display);
        
        resizeGame();
        initHairstyleSelection();
        initCustomer();
    }
    
    // 不自动启动游戏，让用户点击首页开始按钮启动
}); 