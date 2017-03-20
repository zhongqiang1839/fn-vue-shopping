import Header from './components/common/mint-ui/header';
import Button from './components/common/mint-ui/button/index.js';
import Cell from './components/common/mint-ui/cell/index.js';
import CellSwipe from './components/common/mint-ui/cell-swipe/index.js';
import Field from './components/common/mint-ui/field/index.js';
import Badge from './components/common/mint-ui/badge/index.js';
import Switch from './components/common/mint-ui/switch/index.js';
import Spinner from './components/common/mint-ui/spinner/index.js';
import TabItem from './components/common/mint-ui/tab-item/index.js';
import TabContainerItem from './components/common/mint-ui/tab-container-item/index.js';
import TabContainer from './components/common/mint-ui/tab-container/index.js';
import Navbar from './components/common/mint-ui/navbar/index.js';
import Tabbar from './components/common/mint-ui/tabbar/index.js';
import Search from './components/common/mint-ui/search/index.js';
import Checklist from './components/common/mint-ui/checklist/index.js';
import Radio from './components/common/mint-ui/radio/index.js';
import Loadmore from './components/common/mint-ui/loadmore/index.js';
import Actionsheet from './components/common/mint-ui/actionsheet/index.js';
import Popup from './components/common/mint-ui/popup/index.js';
import Swipe from './components/common/mint-ui/swipe/index.js';
import SwipeItem from './components/common/mint-ui/swipe-item/index.js';
import Range from './components/common/mint-ui/range/index.js';
import Picker from './components/common/mint-ui/picker/index.js';
import Progress from './components/common/mint-ui/progress/index.js';
import Toast from './components/common/mint-ui/toast/index.js';
import Indicator from './components/common/mint-ui/indicator/index.js';
import MessageBox from './components/common/mint-ui/message-box/index.js';
import InfiniteScroll from './components/common/mint-ui/infinite-scroll/index.js';
import Lazyload from './components/common/mint-ui/lazyload/index.js';
import DatetimePicker from './components/common/mint-ui/datetime-picker/index.js';
import IndexList from './components/common/mint-ui/index-list/index.js';
import IndexSection from './components/common/mint-ui/index-section/index.js';
import PaletteButton from './components/common/mint-ui/palette-button/index.js';
import '../src/assets/fonts/mint-ui/iconfont.css';

const version = '2.1.0';
const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(CellSwipe.name, CellSwipe);
  Vue.component(Field.name, Field);
  Vue.component(Badge.name, Badge);
  Vue.component(Switch.name, Switch);
  Vue.component(Spinner.name, Spinner);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(Navbar.name, Navbar);
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(Search.name, Search);
  Vue.component(Checklist.name, Checklist);
  Vue.component(Radio.name, Radio);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Actionsheet.name, Actionsheet);
  Vue.component(Popup.name, Popup);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(Range.name, Range);
  Vue.component(Picker.name, Picker);
  Vue.component(Progress.name, Progress);
  Vue.component(DatetimePicker.name, DatetimePicker);
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  Vue.component(PaletteButton.name, PaletteButton);
  Vue.use(InfiniteScroll);
  Vue.use(Lazyload, {
    loading: require('./assets/images/loading-spin.svg'),
    try: 3
  });

  Vue.$messagebox = Vue.prototype.$messagebox = $.messagebox =  MessageBox;
  Vue.$toast = Vue.prototype.$toast = $.toast = Toast;
  Vue.$indicator = Vue.prototype.$indicator = $.indicator = Indicator;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  install,
  version,
  Header,
  Button,
  Cell,
  CellSwipe,
  Field,
  Badge,
  Switch,
  Spinner,
  TabItem,
  TabContainerItem,
  TabContainer,
  Navbar,
  Tabbar,
  Search,
  Checklist,
  Radio,
  Loadmore,
  Actionsheet,
  Popup,
  Swipe,
  SwipeItem,
  Range,
  Picker,
  Progress,
  Toast,
  Indicator,
  MessageBox,
  InfiniteScroll,
  Lazyload,
  DatetimePicker,
  IndexList,
  IndexSection,
  PaletteButton
};
