// ==UserScript==
// @name         FUCK UGLY
// @namespace    http://www.dengquan.top
// @version      0.2
// @description  干掉那些恶心的东西
// @author       quan
// @match        *://*/*
// @grant        https://www.zhihu.com/inbox/*
// ==/UserScript==

const site = window.location.href;
const csdnbbs = /bbs.csdn.net/
const csdnblog = /blog.csdn.net/
const so = /www.so.com/
const zhihu = /zhihu.com/
const jianshu = /jianshu.com/
const huya = /huya.com/
const wenda = /wenda.so.com/
const tieba = /tieba.baidu.com/
const mayun = /gitee.com/


try{
    if(csdnblog.test(site)){//博客页面
        //去除展开登陆注册需求
        document.getElementById('article_content').style.height='';
        //去除展开按钮
        document.getElementsByClassName('hide-article-box')[0].style.display='none';
        //去除底部登陆注册提示
        if(document.getElementsByClassName('pulllog-box')[0])
        document.getElementsByClassName('pulllog-box')[0].style.display='none';
        //去除页面中部广告
        if(document.getElementsByClassName('mediav_ad')[0])
        document.getElementsByClassName('mediav_ad')[0].style.display='none';
        //去除谷歌广告
        if(document.getElementById('asideFooter'))
        document.getElementById('asideFooter').style.display='none';
        //去除页面左侧侧栏广告
        if(document.getElementsByClassName('csdn-tracking-statistics mb8 box-shadow')[0])
        document.getElementsByClassName('csdn-tracking-statistics mb8 box-shadow')[0].style.display='none';
    }else if(csdnbbs.test(site)){//论坛页面
        //模拟点击查看全部按钮
        document.getElementsByClassName('show_topic js_show_topic')[0].click();
    }else if(so.test(site)){//360搜索
        //去掉右边广告推荐
        document.getElementById('side_wrap').style.display='none';
        document.getElementById('tipbar').style.display='none';
    }else if(zhihu.test(site)){//知乎首页
        setTimeout(function () {
            document.getElementsByClassName('Footer')[0].style.display='none';
            //去掉右边广告推荐
            document.getElementsByClassName('GlobalSideBar-categoryList')[0].style.display='none';
            document.getElementsByClassName('UserStatus')[0].style.display='none';
        }, 1000);

    }else if(jianshu.test(site)){//简书
        document.getElementById('web-note-ad-fixed').style.display='none';
        document.getElementById('web-note-ad-1').style.display='none';
    }else if(huya.test(site)){//虎牙
        //免登陆超清
        let nowIbitrate;
        const takeNowIbitrate=(notRecord)=> {
            if (document.querySelector("li[ibitrate='500']") !== null) {
                nowIbitrate = $('ul.player-videotype-list > li.on');
                changeEventRate(notRecord);
                return;
            }
            else {
                setTimeout(function () {
                    takeNowIbitrate();
                }, 500);
            }
        }
        const autoChange=()=> {
            setTimeout(() => {
                if (document.querySelector('#player-login-tip-wrap') != null) {
                    $('#player-login-tip-wrap').remove();
                    changeRate();
                    takeNowIbitrate(true);
                    changeEventLine();
                    return;
                }
                else {
                    autoChange();
                }
            }, 500);
        }
        const changeEventRate=(notRecord)=> {
            $(".player-videotype-list li").click(function (e) {
                nowIbitrate = $(this);
                if (notRecord) {
                    changeRate();
                }
            });
        }
        const changeEventLine=()=> {
            $('.player-videoline-list li').on('click', () => {
                vplayer.vcore.reqBitRate(nowIbitrate.attr("iBitRate"), true);
                changeEventRate(true);
            })
        }
        const changeRate=()=> {
            vplayer.vcore.reqBitRate(nowIbitrate.attr("iBitRate"), true);
            $('ul.player-videotype-list > li.on').removeClass('on');
            nowIbitrate.addClass('on');
            $('span.player-videotype-cur').text(nowIbitrate.text());
        }
        takeNowIbitrate(false);
        setTimeout(() => {
            autoChange();
        }, 1000);

        //去广告
        //document.getElementById('huya-ad').style.display='none';

        //开启全屏关闭弹幕
        const clickLivePlatform=(danmu, fullscreen)=> {
            if (document.getElementById(danmu) != null) {
                document.getElementById(danmu).click();
            }
            if (document.getElementById(fullscreen) != null) {
                //document.getElementById(fullscreen).click();
            }
        }
        const applyLivePlatform=()=> {
            //document.getElementById('player-ctrl-wrap').style.display='inline';
            clickLivePlatform("player-danmu-btn", "player-fullscreen-btn")
            //document.getElementById('player-ctrl-wrap').style.display='block';
        }
        setTimeout(applyLivePlatform,1000);
    }else if(wenda.test(site)){//360问答
        document.getElementById('detail-leftside-rec').style.display='none';
        document.getElementsByClassName('top-search-banner')[0].style.display='none';
        document.getElementById('js-detail').style.float='left';
        document.getElementById('js-detail').style.width='100%';
        document.getElementsByClassName('mod-bot-flow js-mod-flow')[0].style.display='none';
        Array.from(document.getElementsByClassName('mod-detail-normal')).map(dom=>{
            dom.style.height='0'
            dom.display='none';
        })
    }else if(tieba.test(site)){//百度贴吧
        document.getElementById('aside')&&(document.getElementById('aside').style.display='none');
        document.getElementsByClassName('card_banner card_banner_link')[0]&&(document.getElementsByClassName('card_banner card_banner_link')[0].style.display='none');
        document.getElementById('content_wrap')&&(document.getElementById('content_wrap').style.width='100%');

        document.getElementsByClassName('right_section')[0]&&(document.getElementsByClassName('right_section')[0].style.display='none');
        document.getElementsByClassName('left_section')[0]&&(document.getElementsByClassName('left_section')[0].style.width='100%');
    }else if(mayun.test(site)){//码云
        document.getElementsByClassName('side-toolbar')[0].style.display='none';
        const items = document.querySelectorAll('.header-menu a.item')||[]
        for(let item of items){
            const text = item.innerText
            if(text.indexOf('企业版')!==-1||text.indexOf('高校版')!==-1||text.indexOf('博客')!==-1){
                item.style.display='none';
            }
        }
        if(document.getElementsByClassName('wallet-banner')[0]){
            document.getElementsByClassName('wallet-banner')[0].style.display='none';
        }
        setTimeout(() => {
            document.getElementsByClassName('g-wxad__wrapper')[0].style.display='none';
        }, 500);

    }
}catch(e){
    console.log('加载美化插件失败',e)
}

