/*数据结构*/
const save = localStorage.getItem("save");
const saveObject = JSON.parse(save);
const hashMap = saveObject || [
  {
    logo: "D",
    url: "https://www.douyu.com"
  },
  {
    logo: "W",
    url: "https://www.weibo.com"
  },
  {
    logo: "B",
    url: "https://www.bilibili.com"
  }
];
const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const $siteList = $(".siteList");
const $lastSite = $siteList.find("li.lastSite");

/* 渲染函数+delete按钮 */
const render = () => {
  $siteList.find("li:not(.lastSite)").remove();
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                  <svg class="icon" aria-hidden="true">
                     <use xlink:href="#icon-delete"></use>
                  </svg>
                </div>
            </div>
        </li>`).insertBefore($lastSite);
        $li.on('click',() =>{
          window.open(node.url)
        })
        $li.on('click','.close',(e) => {
          e.stopPropagation()
          hashMap.splice(index,1)

          render()
        })
  });
};
render();


/*增加按钮*/
$(".addButton").on("click", () => {
  let url = window.prompt("添加你的网站");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("save", string);
};

/*搜索保证两个input值相同*/
$('.googleButton').on('click', ()=>{
  $('.googleWord').val($('.baiduWord').val());
});

