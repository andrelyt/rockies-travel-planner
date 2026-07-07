export const flights = [
  { id: 'ac008', date: '09.25', number: 'AC008', route: '香港 HKG → 温哥华 YVR', time: '09:45', status: '已预订 · 不可更改' },
  { id: 'ac8804', date: '10.03', number: 'AC8804', route: '温哥华 YVR → 西雅图 SEA', time: '13:15', status: '已预订 · 不可更改' },
  { id: 'ac8809', date: '10.05', number: 'AC8809', route: '西雅图 SEA → 温哥华 YVR → 香港 HKG', time: '19:20', status: '已预订 · 不可更改' },
]

export const points = {
  HKG: { name: '香港国际机场', coord: [113.9185, 22.308] },
  YVR: { name: '温哥华国际机场', coord: [-123.184, 49.1947] },
  YYC: { name: '卡尔加里国际机场', coord: [-114.0203, 51.1215] },
  Canmore: { name: '坎莫尔', coord: [-115.359, 51.089] },
  Banff: { name: '班夫小镇', coord: [-115.5708, 51.1784] },
  Minnewanka: { name: '明尼旺卡湖', coord: [-115.498, 51.248] },
  TwoJack: { name: '双杰克湖', coord: [-115.493, 51.229] },
  BowFalls: { name: '弓河瀑布', coord: [-115.553, 51.167] },
  Gondola: { name: '班夫硫磺山缆车', coord: [-115.555, 51.149] },
  ParkRide: { name: 'Lake Louise Park and Ride', coord: [-116.179, 51.425] },
  Moraine: { name: '梦莲湖', coord: [-116.186, 51.3217] },
  Louise: { name: '露易丝湖', coord: [-116.1773, 51.4167] },
  BowLake: { name: '弓湖', coord: [-116.678, 51.68] },
  Peyto: { name: '佩托湖', coord: [-116.523, 51.717] },
  Icefield: { name: '哥伦比亚冰原', coord: [-117.286, 52.220] },
  Sunwapta: { name: '辛华达瀑布', coord: [-117.645, 52.532] },
  AthabascaFalls: { name: '阿萨巴斯卡瀑布', coord: [-117.884, 52.664] },
  Jasper: { name: '贾斯珀', coord: [-118.081, 52.873] },
  Medicine: { name: '药湖', coord: [-117.742, 52.856] },
  Maligne: { name: '玛琳湖', coord: [-117.639, 52.655] },
  Pyramid: { name: '金字塔湖', coord: [-118.101, 52.922] },
  Vancouver: { name: '温哥华市中心', coord: [-123.121, 49.282] },
  Stanley: { name: '斯坦利公园', coord: [-123.145, 49.304] },
  Granville: { name: '格兰维尔岛', coord: [-123.135, 49.271] },
  EnglishBay: { name: '英吉利湾', coord: [-123.143, 49.286] },
  SEA: { name: '西雅图塔科马机场', coord: [-122.309, 47.450] },
  Pike: { name: '派克市场', coord: [-122.342, 47.610] },
  Chihuly: { name: '奇胡利玻璃艺术园', coord: [-122.350, 47.620] },
  SpaceNeedle: { name: '太空针塔', coord: [-122.349, 47.620] },
  Kerry: { name: '凯瑞公园', coord: [-122.359, 47.629] },
}

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`

const localImages = {
  'Lake Minnewanka Canada.jpg': asset('lake-minnewanka.jpg'),
  'Banff Avenue Cascade Mountain.jpg': asset('banff-town.jpg'),
  'Bow Falls Banff.jpg': asset('bow-falls.jpg'),
  'Moraine Lake-Banff NP.JPG': asset('moraine-lake.jpg'),
  'Lake Louise from the Lakeshore Trail.jpg': asset('lake-louise.jpg'),
  'Peyto Lake-Banff NP-Canada.jpg': asset('peyto-lake.jpg'),
  'Athabasca Glacier on the Columbia Icefield.jpg': asset('columbia-icefield.jpg'),
  'Athabasca Falls in Jasper National Park.jpg': asset('athabasca-falls.jpg'),
  'Spirit Island, Maligne Lake.jpg': asset('maligne-lake.jpg'),
  'Pyramid Lake Jasper National Park.jpg': asset('pyramid-lake.jpg'),
  'Stanley Park Vancouver aerial.jpg': asset('stanley-park.jpg'),
  'Granville Island Vancouver.jpg': asset('granville-island.jpg'),
  'Pike Place Market Entrance.jpg': asset('pike-place.jpg'),
  'Chihuly Garden and Glass.jpg': asset('chihuly.jpg'),
  'Space Needle002.jpg': asset('space-needle.jpg'),
  'Icefields Parkway in Banff National Park.jpg': asset('icefields-parkway.jpg'),
  'Seattle Center as night falls.jpg': asset('seattle.jpg'),
}

const image = (file) => localImages[file] || asset('moraine-lake.jpg')

export const days = [
  {
    day: 1, date: '09.25', weekday: '周五', title: '香港 → 温哥华 → 卡尔加里 → Canmore', short: '抵达与取车', intensity: '高强度', tags: ['飞行', '取车', '自驾'], transport: '抵达 YYC 后取 SUV', stay: 'Canmore · 备选 Calgary Airport', weather: { lat: 51.089, lon: -115.359, city: 'Canmore', zone: 'America/Edmonton' },
    route: ['HKG', 'YVR', 'YYC', 'Canmore'],
    timeline: [['上午', '09:45', 'AC008 香港起飞', '主航班已锁定'], ['抵达后', '待定', 'YVR 入境并转飞 YYC', '不进温哥华市区'], ['傍晚', '待定', 'YYC 取车与采购', 'Costco / Walmart / Canadian Tire'], ['晚上', '视状态', '前往 Canmore 入住', '若疲劳则住机场酒店']],
    decisions: { recommended: '当天转飞卡尔加里并住 Canmore', backup: '抵达过晚或疲劳时住 Calgary Airport', avoid: '不建议留温哥华一晚' },
    alerts: ['YVR → YYC 航班尚待预订', '不要疲劳驾驶，保守方案随时可启用'],
    attractions: []
  },
  {
    day: 2, date: '09.26', weekday: '周六', title: 'Banff 轻松适应日', short: '湖泊与小镇', intensity: '舒缓', tags: ['自驾', '湖泊', '小镇'], transport: '全天自驾', stay: 'Canmore / Banff', weather: { lat: 51.1784, lon: -115.5708, city: 'Banff', zone: 'America/Edmonton' },
    route: ['Canmore', 'Minnewanka', 'TwoJack', 'Banff', 'BowFalls', 'Gondola', 'Canmore'],
    timeline: [['上午', '09:00', 'Lake Minnewanka + Two Jack Lake', '慢节奏适应时差'], ['中午', '12:30', 'Banff Town 午餐与散步', '预留补给时间'], ['下午', '15:00', 'Bow Falls + Surprise Corner', '短停观景'], ['傍晚', '17:30', 'Banff Gondola', '按天气决定是否登顶']],
    decisions: { recommended: '湖区 + Banff Town + 傍晚 Gondola', backup: '阴雨时改上温泉或 Cave and Basin', avoid: '不要为塞入所有景点而赶路' },
    alerts: ['Banff Gondola 建议提前预约', '天气差时缆车观景价值会下降'],
    attractions: [
      { name: '明尼旺卡湖', en: 'Lake Minnewanka', desc: '班夫国家公园中开阔而宁静的高山湖泊，适合作为倒时差后的第一站。', time: '60–90分钟', photo: '上午', image: image('Lake Minnewanka Canada.jpg') },
      { name: '班夫小镇', en: 'Banff Town', desc: '雪山环抱的国家公园小镇，适合午餐、补给和轻松漫步。', time: '2小时', photo: '下午', image: image('Banff Avenue Cascade Mountain.jpg') },
      { name: '弓河瀑布', en: 'Bow Falls', desc: '距离小镇很近的宽阔瀑布，可快速停车游览。', time: '30分钟', photo: '下午', image: image('Bow Falls Banff.jpg') }
    ]
  },
  {
    day: 3, date: '09.27', weekday: '周日', title: 'Moraine Lake + Lake Louise', short: '核心双湖日', intensity: '核心日', tags: ['Shuttle', '湖泊', '摄影'], transport: '自驾至 Park & Ride + Shuttle', stay: 'Lake Louise 优先', weather: { lat: 51.4167, lon: -116.1773, city: 'Lake Louise', zone: 'America/Edmonton' },
    route: ['ParkRide', 'Moraine', 'Louise', 'ParkRide'],
    timeline: [['清晨', '建议早班', 'Park & Ride 集合', '核验 Shuttle 预约'], ['上午', '首班优先', 'Moraine Lake', '先看十峰谷与落叶松'], ['中午', '连接班次', 'Lake Connector', '连接至 Lake Louise'], ['下午', '13:00', 'Lake Louise 湖畔', '按体力选择短步道']],
    decisions: { recommended: '先 Moraine Lake 早班，再 Lake Louise', backup: '商业 Shuttle；或 Lake Louise + Peyto Lake', avoid: '不要尝试私家车进入 Moraine Lake' },
    alerts: ['Moraine Lake 私家车不能进入', '2026 Shuttle 开售时间待 Parks Canada 公布'],
    attractions: [
      { name: '梦莲湖', en: 'Moraine Lake', desc: '十峰谷环绕的经典冰川湖，9月底有机会遇到金色落叶松。', time: '2–3小时', photo: '清晨', image: image('Moraine Lake-Banff NP.JPG') },
      { name: '露易丝湖', en: 'Lake Louise', desc: '班夫代表性冰川湖，蓝绿色湖水背靠维多利亚冰川。', time: '2–3小时', photo: '上午或傍晚', image: image('Lake Louise from the Lakeshore Trail.jpg') }
    ]
  },
  {
    day: 4, date: '09.28', weekday: '周一', title: 'Icefields Parkway → Jasper', short: '冰原大道', intensity: '高强度', tags: ['长途自驾', '冰川', '弱信号'], transport: '全天自驾 · 出发前加满油', stay: 'Jasper Town · 第1晚', weather: { lat: 52.22, lon: -117.286, city: 'Columbia Icefield', zone: 'America/Edmonton' },
    route: ['Louise', 'BowLake', 'Peyto', 'Icefield', 'Sunwapta', 'AthabascaFalls', 'Jasper'],
    timeline: [['清晨', '07:00', 'Lake Louise 加满油出发', '下载离线地图'], ['上午', '08:00', 'Bow Lake + Peyto Lake', '观景点短停'], ['中午', '12:00', 'Columbia Icefield', '项目预留2.5–3小时'], ['下午', '16:00', 'Sunwapta + Athabasca Falls', '视天色调整'], ['傍晚', '天黑前', '抵达 Jasper', '避免夜间山路驾驶']],
    decisions: { recommended: '冰原项目 + 两座瀑布完整路线', backup: '跳过 Mistaya 或 Skywalk，保证天黑前到达', avoid: '恶劣天气下强行赶完整清单' },
    alerts: ['手机信号弱，必须提前下载离线地图', '加油点少，Lake Louise 出发前加满油', '出发前检查 511 Alberta 路况'],
    attractions: [
      { name: '佩托湖', en: 'Peyto Lake', desc: '从高处俯瞰的蓝色冰川湖，是冰原大道代表性观景点。', time: '60–90分钟', photo: '上午', image: image('Peyto Lake-Banff NP-Canada.jpg') },
      { name: '哥伦比亚冰原', en: 'Columbia Icefield', desc: '北美落基山最重要的冰原之一，可体验冰原车与天空步道。', time: '2.5–3小时', photo: '中午', image: image('Athabasca Glacier on the Columbia Icefield.jpg') },
      { name: '阿萨巴斯卡瀑布', en: 'Athabasca Falls', desc: '水流穿过狭窄岩壁，力量感强烈，步道距离较短。', time: '45分钟', photo: '下午', image: image('Athabasca Falls in Jasper National Park.jpg') }
    ]
  },
  {
    day: 5, date: '09.29', weekday: '周二', title: 'Jasper 深度日', short: 'Maligne 湖区', intensity: '中等', tags: ['游船', '湖泊', '日落'], transport: '全天自驾', stay: 'Jasper Town · 第2晚', weather: { lat: 52.873, lon: -118.081, city: 'Jasper', zone: 'America/Edmonton' },
    route: ['Jasper', 'Medicine', 'Maligne', 'Jasper', 'Pyramid'],
    timeline: [['上午', '08:00', 'Jasper → Medicine Lake', '沿途留意野生动物'], ['上午', '10:00', 'Maligne Lake Cruise', '从小镇至少预留90分钟'], ['下午', '14:30', 'Jasper Town 休息', '咖啡与补给'], ['傍晚', '18:00', 'Pyramid / Patricia Lake', '湖边看日落']],
    decisions: { recommended: 'Maligne Lake Cruise + Pyramid Lake 日落', backup: 'Medicine Lake + Maligne 湖边 + 小镇', avoid: '当前不安排 Maligne Canyon 与 Cavell Road' },
    alerts: ['游船建议提前预约', '出发前核实 Jasper 实时开放地图'],
    attractions: [
      { name: '玛琳湖', en: 'Maligne Lake', desc: '狭长的高山湖泊，以 Spirit Island 游船景观闻名。', time: '3–4小时', photo: '早晨或傍晚', image: image('Spirit Island, Maligne Lake.jpg') },
      { name: '金字塔湖', en: 'Pyramid Lake', desc: '靠近 Jasper Town 的安静湖泊，适合傍晚散步和倒影摄影。', time: '60分钟', photo: '日落', image: image('Pyramid Lake Jasper National Park.jpg') }
    ]
  },
  {
    day: 6, date: '09.30', weekday: '周三', title: 'Jasper → Calgary Airport', short: '返程还车', intensity: '长途驾驶', tags: ['自驾', '还车', '机场'], transport: '长途自驾后还车', stay: 'Calgary Airport Hotel', weather: { lat: 51.1215, lon: -114.0203, city: 'Calgary', zone: 'America/Edmonton' },
    route: ['Jasper', 'Louise', 'Canmore', 'YYC'],
    timeline: [['上午', '尽早', 'Jasper 出发', '预留天气与休息机动'], ['中午', '途中', '分段休息与加油', '避免连续疲劳驾驶'], ['傍晚', '预计', '抵达 YYC 还车', '检查油量与车况'], ['晚上', '还车后', '机场酒店入住', '不进市中心']],
    decisions: { recommended: '返回 Calgary Airport 同城还车', backup: '仅在异地费和航班明显合适时考虑 Edmonton', avoid: '不建议住 Calgary 市中心' },
    alerts: ['这是长途驾驶日，请尽早出发', '途中天气和路况可能影响抵达时间'], attractions: []
  },
  {
    day: 7, date: '10.01', weekday: '周四', title: 'Calgary → Vancouver', short: '城市切换', intensity: '轻松', tags: ['飞行', '步行', '无车'], transport: 'Canada Line / Uber', stay: 'Downtown / Coal Harbour', weather: { lat: 49.282, lon: -123.121, city: 'Vancouver', zone: 'America/Vancouver' },
    route: ['YYC', 'YVR', 'Vancouver'],
    timeline: [['上午', '待定', 'YYC → YVR', '航班尚待预订'], ['下午', '抵达后', 'Canada Line / Uber 入城', '城市段不租车'], ['傍晚', '17:00', 'Canada Place + Waterfront', '轻松散步'], ['晚上', '19:00', 'Gastown 晚餐', '步行返回酒店']],
    decisions: { recommended: 'Downtown 入住后轻松 city walk', backup: '抵达较晚则只保留晚餐', avoid: '不在温哥华租车' },
    alerts: ['YYC → YVR 航班待预订'], attractions: []
  },
  {
    day: 8, date: '10.02', weekday: '周五', title: 'Vancouver City Day', short: '温哥华一日', intensity: '舒适', tags: ['公园', '市集', '日落'], transport: '步行 + 公交 + Uber', stay: 'Vancouver Downtown', weather: { lat: 49.282, lon: -123.121, city: 'Vancouver', zone: 'America/Vancouver' },
    route: ['Vancouver', 'Stanley', 'Granville', 'Vancouver', 'EnglishBay'],
    timeline: [['上午', '09:00', 'Stanley Park', '海堤或公园短线'], ['中午', '12:30', 'Granville Island', '市集午餐'], ['下午', '15:30', 'Canada Place / Gastown', '按 Day 7 完成度调整'], ['傍晚', '18:00', 'English Bay 日落', '注意海风']],
    decisions: { recommended: 'Stanley + Granville + English Bay 舒适版', backup: '加入 Capilano，减少市区点位', avoid: '不安排 Whistler 或三大自然景点全套' },
    alerts: ['城市段不租车更方便', '雨天准备防水外套'],
    attractions: [
      { name: '斯坦利公园', en: 'Stanley Park', desc: '城市边缘的大型滨海公园，可沿海堤看城市与雪山。', time: '2–3小时', photo: '上午', image: image('Stanley Park Vancouver aerial.jpg') },
      { name: '格兰维尔岛', en: 'Granville Island', desc: '聚集公共市场、餐厅和工艺空间的城市岛区。', time: '2小时', photo: '中午', image: image('Granville Island Vancouver.jpg') }
    ]
  },
  {
    day: 9, date: '10.03', weekday: '周六', title: '温哥华 → 西雅图', short: '飞往西雅图', intensity: '轻松', tags: ['锁定航班', '无车', '市集'], transport: 'Link Light Rail / Uber', stay: 'Downtown / Pike Place', weather: { lat: 47.61, lon: -122.342, city: 'Seattle', zone: 'America/Los_Angeles' },
    route: ['Vancouver', 'YVR', 'SEA', 'Pike'],
    timeline: [['上午', '退房后', '前往 YVR', '不安排景点'], ['中午', '13:15', 'AC8804 起飞', '航班已锁定'], ['下午', '抵达后', 'SEA → Downtown', 'Link Light Rail 或 Uber'], ['傍晚', '17:30', 'Pike Place / Waterfront', '轻松散步']],
    decisions: { recommended: '抵达后只安排 Pike Place 与海滨', backup: '航班延误则直接晚餐休息', avoid: '上午不要再塞温哥华景点' },
    alerts: ['AC8804 已锁定，上午只安排退房与机场'], attractions: []
  },
  {
    day: 10, date: '10.04', weekday: '周日', title: 'Seattle City Day', short: '西雅图经典', intensity: '中等', tags: ['城市', '艺术', '观景'], transport: '步行 + Uber', stay: 'Seattle Downtown', weather: { lat: 47.61, lon: -122.342, city: 'Seattle', zone: 'America/Los_Angeles' },
    route: ['Pike', 'Chihuly', 'SpaceNeedle', 'Kerry'],
    timeline: [['上午', '09:00', 'Pike Place Market', '避开午间高峰'], ['中午', '12:00', 'Chihuly Garden and Glass', '室内外展览'], ['下午', '15:00', 'Space Needle', '按天气选择登塔'], ['傍晚', '18:00', 'Kerry Park', '打车前往看日落']],
    decisions: { recommended: 'Pike Place + Chihuly + Space Needle + Kerry Park', backup: '波音迷可替换为 Future of Flight', avoid: '普通游客不建议为波音往返 Everett' },
    alerts: ['热门门票可提前预订', 'Kerry Park 建议打车往返'],
    attractions: [
      { name: '派克市场', en: 'Pike Place Market', desc: '西雅图最有代表性的公共市场，可体验海鲜、鲜花与咖啡文化。', time: '2小时', photo: '上午', image: image('Pike Place Market Entrance.jpg') },
      { name: '奇胡利玻璃艺术园', en: 'Chihuly Garden and Glass', desc: '以大型玻璃装置、温室与花园展示为核心的艺术空间。', time: '90分钟', photo: '中午', image: image('Chihuly Garden and Glass.jpg') },
      { name: '太空针塔', en: 'Space Needle', desc: '西雅图城市地标，可俯瞰市中心、海湾与远处山脉。', time: '90分钟', photo: '下午', image: image('Space Needle002.jpg') }
    ]
  },
  {
    day: 11, date: '10.05', weekday: '周一', title: '西雅图 → 温哥华 → 香港', short: '返程日', intensity: '轻松', tags: ['锁定航班', '回程'], transport: '公共交通 / Uber', stay: '机上', weather: { lat: 47.45, lon: -122.309, city: 'Seattle', zone: 'America/Los_Angeles' },
    route: ['Pike', 'SEA', 'YVR', 'HKG'],
    timeline: [['上午', '自由安排', '咖啡与补买', '不去远郊'], ['中午', '12:30', '市区午餐', '整理行李'], ['下午', '建议提前', '前往 SEA', '国际转机预留充足时间'], ['晚上', '19:20', 'AC8809 起飞', 'SEA → YVR → HKG']],
    decisions: { recommended: '上午轻松活动，下午提前去机场', backup: '天气差时在酒店附近活动', avoid: '不安排远郊或耗时景点' },
    alerts: ['AC8809 已锁定', 'YVR 接续航班细节待补充'], attractions: []
  }
]

export const checklist = [
  ['book-yvr-yyc', '预订 Vancouver → Calgary 航班', 'critical', '航班'],
  ['book-yyc-yvr', '预订 Calgary → Vancouver 航班', 'critical', '航班'],
  ['rental-car', '预订 Calgary 同地取还 SUV', 'critical', '交通'],
  ['moraine', '预约 Moraine Lake Shuttle', 'critical', '预约'],
  ['icefield', '预约 Columbia Icefield Adventure / Skywalk', 'high', '预约'],
  ['maligne', '预约 Maligne Lake Cruise', 'high', '预约'],
  ['gondola', '预约 Banff Gondola', 'medium', '预约'],
  ['park-pass', '购买或确认国家公园通行证', 'high', '证件'],
  ['offline-map', '下载离线地图与 Parks Canada App', 'critical', '离线'],
  ['road-app', '准备 511 Alberta 路况查询', 'high', '离线'],
  ['clothes', '准备防寒、防雨、防滑装备', 'high', '装备'],
  ['car-kit', '车载充电器、转换插头、零食与水', 'medium', '装备'],
  ['insurance', '确认旅行保险、租车保险及驾照文件', 'critical', '证件'],
  ['final-check', '出发前一周核实 Jasper、Shuttle 与道路状态', 'critical', '复核'],
]

export const highlights = [
  { title: 'Moraine Lake', subtitle: '十峰谷与金色落叶松', image: image('Moraine Lake-Banff NP.JPG') },
  { title: 'Icefields Parkway', subtitle: '冰川、公路与瀑布', image: image('Icefields Parkway in Banff National Park.jpg') },
  { title: 'Maligne Lake', subtitle: 'Spirit Island 湖上航线', image: image('Spirit Island, Maligne Lake.jpg') },
  { title: 'Seattle', subtitle: '城市天际线与艺术', image: image('Seattle Center as night falls.jpg') },
]
