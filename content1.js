var Friend=[];
var Pos;
var Tidings;//群发消息内容或个性化邀请消息

var Timeout;        //定时句柄
var Countdown;      //倒计时名句柄
var Delayed_time;   //倒计时
var ActionCount;    //本次操作数量

var FriendPage = true;  //显示好友页面
var GroupPage = true;   //显示分组页面
var SendPage = true;    //显示群发页面
var AddFriendPage = true; //显示加人页面
var TestCount = 10; //试用名额

(function(){
    InitLog();  //重置操作记录数据
    BindEven();     //绑定事件
})();

$(document).ready(function(){
    AppendWindow();//创建领英窗口
    BindLinkedin(false);//自动绑定Linkedin账号
});

//绑定事件
function BindEven(){
    $('body').on('click', '.j-lyjl-bg', ShowOrHideWindow);     //隐藏窗口
    $('body').on('click', '#j_logo', ShowOrHideWindow);     //显示操作界面

    $('body').on('click', '.j-nav-box button', SelectFunctionPage);//选项卡点击事件，显示相应功能页面

    $('body').on('click', '.j-close-dialog', RemoveDialog);//移除弹窗

    /*登录界面*/
    $('body').on('click', '#j_login', Login);//账号登录
    $('body').on('keydown', '#j_pw', LoginEnter);//按回车键登录


    /*-----------------------加人页面---------------------*/
    $('body').on('click', '#j_addfriend .j-option-nav', ShowAddOption);//显示加人页面的子页面
    $('body').on('click', '#j_show_connect_condition', ShowMoreConnectCondition);

    $('body').on('click', '#j_clean_connect_condition', CleanConnectCondition);//清除搜索人脉时设置的更多条件
    $('body').on('input', '#j_connect_search_country', GetConnectCountry);//获取搜索国家
    $('body').on('click', '#j_connect_select_country .j-country-span', SelectConnectCountry);//选择国家和地区
    $('body').on('click', '#j_clean_connect_country', CleanSelectConnectCountry);//清除选择的国家和地区
    $('body').on('click', '#j_determine_connect_country', DetermineSelectConnectCountry);//确定选择的国家和地区*/

    $('body').on('input', '#j_connect_search_company', GetConnectCompany);//搜索人脉时获取目前就业条件
    $('body').on('click', '#j_connect_select_company .j-company-span', SelectConnectCompany);//搜索人脉时选择目前就职
    $('body').on('click', '#j_clean_connect_company', CleanSelectConnectCompany);//搜索人脉时清除选择的目前就职
    $('body').on('click', '#j_determine_connect_company', DetermineSelectConnectCompany);//确定选择的国家和地区*/

    $('body').on('input', '#j_connect_search_school', GetConnectSchool);//搜索人脉时获取就读学校
    $('body').on('click', '#j_connect_select_school .j-school-span', SelectConnectSchool);//搜索人脉时选择就读学校
    $('body').on('click', '#j_clean_connect_school', CleanSelectConnectSchool); //搜索人脉时清除选择就读学校
    $('body').on('click', '#j_determine_connect_school', DetermineSelectConnectSchool);//确定选择的国家和地区*/

    $('body').on('click', '#j_connect_search', SearchConnect);//获取人脉
    $('body').on('keydown', '#j_connect_keyword', SearchConnectEnter);//回车获取人脉
    $('body').on('click', '#j_add_connect_paging .j-paging', GetAddConnectSomePage);//获取指定页的人脉
    $('body').on('click', '#j_add_connect_paging .j-jump-btn', JumpAddConnect);//跳到指定页人脉
    $('body').on('keydown', '#j_add_connect_paging .j-jump', JumpAddConnectEnter);//回车跳到指定人脉页
    $('body').on('click', "input[name='selectallconnect']", SelectAllConnect);//全选/全不选人脉
    $('body').on('click', '#j_start_add', StartAddFriend);//    开始批量加领英精灵搜索到的人脉

    $('body').on('click', '#j_new_mes', NewMes);//新增个性化邀请内容
    $("body").on("click", "#j_mes_firstname", InsertMesFirstName);      //个性邀请消息插入名字
    $("body").on("click", "#j_mes_lastname",InsertMesLastName);         //个性邀请消息插入姓氏
    $('body').on('click', "input[name='selectallmes']", SelectAllMes);  //全选/全不选个性化邀请消息
    $('body').on('click', "input[name='mes']", SelectMes);              //单个选择个性邀请消息
    $('body').on('click', '#j_add_mes .j-delete', DeleteMes);           //批量删除个性化邀请消息
    $('body').on('dblclick', '.j-mes-cont', ResetMes);                  //修改个性化邀请消息

    $('body').on('click', '#j_has_send', GetHasRecall);//获取未通过的邀请
    $('body').on('click', "input[name='selectallrecall']", SelectAllRecall);//全选/全不选待撤回
    $('body').on('click', '#j_recall_paging .j-paging', GetRecallSomePage);//获取好友
    $('body').on('click', '#j_recall_paging .j-jump-btn', JumpRecall);//跳到指定人脉页
    $('body').on('keydown', '#j_recall_paging .j-jump', JumpRecallEnter);//回车跳到指定页
    $('body').on('click', '#j_recall', RecallBatch);//批量撤回

    $('body').on('click', '#j_batch_addfriend', StartBatchAddFriend); //开始批量加领英页面的好友



    /*----------------------好友页面----------------------*/
    $('body').on('click', '#j_more_condition', ShowMoreCondition);//显示更多搜索条件

    $('body').on('click', '.j-bg-search-condition', ShowOrHideSearch);//隐藏/显示搜索的选择条件框
    $('body').on('click', '#j_friend_search', SearchFriend);//点击搜索按钮搜索好友
    $('body').on('keydown', '#j_friend_keyword', SearchFriendEnter);//回车搜索好友

    $('body').on('click', '#j_clean_friend_condition', CleanFriendCondition);//清除搜索好友时设置的更多条件
    $('body').on('input', '#j_friend_search_country', GetFriendCountry);//搜索好友时获取国家条件
    $('body').on('click', '#j_friend_select_country .j-country-span', SelectFriendCountry);//搜索好友选择国家
    $('body').on('click', '#j_clean_friend_country', CleanSelectFriendCountry);//搜索好友时清除选择的国家条件
    $('body').on('click', '#j_determine_friend_country', DetermineSelectFriendCountry);//搜索好友时确定国家条件

    $('body').on('input', '#j_friend_search_company', GetFriendCompany);//搜索好友时获取目前就职
    $('body').on('click', '#j_friend_select_company .j-company-span', SelectFriendCompany);//搜索好友时选择目前就职
    $('body').on('click', '#j_clean_friend_company', CleanSelectFriendCompany);//搜索好友时清除选择的目前就职
    $('body').on('click', '#j_determine_friend_company', DetermineSelectFriendCompany);//确定选择的目前就职*/

    $('body').on('input', '#j_friend_search_school', GetFriendSchool);//搜索好友时获取就读学校
    $('body').on('click', '#j_friend_select_school .j-school-span', SelectFriendSchool);//搜索好友时选择就读学校
    $('body').on('click', '#j_clean_friend_school', CleanSelectFriendSchool); //搜索好友时清除选择就读学校
    $('body').on('click', '#j_determine_friend_school', DetermineSelectFriendSchool);//搜索人脉时确定选择的学校/

    $('body').on('click', '#j_friend_paging .j-paging', GetFriendSomePage);//获取指定页好友
    $('body').on('click', '#j_friend_paging .j-jump-btn', JumpFriend);//跳到指定好友页
    $('body').on('keydown', '#j_friend_paging .j-jump', JumpFriendEnter);//回车跳到指定好友页

    $('body').on('click', "input[name='selectallfriend']", SelectAllFriend);//全选全不选好友
    $('body').on('click', '#j_friend_tool .j-svg-grouping', Grouping);//分组
    $('body').on('click', '#j_friend_tool .j-svg-prohibit', AddProhibitForFriend);//批量添加到禁发名单
    $('body').on('click', '#j_friend_tool .j-svg-send', StartSendForFriend);//添加到群发队列
    $('body').on('click', '#j_friend_tool .j-svg-dig', StartDigForFriend);//添加到挖掘队列

    
    $('body').on('click', '.j-friend .j-edit', EditRemark);//编辑备注
    $('body').on('click', '.j-friend .j-dig', DigA);//单个挖掘好友资料
    $('body').on('click', '.j-friend .j-prohibit', UpdateProhibit);//更新禁发名单状态
    

    /*----------------------分组页面-----------------------*/
    $('body').on('click', '#j_newgroup', NewGroup);//新增分组
    $('body').on('click', '#j_new_group', SaveNewGroup);//保存新增的分组
    $('body').on('click', '#j_group_search', GetGroup);//搜索分组中的好友
    $('body').on('click','.j-group',ShowGroupFriend); //绑定点击分组显示该组好友事件
    $('body').on('click', '.j-load-friend', LoadMoreGroupFriend);// 加载更多分组中的好友
    
    $('body').on('click', '.j-group-edit .j-edit', EditGroup);//编辑分组
    $('body').on('click', '.j-group-edit .j-delete', DeleteGroup);//删除分组
    $('body').on('click', '.j-group-edit .j-sort', StartSortGroup);//分组排序
    $('body').on('click', '.j-up', SortUp);//分组上移
    $('body').on('click', '.j-down', SortDown);//分组下移

    $('body').on('click', '.j-gall', SelectAllGroupFriend);//全选/全不选相应分组中的好友
    $('body').on('click', '.j-group-tool .j-move', MoveGroup);//移动到其它分组
    $('body').on('click', '.j-group-tool .j-dig', StartDigForGroup);    //批量挖掘分组中的好友资料
    $('body').on('click', '.j-group-tool .j-send', StartSendForGroup);  //批量给分组好友群发消息
    $('body').on('click', '.j-group-tool .j-prohibit', AddProhibitForGroup);//分组中批量添加到禁发名单
    $('body').on('click', '.j-group-tool .j-export', ExportGroupFriend);//导出分组中已挖掘的好友资料

    $('body').on('click', '.j-friend .j-delete', DeleteGroupFriend);//移出分组
    

    /*----------------------群发页面----------------------*/
    $('body').on('click', '#j_send .j-option-nav', ShowSendOption);//显示群发页面子页面

    $('body').on('click', '#j_new_tidings', NewTidings);//新增群发内容 
    $("body").on("click", "#j_send_firstname", InsertSendFirstName);    //群发消息内容插入名字
    $("body").on("click", "#j_send_lastname",InsertSendLastName);  //群发消息内容插入姓氏

    $('body').on('click', "input[name='selectalltidings']", SelectAllTidings);//全选全不选消息
    $('body').on('click', '#j_s_cont .j-delete', DeleteTidings);//删除消息内容
    $('body').on('click', "input[name='tidings']", SelectTidings);//选择消息内容
    $('body').on('dblclick', '.j-tidings-cont', ResetTidings);//修改消息内容

    $('body').on('click', "input[name='selectallprohibit']", SelectAllProhibit);//全选/全不选群发队列中的好友
    $('body').on('click', '#j_prohibit_paging .j-paging', GetProhibitSomePage);//获取群发队列指定页好友
    $('body').on('click', '#j_prohibit_paging .j-jump-btn', JumpProhibit);//跳到指定群发队列页
    $('body').on('click', '#j_prohibit_search', GetProhibit);//刷新
    $('body').on('click', '#j_s_prohibit .j-delete', MoveProhibit);//移出禁发名单
    $('body').on('keydown', '#j_prohibit_paging .j-jump', JumpProhibitEnter);//回车跳到指定群发队列页


    /*---------------------导出页面----------------------*/
    $('body').on('click', '#j_dig_paging .j-paging', GetDigSomePage);//获取已挖掘指定页好友
    $('body').on('click', '#j_dig_paging .j-jump-btn', JumpDig);//跳到指定已挖掘页
    $('body').on('keydown', '#j_dig_paging .j-jump', JumpDigEnter);//回车跳到指定已挖掘页
    $('body').on('click', "input[name='selectalldig']", SelectAllDig);//全选/全不已挖掘
    $('body').on('dblclick', '#j_dig_box .j-profile', ShowFriendProfile);//双击显示详细资料
    $('body').on('click', '#j_dig_box .j-look', ShowFriendProfile);//点击显示详细资料
    $('body').on('click', '#j_export_select', ExportForSelect);//导出选择的
    $('body').on('click', '#j_export_digtime', ExportForDigTime);//按挖掘日期导出

    /*--------------------------窥探页面-----------------------*/
    $('body').on('keydown', '#j_probe_keyword', StartProbeEnter);//关键词输入框回车窥探
    $('body').on('click', '#j_probe_start', StartProbe);//按钮点击窥探

    $('body').on('click', "input[name='selectallprobe']", SelectAllProbe);//全选/全不选窥探的人脉

    $('body').on('keydown', '#j_probe_paging .j-jump', JumpProbeEnter);//回车跳过相应窥探页面
    $('body').on('click', '#j_probe_paging .j-jump-btn', JumpProbe);//点击按钮跳到相应窥探页面
    $('body').on('click', '#j_probe_paging .j-paging', ProbeSomePage);//跳到相应页
    $('body').on('click', '#j_probe .j-export', ExportProbe);//导出窥探到的资料
    $('body').on('dblclick', '#j_probe_box .j-profile', ShowFriendProfile);//双击显示详细资料

    /*---------------------设置页面----------------------*/
    $('body').on('click', '.j-fold-head', ShowSetDetail);   //点击显示参数详情
    $('body').on('click', '#j_restore', RestoreSet);      //恢复默认设置

    $('body').on("change", "#s_min_speed", SetSendMinSpeed);    //绑定设置群发最小时间事件
    $('body').on("change", "#s_max_speed", SetSendMaxSpeed);    //绑定设置群发最大时间事件
    $('body').on("change", "#s_limit", SetSendLimit);       //绑定每日群发限额事件
    $('body').on("click", "#s_skip", SetSendSkip);          //绑定跳过按钮事件
    $('body').on("change", "#s_skip_time", SetSendSkipTime);    //绑定跳过发送时间事件

    $('body').on("change", "#a_min_speed", SetAddMinSpeed); //绑定设置加好友最小时间事件
    $('body').on("change", "#a_max_speed", SetAddMaxSpeed); //绑定设置加好友最大时间事件
    $('body').on("change", "#a_limit", SetAddLimit);            //绑定每日最多加好友限额事件

    $('body').on("change", "#d_min_speed", SetDigMinSpeed); //绑定设置挖掘最小时间事件
    $('body').on("change", "#d_max_speed", SetDigMaxSpeed); //绑定设置挖掘最大时间事件
    $('body').on("change", "#d_limit", SetDigLimit);            //绑定每日最多挖掘限额事件

    $('body').on("change", "#t_min_speed", SetThumbsMinSpeed);  //绑定设置挖掘最小时间事件
    $('body').on("change", "#t_max_speed", SetThumbsMaxSpeed);  //绑定设置挖掘最大时间事件
    $('body').on("change", "#t_limit", SetThumbsLimit);         //绑定每日最多挖掘限额事件

    $('body').on('click', '#j_risk', SetRisk);//设置风控参数


    /*--------------------其它-------------------------*/
    $('body').on('click', '#j_bind', ChangeLinkedin);   //换绑领英账号
    $('body').on('mousedown', '.j-detail-bg', RemoveDialog);    //关闭好友详细资料弹窗
    $('body').on('click', '#j_stop_action', StopAction);    //停止操作
    $('body').on('click', '#j_log', GetLog);    //显示操作日志
    $("body").on("click", "#j_logout", LogOut); //安全退出
    $('body').on('click', '#j_start_thumbs', StartThumbs);//开始批量点赞
    
    $('body').on('click', '#j_opinion', ShowPropose);//显示建议窗口

    $('body').on('click', '.j-upgrade', Upgrade);//跳到升级页面
    $('body').on('click', '#j_level', GetLevel);//获取会员信息

}

//监听消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){   
    sendResponse({result: true});
    switch(request.action){
        //显示/隐藏窗口
        case "showWindow":
            ShowOrHideWindow();
            break;

        //登录结果
        case 'login':
            LoginResult(request.result, request.data);
            break;

        //绑定账号结果
        /*case 'bindLinkedin':
            BindLinkedinResult(request.result, request.data);
            break;*/

        /*----------------------------加人页面----------------------*/
            //保存个性化邀请消息
        case 'saveMes':
            SaveMesResult(request.result, request.data);
            break;

        //获取个性邀请消息结果
        case 'getMes':
            GetMesResult(request.result, request.data);
            break;

        //全选/全不选个性化邀请消息结果
        case 'selectAllMes':
            SelectAllMesResult(request.result, request.data);
            break;

        //单个选择个性化邀请消息
        case 'selectMes':
            SelectMesResult(request.result, request.data);
            break;
        
        //删除个性化邀请消息
        case 'deleteMes':
            DeleteMesResult(request.result, request.data);
            break;


        //开始批量加好友，获取个性邀请消息
        case 'startAddFriend':
            StartAddFriendResult(request.result, request.data);
            break;

        //循环添加领英精灵搜索到的好友
        case 'addFriendForLyjl':
            AddFriendForLyjl();
            break;

         //批量加好友时获取个性邀请消息
        case 'getMesForAddFriend':
            GetMesForAddFriendResult(request.result, request.data);
            break;

        //批量加系统推荐的人
        case 'addFriendForRecom':
            AddFriendForRecom();
            break;

        //批量加领英页面人脉
        case 'addFriendForLinkedin':
            AddFriendForLinkedin();
            break;

        //保存添加记录结果
        case 'saveAddRecord':
            SaveAddRecordResult(request.result, request.data);
            break;

        //保存批量撤回记录
        case 'saveRecallRecord':
            SaveRecallRecordResult(request.result, request.data);
            break;


        /*-----------------------------好友页面------------------------*/
        //保存好友
        case 'saveFriend':
            SaveFriendResult(request.result, request.data);
            break;

        //分组结果
        case 'grouping':
            GroupingResult(request.result, request.data);
            break;

        //编辑备注
        case 'editRemark':
            EditRemarkResult(request.result, request.data);
            break;

        //禁发状态更新结果
        case 'updateProhibit':
            UpdateProhibitResult(request.result, request.data);
            break;

        //获取群发好友的详细资料和消息内容
        case 'getSendForFriend':
            GetSendForFriendResult(request.result, request.data);
            break;

        //循环批量群发消息
        case 'batchSend':
            BatchSend();
            break;

        //保存发送记录结果
        case 'saveSendRecord':
            SaveSendRecordResult(request.result, request.data);
            break;

        //好友页面批量挖掘获取好友资料
        case 'getDigForFriend':
            GetDigForFriendResult(request.result, request.data);
            break;

        //循环批量挖掘资料
        case 'batchDig':
            BatchDig();
            break;

        //保存挖掘记录结果
        case 'saveDigData':
            saveDigDataResult(request.result, request.data);
            break;





        /*---------------------分组页面-----------------*/
        //获取分组结果
        case 'getGroup':
            GetGroupResult(request.result, request.data);
            break;

        //新增/修改分组结果
        case 'saveGroup':
            SaveGroupResult(request.result, request.data);
            break;

        //获取分组中的好友结果
        case 'getGroupFriend':
            GetGroupFriendResult(request.result, request.data);
            break;
 
        //删除分组
        case 'deleteGroup':
            DeleteGroupResult(request.result, request.data);
            break;

        //分组排序
        case 'sortGroup':
            SortGroupResult(request.result, request.data);
            break;

        //分组页面批量挖掘时获取挖掘好友结果
        case 'getDigForGroup':
            GetDigForGroupResult(request.result, request.data);
            break;

        //分组页面批量群发时获取群发好友结果
        case 'getSendForGroup':
            GetSendForGroupResult(request.result, request.data);
            break;


        

        /*============================导出页面===========================*/
        //获取挖掘过的好友结果
        case 'getDig':
            GetDigResult(request.result, request.data);
            break;

        //获取挖掘过的好友资料
        case 'getFriendProfile':
            GetFriendProfileResult(request.result, request.data);
            break;





        /*=============================群发页面==========================*/
        //保存群发内容
        case 'saveTidings':
            SaveTidingsResult(request.result, request.data);
            break;

        //获取群发内容 
        case 'getTidings':
            GetTidingsResult(request.result, request.data);
            break;

        //全选/全不选消息内容
        case 'selectAllTidings':
            SelectAllTidingsResult(request.result, request.data);
            break;

        //选择消息内容结果
        case 'selectTidings':
            SelectTidingsResult(request.result, request.data);
            break;

        //删除消息内容结果
        case 'deleteTidings':
            DeleteTidingsResult(request.result, request.data);
            break;   

        
        //获取禁发名单结果
        case 'getProhibit':
            GetProhibitResult(request.result, request.data);
            break;
               

        /*===========================窥探页面====================*/
        //窥探结果
        case 'probe':
            ProbeResult(request.result, request.data);
            break;




        /*==============================其它=====================*/

        //点赞循环
        case 'batchThumbs':
            BatchThumbs();
            break;

        //保存点赞记录
        case 'saveThumbsRecord':
            SaveThumbsRecourdResult(request.result, request.data);
            break;


        //获取操作日志
        case 'getLog':
            GetLogResult(request.result, request.data);
            break;

        //提交建议结果
        case 'propose':
            ProposeResult(request.result, request.data);
            break;

        //获取会员信息结果
        case 'getLevel':
            GetLevelResult(request.result, request.data);
            break;

        default:

            break;
    }
});

//绑定领英账号
/*function BindLinkedin1(show){
    chrome.storage.sync.set({my_urn:'ACoAAB1IosIBQuv7c6shVTIQ6UwmVwvFxhbCFKE'}, function(){

    });
}
*/
//绑定领英账号
function BindLinkedin(show){
    chrome.storage.sync.get({my_urn:'', account:''}, function(items){
        var my_urn = String(items.my_urn);
        var account = String(items.account);
        if(!account){
            if(show){
                PointOut('没有登录领英精灵，请登录领英精灵账号', 1);
                ShowLoginDialog();
            }
            return false;
        }
        var url = window.location.href;
        var patt = new RegExp('linkedin.com/feed', 'i');
        var patt1 = new RegExp("linkedin.com/login","i");
        if(!my_urn || patt.test(url) || show){
            var tok = getCookie('JSESSIONID').replace(/"/g,'');
            if(!tok){
                return false;
            }
            var url = 'https://www.linkedin.com/voyager/api/me';
            $.ajax({
                url: url,
                type: 'get',
                headers: {
                    "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                    'csrf-token':tok,
                    'x-restli-protocol-version': '2.0.0'
                },
                success: function (data) {
                    if(data){
                        var first_name = data['included'][0]['firstName'];
                        var last_name = data['included'][0]['lastName'];
                        var name = GetName(first_name, last_name);
                        var my_urn = data['included'][0]['entityUrn'].split(':')[3];
                        var public_id = data['included'][0]['publicIdentifier'];
                        if(data['included'][0]['picture'] && data['included'][0]['picture']['rootUrl']){
                            var img = data['included'][0]['picture']['rootUrl'] + data['included'][0]['picture']['artifacts'][3]['fileIdentifyingUrlPathSegment'];
                        }else{
                            var img = '';        
                        }
                        if(my_urn){
                            chrome.storage.sync.set({my_urn:[my_urn], name:[name], img:[img], public_id:[public_id]}, function(){
                                if(show){
                                    //显示
                                    PointOut('绑定成功');
                                }
                            });

                            var linkedin = {"my_urn":my_urn, "public_id":public_id, "first_name":first_name, "last_name":last_name, "img":img};
                            linkedin = JSON.stringify(linkedin);
                            JlHttp('bindLinkedin', linkedin, 'bind', show);
                        }else{
                            if(show){
                                PointOut('绑定失败，请尝试刷新页面或重启浏览器');
                            }
                        }
                    }
                },
                error: function(){
                    if(show){
                        PointOut('绑定失败，请确保已登录领英账号');
                    }
                }
            });
        }
        //置空绑定的Linkedin账号
        if(patt1.test(url)){
            chrome.storage.sync.set({my_urn:''}, function(){});
        }
    });
}

//手动换绑领英账号
function ChangeLinkedin(){
    BindLinkedin(true);
}



//显示/隐藏窗口
function ShowOrHideWindow(){
    chrome.storage.sync.get({option:'addfriend'}, function(items){
        if($('#j_lyjl_window').is(':hidden')){
            //隐藏状态，显示
            InitMember();
            ShowOption(String(items.option));
        }
        $('#j_lyjl_window').slideToggle(200);
        $('.j-lyjl-bg').slideToggle(0);
    });
}

//功能选项点击事件
function SelectFunctionPage(){
    if(!$(this).hasClass('j-active')){
        var option = $(this).attr("nav-option");
        ShowOption(option);
    }
}

//显示相应功能页面
function ShowOption(option){
    //根据传入的option显示相应的选项
    $("#lyjl .j-nav-box li button").each(function(){
        if($(this).attr("nav-option") == option){
            $(this).removeClass("j-active-not");
            $(this).addClass("j-active");
        }else{
            $(this).removeClass("j-active");
            $(this).addClass("j-active-not");
        }
    });

    $('#lyjl section').removeClass('j-select');
    $('#lyjl section').addClass('j-select-not');
    $('#j_' + option).removeClass('j-select-not');
    $('#j_' + option).addClass('j-select');

    switch(option){
        case 'addfriend':
            ShowAddFriendPage();
            break;
        case 'group':
            ShowGroupPage();
            break;

        case 'dig':
            ShowDigPage();
            break;

        case 'send':
            ShowSendPage();
            break;

        case 'set':
            ShowSetPage();
            break;

        case 'friend':
            ShowFriendPage();
            break;

        default:
            break;
    }      

    if(option == 'send' || option == 'addfriend'){
        var h = $('#j_lyjl_window').height()-180;
    }else{
        var h = $('#j_lyjl_window').height()-154;
    }
    $('.j-cont-box').css('max-height', h + 'px');
    chrome.storage.sync.set({option:[option]}, function(){});
}

/*--------------------------------领英精灵界面操作--------------------------------*/

//添加领英精灵窗口
function AppendWindow(){
    chrome.runtime.sendMessage({action:'getHtml'}, function(response){
        $('body').append(response.result);
        /*chrome.storage.sync.get({option:'addfriend'}, function(items){
            ShowOption(String(items.option));
        });*/
    });
}

//鼠标移动图标
/*function Move(){
    $('#j_logo').mousemove(function(e){
        var w = $(window).width();
        var x = w - e.pageX - 18;
        var y = e.pageY - 18;
        $('#j_logo').css('right', x);
        $('#j_logo').css('top', y);
    });

    $('#j_logo').mouseup(function(){
        $('#j_logo').off('mousemove');
    })
}*/





/*-------------------------加人页面--------------------------*/
function ShowAddFriendPage(){
    chrome.storage.sync.get({my_urn:'', account:''}, function(items){
        if(!String(items.account)){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }
        if(!String(items.my_urn)){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        if(AddFriendPage){
            ShowMesPage();
            AddFriendPage = false;
        }
    });
}

function ShowAddOption(){
    $('#j_addfriend .j-option-nav').removeClass('j-option-nav-active');
    $(this).addClass('j-option-nav-active');
    var option = $(this).attr('option');
    $('#j_addfriend .j-option').removeClass('j-option-active');
    $('#j_add_' + option).addClass('j-option-active');

    chrome.storage.sync.get({my_urn:'', account:''}, function(items){
        if(!String(items.account)){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }
        if(!String(items.my_urn)){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        switch(option){
            case 'mes':
                ShowMesPage();
                break;

            case "search":

                break;

            case "recall":
                //显示批量撤回页面
                ShowRecallPage();
                break;
            default:
                break;
        }
    });
}


//显示个性化邀请页面
function ShowMesPage(){
    GetMes();
}

//获取个性化邀请消息
function GetMes(){
    JlHttp('getMes', '', 'show', '');
}

//获取个性化邀请消息结果
function GetMesResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                //显示个性人邀请消息
                $('#j_mes_box').empty();
                $("input[name='selectallmes']").prop('checked',false);
                PointOut('获取完成');
                if(data['data'] && data['data'].length>0){
                    for(var i=0; i<data['data'].length; i++){
                        AppendMes(data['data'][i]);
                    }
                }else{
                    var node = '<div class="j-explain-box">' +
                        '<p>个性化邀请消息会在发送邀请时显示给对方。若没设置则只发送邀请，若设置多条，则会从中随机一条发送。<font style="color:#999">(建议多设置几条，会从中随机一条发送)</font><p/>'+
                        '<a href="http://linkedinjl.com/help?o=sendmsg" target="_black">查看详细教程</a>'+
                    '</div>';
                    $('#j_mes_box').append(node);
                    PointOut('没有群发内容');
                }
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //超过试用期
                ShowUpgrade('试用期已过','注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//添加个性邀请消息到列表中
function AppendMes(data){
    var node='<div class="j-nowrap j-w j-mes" mid="'+ data['mess_id'] +'">'+
        '<div class="j-mes-cont" title="双击修改内容">' + data['mess'] + '</div>';
    if(parseInt(data['is_select']) == 1){
        node += '<div class="j-tidings-select"><input type="checkbox" name="mes" checked=true' + '></div>';
    }else{
        node += '<div class="j-tidings-select"><input type="checkbox" name="mes"></div>';
    }
    node += '</div>'+
    $('#j_mes_box').append(node);
}

//全选或全不选消息内容
function SelectAllMes(){
    if($(this).prop('checked')){
        //全选
        var count = $("input[name='mes']").length;
        if(count == 0){
            PointOut('没有可选，请先新增个性邀请消息', 1)
        }else{
            JlHttp('selectAllMes', 1, '', count);
        }
    }else{
        //全不选
        JlHttp('selectAllMes', 0, '', count);
    }
}

//全选全不选消息结果
function SelectAllMesResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                if(data['action'] ==1){
                    $("input[name='mes']").prop('checked',true);
                    PointOut('选择了 ' + data['count'] + ' 条');
                }else{
                    $("input[name='mes']").prop('checked',false);
                    PointOut('个性化邀请消息已全部取消，邀请好友时不会发送消息。');
                }
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;
            case 7:
                //超过试用期
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//单个选择个性化邀请消息
function SelectMes(){
    if($(this).prop('checked')){
        //选择
        var mesId = $.trim($(this).parents('.j-mes').attr('mid'));
        JlHttp('selectMes', mesId, '', 1);
    }else{
        //取消
        var mesId = $.trim($(this).parents('.j-mes').attr('mid'));
        JlHttp('selectMes', mesId, '', 0);
    }
}

//单个选择消息内容结果
function SelectMesResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                
                break;
            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //超过试用期
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//删除个性化邀请消息
function DeleteMes(){
    var count = $("input[name='mes']:checkbox:checked").length;
    if(count <= 0){
        PointOut('请选择要删除的个性化邀请消息');
        return false;
    }else{
        JlConfirm('确定要删除选择的 ' + count + ' 条个性邀请消息吗？', '确定');
        $('#j_ok').on('click', function(){
            JlHttp('deleteMes', '', '', '');
        });
    }
}

//删除个性化邀请消息结果
function DeleteMesResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                PointOut('删除成功');
                GetMes();
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //超过试用期
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//修改个性化邀请消息
function ResetMes(){
    var mes = $.trim($(this).text());
    var mes_id = $.trim($(this).parents('.j-mes').attr('mid'));
    $('.j-dialog').remove();
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>修改个性邀请消息</h3>'+
                '</div>'+
            '</div>'+

            '<div class="j-prompt-cont">'+
                '<div calss="j-w">' +
                    '<div class="j-insertname">'+
                        '<button id="j_mes_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>'+
                        '<button id="j_mes_firstname" class="j-bg-btn j-layout-btn">插入名字</button>'+
                    '</div>'+
                    '<textarea id="j_mes" class="j-msg-cont" maxlength=300 >'+ mes +'</textarea>'+
                '</div>' +
            '</div>' +

            '<div class="j-prompt-ctrl">'+
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">确定修改</button>'+
            '</div>'+
        '</div>'+
    '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);

    //确定新增
    $('#j_ok').on('click', function(){
        var newMes = $.trim($("#j_mes").val());
        if(!newMes){
            PointOut("个性化邀请消息不能为空",2);
            return false;
        }
        if(newMes == mes){
            $('.j-dialog').remove();
            PointOut('更新成功');
            return false;
        }
        JlHttp('saveMes', mes_id, '', newMes);
    });
}

//新增消息内容
function NewMes(){
    $('.j-dialog').remove();
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>新增个性邀请消息</h3>'+
                '</div>'+
            '</div>'+

            '<div class="j-prompt-cont">'+
                '<div calss="j-w">' +
                    '<div class="j-insertname">'+
                        '<button id="j_mes_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>'+
                        '<button id="j_mes_firstname" class="j-bg-btn j-layout-btn">插入名字</button>'+
                    '</div>'+
                    '<textarea id="j_mes" class="j-msg-cont" maxlength=300 placeholder="个性化邀请消息会在给对方发送邀请时显示给对方，越短越好。"></textarea>'+
                '</div>' +
            '</div>' +

            '<div class="j-prompt-ctrl">'+
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">确定新增</button>'+
            '</div>'+
        '</div>'+
    '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    //确定新增
    $('#j_ok').on('click', function(){
        var mes = $.trim($("#j_mes").val());
        if(!mes){
            PointOut("个性邀请消息不能为空",2);
            return false;
        }
        var mes_id = String(new Date().getTime());
        JlHttp('saveMes', mes_id, '', mes);
    });
}

//群发消息内容插入名字
function InsertMesFirstName(){
    var cont = document.getElementById('j_mes');
    InsertAfterText(cont,'[FirstName]');    //插入名字到光标处
}

//群发消息内容插入姓氏
function InsertMesLastName(){
    var cont = document.getElementById('j_mes');
    InsertAfterText(cont,'[LastName]');     //插入姓氏到光标处
}

/* 保存个性邀请消息 */
function SaveMesResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                PointOut('新增成功');
                $('.j-dialog').remove();
                GetMes();
                break;

            case 2:
                PointOut('修改成功');
                $('.j-dialog').remove();
                GetMes();
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //超过试用期
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}



//显示/隐藏更多人脉搜索条件
function ShowMoreConnectCondition(){
    if($('.j-connect-condition-box').is(":hidden")){
        $(this).text('隐藏');
        $(this).attr('title', '隐藏更多过滤条件');
    }else{
        $(this).text('更多');
        $(this).attr('title', '显示过滤条件');
    }
    $('.j-connect-condition-box').slideToggle(100);
}

//搜索人脉
function SearchConnect(){
    chrome.storage.sync.get({my_urn:'', account:''}, function(items){
        if(!String(items.account)){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号'); 
            return false;
        }
        if(!String(items.my_urn)){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }
        GetConnect(1);
    });
}

//回车搜索人脉
function SearchConnectEnter(){
    if(event.keyCode == 13){
        SearchConnect(1);
    }
}

//获取人脉
function GetConnect(page){
    var start = (page-1)*10;
    var keyword = $.trim($('#j_connect_keyword').val());
    if(!keyword){
        PointOut('请输入关键词');
        return false;
    }

    var distance = '';
    if($('input[name="distance_s"]').is(':checked')){
        distance += 'S';
    }
    if($('input[name="distance_o"]').is(':checked')){
        if(distance == "S"){
            distance += "%7CO";
        }else{
            distance += 'O';
        }
    }

    if(!distance){
        PointOut('请选择人脉度数');
        return false;
    }

    var filters = '';
    var country = '';
    $('input[name="connectcountry"]:checkbox:checked').each(function(){
        country += $.trim($(this).val()) + '|';
    });
    if(country){
        country = "geoRegion->" + country.substr(0,country.length-1);
        filters += ',' + encodeURIComponent(country);
    }

    var company = '';
    $('input[name="connectcompany"]:checkbox:checked').each(function(){
        company += $.trim($(this).val()) + '|';
    });
    if(company){
        company = 'currentCompany->' + company.substr(0,company.length-1);
        filters += ',' + encodeURIComponent(company);
    }

    var school = '';
    $('input[name="connectschool"]:checkbox:checked').each(function(){
        school += $.trim($(this).val()) + '|';
    });
    if(school){
        school = 'school->' + school.substr(0,school.length-1);
        filters += ',' + encodeURIComponent(school);
    }

    var tit = $.trim($('#j_connect_title').val());
    if(tit){
        tit = 'title->' + tit;
        filters += ',' + encodeURIComponent(tit);
    }
    console.log(filters);


    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    if(!tok){
        PointOut('人脉搜索失败，请尝试刷新页面');
        return false;
    }

    var url = 'https://www.linkedin.com/voyager/api/search/blended?count=40&filters=List(network-%3E' + distance + ',resultType-%3EPEOPLE';
    url += filters + ')&keywords=' + keyword + "&origin=GLOBAL_SEARCH_HEADER&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue)&start=" + start;

    PointOut('搜索中...');

    $.ajax({
        url: url,
        type: 'get',
        headers: {
            "Accept": "application/vnd.linkedin.normalized+json+2.1",
            "csrf-token":tok,
            'x-restli-protocol-version': '2.0.0',
        },
        success: function (data) {
            PointOut('搜索完成', 1);
            var friend = [];
            var ids = 'List(';
            if(data['data']){
                $('#j_add_connect_box').empty();
                
                if(data['data']['paging']){
                    var total = data['data']['paging']['total'];
                    var count = data['data']['paging']['count'];
                    ShowPaging('j_add_connect_paging', page, total, count);
                }
                var totalResultCount = data['data']['metadata']['totalResultCount'];
                var node = '<div class="j-num">大约 ' + totalResultCount + ' 条结果</div>';
                $('#j_add_connect_box').append(node);

                if(parseInt(total) == 0){
                    //没有搜索结果
                    var node = '<div class="j-explain-box">' +
                       '<p>没有搜索到人脉，请切换关键词或过滤条件。<p/>'+
                       '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>'+
                    '</div>';
                    $('#j_add_connect_box').append(node);
                    return false;
                }

                if(data['included']){
                    var elements = data['data']['elements'];
                    var connect = data['included'];
                    for(var i=0; i<elements.length; i++){
                            for(var j=0; j<elements[i]['elements'].length; j++){
                                if(elements[i]['elements'][j]['type'] == "PROFILE"){
                                    var temp = {};
                                    temp['entityUrn'] = elements[i]['elements'][j]['targetUrn'].split(':')[3];
                                    if(elements[i]['elements'][j]['publicIdentifier']){
                                        temp['publicId'] = elements[i]['elements'][j]['publicIdentifier'];
                                        ids += temp['entityUrn'] + ',';
                                        if(elements[i]['elements'][j]['memberDistance']['value'] == 'DISTANCE_2'){
                                            temp['distance'] = 2;
                                        }else{
                                            temp['distance'] = 3;
                                        }

                                        if(elements[i]['elements'][j]['subline']){
                                            temp['city'] = elements[i]['elements'][j]['subline']['text'].substr(0, 50);
                                        }else{
                                            temp['city'] = '';
                                        }


                                        for(var k=0; k<connect.length; k++){
                                            if(connect[k]['$type'] == "com.linkedin.voyager.identity.shared.MiniProfile" && connect[k]['entityUrn'].split(':')[3] == temp['entityUrn']){
                                                temp['firstName'] = connect[k]['firstName'].substr(0, 50);
                                                temp['lastName'] = connect[k]['lastName'].substr(0, 50);
                                                if(connect[k]['occupation']){
                                                    temp['position'] = connect[k]['occupation'].substr(0, 100);
                                                }else{
                                                    temp['position'] = '';
                                                }
                                                if(connect[k]['picture'] && connect[k]['picture']['rootUrl'] && connect[k]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment']){
                                                    temp['img'] = connect[k]['picture']['rootUrl'] + connect[k]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment'];
                                                }else{
                                                    temp['img'] = '';
                                                }
                                                temp['action'] = '';
                                                friend.push(temp);
                                            }
                                        }
                                    }else{
                                        //高级会员
                                        temp['publicId'] = '';
                                        temp['distance'] = '';
                                        if(elements[i]['elements'][j]['subline']){
                                            temp['city'] = elements[i]['elements'][j]['subline']['text'];
                                        }else{
                                            temp['city'] = '';
                                        }
                                        for(var k=0; k<connect.length; k++){
                                            if(connect[k]['$type'] == "com.linkedin.voyager.identity.shared.MiniProfile" && connect[k]['entityUrn'].split(':')[3] == temp['entityUrn']){
                                                temp['firstName'] = '高级';
                                                temp['lastName'] = '会员';
                                                if(connect[k]['occupation']){
                                                    temp['position'] = connect[k]['occupation'].substr(0, 100);
                                                }else{
                                                    temp['position'] = '';
                                                }
                                                if(connect[k]['picture'] && connect[k]['picture']['rootUrl'] && connect[k]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment']){
                                                    temp['img'] = connect[k]['picture']['rootUrl'] + connect[k]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment'];
                                                }else{
                                                    temp['img'] = '';
                                                }
                                                temp['action'] = '';
                                                friend.push(temp);
                                            }
                                        }
                                    }                                    
                                }
                            }
                    }

                    ids = ids.substring(0, ids.length-1);
                    ids += ')';

                    //保存搜索到的人脉基本资料
                    var profile = JSON.stringify(friend);
                    JlHttp('saveProfile', profile, '', '');
                    console.log(friend);

                    url = 'https://www.linkedin.com/voyager/api/identity/profileActionsV2?ids=' + ids;
                    $.ajax({
                        url: url,
                        type: 'get',
                        headers: {
                            "Accept": "application/vnd.linkedin.normalized+json+2.1",
                            "csrf-token":tok,
                            'x-restli-protocol-version': '2.0.0'

                        },
                        success: function (data) {
                            if(data){

                                var res = data['included'];
                                for(var i=0; i<friend.length; i++){
                                    for(var j=0; j<res.length; j++){
                                        if(friend[i]['entityUrn'] == res[j]['entityUrn'].split(':')[3]){
                                            friend[i]['action'] = res[j]['primaryAction']['action']['$type'].split('.')[6];
                                        }
                                    }
                                }
                                
                                $("input[name='selectallconnect']").prop('checked',false);
                                for(var i=0; i<friend.length; i++){
                                    AppendConnectToTable(friend[i]);
                                }

                                $('#j_show_connect_condition').text('更多');
                                $('#j_show_connect_condition').attr('title', '显示过滤条件');
                                $('.j-connect-condition-box').slideUp();

                            }else{
                                PointOut('人脉搜索失败，请尝试刷新页面');
                            }
                        }
                    });
                }else{
                    var node = '<div class="j-explain-box">' +
                       '<p>没有搜索到人脉，请切换关键词或过滤条件。<p/>'+
                       '<a href="http://linkedinjl.com/help?o=addfriend" target="_black">查看详细教程</a>'+
                    '</div>'+
                    $('#j_add_connect_box').append(node);
                    return false;
                }
                
            }else{
                PointOut('人脉搜索失败，请尝试刷新页面');
                return false;
            }
        }
    });
}

//显示搜索到的人脉
function AppendConnectToTable(data){
    var name = GetName(data.firstName, data.lastName);
    var node = '<div class="j-friend j-nowrap" id="c_' + data['entityUrn'] + '">'+
        '<div class="j-profile-box j-nowrap-left">';
            if(data['publicId']){
                node += '<div><a href="https://www.linkedin.com/in/' + data['publicId'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>';
            }else{
                node += '<div><img src="'+ data['img'] + '"></div>';
            }
            node += '<div class="j-profile">'+
                '<h3 class="j-oneline">' + name + '</h3>'+
                '<p class="j-oneline">' + data['position'] + '</p>'+
                '<span style="font-weight:bold; color:#003300;">' + data['distance'] + '度 . </span><span>' + data['city'] + '</span>'+
            '</div>' +
        '</div>'+
        '<div>';
        switch(data['action']){
            case "Connect":
            case "SendInMail":
            case "Follow":
                node += '<input type="checkbox" name="connect">';
                break;
            case "InvitationPending":
                node += "<p style='padding-top:18px;'>邀请已发送<p>";
                break;

            default:

                break;
        }
        node += '</div>'+
    '</div>';
    $('#j_add_connect_box').append(node);
}

//获取指定页的人脉
function GetAddConnectSomePage(){
    var page = parseInt($(this).text());
    GetConnect(page);
}

//跳到指定页的人脉
function JumpAddConnect(){
    var maxpage = parseInt($('#j_add_connect_paging .j-paging:last').text());
    var page = parseInt($('#j_add_connect_paging .j-jump').val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(page)) { 
    　　PointOut('请输入正确的页数', 3); 
    　　return false;
    }
    var curpage = parseInt($('#j_add_connect_paging .j-curpage').text());
    if(page == curpage){
        PointOut('获取完成');
        return false;
    }
    if(page > maxpage){
        PointOut('请输入正确页数，1-' + maxpage + ' 范围内', 3);
        return false;
    }
    GetConnect(page);
}

//回来跳到指定页的人脉
function JumpAddConnectEnter(){
    if(event.keyCode == 13){
        JumpAddConnect();
    }
}

//全选/全不选人脉
function SelectAllConnect(){
    if($(this).prop('checked')){
        $("input[name='connect']").prop('checked',true);
        var count = $("input[name='connect']:checkbox:checked").length;
        if(count == 0){
            PointOut('没有可选，请先搜索人脉', 1)
        }else{
            PointOut('选择了 ' + count + ' 位人脉', 1);
        }
    }else{
        $("input[name='connect']").prop('checked',false);
    }
}

//搜索人脉时清除设置的更多过滤条件
function CleanConnectCondition(){
    CleanSelectConnectCountry();//清除搜索人脉时选择的所有地区条件
    CleanSelectConnectCompany();//清除搜索人脉时选择的目前就职条件
    CleanSelectConnectSchool();//清除搜索人脉时选择的学校条件
    PointOut('清除完成', 1);
}

//获取搜索条件的国家
function GetConnectCountry(){
    var key = $.trim($(this).val());
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    $('#j_connect_select_country').empty();
    var instance = 'urn:li:page:d_flagship3_search_srp_people;' + randomString(22) + '==';
    if(key && tok){
        if(isChinese(key)){
            var lang = 'zh_CN';
        }else{
            var lang = 'en_US';
        }

        var url = "https://www.linkedin.com/voyager/api/typeahead/hitsV2";
        var para = {"keywords":key, "origin":"OTHER", "q":"type", "type":"REGION"};
        $.ajax({
            url: url,
            data:para,
            type: 'get',
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'x-li-lang': lang,
                'x-restli-protocol-version': '2.0.0',
                'x-li-page-instance': instance
            },
            success: function (data) {
                if(data){
                    var elements = data['data']['elements'];
                    var len = elements.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            var targetUrn = elements[i]['targetUrn'].slice(18).replace(')','').replace(',',':');
                            var countryName = elements[i]['text']['text'];
                            var node = '<div>'+
                                    '<span class="j-country-span" urn="'+ targetUrn +'">' + countryName + '</span>'+
                                '</div>';
                            $('#j_connect_select_country').append(node);
                        }
                    }
                }
            },
            error:function(){
                PointOut('获取国家错误');
            }
        });
    }
}

//选择国家和地区
function SelectConnectCountry(){
    var targetUrn = $.trim($(this).attr('urn'));
   //console.log(targetUrn);
    var countryName = $(this).text();
    $(this).parent('div').remove();
    $('input[name="connectcountry"]').each(function(){
       //console.log($.trim($(this).val()));
        if($.trim($(this).val()) == targetUrn){
            $(this).parent('li').remove();
            return true;
        }
    });

    var node = '<li>'+
        '<input type="checkbox" name="connectcountry" checked="checked" value="' + targetUrn + '">'+
        '<span>' + countryName + '</span>'+
    '</li>'
    $('#j_connect_country').append(node);
}

function CleanSelectConnectCountry(){
     $('#j_connect_country').empty();
     var node = '<li>'+
        '<input type="checkbox" name="connectcountry" value="cn:0">'+
        '<span> 中国</span>'+
    '</li>'+
    '<li>'+
        '<input type="checkbox" name="connectcountry" value="cn:8910">'+
        '<span> 中国 广东 深圳</span>'+
    '</li>';
    $('#j_connect_country').append(node);
    $('#j_connect_country_btn span').text('所在地区');
    PointOut('清除完成',1);
}

//确定选择的国家和地区
function DetermineSelectConnectCountry(){
    var len = $('input[name="connectcountry"]:checkbox:checked').length;
    if(len > 0){
        $('input[name="connectcountry"]').each(function(){
            if(!$(this).prop('checked')){
                $(this).parent('li').remove();
            }
        });
        $('#j_connect_country_btn span').text('所在地区(' + len + ')');
    }else{
        $('#j_connect_country_btn span').text('所在地区');
    }
    $('.j-condition').slideUp(200);
    $('#j_connect_search_country').val('');
    $('#j_connect_select_country').empty();
}

//获取相应搜索条件公司
function GetConnectCompany(){
    var key = $.trim($(this).val());
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    $('#j_connect_select_company').empty();
    var instance = 'urn:li:page:d_flagship3_search_srp_people;' + randomString(22) + '==';

    if(key && tok){
        if(isChinese(key)){
            var lang = 'zh_CN';
        }else{
            var lang = 'en_US';
        }
        var url = "https://www.linkedin.com/voyager/api/typeahead/hitsV2";
        var para = {"keywords":key, "origin":"OTHER", "q":"type", "type":"COMPANY"};
        $.ajax({
            url: url,
            data:para,
            type: 'get',
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'x-restli-protocol-version': '2.0.0',
                'x-li-page-instance': instance,
                'x-li-lang': lang
            },
            success: function (data) {
                if(data){
                    var elements = data['data']['elements'];
                    var len = elements.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            var targetUrn = elements[i]['targetUrn'].slice(18);
                            var companyName = elements[i]['text']['text'];
                            var node = '<div>'+
                                    '<span class="j-company-span" urn="'+ targetUrn +'">' + companyName + '</span>'+
                                '</div>';
                            $('#j_connect_select_company').append(node);
                        }
                    }
                }
            },
            error:function(){
                PointOut('获取公司信息出错');
            }
        });
    }
}

//选择目前就职公司
function SelectConnectCompany(){
    var targetUrn = $.trim($(this).attr('urn'));
    var companyName = $(this).text();
    $(this).parent('div').remove();
    $('input[name="connectcompany"]').each(function(){
        if($.trim($(this).val()) == targetUrn){
            $(this).parent('li').remove();
            return true;
        }
    });

    var node = '<li>'+
        '<input type="checkbox" name="connectcompany" checked="checked" value="' + targetUrn + '">'+
        '<span> ' + companyName + '</span>'+
    '</li>'
    $('#j_connect_company').append(node);
}

//清除目前就职条件
function CleanSelectConnectCompany(){
     $('#j_connect_company').empty();
     var node = '<li>'+
            '<input type="checkbox" name="connectcompany" value="14160">'+
            '<span> 阿里巴巴</span>'+
        '</li>'+
        '<li>'+
            '<input type="checkbox" name="connectcompany" value="3014">'+
            '<span> 华为</span>'+
        '</li>';
    $('#j_connect_company').append(node);
    $('#j_connect_company_btn span').text('目前就职');
    PointOut('清除完成',1);
}

//搜索人脉时确定目前就业过滤条件
function DetermineSelectConnectCompany(){
    var len = $('input[name="connectcompany"]:checkbox:checked').length;
    if(len > 0){
        $('input[name="connectcompany"]').each(function(){
            if(!$(this).prop('checked')){
                $(this).parent('li').remove();
            }
        });
        $('#j_connect_company_btn span').text('目前就职(' + len + ')');
    }else{
        $('#j_connect_company_btn span').text('目前就职');
    }
    $('.j-condition').slideUp(200);
    $('#j_connect_search_company').val('');
    $('#j_connect_select_company').empty();
}

//获取相应搜索就读公司
function GetConnectSchool(){
    var key = $.trim($(this).val());
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    $('#j_connect_select_school').empty();
    var instance = 'urn:li:page:d_flagship3_search_srp_people;' + randomString(22) + '==';

    if(key && tok){
        if(isChinese(key)){
            var lang = 'zh_CN';
        }else{
            var lang = 'en_US';
        }

        var url = "https://www.linkedin.com/voyager/api/typeahead/hitsV2";
        var para = {"keywords":key, "origin":"OTHER", "q":"type", "type":"SCHOOL"};
        $.ajax({
            url: url,
            data:para,
            type: 'get',
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'x-restli-protocol-version': '2.0.0',
                'x-li-page-instance': instance,
                'x-li-lang': lang
            },
            success: function (data) {
                if(data){
                    var elements = data['data']['elements'];
                    var len = elements.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            var targetUrn = elements[i]['targetUrn'].slice(21);
                            var schoolName = elements[i]['text']['text'];
                            var node = '<div>'+
                                    '<span class="j-school-span" urn="'+ targetUrn +'">' + schoolName + '</span>'+
                                '</div>';
                            $('#j_connect_select_school').append(node);
                        }
                    }
                }
            },
            error:function(){
                PointOut('获取就读学校错误');
            }
        });
    }
}

//选择就读学校
function SelectConnectSchool(){
    var targetUrn = $.trim($(this).attr('urn'));
    var schoolName = $(this).text();
    $(this).parent('div').remove();
    $('input[name="connectschool"]').each(function(){
        if($.trim($(this).val()) == targetUrn){
            $(this).parent('li').remove();
            return true;
        }
    });

    var node = '<li>'+
        '<input type="checkbox" name="connectschool" checked="checked" value="' + targetUrn + '">'+
        '<span> ' + schoolName + '</span>'+
    '</li>'
    $('#j_connect_school').append(node);
}

//搜索人脉时清除选择的就读学校过滤条件
function CleanSelectConnectSchool(){
     $('#j_connect_school').empty();
     var node = '<li>'+
            '<input type="checkbox" name="connectschool" value="11287">'+
            '<span> 北京大学</span>'+
        '</li>'+
        '<li>'+
            '<input type="checkbox" name="connectschool" value="11398">'+
            '<span> 清华大学</span>'+
        '</li>';
    $('#j_connect_school').append(node);
    $('#j_connect_school_btn span').text('就读学校');
    PointOut('清除完成',1);
}

//搜索人脉时确定就读学校过滤条件
function DetermineSelectConnectSchool(){
    var len = $('input[name="connectschool"]:checkbox:checked').length;
    if(len > 0){
        $('input[name="connectschool"]').each(function(){
            if(!$(this).prop('checked')){
                $(this).parent('li').remove();
            }
        });
        $('#j_connect_school_btn span').text('就读学校(' + len + ')');
    }else{
        $('#j_connect_school_btn span').text('就读学校');
    }
    $('.j-condition').slideUp(200);
    $('#j_connect_search_school').val('');
    $('#j_connect_select_school').empty();
}


//开始批量加领英精灵搜索到的好友
function StartAddFriend(){
    chrome.storage.sync.get({level:0, regTime:1, run:false}, function(items){
        if(items.run){
            PointOut("当前正在批量操作中，请先停止其它操作，再批量群发消息");
            return false;
        }

        var regTime = parseInt(items.regTime) + 7*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<1 && curTime > regTime){
            ShowUpgrade('试用期已过', '试用会员可试用7天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }

        var connect = [];
        if($("input[name='connect']:checkbox:checked").length <= 0){
            PointOut('请选择要添加的人脉');
            return false;
        }else{
            JlConfirm('确定要添加选择的人脉为好友吗？');
            $('#j_ok').click(function(){
                $("input[name='connect']:checkbox:checked").each(function(){
                    connect.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
                });
                connect = JSON.stringify(connect);
                JlHttp('startAddFriend', connect, '', '');
            });
        }
    });
}

//开始加好友结果
function StartAddFriendResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                //批量加领英精灵界面搜索的好友
                chrome.storage.sync.set({run:true}, function(){});
                Friend = data['data'];
                Pos = Friend.length;
                Tidings = data['mess'];
                ActionCount = 0;
                ShowStatu('正在批量加好友中...');
                ShowOrHideWindow();
                AddFriendForLyjl();
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //超过试用期
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//批量加领英精灵搜索到的人脉
function AddFriendForLyjl(){
    Pos--;
    //没有了可以加的人
    if(Pos < 0){
        StopAction();
        setTimeout(function(){
            alert('本次已发送 ' + ActionCount +' 条邀请');
        }, 50);
        return false;
    }

    chrome.storage.sync.get({account:'', a_today_num:0, a_limit:100, a_min_speed:30, a_max_speed:60, risk:true, level:0}, function(items){
        //试用会员，并且超过试用名额
        if(parseInt(items.level)<1 && parseInt(items.a_today_num) >= TestCount){
            StopAction();
            setTimeout(function(){
                if(confirm('今日试用名额已用完。您是试用会员，试用会员每天有' + TestCount + '个试用名额，升级会员不受此限制，确定要升级吗？')){
                    Upgrade();
                }
            }, 50);
            return false;
        }

        //超过今日设置的限额
        if(parseInt(items.a_today_num) >= parseInt(items.a_limit)){
            StopAction();
            setTimeout(function(){
                alert('今日累计发送 ' + items.a_today_num +' 条邀请，已超设置的每日最多邀请量，请明天再来邀请或将每日邀请量设置大些！');
            }, 50);
            return false;
        }

        $('#j_head_img').attr('src', Friend[Pos]['img']);

        var tok = getCookie('JSESSIONID').replace(/"/g,'');
        var tid = randomString(22) + '==';
        var msg = RandomTidings(Friend[Pos]['first_name'], Friend[Pos]['last_name']);
        if(msg){
            var para = {
                "emberEntityName" : "growth/invitation/norm-invitation",
                "invitee" : {
                    "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                        "profileId": Friend[Pos]['public_id']
                    }
                },
                "message" : msg,
                "trackingId" : tid
            };
        }else{
            var para = {
                "emberEntityName" : "growth/invitation/norm-invitation",
                "invitee" : {
                    "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                        "profileId": Friend[Pos]['public_id']
                    }
                },
                "trackingId" : tid
            };
        }

        var url = "https://www.linkedin.com/voyager/api/growth/normInvitations";
        $.ajax({
            url: url,
            type: 'post',
            data:JSON.stringify(para),
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'content-type': 'application/json; charset=UTF-8',
                'x-restli-protocol-version': '2.0.0'
            },
            success: function (data) {
                ActionCount++;
                var today_num = parseInt(items.a_today_num) + 1;
                $('#j_action_count').text('本次已加：' + ActionCount + "人");
                if(today_num > 100){
                    $('#j_today_count').html('<font style="color:#f00;">今日已加：' + today_num + "人</font>");
                }else{
                    $('#j_today_count').text('今日已加：' + today_num + "人");
                }
                chrome.storage.sync.set({a_today_num:[today_num]}, function(){});
                JlHttp('saveAddRecord', '', '', '');
                $('#c_' + Friend[Pos]['urn']).remove();
            },
            error: function(jqXHR, textStatus, errorThrown){
                StopAction()
                setTimeout(function(){
                    alert('已达邀请上限，请撤回一些未通过的邀请或过一段时间再来添加');
                },50);
                return false;
            }
        });
        
        //循环
        var time = GetTime(parseInt(items.a_today_num), parseInt(items.a_min_speed), parseInt(items.a_max_speed), items.risk);
        Delayed_time = time;
        DelayedTime();
        Timeout = setTimeout(function(){
            chrome.runtime.sendMessage({action:'loop', result:'addFriendForLyjl', other:''}, function(response){});
        }, time*1000);
    });
}


//开始批量加领英页面的好友
function StartBatchAddFriend(){
    chrome.storage.sync.get({run:false, account:'', my_urn:'', level:1, regTime:1},function(items){
        if(items.run){
            //有在操作
            PointOut('正在批量操作中，请先停止操作，再进行批量加好友！',3);
            return false;
        }

        if(!String(items.account)){
            PointOut('没有登录领英精灵，请登录领英精灵账号', 1);
            ShowLoginDialog();
            return false;
        }

        if(!String(items.my_urn)){
            JlConfirm('没有绑定Linkedin账号,请先绑定Linkeidn账号，确定要绑定吗！');
            $("#j_ok").on("click",function(){
                BindLinkedin();
            });
            return false;
        }

        //判断是否是会员
        var regTime = parseInt(items.regTime) + 7*24*60*60*1000;
        var curDate = new Date().getTime();
        if(parseInt(items.level)<1 && curDate > regTime){
            ShowUpgrade('试用期已过', '试用会员可试用7天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }


        var url = window.location.href;
        var patt = new RegExp('search/results/people', 'i'); //添加搜索结果人脉

        //添加搜索结果人脉
        if(patt.test(url)){
            //获取个性邀请消息
            JlHttp('getMesForAddFriend', '', '', '');
            return true;
        }
        
        //添加系统推荐人脉
        if(url == 'https://www.linkedin.com/mynetwork/'){
            //添加系统推荐的人脉
            ActionCount = 0;
            ShowOrHideWindow();
            ShowStatu('批量加系统推荐人脉中...');
            AddFriendForRecom();
            chrome.storage.sync.set({run:true}, function(){})
            return true;
        }

        var node = '<div class="j-dialog j-div-center j-close-dialog">'+
                '<div class="j-prompt-box j-div-center j-bg-w j-box-sha" style="width:260px; text-align:center;">'+
                    '<div style="margin:36px auto;">'+
                        '<p>加好友前，请选择要添加的人脉</p>'+
                        '<div style="margin:12px;"><a href="https://www.linkedin.com/mynetwork/">添加系统推荐人脉</a></div>'+
                        '<div style="margin:12px;">' + "<a href='https://www.linkedin.com/search/results/people/?facetNetwork=%5B\"S\"%5D'>添加领英页面人脉</a></div>"+
                '</div>'+
            '</div>'+
        '</div>';
        $("#j_lyjl_window").append(node);
        $(".j-dialog").fadeIn(200);
    });
}

//添加系统推荐的人脉
function AddFriendForRecom(){
    chrome.storage.sync.get({account:'', a_min_speed:30, a_max_speed:60, a_today_num:0, a_limit:100, risk:true, level:0}, function(items){
        //判断是否是试用会员和超过每日添加上限
        if(parseInt(items.level)<1 && parseInt(items.a_today_num)>= TestCount){
            StopAction();
            setTimeout(function(){
                if(confirm("试用名额已用完，试用会员每天有" + TestCount + "个试用名额，若要添加更多，请升级会员使用")){
                    Upgrade();
                }
            },50);
            return false;
        }

        //检测是否超过今日上限
        if(parseInt(items.a_today_num) >= parseInt(items.a_limit)){
            StopAction();
            setTimeout(function(){
                alert('今日累计发送 ' + parseInt(items.a_today_num) + ' 条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！');
            }, 50);
            return false;
        }

        //检测是否还有可加好友
        var li = $('ul.discover-entity-list li.discover-entity-card:first');
        if(li.length < 1){
            StopAction();
            setTimeout(function(){
                alert('成功发送 ' + ActionCount + ' 条邀请。');
            }, 50);
            return false;
        }

        //加载更多
        if($('ul.discover-entity-list li.discover-entity-card').length < 20){
            $('html, body').animate({scrollTop: $(document).height()},500);
        }else{
            $('html, body').animate({scrollTop: $(document).height()},0);
        }
        var img = li.find('img.discover-entity-type-card__image-circle').attr('src');

        var btn = li.find('footer button');
        if(btn.find('svg').length > 0){
            //待处理状态，跳过
            li.remove();
            chrome.runtime.sendMessage({action:'loop', result:'addFriendForRecom', other:''}, function(response){});
            return false;
        }
        btn.click();
        //删除
        setTimeout(function(){
            li.remove();
        }, 1000);
        ActionCount++;
        var today_num = parseInt(items.a_today_num) + 1;

        $('#j_head_img').attr('src', img);
        $('#j_action_count').text('本次已加：' + ActionCount + "人");
        if(today_num > 100){
            $('#j_today_count').html('<font style="color:#f00;">今日已加：' + today_num + "人</font>");
        }else{
            $('#j_today_count').text('今日已加：' + today_num + "人");
        }
        chrome.storage.sync.set({a_today_num:[today_num]}, function(){});
        JlHttp('saveAddRecord', '', '', '');

        //延时循环
        var time = GetTime(parseInt(items.a_today_num), parseInt(items.a_min_speed), parseInt(items.a_max_speed), items.risk);
        Delayed_time = time;
        DelayedTime();
        Timeout = setTimeout(function(){
            chrome.runtime.sendMessage({action:'loop', result:'addFriendForRecom', other:''}, function(response){});
        }, time*1000);
    });
}

//获取加好友的个性化邀请消息的结果
function GetMesForAddFriendResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                //失败
                PointOut('失败，请检查尝试刷新页面或重启浏览器！');
                break;

            case 1:
                Tidings = data['data'];
                ActionCount = 0;
                ShowOrHideWindow();
                ShowStatu('批量加领英人脉中...');
                AddFriendForLinkedin();
                chrome.storage.sync.set({run:true}, function(){});
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //超过试用期
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！')
    }
}


//批量加领英页面好友
function AddFriendForLinkedin(){
    chrome.storage.sync.get({a_min_speed:30, a_max_speed:60, a_limit:100, a_today_num:0, invite_msg:'', risk:true, level:0}, function(items){
        //判断是否是试用会员和超过每日添加上限
        if(parseInt(items.level)<1 && parseInt(items.a_today_num)>= TestCount){
            StopAction();
            setTimeout(function(){
                if(confirm("试用名额已用完，试用会员每天有" + TestCount + "个试用名额，若要添加更多，请升级会员使用")){
                    Upgrade();
                }
            },50);
            return false;
        }

        //检查是否达到今天的最大上限
        if(parseInt(items.a_today_num) >= parseInt(items.a_limit)){
            StopAction();
            setTimeout(function(){
                alert('今日累计发送 ' + parseInt(items.a_today_num) + ' 条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！');
            }, 50);
            return false;
        }


        if($('ul.search-results__list').length > 0){
            //新版本
            var li = $('ul.search-results__list li.search-result__occluded-item:first');
            if(li.length < 1){
                //没有好友，自动翻到下一页
                if($('.artdeco-pagination__button--next').length>0 && !$('.artdeco-pagination__button--next').prop("disabled")){
                    //有分页,并且有下一页
                    $('.artdeco-pagination__button--next').click();
                    Timeout = setTimeout(function(){
                        chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
                    }, 10000);
                }else{
                    //没有分组或没有下一页
                    StopAction();
                    setTimeout(function(){
                        alert('本次成功发送 ' + ActionCount + ' 条邀请');
                    },50);
                }
                return false;
            }
            
            //显示底部
            if($('ul.search-results__list li.search-result__occluded-item').length % 4){
                $('html, body').animate({scrollTop: '1000px'},1000);
            }else{
                $('html, body').animate({scrollTop: '0px'},1000);
            }

            var btn = li.find('button.search-result__actions--primary');
            if(btn.length>0 && btn.attr('data-control-name')=='srp_profile_actions' && !btn.prop("disabled")){
                //可加的人脉
                console.log($.trim(li.find('div.search-result__info a.search-result__result-link').attr('href')));
                var fid = ArrangeFid(decodeURIComponent($.trim(li.find('div.search-result__info a.search-result__result-link').attr('href'))));
                var img = $.trim(li.find('img:first').attr('src'));
                var name = $.trim(li.find('.name.actor-name').text());
                var firstName = GetFirstName(name);
                var lastName = GetLastName(name);

                $('#j_head_img').attr('src', img);

                var tok = getCookie('JSESSIONID').replace(/"/g,'');
                var tid = randomString(22) + '==';
                var msg = RandomTidings(firstName, lastName);
                if(msg){
                    var para = {
                        "emberEntityName" : "growth/invitation/norm-invitation",
                        "invitee" : {
                            "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                                "profileId": fid
                            }
                        },
                        "message" : msg,
                        "trackingId" : tid
                    };
                }else{
                    var para = {
                        "emberEntityName" : "growth/invitation/norm-invitation",
                        "invitee" : {
                            "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                                "profileId": fid
                            }
                        },
                        "trackingId" : tid
                    };
                }

                var url = "https://www.linkedin.com/voyager/api/growth/normInvitations";
                $.ajax({
                    url: url,
                    type: 'post',
                    data:JSON.stringify(para),
                    headers: {
                        "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                        'csrf-token':tok,
                        'content-type': 'application/json; charset=UTF-8',
                        'x-restli-protocol-version': '2.0.0'
                    },
                    success: function (data) {
                        ActionCount++;
                        var today_num = parseInt(items.a_today_num) + 1;
                        $('#j_action_count').text('本次已加：' + ActionCount + "人");
                        if(today_num > 100){
                            $('#j_today_count').html('<font style="color:#f00;">今日已加：' + today_num + "人</font>");
                        }else{
                            $('#j_today_count').text('今日已加：' + today_num + "人");
                        }
                        chrome.storage.sync.set({a_today_num:[today_num]}, function(){});
                        JlHttp('saveAddRecord', '', '', '');
                        return true;
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        StopAction()
                        setTimeout(function(){
                            alert('已达邀请上限，请撤回一些未通过的邀请或过一段时间再来添加');
                        },50);
                        return false;
                    }
                });

                //循环
                var time = GetTime(parseInt(items.a_today_num) ,parseInt(items.a_min_speed), parseInt(items.a_max_speed), items.risk);
                Delayed_time = time;
                DelayedTime();      //显示延时
                Timeout = setTimeout(function(){
                    li.remove();
                    chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
                }, time*1000);
                
            }else{
                //不可加的人脉
                li.remove();
                chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
            }
        }else{
            //旧版本
            var li = $('ul.reusable-search__entity-results-list li.reusable-search__result-container:first');
            if(li.length < 1){
                //没有好友，自动翻到下一页
                if($('.artdeco-pagination__button--next').length>0 && !$('.artdeco-pagination__button--next').prop("disabled")){
                    //有分页,并且有下一页
                    $('.artdeco-pagination__button--next').click();
                    Timeout = setTimeout(function(){
                        chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
                    }, 10000);
                }else{
                    //没有分组或没有下一页
                    StopAction();
                    setTimeout(function(){
                        alert('本次成功发送 ' + ActionCount + ' 条邀请');
                    },50);
                }
                return false;
            }

            //显示底部
            if($('ul.reusable-search__entity-results-list li.reusable-search__result-container').length % 4){
                $('html, body').animate({scrollTop: '1000px'},1000);
            }else{
                $('html, body').animate({scrollTop: '0px'},1000);
            }

            var btn = li.find('button.artdeco-button--secondary');
            if(btn.length>0 && btn.attr('data-control-name')=='srp_profile_actions' && !btn.prop("disabled")){
                //可加的人脉
                var fid = $.trim(ArrangeFid(decodeURIComponent(li.find('span.entity-result__title-text.t-16 a').attr('href'))));
                var img = $.trim(li.find('img:first').attr('src'));
                var name = $.trim(li.find('span.entity-result__title-text.t-16 span span:first').text());

                var firstName = GetFirstName(name);
                var lastName = GetLastName(name);

                $('#j_head_img').attr('src', img);

                var tok = getCookie('JSESSIONID').replace(/"/g,'');
                var tid = randomString(22) + '==';
                var msg = RandomTidings(firstName, lastName);
                if(msg){
                    var para = {
                        "emberEntityName" : "growth/invitation/norm-invitation",
                        "invitee" : {
                            "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                                "profileId": fid
                            }
                        },
                        "message" : msg,
                        "trackingId" : tid
                    };
                }else{
                    var para = {
                        "emberEntityName" : "growth/invitation/norm-invitation",
                        "invitee" : {
                            "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                                "profileId": fid
                            }
                        },
                        "trackingId" : tid
                    };
                }

                var url = "https://www.linkedin.com/voyager/api/growth/normInvitations";
                $.ajax({
                    url: url,
                    type: 'post',
                    data:JSON.stringify(para),
                    headers: {
                        "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                        'csrf-token':tok,
                        'content-type': 'application/json; charset=UTF-8',
                        'x-restli-protocol-version': '2.0.0'
                    },
                    success: function (data) {
                        ActionCount++;
                        var today_num = parseInt(items.a_today_num) + 1;
                        $('#j_action_count').text('本次已加：' + ActionCount + "人");
                        if(today_num > 100){
                            $('#j_today_count').html('<font style="color:#f00;">今日已加：' + today_num + "人</font>");
                        }else{
                            $('#j_today_count').text('今日已加：' + today_num + "人");
                        }
                        chrome.storage.sync.set({a_today_num:[today_num]}, function(){});
                        JlHttp('saveAddRecord', '', '', '');
                        return true;
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        StopAction()
                        setTimeout(function(){
                            alert('已达邀请上限，请撤回一些未通过的邀请或过一段时间再来添加');
                        },50);
                        return false;
                    }
                });

                //循环
                var time = GetTime(parseInt(items.a_today_num) ,parseInt(items.a_min_speed), parseInt(items.a_max_speed), items.risk);
                Delayed_time = time;
                DelayedTime();      //显示延时
                Timeout = setTimeout(function(){
                    li.remove();
                    chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
                }, time*1000);
                
            }else{
                //不可加的人脉
                li.remove();
                chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
            }
        }
    });
}


/*
function AddFriendForLinkedin(){
    chrome.storage.sync.get({a_min_speed:30, a_max_speed:60, a_limit:100, a_today_num:0, invite_msg:'', risk:true, level:0}, function(items){
        //判断是否是试用会员和超过每日添加上限
        if(parseInt(items.level)<1 && parseInt(items.a_today_num)>= TestCount){
            StopAction();
            setTimeout(function(){
                if(confirm("试用名额已用完，试用会员每天有" + TestCount + "个试用名额，若要添加更多，请升级会员使用")){
                    Upgrade();
                }
            },50);
            return false;
        }

        //检查是否达到今天的最大上限
        if(parseInt(items.a_today_num) >= parseInt(items.a_limit)){
            StopAction();
            setTimeout(function(){
                alert('今日累计发送 ' + parseInt(items.a_today_num) + ' 条邀请，已超设置的每日最多邀请量，请明天再来邀请或在领英精灵界面将每日邀请量设置大些！');
            }, 50);
            return false;
        }



        //新版本
        var li = $('ul.search-results__list li.search-result__occluded-item:first');
        if(li.length < 1){
            //没有好友，自动翻到下一页
            if($('.artdeco-pagination__button--next').length>0 && !$('.artdeco-pagination__button--next').prop("disabled")){
                //有分页,并且有下一页
                $('.artdeco-pagination__button--next').click();
                Timeout = setTimeout(function(){
                    chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
                }, 10000);
            }else{
                //没有分组或没有下一页
                StopAction();
                setTimeout(function(){
                    alert('本次成功发送 ' + ActionCount + ' 条邀请');
                },50);
            }
            return false;
        }
            
        //显示底部
        if($('ul.search-results__list li.search-result__occluded-item').length % 4){
            $('html, body').animate({scrollTop: '1000px'},1000);
        }else{
            $('html, body').animate({scrollTop: '0px'},1000);
        }

        var btn = li.find('button.search-result__actions--primary');
        if(btn.length>0 && btn.attr('data-control-name')=='srp_profile_actions' && !btn.prop("disabled")){
            //可加的人脉
            var fid = $.trim(ArrangeFid(decodeURIComponent(li.find('div.search-result__info a.search-result__result-link').attr('href'))));
            var img = $.trim(li.find('img:first').attr('src'));
            var name = $.trim(li.find('.name.actor-name').text());
            var firstName = GetFirstName(name);
            var lastName = GetLastName(name);

            $('#j_head_img').attr('src', img);

            var tok = getCookie('JSESSIONID').replace(/"/g,'');
            var tid = randomString(22) + '==';
            var msg = RandomTidings(firstName, lastName);
            if(msg){
                var para = {
                    "emberEntityName" : "growth/invitation/norm-invitation",
                    "invitee" : {
                        "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                            "profileId": fid
                        }
                    },
                    "message" : msg,
                    "trackingId" : tid
                };
            }else{
                var para = {
                    "emberEntityName" : "growth/invitation/norm-invitation",
                     "invitee" : {
                        "com.linkedin.voyager.growth.invitation.InviteeProfile" : {
                            "profileId": fid
                        }
                    },
                    "trackingId" : tid
                };
            }

            var url = "https://www.linkedin.com/voyager/api/growth/normInvitations";
            $.ajax({
                url: url,
                type: 'post',
                data:JSON.stringify(para),
                headers: {
                    "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                    'csrf-token':tok,
                    'content-type': 'application/json; charset=UTF-8',
                    'x-restli-protocol-version': '2.0.0'
                },
                success: function (data) {
                    ActionCount++;
                    var today_num = parseInt(items.a_today_num) + 1;
                    $('#j_action_count').text('本次已加：' + ActionCount + "人");
                    if(today_num > 100){
                        $('#j_today_count').html('<font style="color:#f00;">今日已加：' + today_num + "人</font>");
                    }else{
                        $('#j_today_count').text('今日已加：' + today_num + "人");
                    }
                    chrome.storage.sync.set({a_today_num:[today_num]}, function(){});
                    JlHttp('saveAddRecord', '', '', '');
                    return true;
                },
                error: function(jqXHR, textStatus, errorThrown){
                    StopAction()
                    setTimeout(function(){
                        alert('已达邀请上限，请撤回一些未通过的邀请或过一段时间再来添加');
                    },50);
                    return false;
                }
            });

            //循环
            var time = GetTime(parseInt(items.a_today_num) ,parseInt(items.a_min_speed), parseInt(items.a_max_speed), items.risk);
            Delayed_time = time;
            DelayedTime();      //显示延时
            Timeout = setTimeout(function(){
                li.remove();
                chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
            }, time*1000);
                
        }else{
            //不可加的人脉
            li.remove();
            chrome.runtime.sendMessage({action:'loop', result:'addFriendForLinkedin'}, function(response){});
        }
    });
}
*/

//保存添加好友记录结果
function SaveAddRecordResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                break;

            case 1:
                                
                break;

            case 3:
                //没有登录领英精灵账号
                StopAction();
                setTimeout(function(){
                    alert('没有登录领英精灵，请登录领英精灵账号');
                }, 50);
                break;

            case 4:
                //没有绑定领英账号
                StopAction();
                setTimeout(function(){
                    if(confirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？")){
                        BindLinkedin(false);
                     }
                }, 50);
                break;

            case 5:
                //登录超过
                StopAction();
                setTimeout(function(){
                    alert('没有登录领英精灵，请登录领英精灵账号');
                }, 50);
                break;

            case 6:
                //异地登录中
                StopAction();
                setTimeout(function(){
                    alert('其它设备有登录此领英精灵账号，请不要在其它设备登录');
                }, 50);
                break;

            case 7:
                //超过试用期
                StopAction();
                setTimeout(function(){
                    if(confirm('注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持')){
                        Upgrade();
                     }
                }, 50);
                break;

            default:
                break;
        }
    }
}



//显示批量撤回页面
function ShowRecallPage(){
    $('#j_recall_box').empty();
    var node = '<div class="j-explain-box">' +
        '<p>2020年后，领英取消了批量撤回功能，只能一个一个撤回。领英精灵的批量撤回功能则可以实现批量撤回。</p>'+
        '<p style="color:#999;">点击“显示未通过邀请”显示未通过的邀请，选择要撤回的邀请，最后点击“批量撤回”按钮。</p>'+
        '<a href="http://linkedinjl.com/help?o=recall" target="_black">查看详细教程</a>'+
    '</div>';
    $('#j_recall_box').append(node);
    ShowPaging('j_recall_paging', 1, 0, 100);
}

function GetHasRecall(){
    GetRecall(1);
}

//获取已发送的邀请
function GetRecall(page){
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    if(!tok){
        PointOut('获取失败');
        return false;
    }
    PointOut('正在获取中...', 3);
    var url = 'https://www.linkedin.com/voyager/api/relationships/genericInvitationFacets?q=sent';
    $.ajax({
        url: url,
        type: 'get',
        headers: {
            "Accept": 'application/vnd.linkedin.normalized+json+2.1',
            'csrf-token':tok,
            'x-restli-protocol-version': '2.0.0'
        },
        success: function (data) {
            if(data && data['data'] && data['data']['elements']){
                var elements = data['data']['elements'];
                for(var i=0; i<elements.length; i++){
                    if(elements[i]['invitationType'] == 'CONNECTION'){
                        var total = parseInt(elements[i]['count']);
                        if(total > 0){
                            //获取已发送的邀请
                            var start = (page-1)*100;
                            var url = 'https://www.linkedin.com/voyager/api/relationships/sentInvitationViewsV2';
                            var para = {"count":100, "invitationType":"CONNECTION", "q":"invitationType", "start":start};
                            $.ajax({
                                url: url,
                                type: 'get',
                                data:para,
                                headers: {
                                    "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                                    'csrf-token':tok,
                                    'x-restli-protocol-version': '2.0.0'
                                },
                                success:function(data){
                                    PointOut('获取完成', 1);
                                    $("input[name='selectallrecall']").prop('checked', false);
                                    if(data && data['data'] && data['data']['*elements'] && data['included']){
                                        $('#j_recall_box').empty();
                                        var elements = data['data']['*elements'];
                                        if(elements.length > 0){
                                            var friend = data['included'];
                                            var node = '<div class="j-num">未通过邀请：' + total + '人</div>';
                                            $('#j_recall_box').append(node);
                                            for(var i=0; i<elements.length; i++){
                                                var temp = {};
                                                temp['invite_urn'] = elements[i].split(':')[6];
                                                for(var j=0; j<friend.length; j++){
                                                    if(friend[j]['$type'] == 'com.linkedin.voyager.relationships.invitation.Invitation' && friend[j]['entityUrn'].split(':')[3] == temp['invite_urn']){
                                                        temp['urn'] = friend[j]['toMemberId'];
                                                        temp['sentTime'] = friend[j]['sentTime'];

                                                        for(var k=0; k<friend.length; k++){
                                                            if(friend[k]['$type'] == "com.linkedin.voyager.identity.shared.MiniProfile" && friend[k]['entityUrn'].split(':')[3] == temp['urn']){
                                                                temp['firstName'] = friend[k]['firstName'];
                                                                temp['lastName'] = friend[k]['lastName'];
                                                                temp['position'] = friend[k]['occupation'];
                                                                temp['publicId'] = friend[k]['publicIdentifier'];
                                                                if(friend[k]['picture'] && friend[k]['picture']['rootUrl'] && friend[k]['picture']['artifacts'] && friend[k]['picture']['artifacts'][0]){
                                                                    temp['img'] = friend[k]['picture']['rootUrl'] + friend[k]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment'];
                                                                }else{
                                                                    temp['img'] = 'http://linkedinjl.com/expand/version1/img/me.png';
                                                                }
                                                                break;
                                                            }
                                                        }
                                                        break;
                                                    }
                                                }
                                                AppendRecallToTable(temp);
                                            }
                                            
                                            ShowPaging('j_recall_paging', page, total, 100);
                                            
                                        }
                                    }else{
                                        //没有邀请了
                                        $('#j_recall_box').empty();
                                        var node = '<div class="j-explain-box j-w">' +
                                            '<p>您没有未通过的邀请。</p>'+
                                            '<a href="http://linkedinjl.com/help?o=recall" target="_black">查看详细教程</a>'+
                                        '</div>';
                                        $('#j_recall_box').append(node);
                                        PointOut('您没有未通过的邀请');
                                        ShowPaging('j_recall_paging', 1, 0, 100);
                                    }
                                }
                            });                          
                        }
                            break;
                    }
                }
            }else{
                PointOut('获取失败');
            }
        }
    });
}

//显示获取到的未通过邀请
function AppendRecallToTable(data){
    var name = GetName(data.firstName, data.lastName);
    data['sentTime'] = new Date(data['sentTime']).Format("yyyy-MM-dd HH:mm");
    data['sentTime'] = '邀请日期：' + data['sentTime'];

    var node = '<div class="j-friend j-nowrap" id="r_' + data['invite_urn'] + '">'+
        '<div class="j-profile-box j-nowrap-left">'+
            '<div><a href="https://www.linkedin.com/in/' + data['publicId'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>'+
            '<div class="j-profile">'+
                '<h3 class="j-oneline">' + name + '</h3>'+
                '<p class="j-oneline">' + data['position'] + '</p>'+
                '<p class="j-oneline j-remark">' + data['sentTime'] + '</p>'+
            '</div>' +
        '</div>'+
        '<div>'+
            '<input type="checkbox" name="recall">';
        '</div>'+
    '</div>';
    $('#j_recall_box').append(node);
}

//全选/全不先邀请
function SelectAllRecall(){
    if($(this).prop('checked')){
        //全选
        $("input[name='recall']").prop('checked', true);
        var count = $("input[name='recall']:checkbox:checked").length;
        if(count == 0){
            PointOut('没有可选，请点击“显示未通过邀请”显示', 3);
        }else{
            PointOut('选择了 ' + count + ' 位', 1);
        }
    }else{
        //全不选
        $("input[name='recall']").prop('checked', false);
    }
}

//回车跳到相应撤回页面
function JumpRecallEnter(event){
    if(event.keyCode == 13){
        JumpRecall();
    }
}

//跳到相应撤回页面
function JumpRecall(){
    var page = parseInt($('#j_recall_paging .j-jump').val());
    var maxpage = parseInt($('#j_recall_paging .j-paging:last').text());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(page)) { 
    　　PointOut('请输入正确的页数', 3); 
    　　return false;
    }
    var curpage = parseInt($('#j_recall_paging .j-curpage').text());
    if(page == curpage){
        PointOut('获取完成');
        return false;
    }

    if(page > maxpage){
        PointOut('请输入有效页数: 1 - ' + maxpage + ' 范围内', 3);
        return false;
    }
    GetRecall(page);
    return true;
}

//跳过指定页的邀请
function GetRecallSomePage() {
    var page = parseInt($(this).text());
    GetRecall(page);
}

//批量撤回
function RecallBatch(){
    chrome.storage.sync.get({level:0, regTime:1, r_today_num:0}, function(items){
        var count = $("input[name='recall']:checkbox:checked").length;
        if(count <= 0){
            PointOut('请选择要撤回的邀请');
            return false;
        }

        //判断是否是会员
        var regTime = parseInt(items.regTime) + 3*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<1 && curTime>regTime){
            ShowUpgrade('试用期已过', '试用会员可试用3天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }

        //试用会员每天最多可撤回100条
        var recall_num = parseInt(items.r_today_num) + count;
        if(parseInt(items.level)==0 && recall_num>100){
            ShowUpgrade('试用名额用完','您是试用会员，每天有100个批量撤回名额，你的名额已用完，升级会员可无限撤回。');
            return false;
        }

        JlConfirm('确定要撤回选择的 ' + count + ' 个邀请吗？', '确定');
        $('#j_ok').on('click',function(){
            var invite = [];
            $("input[name='recall']:checkbox:checked").each(function(){
                var temp = {};
                temp['entityUrn'] = 'urn:li:fs_relInvitation:' + $.trim($(this).parents('div.j-friend').attr('id')).slice(2,41);
                temp['genericInvitation'] = false;
                temp['genericInvitationType'] = "CONNECTION";
                invite.push(temp);
            });

            var tok = getCookie('JSESSIONID').replace(/"/g,'');
            if(!tok){
                PointOut('撤回失败');
                return false;
            }
            var para = {"inviteActionType":"ACTOR_WITHDRAW",
                "inviteActionData": invite
            };

            var url = "https://www.linkedin.com/voyager/api/relationships/invitations?action=closeInvitations";
            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(para),
                headers: {
                    "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                    'csrf-token':tok,
                    'content-type': 'application/json; charset=UTF-8',
                    'x-restli-protocol-version': '2.0.0'
                },
                success: function (data) {
                    if(data){
                        PointOut('成功撤回');
                        recall_num += count;
                        chrome.storage.sync.set({r_today_num:[recall_num]}, function(){});
                        for(var i=0; i<invite.length; i++){
                            $('#r_' + invite[i]['entityUrn'].split(':')[3]).remove();
                        }
                        JlHttp('saveRecallRecord', count, '', '');
                    }else{
                        PointOut('撤回失败，请尝试刷新页面或重启浏览器');
                    }
                }
            });   
        });
    });
}

//保存批量撤回记录
function SaveRecallRecordResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                break;

            case 1:
                                
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                break;

        }
    }
}






/*--------------------------好友页面-----------------------*/
//显示好友页面
function ShowFriendPage(){
    if(FriendPage){
        chrome.storage.sync.get({account:'', my_urn:''}, function(items){
            if(!String(items.account)){
                ShowLoginDialog();
                return false;
            }
            if(!String(items.my_urn)){
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });

                return false;
            }

            GetFriendData(1);
            FriendPage = false;
        });
    }
}

//显示/隐藏更多搜索条件
function ShowMoreCondition(){
    if($('.j-more-condition-box').is(":hidden")){
        $(this).text('隐藏');
        $(this).attr('title', '隐藏更多过滤条件');
    }else{
        $(this).text('更多');
        $(this).attr('title', '显示更多过滤条件');
    }
    $('.j-more-condition-box').slideToggle();
}

//显示/隐藏搜索条件输入框
function ShowOrHideSearch(){
    if($(this).next().is(":visible")){
        $(this).next().slideUp(200);
    }else{
        $('.j-condition').slideUp(0);
        $(this).next().slideDown(200);
    }
}

//搜索好友时清除设置的更多过滤条件
function CleanFriendCondition(){
    CleanSelectFriendCountry();//清除搜索好友时选择的所有地区条件
    CleanSelectFriendCompany();//清除搜索好友时选择的目前就职条件
    CleanSelectFriendSchool();//清除搜索好友时选择的学校条件
    PointOut('清除完成', 1);
}

//搜索好友时获取国家条件
function GetFriendCountry(){
    var key = $.trim($(this).val());
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    $('#j_friend_select_country').empty();
    var instance = 'urn:li:page:d_flagship3_search_srp_people;' + randomString(22) + '==';
    if(key && tok){
        if(isChinese(key)){
            var lang = 'zh_CN';
        }else{
            var lang = 'en_US';
        }

        var url = "https://www.linkedin.com/voyager/api/typeahead/hitsV2";
        var para = {"keywords":key, "origin":"OTHER", "q":"type", "type":"REGION"};
        $.ajax({
            url: url,
            data:para,
            type: 'get',
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'x-li-lang': lang,
                'x-restli-protocol-version': '2.0.0',
                'x-li-page-instance': instance
            },
            success: function (data) {
                if(data){
                    var elements = data['data']['elements'];
                    var len = elements.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            var targetUrn = elements[i]['targetUrn'].slice(18).replace(')','').replace(',',':');
                            var countryName = elements[i]['text']['text'];
                            var node = '<div>'+
                                    '<span class="j-country-span" urn="'+ targetUrn +'">' + countryName + '</span>'+
                                '</div>';
                            $('#j_friend_select_country').append(node);
                        }
                    }
                }
            },
            error:function(){
                PointOut('获取国家错误');
            }
        });
    }
}

//选择国家和地区
function SelectFriendCountry(){
    var targetUrn = $.trim($(this).attr('urn'));
   //console.log(targetUrn);
    var countryName = $(this).text();
    $(this).parent('div').remove();
    $('input[name="friendcountry"]').each(function(){
       //console.log($.trim($(this).val()));
        if($.trim($(this).val()) == targetUrn){
            $(this).parent('li').remove();
            return true;
        }
    });

    var node = '<li>'+
        '<input type="checkbox" name="friendcountry" checked="checked" value="' + targetUrn + '">'+
        '<span>' + countryName + '</span>'+
    '</li>'
    $('#j_friend_country').append(node);
}

function CleanSelectFriendCountry(){
     $('#j_friend_country').empty();
     var node = '<li>'+
        '<input type="checkbox" name="friendcountry" value="cn:0">'+
            '<span> 中国</span>'+
    '</li>'+
    '<li>'+
        '<input type="checkbox" name="friendcountry" value="cn:8910">'+
        '<span> 中国 广东 深圳</span>'+
    '</li>';
    $('#j_friend_country').append(node);
    $('#j_friend_country_btn span').text('所在地区');
    PointOut('清除完成',1);
}

//确定选择的国家和地区
function DetermineSelectFriendCountry(){
    var len = $('input[name="friendcountry"]:checkbox:checked').length;
    if(len > 0){
        $('input[name="friendcountry"]').each(function(){
            if(!$(this).prop('checked')){
                $(this).parent('li').remove();
            }
        });
        $('#j_friend_country_btn span').text('所在地区(' + len + ')');
    }else{
        $('#j_friend_country_btn span').text('所在地区');
    }
    $('.j-condition').slideUp(200);
    $('#j_friend_search_country').val('');
    $('#j_friend_select_country').empty();
}

//搜索好友时获取公司条件
function GetFriendCompany(){
    var key = $.trim($(this).val());
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    $('#j_friend_select_company').empty();
    var instance = 'urn:li:page:d_flagship3_search_srp_people;' + randomString(22) + '==';

    if(key && tok){
        if(isChinese(key)){
            var lang = 'zh_CN';
        }else{
            var lang = 'en_US';
        }
        var url = "https://www.linkedin.com/voyager/api/typeahead/hitsV2";
        var para = {"keywords":key, "origin":"OTHER", "q":"type", "type":"COMPANY"};
        $.ajax({
            url: url,
            data:para,
            type: 'get',
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'x-restli-protocol-version': '2.0.0',
                'x-li-page-instance': instance,
                'x-li-lang': lang
            },
            success: function (data) {
                if(data){
                    var elements = data['data']['elements'];
                    var len = elements.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            var targetUrn = elements[i]['targetUrn'].slice(18);
                            var companyName = elements[i]['text']['text'];
                            var node = '<div>'+
                                    '<span class="j-company-span" urn="'+ targetUrn +'">' + companyName + '</span>'+
                                '</div>';
                            $('#j_friend_select_company').append(node);
                        }
                    }
                }
            },
            error:function(){
                PointOut('获取公司信息出错');
            }
        });
    }
}

//选择目前就职公司
function SelectFriendCompany(){
    var targetUrn = $.trim($(this).attr('urn'));
    var companyName = $(this).text();
    $(this).parent('div').remove();
    $('input[name="friendcompany"]').each(function(){
        if($.trim($(this).val()) == targetUrn){
            $(this).parent('li').remove();
            return true;
        }
    });

    var node = '<li>'+
        '<input type="checkbox" name="friendcompany" checked="checked" value="' + targetUrn + '">'+
        '<span> ' + companyName + '</span>'+
    '</li>'
    $('#j_friend_company').append(node);
}

//清除目前就职条件
function CleanSelectFriendCompany(){
     $('#j_friend_company').empty();
     var node = '<li>'+
            '<input type="checkbox" name="friendcompany" value="14160">'+
            '<span> 阿里巴巴</span>'+
        '</li>'+
        '<li>'+
            '<input type="checkbox" name="friendcompany" value="3014">'+
            '<span> 华为</span>'+
        '</li>';
    $('#j_friend_company').append(node);
    $('#j_friend_company_btn span').text('目前就职');
    PointOut('清除完成',1);
}

//搜索人脉时确定目前就业过滤条件
function DetermineSelectFriendCompany(){
    var len = $('input[name="friendcompany"]:checkbox:checked').length;
    if(len > 0){
        $('input[name="friendcompany"]').each(function(){
            if(!$(this).prop('checked')){
                $(this).parent('li').remove();
            }
        });
        $('#j_friend_company_btn span').text('目前就职(' + len + ')');
    }else{
        $('#j_friend_company_btn span').text('目前就职');
    }
    $('.j-condition').slideUp(200);
    $('#j_friend_search_company').val('');
    $('#j_friend_select_company').empty();
}

//搜索好友时获取就读学校
function GetFriendSchool(){
    var key = $.trim($(this).val());
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    $('#j_friend_select_school').empty();
    var instance = 'urn:li:page:d_flagship3_search_srp_people;' + randomString(22) + '==';

    if(key && tok){
        if(isChinese(key)){
            var lang = 'zh_CN';
        }else{
            var lang = 'en_US';
        }

        var url = "https://www.linkedin.com/voyager/api/typeahead/hitsV2";
        var para = {"keywords":key, "origin":"OTHER", "q":"type", "type":"SCHOOL"};
        $.ajax({
            url: url,
            data:para,
            type: 'get',
            headers: {
                "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                'csrf-token':tok,
                'x-restli-protocol-version': '2.0.0',
                'x-li-page-instance': instance,
                'x-li-lang': lang
            },
            success: function (data) {
                if(data){
                    var elements = data['data']['elements'];
                    var len = elements.length;
                    if(len > 0){
                        for(var i=0; i<len; i++){
                            var targetUrn = elements[i]['targetUrn'].slice(21);
                            var schoolName = elements[i]['text']['text'];
                            var node = '<div>'+
                                    '<span class="j-school-span" urn="'+ targetUrn +'">' + schoolName + '</span>'+
                                '</div>';
                            $('#j_friend_select_school').append(node);
                        }
                    }
                }
            },
            error:function(){
                PointOut('获取就读学校错误');
            }
        });
    }
}

//搜索好友时获取就读学校
function SelectFriendSchool(){
    var targetUrn = $.trim($(this).attr('urn'));
    var schoolName = $(this).text();
    $(this).parent('div').remove();
    $('input[name="friendschool"]').each(function(){
        if($.trim($(this).val()) == targetUrn){
            $(this).parent('li').remove();
            return true;
        }
    });

    var node = '<li>'+
        '<input type="checkbox" name="friendschool" checked="checked" value="' + targetUrn + '">'+
        '<span> ' + schoolName + '</span>'+
    '</li>'
    $('#j_friend_school').append(node);
}

//搜索好友时清除选择的就读学校过滤条件
function CleanSelectFriendSchool(){
     $('#j_friend_school').empty();
     var node = '<li>'+
            '<input type="checkbox" name="friendschool" value="11287">'+
            '<span> 北京大学</span>'+
        '</li>'+
        '<li>'+
            '<input type="checkbox" name="friendschool" value="11398">'+
            '<span> 清华大学</span>'+
        '</li>';
    $('#j_friend_school').append(node);
    $('#j_friend_school_btn span').text('就读学校');
    PointOut('清除完成',1);
}

//搜索好友时确定就读学校过滤条件
function DetermineSelectFriendSchool(){
    var len = $('input[name="friendschool"]:checkbox:checked').length;
    if(len > 0){
        $('input[name="friendschool"]').each(function(){
            if(!$(this).prop('checked')){
                $(this).parent('li').remove();
            }
        });
        $('#j_friend_school_btn span').text('就读学校(' + len + ')');
    }else{
        $('#j_friend_school_btn span').text('就读学校');
    }
    $('.j-condition').slideUp(200);
    $('#j_friend_search_school').val('');
    $('#j_friend_select_school').empty();
}

//点击搜索按钮搜索好友
function SearchFriend(){
    GetFriendData(1);
}

//回车搜索好友
function SearchFriendEnter(){
    if(event.keyCode == 13){
        SearchFriend();
    }
}

//获取好友
function GetFriendData(page){
    chrome.storage.sync.get({my_urn:'', account:''}, function(items){
        if(!String(items.account)){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号'); 
            return false;
        }
        if(!String(items.my_urn)){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        $('.j-more-condition-box').slideUp();
        $('#j_more_condition').attr('title', '显示更多过滤条件');
        $('#j_more_condition').text('更多');

        var keyword = $.trim($.trim($('#j_friend_keyword').val()));
        var countryLen = $('input[name="friendcountry"]:checkbox:checked').length;
        var companyLen = $('input[name="friendcompany"]:checkbox:checked').length;
        var schoolLen = $('input[name="friendschool"]:checkbox:checked').length;

        if(keyword || countryLen || companyLen || schoolLen){
            //有设置条件，根据关键词条件获取好友
            GetFriendForSearch(page);
        }else{
            GetFriendForAll(page);
        }
    });
}

//没有设置关键词，获取全部好友
function GetFriendForAll(page){
    var start = (page-1) * 40;
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    if(!tok){
        return false;
    }
    //var url = 'https://www.linkedin.com/voyager/api/relationships/connections';
    var url = "https://www.linkedin.com/voyager/api/relationships/dash/connections?count=40&decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-5&q=search&sortType=RECENTLY_ADDED&start=" + start;
    //var data = {"count":40,"sortType": "RECENTLY_ADDED","start": start};
    $.ajax({
        url: url,
        type: 'get',
        headers: {
            "Accept": 'application/vnd.linkedin.normalized+json+2.1',
            'csrf-token':tok,
            'x-restli-protocol-version': '2.0.0'
        },
        success: function (data) {
            if(data && data['data']['elements'] && data['included']){
                PointOut('获取完成', 1);
                $('#j_friend_box').empty();
                $("input[name='selectallfriend']").prop('checked',false);

                Friend = [];
                var elements = data['data']['elements'];
                var total = data['data']['paging']['total'];
                ShowPaging('j_friend_paging', page, total, 40);
                if(total == 0){
                    //没有好友
                    var node = '<div class="j-explain-box">' +
                       '<p>没有搜索到人脉，请切换关键词或过滤条件。<p/>'+
                       '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                    '</div>';
                    $('#j_friend_box').append(node);
                    return false;
                }

                var included = data['included'];
                for(var i=0; i<elements.length; i++){
                    var temp = {};
                    temp['entityUrn'] = elements[i]['connectedMember'].split(':')[3];
                    for(var j=0; j<included.length; j++){
                        if(included[j]['$type'] == 'com.linkedin.voyager.dash.identity.profile.Profile' && included[j]['entityUrn'].split(':')[3] == elements[i]['connectedMember'].split(':')[3]){
                            temp['firstName'] = included[j]['firstName'];
                            temp['lastName'] = included[j]['lastName'];
                            temp['position'] = included[j]['headline'].substr(0, 140);

                            if(included[j]['profilePicture'] && included[j]['profilePicture']['displayImageReference']['vectorImage']['rootUrl']){
                                temp['img'] = included[j]['profilePicture']['displayImageReference']['vectorImage']['rootUrl'] + included[j]['profilePicture']['displayImageReference']['vectorImage']['artifacts'][0]['fileIdentifyingUrlPathSegment'];
                            }else{
                                temp['img'] = '';
                            }
                            temp['publicId'] = included[j]['publicIdentifier'];

                            AppendFriendToTable(temp);
                            Friend.push(temp);
                        }
                    }
                }

                //保存获取到的好友资料
                if(Friend){
                    var f = JSON.stringify(Friend);
                    JlHttp('saveFriend', f, '', '');
                }
            }else{
                PointOut('好友获取失败，请尝试刷新页面', 3);
            }
        },
        error: function(){
            PointOut('好友获取失败，请尝试刷新页面', 3);
        }
    });
}


//有设置关键词获取好友
function GetFriendForSearch(page){
    var start = (page-1) * 10;
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    if(!tok){
        PointOut('好友获取失败，请尝试刷新页面', 1);
        return false;
    }

    var keyword = $.trim($.trim($('#j_friend_keyword').val()));

    var filters = '';
    var country = '';
    $('input[name="friendcountry"]:checkbox:checked').each(function(){
        country += $.trim($(this).val()) + '|';
    });
    if(country){
        country = "geoRegion->" + country.substr(0,country.length-1);
        filters += ',' + encodeURIComponent(country);
    }

    var company = '';
    $('input[name="friendcompany"]:checkbox:checked').each(function(){
        company += $.trim($(this).val()) + '|';
    });
    if(company){
        company = 'currentCompany->' + company.substr(0,company.length-1);
        filters += ',' + encodeURIComponent(company);
    }

    var school = '';
    $('input[name="friendschool"]:checkbox:checked').each(function(){
        school += $.trim($(this).val()) + '|';
    });
    if(school){
        school = 'school->' + school.substr(0,school.length-1);
        filters += ',' + encodeURIComponent(school);
    }

    var url = "https://www.linkedin.com/voyager/api/search/blended?count=50&filters=List(network-%3EF,resultType-%3EPEOPLE";
    url += filters + ")&origin=FACETED_SEARCH&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue)&start=" + start;
    if(keyword){
        url += "&keywords=" + keyword;
    }
   //console.log(url);
    chrome.storage.sync.get({my_urn:''},function(items){
        var my_urn = String(items.my_urn);
        PointOut('获取好友中...', 10);
        $.ajax({
            url: url,
            type: 'get',
            headers: {
                "Accept": "application/vnd.linkedin.normalized+json+2.1",
                "csrf-token":tok,
                'x-restli-protocol-version': '2.0.0',
            },
            success: function (data) {
                //搜索按钮恢复事件
                if(data){
                    PointOut('获取成功', 1);
                    $('#j_friend_box').empty();
                    $("input[name='selectallfriend']").prop('checked',false);
                    //$('#j_friend_tool').css('visibility', 'hidden');

                    var total = data['data']['paging']['total'];
                    if(total == 0){
                        //没有好友
                        var node = '<div class="j-explain-box j-w">' +
                                '<p style="text-align:center">没有匹配的好友,请切换搜索条件</p>'+
                                '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                            '</div>';
                        $('#j_friend_box').append(node);
                        ShowPaging('j_friend_paging', page, 0, 40);
                        return false;
                    }

                    var friend = data['included'];
                    Friend = [];
                    for(var i=0; i<friend.length; i++){
                        if(friend[i]['$type'] == 'com.linkedin.voyager.identity.profile.MemberBadges'){
                            for(var j=0; j<friend.length; j++){
                                if(friend[j]['$type'] == "com.linkedin.voyager.identity.shared.MiniProfile" && friend[i]['entityUrn'].split(':')[3] == friend[j]['entityUrn'].split(':')[3]){
                                    var temp = {};
                                    temp['entityUrn'] = friend[j]['entityUrn'].split(':')[3];
                                    temp['publicId'] = friend[j]['publicIdentifier'];
                                    temp['firstName'] = friend[j]['firstName'];
                                    temp['lastName'] = friend[j]['lastName'];
                                    if(friend[j]['occupation']){
                                        temp['position'] = friend[j]['occupation'].substr(0, 140).replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
                                    }else{
                                        temp['position'] = '';
                                    }
                                    if(friend[j]['picture'] && friend[j]['picture']['rootUrl'] && friend[j]['picture']['artifacts'] && friend[j]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment']){
                                        temp['img'] = friend[j]['picture']['rootUrl'] + friend[j]['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment'];
                                    }else{
                                        temp['img'] = '';
                                    }
                                    temp['connected'] = '';
                                    if(temp['entityUrn'] != my_urn){
                                        AppendFriendToTable(temp);
                                        Friend.push(temp);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    //显示分页
                    ShowPaging('j_friend_paging', page, total, 40);

                    //保存获取到的好友资料
                    var f = JSON.stringify(Friend);
                    if(Friend){
                        JlHttp('saveFriend', f, '', '');
                    }
                                 
                }else{
                    PointOut('好友获取失败，请尝试刷新页面', 3);
                }
            },
            error: function(){
                PointOut('好友获取失败，请尝试刷新页面', 3);
            }
        });
    });
}

//将好友添加到列表
function AppendFriendToTable(data){
    var name = GetName(data.firstName, data.lastName);
    var node = '<div class="j-friend j-nowrap" id="f_' + data['entityUrn'] + '">'+
        '<div class="j-profile-box j-nowrap-left">'+
            '<div><a href="https://www.linkedin.com/in/' + data['publicId'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>'+
            '<div class="j-profile">'+
                '<h3 class="j-oneline">' + name + '</h3>' +
                '<p class="j-oneline">' + data['position'] + '</p>'+
                '<p class="j-oneline"></p>'+
                '<div class="j-nowrap-left">'+
                    '<div class="j-edit j-svg-ico18" title="修改备注">'+
                        '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M3 15 l12 0" class="j-svg"/>'+
                            '<path d="M3 14 l2 -4 l5 -5 l2 2 l-5 5 z" class="j-svg-bg" />'+
                            '<path d="M12 4 l1 -1 l1 1 l-1 1 z" class="j-svg" />'+
                        '</svg>'+
                    '</div>'+
                    '<div><p class="j-oneline j-remark"></p></div>'+
                '</div>'+
            '</div>' +
        '</div>'+

        '<div class="j-tool-box">'+
            '<p class="j-grouping j-oneline" title="分组">未分组</p>'+
            '<p class="j-sendtime j-oneline" title="通过领英精灵最后一次群发日期">群发：未群发过</p>'+
            '<div class="j-nowrap-left">'+
                '<div class="j-dig j-svg-ico18" state=0 title="未挖掘，点击挖掘">'+
                    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1">'+
                        '<circle cx="9" cy="9" r="3" class="j-svg-0" />'+
                        '<path d="M2 9 Q9 2 16 9" class="j-svg-0" />'+
                        '<path d="M2 9 Q9 16 16 9" class="j-svg-0" />'+
                    '</svg>'+
                '</div>'+

                '<div class="j-prohibit j-svg-ico18" state=0 title="未在禁发名单，点击加入">'+
                    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                        '<circle cx="9" cy="9" r="5" class="j-svg-0" />'+
                        '<path d="M5 5 l8 8" class="j-svg-0" />'+
                    '</svg>'+
                '</div>'+                
            '</div>'+
        '</div>'+

        '<div>'+
            '<input type="checkbox" name="friend">' +
        '</div>'+
    '</div>';
    $('#j_friend_box').append(node);
}

//保存好友结果
function SaveFriendResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                var node = '<div class="j-explain-box j-w">' +
                    '<p>若没有设置过滤条件，则显示全部好友，若设置了过滤条件，则显示与条件匹配的好友。</p>'+
                    '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                '</div>';
                $('#j_friend_box').empty();
                $('#j_friend_box').append(node);
                ShowPaging('j_friend_paging', 1, 0, 40);
                PointOut('失败，请检查尝试刷新页面或重启浏览器！');
                break;
            case 1:
                if(data['data']){
                    for(var i=0; i<data['data'].length; i++){
                        if(data['data'][i]['send_time'] == null){
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-sendtime').text('群发：未群发过');
                        }else{
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-sendtime').html('<font style="color:#f00;">群发：' + data['data'][i]['send_time'] + '</font>');
                        }
                        
                        $('#f_'+ data['data'][i]['friend_urn']).find('.j-remark').text(data['data'][i]['remark']);
                        $('#f_'+ data['data'][i]['friend_urn']).find('.j-remark').attr('title', data['data'][i]['remark']);
                        if(data['data'][i]['group_name'] == null){
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-grouping').text('未分组');
                        }else{
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-grouping').html('<h3 class="j-oneline">' + data['data'][i]['group_name'] + '</h3>');
                        }
                        
                        if(data['data'][i]['is_prohibit'] == '1'){
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-prohibit svg *').addClass('j-svg-1');
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-prohibit svg *').removeClass('j-svg-0');
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-prohibit').attr('title', '已在禁发名单，点击移出');
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-prohibit').attr('state', '1');
                        }

                        if(data['data'][i]['dig_state'] == '1'){
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-dig svg *').addClass('j-svg-1');
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-dig svg *').removeClass('j-svg-0');
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-dig').attr('title', '已挖掘，点击查看详情');
                            $('#f_'+ data['data'][i]['friend_urn']).find('.j-dig').attr('state', '1');
                        }
                    }
                }
                break;

            case 3:
                //没有登录领英精灵账号
                var node = '<div class="j-explain-box j-w">' +
                    '<p>若没有设置过滤条件，则显示全部好友，若设置了过滤条件，则显示与条件匹配的好友。</p>'+
                    '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                '</div>';
                $('#j_friend_box').empty();
                $('#j_friend_box').append(node);
                ShowPaging('j_friend_paging', 1, 0, 40);

                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                var node = '<div class="j-explain-box j-w">' +
                    '<p>若没有设置过滤条件，则显示全部好友，若设置了过滤条件，则显示与条件匹配的好友。</p>'+
                    '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                '</div>';
                $('#j_friend_box').empty();
                $('#j_friend_box').append(node);
                ShowPaging('j_friend_paging', 1, 0, 40);

                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                var node = '<div class="j-explain-box j-w">' +
                    '<p>若没有设置过滤条件，则显示全部好友，若设置了过滤条件，则显示与条件匹配的好友。</p>'+
                    '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                '</div>';
                $('#j_friend_box').empty();
                $('#j_friend_box').append(node);
                ShowPaging('j_friend_paging', 1, 0, 40);

                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                var node = '<div class="j-explain-box j-w">' +
                    '<p style="text-align:center">您的领英精灵账号异地登录中，请确保在同一时间只有一台设备登录。</p>'+
                    '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                '</div>';
                $('#j_friend_box').empty();
                $('#j_friend_box').append(node);
                ShowPaging('j_friend_paging', 1, 0, 40);

                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                var node = '<div class="j-explain-box j-w">' +
                    '<p style="text-align:center">获取好友失败，请尝试刷新页面或重启浏览器</p>'+
                    '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
                '</div>';
                $('#j_friend_box').empty();
                $('#j_friend_box').append(node);
                ShowPaging('j_friend_paging', 1, 0, 40);

                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        var node = '<div class="j-explain-box j-w">' +
            '<p style="text-align:center">获取好友失败，请尝试刷新页面或重启浏览器</p>'+
            '<a href="http://linkedinjl.com/help" target="_black">查看详细教程</a>'+
        '</div>';
        $('#j_friend_box').empty();
        $('#j_friend_box').append(node);
        ShowPaging('j_friend_paging', 1, 0, 40);

        PointOut('失败，请尝试刷新页面或重启浏览器');
    }
}


//获取指定页的好友
function GetFriendSomePage(){
    var page = parseInt($(this).text());
    GetFriendData(page);
}

//跳到指定页的人脉
function JumpFriend(){
    var maxpage = parseInt($('#j_friend_paging .j-paging:last').text());
    var page = parseInt($('#j_friend_paging .j-jump').val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(page)) { 
    　　PointOut('请输入正确的页数', 3); 
    　　return false;
    }
    var curpage = parseInt($('#j_friend_paging .j-curpage').text());
    if(page == curpage){
        PointOut('获取完成');
        return false;
    }
    if(page > maxpage){
        PointOut('请输入正确页数，1-' + maxpage + ' 范围内', 3);
        return false;
    }
    GetFriendData(page);
}

//回来跳到指定页的人脉
function JumpFriendEnter(){
    if(event.keyCode == 13){
        JumpFriend();
    }
}


//全选/全不选好友
function SelectAllFriend(){
    if($(this).prop('checked')){
        $("input[name='friend']").prop('checked',true);
        var count = $("input[name='friend']:checkbox:checked").length;
        if(count == 0){
            PointOut('没有可选择的好友', 1)
        }else{
            PointOut('选择了 ' + count + ' 位好友', 1);
        }
    }else{
        $("input[name='friend']").prop('checked',false);
    }
}

//好友页面分组
function Grouping(){
    var friend = [];
    chrome.storage.sync.get({latelyGroupId:'1', level:0, regTime:1}, function(items){
        //判断是否钻石会员
        var regTime = parseInt(items.regTime) + 3*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<2 && curTime > regTime){
            ShowUpgrade('试用期已过', '非钻石会员分组功能可试用3天，您的试用期已过，请升级使用', '立即升级');
            return false;
        }

        var groupId = String(items.latelyGroupId);
        if($("input[name='friend']:checkbox:checked").length > 0){
            JlHttp('getGroup', groupId, 'friend', '');
        }else{
            PointOut('请选择要分组的好友');
        }
    });
}

//显示分组窗口
function ShowGroupingDialog(data, groupId){
    $(".j-dialog").remove();
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
            '<div class="j-prompt-title j-nowrap j-bg-0">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>分组到...</h3>'+
                '</div>'+
            '</div>'+
            '<div class="j-prompt-cont">'+
                '<div class="j-new-group-box">' +
                    '<div><select id="j_select_group" style="padding:6px">';
                    for(var i=0; i<data.length; i++){
                        if(data[i]['group_id'] == groupId){
                            node += '<option selected="selected" value=' + data[i]['group_id'] + '>' + data[i]['group_name'] + '</option>';
                        }else{
                            node += '<option value=' + data[i]['group_id'] + '>' + data[i]['group_name'] + '</option>';
                        }
                    }
                    node += '</select></div>' +
                '</div>'+
            '</div>' +
            '<div class="j-prompt-ctrl">' +
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>'+
            '</div>'+
        '</div>'+
    '</div>';

    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    $('#j_ok').on('click',function(){
        var newGroupId = $.trim($('#j_select_group').val());
        if(!newGroupId){
            PointOut('请选择分组');
            return false;
        }

        var friend = [];
        $("input[name='friend']:checkbox:checked").each(function(){
            friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
        });
        friend = JSON.stringify(friend);
        JlHttp('grouping', friend, 'friend', newGroupId);
        chrome.storage.sync.set({latelyGroupId:[newGroupId]}, function(){});
    });
}

//分组结果
function GroupingResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('分组失败，请尝试刷新页面或重启浏览器')
                break;

            case 1:
                switch(data['tag']){
                    case 'group':
                        PointOut('成功');
                        $('.j-dialog').remove();
                        if(data['data']){
                            for(var i=0; i<data['data'].length; i++){
                                $('#g_' + data['data'][i]).remove();
                            }
                        }
                        break;

                    case 'friend':
                        $('.j-dialog').remove();
                        PointOut('成功');
                        if(data['data']){
                            for(var i=0; i<data['data'].length; i++){
                                $('#f_' + data['data'][i]).find('.j-grouping').html('<h3 class="j-oneline">' + data['groupName'] + '</h3>');
                            }
                        }
                        break;
                    default:

                        break;
                }
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('请尝试刷新或重启浏览器');
                break;

        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}



//批量添加到禁发名单
function AddProhibitForFriend(){
    var friend = [];
    $("input[name='friend']:checkbox:checked").each(function(){
        friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
    });

    if(friend.length <= 0){
        PointOut('请选择要添加到禁发名单的好友');
    }else{
        JlConfirm('确定要将选择的 ' + friend.length + ' 位好友添加到禁发名单吗？', '确定');
        $('#j_ok').on('click', function(){
            friend = JSON.stringify(friend);
            JlHttp('updateProhibit', friend, 'f_', 1);
        });
    }
}

//禁发状态更新结果
function UpdateProhibitResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                //更新失败
                PointOut('失败，请尝试刷新或重启浏览器');
                break;

            case 1:
                //更新成功
                if(data['tag'] == 'p_'){
                    //禁发名单中移出
                    PointOut('禁发名单移出成功');
                    for(var i=0; i<data['friend'].length; i++){
                        $('#'+data['tag'] + data['friend'][i]).remove();
                    }
                    return false;
                }

                if(parseInt(data['state']) == 1){
                    //添加到禁发名单成功
                    PointOut('已添加到禁发名单');
                    for(var i=0; i<data['friend'].length; i++){
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit svg *').removeClass('j-svg-0');
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit svg *').addClass('j-svg-1');
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit').attr('state', data['state']);
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit').attr('title', '已在禁发名单，点击移出');
                    }  
                }else{
                    //移出禁发名单成功
                    PointOut('已移出禁发名单');
                    for(var i=0; i<data['friend'].length; i++){
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit svg *').removeClass('j-svg-1');
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit svg *').addClass('j-svg-0');
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit').attr('state', data['state']);
                        $('#'+data['tag'] + data['friend'][i]).find('.j-prohibit').attr('title', '未在禁发名单，点击加入');
                    }
                }
                break;
            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//好友页面开始批量群发消息
function StartSendForFriend(){
    chrome.storage.sync.get({account:'', my_urn:'', run:false, level:0, regTime:1, s_today_num:0, s_skip:false, s_skip_time:3}, function(items){
        if(items.run){
            PointOut('正在批量操作中，请先停止操作，再进行批量群发消息！');
            return;
        }

        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        var regTime = parseInt(items.regTime) + 7*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<1 && curTime>regTime){
            ShowUpgrade('试用期已过', '试用会员可试用7天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }

        var count = $("input[name='friend']:checkbox:checked").length;
        if(count == 0){
            PointOut('请先选择要群发的好友');
        }else{
            if(items.s_skip){
                var skip = 1;
            }else{
                var skip = 0;
            }
            JlConfirm('确定要给选择的 ' + count + ' 位好友群发消息吗？');
            $('#j_ok').click(function(){
                var friend = [];
                $("input[name='friend']:checkbox:checked").each(function(){
                    friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
                });
                friend = JSON.stringify(friend);
                JlHttp('getSendForFriend', friend, skip, parseInt(items.s_skip_time));//获取要发送消息的好友详细资料
            });
        }
    });
}

//获取群发好友详细资料结果
function GetSendForFriendResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                if(data['tidings'].length == 0){
                    PointOut('群发前请设置或选择要群发的消息内容');
                    NewTidings();
                    return false;
                }
                if(data['data'].length == 0){
                    PointOut('选择的好友可能在禁发名单中或在指定天内有发送过');
                    return false;
                }
                Tidings = data['tidings'];
                Friend = data['data'];
                Pos = Friend.length;
                ActionCount = 0;
                ShowStatu('批量群发消息中...');
                ShowOrHideWindow();
                BatchSend();
                chrome.storage.sync.set({run:true}, function(){})
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}


//批量群发
function BatchSend(){
    Pos--;
    if(Pos < 0){
        StopAction();
        setTimeout(function(){
            alert('本次已群发 ' + ActionCount +' 条消息');
        }, 50);
        return false;
    }

    chrome.storage.sync.get({account:'', my_urn:'', s_today_num:0, s_limit:100, s_min_speed:30, s_max_speed:60, risk:true, level:0}, function(items){
        if(!String(items.account)){
            StopAction();
            setTimeout(function(){
                alert('没有登录领英精灵账号，可能有其它设备登录，被挤出');
            },50);
            return false;
        }

        if(!String(items.my_urn)){
            StopAction();
            setTimeout(function(){
                if(confirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？')){
                    BindLinkedin(false);
                }
            },50);
            return false;
        }

        if(parseInt(items.level)<1 && parseInt(items.s_today_num)>=TestCount){
            StopAction();
            setTimeout(function(){
                if(confirm('您是试用会员，试用会员每天有' + TestCount + '个群发名额。今日群发名额已用完，升级会员可无限制群发')){
                    Upgrade();
                }
            }, 50);
            return false;
        }

        if(parseInt(items.s_today_num) >= parseInt(items.s_limit)){
            StopAction();
            setTimeout(function(){
                alert('今日累计群发 ' + items.s_today_num +' 条消息，已超设置的每日最多群发量，请明天再来群发或将每日群发量设置大些！');
            }, 50);
            return false;
        }
        $('#j_head_img').attr('src', Friend[Pos]['img']);
        var tidings = RandomTidings(Friend[Pos]['first_name'], Friend[Pos]['last_name']);
        SendMsg(Friend[Pos]['urn'], tidings);


        ActionCount++;
        var today_num = parseInt(items.s_today_num) + 1;
        $('#j_action_count').text('本次已发：' + ActionCount + "条");
        if(today_num > 100){
            $('#j_today_count').html('<font style="color:#f00;">今日已发：' + today_num + "条</font>");
        }else{
            $('#j_today_count').text('今日已发：' + today_num + "条");
        }
    
        //循环
        var time = GetTime(parseInt(items.s_today_num), parseInt(items.s_min_speed), parseInt(items.s_max_speed), items.risk);
        Delayed_time = time;
        DelayedTime();
        Timeout = setTimeout(function(){
            chrome.runtime.sendMessage({action:'loop', result:'batchSend', other:''}, function(response){});
        }, time*1000);
    });
}

//模拟http发送消息
function SendMsg(entityUrn, tidings){
    var para = {
        "conversationCreate":{
            "eventCreate":{
                "value":{
                    "com.linkedin.voyager.messaging.create.MessageCreate":{
                        "attachments": [],
                        "attributedBody":{
                            "attributes": [],
                            "text": tidings
                        }
                    }
                }
            },
            "recipients":[entityUrn],
            "subtype": "MEMBER_TO_MEMBER"
        },
        "keyVersion": "LEGACY_INBOX"
    }
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    if(!tok){
        return false;
    }
    var url = "https://www.linkedin.com/voyager/api/messaging/conversations?action=create";
    $.ajax({
        url: url,
        type: 'post',
        data:JSON.stringify(para),
        headers: {
            "Accept": 'application/vnd.linkedin.normalized+json+2.1',
            'csrf-token':tok,
            'content-type': 'application/json; charset=UTF-8',
            'x-restli-protocol-version': '2.0.0'
        },
        success: function (data) {
            chrome.storage.sync.get({s_today_num:0}, function(items){
                var today_num = parseInt(items.s_today_num) + 1;
                chrome.storage.sync.set({s_today_num:[today_num]}, function(){});
                JlHttp('saveSendRecord', entityUrn, '', '');
            });
        }
    });
}

//保存群发记录结果
function SaveSendRecordResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                break;

            case 1:
                                
                break;

            case 3:
                //没有登录领英精灵账号
                StopAction();
                setTimeout(function(){
                    alert('没有登录领英精灵，请登录领英精灵账号');
                }, 50);
                break;

            case 4:
                //没有绑定领英账号
                StopAction();
                setTimeout(function(){
                    if(confirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？")){
                        BindLinkedin(false);
                    }
                }, 50);
                break;

            case 5:
                //登录超过
                StopAction();
                setTimeout(function(){
                    alert('没有登录领英精灵，请登录领英精灵账号');
                }, 50);
                break;

            case 6:
                //异地登录中
                StopAction();
                setTimeout(function(){
                    alert('其它设备有登录此领英精灵账号，请不要在其它设备登录');
                }, 50);
                break;

            case 7:
                //超过试用期
                StopAction();
                setTimeout(function(){
                    if(confirm('注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持')){
                        Upgrade();
                     }
                }, 50);
                break;

            default:
                break;
        }
    }
}


//根据好友姓名和设置的消息内容随机一条消息内容
function RandomTidings(firstName, lastName){
    var length = Tidings.length;
    var tidings='';
    if(length > 0){
        var i = parseInt(length*Math.random());
        tidings = Tidings[i]['tidings'];
        tidings = tidings.replace(/\[FirstName\]/g,firstName);
        tidings = tidings.replace(/\[LastName\]/g,lastName);
    }else{
        tidings = false;
    }
    return tidings;
}



//好友页面开始挖掘资料
function StartDigForFriend(){
    chrome.storage.sync.get({account:'', my_urn:'', run:false, level:0, regTime:1}, function(items){
        if(items.run){
            PointOut('正在批量操作中，请先停止操作，再进行批量挖掘！');
            return;
        }

        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            //没有登录领英精灵账号
            ShowLoginDialog();
            PointOut('没有登录领英精灵，请登录领英精灵账号', 1);
            return false;
        }
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').on('click',function(){
                BindLinkedin(true);
            });
            return false;
        }

        var regTime = parseInt(items.regTime) + 7*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<1 && curTime > regTime){
            ShowUpgrade('试用期已过', '试用会员可试用7天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }

        var count = $("input[name='friend']:checkbox:checked").length;
        if(count == 0){
            PointOut('请先选择要挖掘的好友');
        }else{
            JlConfirm('确定要挖掘选择的 ' + count + ' 位好友资料吗？');
            $('#j_ok').click(function(){
                var friend = [];
                $("input[name='friend']:checkbox:checked").each(function(){
                    friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
                });
                friend = JSON.stringify(friend);
                JlHttp('getDigForFriend', friend, '', '');
            });
        }
    });
}

//好友页面批量挖掘获取好友结果
function GetDigForFriendResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                if(data['data'].length == 0){
                    PointOut('选择的好友可能已全部挖掘过');
                    return false;
                }
                Friend = data['data'];
                Pos = Friend.length;
                ActionCount = 0;
                ShowStatu('批量挖掘中...');
                ShowOrHideWindow();
                BatchDig();
                chrome.storage.sync.set({run:true}, function(){});
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//批量挖掘
function BatchDig(){
    Pos--;
    if(Pos < 0){
        StopAction();
        setTimeout(function(){
            alert('本次已挖掘 ' + ActionCount +' 条资料');
        }, 50);
        return false;
    }
    chrome.storage.sync.get({account:'', d_today_num:0, d_limit:100, d_min_speed:60, d_max_speed:120, risk:true}, function(items){
        //检查是否有多个设备登录
        if(!String(items.account)){
            StopAction();
            setTimeout(function(){
                alert('没有登录领英精灵账号，可能有其它设备登录，被挤出');
            },50);
            return false;
        }

        if(parseInt(items.d_today_num) >= parseInt(items.d_limit)){
            StopAction();
            setTimeout(function(){
                alert('今日累计挖掘 ' + items.d_today_num +' 条，已超设置的每日最多挖掘量，请明天再来挖掘或将每日挖掘量设置大些！');
            }, 50);
            return false;
        }
        $('#j_head_img').attr('src', Friend[Pos]['img']);
        DigData(Friend[Pos]['urn'], Friend[Pos]['public_id'], 'batch');

        ActionCount++;
        var today_num = parseInt(items.d_today_num) + 1;
        $('#j_action_count').text('本次已挖：' + ActionCount + "条");
        if(today_num > 100){
            $('#j_today_count').html('<font style="color:#f00;">今日已挖：' + today_num + "条</font>");
        }else{
            $('#j_today_count').text('今日已挖：' + today_num + "条");
        }
    
        //循环
        var time = GetTime(parseInt(items.d_today_num), parseInt(items.d_min_speed), parseInt(items.d_max_speed), items.risk);
        Delayed_time = time;
        DelayedTime();
        Timeout = setTimeout(function(){
            chrome.runtime.sendMessage({action:'loop', result:'batchDig', other:''}, function(response){});
        }, time*1000);
    });
}


//编辑备注
function EditRemark(){
    $(".j-dialog").remove();
    var remark = $.trim($(this).parents('div.j-friend').find('.j-remark').text());
    var urn = $.trim($(this).parents('div.j-friend').attr('id')).slice(2,41);
    var tag = $.trim($(this).parents('div.j-friend').attr('id')).slice(0,2);
    var node = '<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>修改备注</h3>'+
                '</div>'+
            '</div>'+

            '<div class="j-prompt-cont">'+
                '<div class="j-new-group-box">'+
                    '<textarea maxlength=120 id="j_remark">' + remark + '</textarea>'+
                '</div>' +
            '</div>' +
            '<div class="j-prompt-ctrl">' +
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_edit_remark" class="j-bg-btn j-layout-btn">确定修改</button>'+
            '</div>'+
        '</div>'+
    '</div>';

    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    $('#j_remark').focus();

    $('#j_edit_remark').click(function(){
        var newRemark = $.trim($('#j_remark').val());
        if(newRemark == remark){
            //备注没有修改
            PointOut('修改成功');
            $('.j-dialog').remove();
            return false;
        }else{
            //备注有修改
            JlHttp('editRemark', urn, tag, newRemark);
        }
    });
}

//编辑好友备注结果
function EditRemarkResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                //修改成功
                PointOut('修改成功', 1);
                $('.j-dialog').remove();
                $('#' + data['tag'] + data['urn']).find('.j-remark').text(data['remark']);
                $('#' + data['tag'] + data['urn']).find('.j-remark').attr('title', data['remark']);
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }

    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//单个挖掘
function DigA(){
    var urn = $.trim($(this).parents('div.j-friend').attr('id')).slice(2,41);
    var tag = $.trim($(this).parents('div.j-friend').attr('id')).slice(0, 2);

    var state = $(this).attr('state');
    if(state == '1'){
        //显示挖掘的详细资料
        JlHttp('getFriendProfile', urn, '', '');
    }else{
        PointOut('挖掘中...');
        var publicId = $.trim($(this).parents('div.j-friend').find('a').attr('href')).slice(28);
        DigData(urn, publicId, tag);
    }
}


//单个更新禁发状态
function UpdateProhibit(){
    var friend = [];
    var urn = $.trim($(this).parents('div.j-friend').attr('id')).slice(2, 41);
    var tag = $.trim($(this).parents('div.j-friend').attr('id')).slice(0, 2);

    var state = parseInt($(this).attr('state'));
    console.log(state);

    if(state == 0){
        //没有在禁发名单中
        var state = 1;
    }else{
        //在禁发名单中
        var state = 0;
    }
    friend.push(urn);
    friend = JSON.stringify(friend);
    JlHttp('updateProhibit', friend, tag, state);
}







/*-------------------------分组页面-------------------------*/
//新增分组
function NewGroup(){
    chrome.storage.sync.get({account:'',my_urn:''},function(items){
        //var account = String(items.account);
        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            //没有登录领英精灵账号
            ShowLoginDialog();
            PointOut('没有登录领英精灵，请登录领英精灵账号', 1);
            return false;
        }
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').on('click',function(){
                BindLinkedin(true);
            });
            return false;
        }

        $(".j-dialog").remove();
        var node = '<div class="j-dialog j-div-center">'+
            '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
                '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                    '<div class="j-nowrap">'+
                        '<div>'+
                            '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                                '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                                '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                                '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                            '</svg>'+
                        '</div>'+
                        '<h3>新增分组</h3>'+
                    '</div>'+
                '</div>'+
                '<div class="j-prompt-cont">'+
                    '<div class="j-new-group-box">'+
                        '<input id="j_group_name" type="text" placeholder="请输入分组名（最多16个字符）" maxlength=16 autofocus="autofocus">'+
                    '</div>' +
                '</div>' +
                '<div class="j-prompt-ctrl">' +
                    '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                    '<button id="j_new_group" class="j-bg-btn j-layout-btn">确定新增</button>'+
                '</div>'+
            '</div>'+
        '</div>';
        $("#j_lyjl_window").append(node);
        $(".j-dialog").fadeIn(200);
    });
}

//保存新增的分组
function SaveNewGroup(){
    var groupName = $.trim($('#j_group_name').val());
    if(!groupName){
        PointOut('分组名不能为空');
        $('#j_group_name').focus();
        return;
    }
    var groupId = String(new Date().getTime());
    JlHttp('saveGroup', groupId, '', groupName);
}

//保存新增分组结果
function SaveGroupResult(result, data){
    if(result && data){
        //新成功
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
                
            case 1:
                PointOut('新增成功');
                $('.j-dialog').remove();
                GetGroup();
            break;

            case 2:
                PointOut('修改成功');
                $('.j-dialog').remove();
                GetGroup();
                break;
            
            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        //新增失败
        PointOut('新增失败，请检查网络，勿翻墙！');
    }
}


//分组页面初始化
function ShowGroupPage(){
    if(GroupPage){
        GetGroup();
        GroupPage = false;
    }
}

//获取分组
function GetGroup(){
    JlHttp('getGroup', '', 'show', '');
}

//获取分组结果
function GetGroupResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                //分组获取失败
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                switch(data['tag']){
                    //显示分组
                    case 'show':
                        $('#j_group_box').empty();
                        if(data['data'].length > 0){
                            for(var i=0; i<data['data'].length; i++){
                                AppendGroupToTable(data['data'][i]);
                            }
                            PointOut('分组获取完成');
                        }else{
                            var node = '<div class="j-explain-box">' +
                                '<p>领英精灵的分组功能可对领英好友进行分组、备注，重点客户和潜在客户分类管理，方便后期跟进，不错过任何一个客户。<font style="color:#999;">(分组前请先新增分组，在“好友”选项卡中可将好友移到相应分组中。)</font></p>'+
                                '<a href="http://linkedinjl.com/help?o=group" target="_black">查看详细教程</a>'+
                            '</div>';
                            $('#j_group_box').append(node);
                            PointOut('没有分组');
                        }
                        break;

                    case 'move':
                        //移动分组
                        ShowMoveGroupDialog(data['data'], data['groupId']);
                        break;

                    case 'friend':
                        //好友页面分组
                        if(data['data'].length > 0){
                            ShowGroupingDialog(data['data'], data['groupId']);
                        }else{
                            NewGroup();
                            PointOut('分组前请先新增分组');
                        }
                        break;

                    case 'sort':
                        //分组排序
                        SortGroup(data['data']);
                        break;
                }               
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}


//将分组数据添加到列表
function AppendGroupToTable(data){
    var node = '<div>' +
        '<div class="j-group-box j-group-box-not-active j-nowrap" groupid=' + data['group_id'] + '>'+
            '<div class="j-group j-nowrap-left">'+
                '<div>' +
                    '<div class="j-svg-group">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:12px;height:12px;">'+
                            '<polyline stroke="#666" points="0 4, 6 10, 12 4" style="fill:none;stroke-width:1" />' +
                        '</svg>' +
                    '</div>' +
                '</div>'+
                '<div>' +
                    '<span class="j-groupname">' + data['group_name'] + '</span>'+
                    '<span id="j_gnum_' + data['group_id'] + '" class="j-group-num"></span>'+
                '</div>'+
            '</div>'+

            '<div class="j-group-edit">'+
                '<div style="display: flex; justify-content:flex-end;">'+
                    '<div class="j-edit j-svg-ico24" title="修改分组">'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M6 18 l12 0" class="j-svg" style="stroke:#ccc;" />'+
                            '<path d="M6 17 l2 -4 l5 -5 l2 2 l-5 5 z" class="j-svg-bg" />'+
                            '<path d="M15 7 l1 -1 l1 1 l-1 1 z" class="j-svg" />'+
                        '</svg>'+
                    '</div>'+

                    '<div class="j-delete j-svg-ico24" title="删除分组">'+
                        '<svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="6" r="1" class="j-svg-bg"/>'+
                            '<path d="M6 8 l12 0" class="j-svg"/>'+
                            '<path d="M8 10 l8 0 l-1 8 l-6 0 z" class="j-svg"/>'+
                            '<path d="M12 10 l0 8" class="j-svg"/>'+
                        '</svg>'+
                    '</div>'+

                    '<div class="j-sort j-svg-ico24" title="分组排序">'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M12 5 l6 5 l-12 0 z" class="j-svg-bg" />'+
                            '<path d="M4 12 l16 0" class="j-svg" />'+
                            '<path d="M12 19 l6 -5 l-12 0 z" class="j-svg-bg" />'+
                        '</svg>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<div class="j-group-tool">' + 
                '<div style="display: flex; justify-content:flex-end;">'+
                    '<div class="j-move j-svg-ico24" title="移到到其它分组">'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M6 7 l8 0 l0 -3 l4 4.5 l-4 4.5 l0 -3 l-8 0 z" class="j-svg-bg"/>'+
                            '<path d="M6 16 l4 -4.5 l0 3 l8 0 l0 3 l-8 0 l0 3 z" class="j-svg-bg"/>'+
                        '</svg>'+
                        '</svg>'+
                    '</div>'+

                    '<div class="j-export j-svg-ico24" title="导出分组中已挖掘的好友资料">'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M6 14 l0 4 l12 0 l0 -4" class="j-svg" />'+
                            '<path d="M10 16 l0 -6 l4 0 l0 6 z" class="j-svg-bg" />'+
                            '<path d="M7 11 l5 -6 l5 6 z" class="j-svg-bg"/>'+
                        '</svg>'+
                    '</div>'+

                    '<div class="j-dig j-svg-ico24" title="批量挖掘分组中的好友">'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="4" class="j-svg" />'+
                            '<path d="M2 12 Q12 2 22 12" class="j-svg" />'+
                            '<path d="M2 12 Q12 22 22 12" class="j-svg" />'+
                        '</svg>'+
                    '</div>'+

                    '<div class="j-send j-svg-ico24" title="批量给分组好友群发消息">'+
                        '<svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M9 19 L10 16 A8 5 0 1 1 15 16 Z" class="j-svg"/>'+
                            '<circle cx="8" cy="12" r="1" class="j-svg-bg"/>'+
                            '<circle cx="12" cy="12" r="1" class="j-svg-bg"/>'+
                            '<circle cx="16" cy="12" r="1" class="j-svg-bg"/>'+
                        '</svg>'+
                    '</div>'+

                    '<div class="j-prohibit j-svg-ico24" title="批量添加到禁发名单">'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="6" class="j-svg" />'+
                            '<path d="M7 7 l10 10" class="j-svg" />'+
                        '</svg>'+
                    '</div>'+

                    '<div style="margin-top:4px; margin-left:12px; text-align:center;"><input class="j-gall" type="checkbox" title="全选/全不选"/></div>' +
                '</div>' +
            '</div>'+
        '</div>'+

        '<div class="j-group-friend" id="j_group_' + data['group_id'] +'"></div>'+
    '</div>';
    $('#j_group_box').append(node);
}

//点击分组显示相应分组中的好友
function ShowGroupFriend(){
    var t = $(this);
    chrome.storage.sync.get({level:0, regTime:1}, function(items){
        //判断是否是会员
        var regTime = parseInt(items.regTime) + 3*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<2 && curTime > regTime){
            ShowUpgrade('没有权限', '非钻石会员分组功能可试用3天，您的试用期已过，请升级钻石会员使用', '立即升级');
            return false;
        }

        $('.j-group-box').addClass('j-group-box-not-active');
        $('.j-group-box').removeClass('j-group-box-active');
        $('.j-group-tool').css('display', 'none');
        $('.j-group-edit').css('display', 'block');
        $('.j-group-friend').slideUp(200);
        $('.j-svg-group').removeClass('j-svg-show');

        if(t.parent().next().is(":visible") == false){
            //显示出来
            t.parent().addClass('j-group-box-active');
            t.parent().removeClass('j-group-box-not-active');
            t.parent().find('.j-group-tool').css('display','block');
            t.parent().find('.j-group-edit').css('display','none');
            t.find('.j-svg-group').addClass('j-svg-show');
            t.parent().next().slideDown(200);
            if(t.parent().next().children().length == 0){
                //获取分组中的好友
                var gid = $.trim(t.parent('.j-group-box').attr('groupid'));
                var firstName = $('#j_group_firstname').val();
                var lastName = $('#j_group_lastname').val();
                var condition = {"firstName":firstName, "lastName":lastName, "gid":gid, "start":0, "count":10};
                condition = JSON.stringify(condition);
                JlHttp('getGroupFriend', condition, '', '');
            }
        }
    });
}

//获取分组中好友的结果
function GetGroupFriendResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            //获取失败
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            //获取成功
            case 1:
                $('#j_gnum_'+ data['groupId']).text('(' + data['total'] + ')');
                if(data['total'] == 0){
                    //分组中没有好友
                    $('#j_group_' + data['groupId']).empty();
                    $('#j_group_' + data['groupId']).append('<div class="j-friend-not"><p>该分组中没有匹配的好友</p></div>');
                    return false;
                }

                if(data['data']){
                    for(var i=0; i<data['data'].length; i++){
                        AppendGroupFriend(data['groupId'], data['data'][i]);
                    }
                }

                if(data['pos'] >= data['total']){
                    //获取完成
                    $('#j_group_' + data['groupId']).append('<div class="j-friend-not"><p>到底了，没有更多</p></div>');
                }else{
                    //还有好友
                    $('#j_group_' + data['groupId']).append('<div class="j-load-more j-load-friend" groupid=' + data['groupId'] + ' start=' + data['pos'] + ' title="显示更多好友">显示更多</div>');
                }

                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}


//显示相应分组中的好友
function AppendGroupFriend(groupId, data){
    //没有好友
    if(!data['img']){
        data['img'] ='http://lyguanjia.com/expand/version1/img/me.png';
    }
    if(parseInt(data['dig_state']) == 1){
        var digState = '已挖掘，点击查看详情';
    }else{
        data['dig_state'] = 0;
        var digState = '未挖掘，点击挖掘';
    }

    if(parseInt(data['is_prohibit']) == 1){
        var prohibit_title = "已在禁发名单，点击移出";
    }else{
        data['is_prohibit'] = 0;
        var prohibit_title = "未在禁发名单，点击加入";
    }
    if(data['send_time']){
        data['send_time'] = '<font style="color:#f00;">群发:' + data['send_time'] + '</font>';
    }else{
        data['send_time'] = '未群发过';
    }

    var name = GetName(data['first_name'], data['last_name']);
    var node = '<div class="j-friend j-nowrap" id=g_' + data['urn'] + '>'+
        '<div class="j-profile-box j-nowrap-left">'+
            '<div><a href="https://www.linkedin.com/in/' + data['public_id'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>'+
            '<div class="j-profile">'+
                '<h3 class="j-oneline">' + name + '</h3>' +
                '<p class="j-oneline">' + data['position'] + '</p>'+
                '<div class="j-nowrap-left">'+
                    '<div class="j-edit j-svg-ico18" title="修改备注">'+
                        '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<path d="M3 15 l12 0" class="j-svg"/>'+
                            '<path d="M3 14 l2 -4 l5 -5 l2 2 l-5 5 z" class="j-svg-bg" />'+
                            '<path d="M12 4 l1 -1 l1 1 l-1 1 z" class="j-svg" />'+
                        '</svg>'+
                    '</div>'+
                    '<div><p class="j-oneline j-remark" title="' + data['remark'] + '">' + data['remark'] + '</p></div>'+
                '</div>'+
            '</div>' +
        '</div>'+

        '<div class="j-tool-box">'+
            '<div title="最后群发日期">' + data['send_time'] + '</div>'+
            '<div class="j-nowrap-left" style="margin-top:18px;">'+
                '<div class="j-dig j-svg-ico18" state=' + data['dig_state'] + ' title=' + digState + '>'+
                    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                        '<circle cx="9" cy="9" r="3" class="j-svg-' + data['dig_state'] + '" />'+
                        '<path d="M2 9 Q9 2 16 9" class="j-svg-' + data['dig_state'] + '" />'+
                        '<path d="M2 9 Q9 16 16 9" class="j-svg-' + data['dig_state'] + '" />'+
                    '</svg>'+
                '</div>'+

                '<div class="j-prohibit j-svg-ico18" state=' + data['is_prohibit'] + ' title=' + prohibit_title + '>'+
                    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                        '<circle cx="9" cy="9" r="5" class="j-svg-' + data['is_prohibit'] + '"/>'+
                        '<path d="M5 5 l8 8" class="j-svg-' + data['is_prohibit'] + '"/>'+
                    '</svg>'+
                '</div>'+

                '<div class="j-delete j-svg-ico18" title="将该好友移出分组">'+
                    '<svg width="18px" height="18px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                        '<circle cx="9" cy="3" r="1" class="j-svg-bg"/>'+
                        '<path d="M3 5 l12 0" class="j-svg"/>'+
                        '<path d="M5 7 l8 0 l-1 8 l-6 0 z" class="j-svg"/>'+
                        '<path d="M9 7 l0 8" class="j-svg"/>'+
                    '</svg>'+
                '</div>'+
            '</div>'+
        '</div>'+

        '<div>'+
            '<input type="checkbox" name=g_'+ groupId + '>' +
        '</div>'+
    '</div>';
    $('#j_group_' + groupId).append(node);
}


//加载更多分组中的好友
function LoadMoreGroupFriend(){
    var groupId = $(this).attr('groupid');
    var start = parseInt($(this).attr('start'));
    $(this).remove();

    var firstName = $('#j_group_firstname').val();
    var lastName = $('#j_group_lastname').val();
    var condition = {"firstName":firstName, "lastName":lastName, "gid":groupId, "start":start, "count":50};
    condition = JSON.stringify(condition);
    JlHttp('getGroupFriend', condition, '', '');
}

//编辑分组
function EditGroup(){
    var groupName = $.trim($(this).parents('.j-group-box').find('span:first').text());
    var groupId = $.trim($(this).parents('.j-group-box').attr('groupid'));

    $(".j-dialog").remove();
    var node = '<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>修改分组</h3>'+
                '</div>'+
            '</div>'+
            '<div class="j-prompt-cont">'+
                '<div class="j-new-group-box">'+
                    '<input id="j_group_name" type="text" placeholder="请输入分组名（最多8个字符）" maxlength=8 autofocus="autofocus" value=' + groupName + '>'+
                '</div>' +
            '</div>' +
            '<div class="j-prompt-ctrl">' +
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">确定修改</button>'+
            '</div>'+
        '</div>'+
    '</div>';

    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    $('#j_ok').on('click', function(){
        var newGroupName = $.trim($('#j_group_name').val());
        if(!newGroupName){
            PointOut('分组名不能为空');
            $('#j_group_name').focus();
            return false;
        }
        if(newGroupName == groupName){
            PointOut('重命名成功');
            $('.j-dialog').remove();
            return false;
        }
        JlHttp('saveGroup', groupId, '', newGroupName);
    });
}

//删除分组
function DeleteGroup(){
    var groupName = $.trim($(this).parents('.j-group-box').find('span:first').text());
    var groupId = $.trim($(this).parents('.j-group-box').attr('groupid'));
    JlConfirm('确定要删除 "' + groupName + '" 分组吗?', '确定');
    $('#j_ok').on('click',function(){
         JlHttp('deleteGroup', groupId, '', groupName);
    });
}


//删除分组结果
function DeleteGroupResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            //获取失败
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            //获取成功
            case 1:
                PointOut('分组删除成功');
                GetGroup();
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//开始分组排序
function StartSortGroup(){
    JlHttp('getGroup', '', 'sort', '');
}

//分组排序
function SortGroup(data){
    $('.j-dialog').remove();
    var node ='<div class="j-dialog j-div-center">'+
                '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">'+
                    '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                        '<div class="j-nowrap">'+
                            '<div>'+
                                '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                                    '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                                    '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                                    '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                                '</svg>'+
                            '</div>'+
                            '<h3>分组排序</h3>'+
                        '</div>'+
                    '</div>'+

                    '<div class="j-prompt-cont">'+
                        '<div class="j-w j-sort-group-box">';
                        for(var i=0; i<data.length; i++){
                            node += '<div class="j-sort-group j-nowrap" groupid=' + data[i]['group_id'] + '>' +
                                '<div>' +
                                    '<p>' + data[i]['group_name'] + '</p>'+
                                '</div>' +
                                '<div class="j-nowrap">' +
                                    '<div class="j-svg-ico24 j-up" title="上移">'+
                                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                                            '<path d="M4 16 l8 -10 l8 10 z" class="j-svg-bg" />'+
                                        '</svg>'+
                                    '</div>'+
                                    '<div class="j-svg-ico24 j-down" title="下移">'+
                                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                                            '<path d="M4 8 l8 10 l8 -10 z" class="j-svg-bg" />'+
                                        '</svg>'+
                                    '</div>'+
                                '</div>' +
                            '</div>';
                        }
                        
                        node += '</div>' +
                    '</div>' +

                    '<div class="j-prompt-ctrl">'+
                        '<button id="j_cancel" class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                       '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>'+
                    '</div>'+
                '</div>'+
            '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(0);
    $('#j_ok').on('click', function(){
        var group = [];
        var i = $('.j-sort-group').length;
        $('.j-sort-group').each(function(){
            var temp = {};
            temp['groupId'] = $.trim($(this).attr('groupid'));
            temp['sort'] = i;
            i--;
            group.push(temp);
        });
        console.log(group);
        group = JSON.stringify(group);
        JlHttp('sortGroup', group, '', '');
    });
}

//上移
function SortUp(){
    var index = $(this).parents('.j-sort-group');
    if(index.index() != 0){
        index.prev().before(index);
        PointOut('上移', 1);
    }else{
        PointOut('第一个，无法上移', 1);
    }
}

//下移
function SortDown(){
    var index = $(this).parents('.j-sort-group');
    var length = $('.j-sort-group').length;
    if(index.index() != length-1){
        index.next().after(index);
        PointOut('下移', 1);
    }else{
        PointOut('最后一个，无法下移', 1);
    }
}

//排序结果
function SortGroupResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('排序失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                PointOut('排序成功');
                $('.j-dialog').remove();
                GetGroup();
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }

    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}


//移动分组
function MoveGroup(){
    var groupId = $.trim($(this).parents('.j-group-box').attr('groupid'));
    var friend = [];
    if($("input[name='g_" + groupId + "']:checkbox:checked").length > 0){
        JlHttp('getGroup', groupId, 'move', '');
    }else{
        PointOut('请选择要移动的好友');
    }
}

function ShowMoveGroupDialog(data, groupId){
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
            '<div class="j-prompt-title j-nowrap j-bg-0">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>移动到</h3>'+
                '</div>'+
            '</div>'+
            '<div class="j-prompt-cont">'+
                '<div class="j-new-group-box">' +
                    '<div><select id="j_select_group" style="padding:6px">';
                    for(var i=0; i<data.length; i++){
                        if(data[i]['group_id'] == groupId){
                            node += '<option selected="selected" value=' + data[i]['group_id'] + '>' + data[i]['group_name'] + '</option>';
                        }else{
                            node += '<option value=' + data[i]['group_id'] + '>' + data[i]['group_name'] + '</option>';
                        }
                    }
                    node += '<option value=0>移出分组</option>';
                    node += '</select></div>' +
                '</div>'+
            '</div>' +
            '<div class="j-prompt-ctrl">' +
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_move_group" class="j-bg-btn j-layout-btn">确定移动</button>'+
            '</div>'+
        '</div>'+
    '</div>';

    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    $('#j_move_group').on('click',function(){
        var newGroupId = $.trim($('#j_select_group').val());
        if(!newGroupId){
            PointOut('请选择分组');
            return false;
        }
        if(newGroupId == groupId){
            PointOut('选择的分组与原分组相同');
            return false;
        }
        var friend = [];
        $("input[name='g_" + groupId + "']:checkbox:checked").each(function(){
            friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
        });
        friend = JSON.stringify(friend);
        JlHttp('grouping', friend, 'group', newGroupId);
    });
}

//全选/全不选分组中的好友
function SelectAllGroupFriend(){
    var groupId = $.trim($(this).parents('.j-group-box').attr('groupid'));
    if($(this).prop('checked')){
        $("input[name='g_" + groupId + "']").prop('checked',true);
        var count = $("input[name='g_" + groupId + "']:checkbox:checked").length;
        if(count == 0){
            PointOut('该分组中没有可选好友', 1)
        }else{
            PointOut('选择了 ' + count + ' 位好友', 1);
        }
    }else{
        $("input[name='g_" + groupId + "']").prop('checked',false);
    }
}

//批量挖掘分组中的好友
function StartDigForGroup(){
    var groupId = $.trim($(this).parents('div.j-group-box').attr('groupid'));
    var groupName = $.trim($(this).parents('div.j-group-box').find('.j-groupname').text());

    chrome.storage.sync.get({account:'', run:false, d_today_num:0, d_limit:100}, function(items){
        if(items.run){
            PointOut('正在批量操作中，请先停止操作，再进行批量挖掘！');
            return;
        }
        //检查是否有登录领英精灵账号
        if(!String(items.account)){
            ShowLoginDialog();
            return false;
        }

        var count = parseInt(items.d_limit) - parseInt(items.d_today_num);
        if(count <= 0){
            PointOut('您今天已累计挖掘' + parseInt(items.d_today_num) + '条，已超设置的每日最多挖掘量，请明天再来挖掘或将每日挖掘量设置大些！');
            return false;
        }

        JlConfirm('确定要挖掘 “' + groupName + '" 好友资料吗？');
        $('#j_ok').click(function(){
            JlHttp('getDigForGroup', groupId, '', count);
        });
    });
}

//分组页面批量挖掘时获取要挖掘的好友结果
function GetDigForGroupResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                if(data['data'].length == 0){
                    PointOut('分组中的好友可能已全部挖掘过');
                    return false;
                }
                Friend = data['data'];
                Pos = Friend.length;
                ActionCount = 0;
                ShowStatu('批量挖掘中...');
                ShowOrHideWindow();
                BatchDig();
                chrome.storage.sync.set({run:true}, function(){});
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//导出分组中已挖掘的好友资料
function ExportGroupFriend(){
    var groupName = $.trim($(this).parents('.j-group-box').find('.j-groupname').text());
    var groupId = $.trim($(this).parents('.j-group-box').attr('groupid'));
    chrome.storage.sync.get({account:'',my_urn:'', level:0},function(items){
        if(parseInt(items.level) < 2){
            ShowUpgrade('试用期已过', '非钻石会员不支持导出功能，升级钻石会员可无限导出。');
            return false;
        }
        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }
        
        JlConfirm('确定要导出 "' + groupName + '" 分组中已挖掘的好友资料吗？', '确定');
        $('#j_ok').on('click', function(){
            window.open('http://linkedinjl.com/exportdig/type/group/account/' + account + '/my_urn/' + my_urn + '/gid/' + groupId);
        });
    });
} 

//批量给分组中的好友群发消息
function StartSendForGroup(){
    var groupId = $.trim($(this).parents('div.j-group-box').attr('groupid'));
    var groupName = $.trim($(this).parents('div.j-group-box').find('.j-groupname').text());

    chrome.storage.sync.get({account:'', my_urn:'', level:0, regTime:1, run:false, s_today_num:0, s_limit:100, s_skip:false, s_skip_time:3}, function(items){
        if(items.run){
            PointOut('正在批量操作中，请先停止操作，再进行批量群发！');
            return;
        }
        //检查是否有登录领英精灵账号
        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }

        //检查是否有绑定领英账号
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        //试用会员过期
        var regTime = parseInt(items.regTime) + 7*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<1 && curTime>regTime){
            ShowUpgrade('试用期已过', '试用会员可试用7天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }

        //试用会员，没有过期，检查今天是否超过限额
        if(parseInt(items.level)<1 && parseInt(items.s_today_num)>=TestCount){
            ShowUpgrade('试用名额用完', '您是试用会员，试用会员每天有' + TestCount + '个群发名额。今日群发名额已用完，升级会员不受此限制。');
            return false;
        }

        var count = parseInt(items.s_limit) - parseInt(items.s_today_num);
        if(count <= 0){
            PointOut('您今天已累计群发' + parseInt(items.s_today_num) + '条消息，已超设置的每日最多群发量，请明天再来群发或将每日群发量设置大些！');
            return false;
        }
        if(count > 200){
            count = 200;
        }

        if(items.s_skip){
            var skip = parseInt(items.s_skip_time);
        }else{
            var skip = 0;
        }

        JlConfirm('确定要给 "' + groupName + '" 分组好友群发消息吗？');
        $('#j_ok').click(function(){
            JlHttp('getSendForGroup', groupId, skip, count);
        });
    });
}

//分组页面批量群发消息获取好友结果
function GetSendForGroupResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                if(data['tidings'].length == 0){
                    PointOut('群发前请设置或选择要群发的消息内容');
                    NewTidings();
                    return false;
                }
                if(data['data'].length == 0){
                    PointOut('分组中没有可群发的好友，可能在禁发名单或在指定天内有群发过');
                    return false;
                }
                Tidings = data['tidings'];
                Friend = data['data'];
                Pos = Friend.length;
                ActionCount = 0;
                ShowStatu('批量群发消息中...');
                ShowOrHideWindow();
                BatchSend();
                chrome.storage.sync.set({run:true}, function(){})
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}


//批量添加到禁发名单
function AddProhibitForGroup(){
    var groupId = $.trim($(this).parents('.j-group-box').attr('groupid'));
    var friend = [];
    $("input[name='g_" + groupId + "']:checkbox:checked").each(function(){
        friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
    });

    if(friend.length <= 0){
        PointOut('请选择要添加到禁发名单的好友');
    }else{
        JlConfirm('确定要将选择的 ' + friend.length + ' 位好友添加到禁发名单吗？', '确定');
        $('#j_ok').on('click', function(){
            friend = JSON.stringify(friend);
            JlHttp('updateProhibit', friend, 'g_', 1);
        });
    }
}

//将好友移出分组
function DeleteGroupFriend(){
    var friend = [];
    friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
    friend = JSON.stringify(friend);
    JlHttp('grouping', friend, 'group', '0');
}






/*-------------------------群发页面-------------------------*/
//显示群发页面
function ShowSendPage(){
    if(SendPage){
        GetTidings();
        SendPage = false;
    }
}
//显示群发页面的子页面
function ShowSendOption(){
    $('#j_send .j-option-nav').removeClass('j-option-nav-active');
    $(this).addClass('j-option-nav-active');
    var option = $(this).attr('option');
    $('#j_send .j-option').removeClass('j-option-active');
    $('#j_s_' + option).addClass('j-option-active');
    switch(option){
        case 'cont':
            //消息内容页面
            GetTidings();
            break;
        case 'prohibit':
            //禁发名单
            GetProhibit();
            break;
        default:

            break;
    }
}


//获取群发内容
function GetTidings(){
    JlHttp('getTidings', '', '', '');
}

//获取消息结果
function GetTidingsResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('获取失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                $('#j_tidings_box').empty();
                $("input[name='selectalltidings']").prop('checked',false);
                PointOut('获取完成');
                if(data['data'] && data['data'].length>0){
                    for(var i=0; i<data['data'].length; i++){
                        AppendTidings(data['data'][i]);
                    }
                }else{
                    var node = '<div class="j-explain-box">' +
                        '<p>群发消息前，请新增并选择要群发的内容。<font style="color:#999">(建议多设置几条，群发时会从选择的内容里随机一条发送)</font><p/>'+
                        '<a href="http://linkedinjl.com/help?o=sendmsg" target="_black">查看详细教程</a>'+
                    '</div>';
                    $('#j_tidings_box').append(node);
                    PointOut('没有群发内容');
                }
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('新增失败，请检查网络，勿翻墙！');
    }
}

//添加消息内容到列表中
function AppendTidings(data){
    var node='<div class="j-nowrap j-w j-tidings" tid="'+ data['tidings_id'] +'">'+
        '<div class="j-tidings-cont" title="双击修改内容">' + data['tidings'] + '</div>';
    if(parseInt(data['is_select']) == 1){
        node += '<div class="j-tidings-select"><input type="checkbox" name="tidings" checked=true' + '></div>';
    }else{
        node += '<div class="j-tidings-select"><input type="checkbox" name="tidings"></div>';
    }
    node += '</div>'+
    $('#j_tidings_box').append(node);
}



//全选或全不选消息内容
function SelectAllTidings(){
    if($(this).prop('checked')){
        //全选
        var count = $("input[name='tidings']").length;
        if(count == 0){
            PointOut('没有可选，请先新增群发内容', 1)
        }else{
            JlHttp('selectAllTidings', 1, '', count);
        }
    }else{
        //全不选
        JlHttp('selectAllTidings', 0, '', count);
    }
}

//全选全不选消息结果
function SelectAllTidingsResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                if(data['action'] ==1){
                    $("input[name='tidings']").prop('checked',true);
                    PointOut('选择了 ' + data['count'] + ' 条消息内容');
                }else{
                    $("input[name='tidings']").prop('checked',false);
                    PointOut('消息内容已全部取消，群发前要先选择群发的消息内容');
                }
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//删除消息内容
function DeleteTidings(){
    var count = $("input[name='tidings']:checkbox:checked").length;
    if(count == 0){
        PointOut('请选择要删除的消息内容');
        return false;
    }else{
        JlConfirm('确定要删除选择的 ' + count + ' 条消息内容吗？', '确定');
    }
    $('#j_ok').on('click', function(){
        JlHttp('deleteTidings', '', '', '');
    });
}

//删除消息内容结果
function DeleteTidingsResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                PointOut('删除成功');
                GetTidings();
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//单个选择消息内容
function SelectTidings(){
    if($(this).prop('checked')){
        //选择
        var tidingsId = $.trim($(this).parents('.j-tidings').attr('tid'));
        JlHttp('selectTidings', tidingsId, '', 1);
    }else{
        //取消
        var tidingsId = $.trim($(this).parents('.j-tidings').attr('tid'));
        JlHttp('selectTidings', tidingsId, '', 0);
    }
}

//单个选择消息内容结果
function SelectTidingsResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//修改消息内容
function ResetTidings(){
    var tidings = $.trim($(this).text());
    var tidings_id = $.trim($(this).parents('.j-tidings').attr('tid'));
    $('.j-dialog').remove();
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>修改消息</h3>'+
                '</div>'+
            '</div>'+

            '<div class="j-prompt-cont">'+
                '<div calss="j-w">' +
                    '<div class="j-insertname">'+
                        '<button id="j_send_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>'+
                        '<button id="j_send_firstname" class="j-bg-btn j-layout-btn">插入名字</button>'+
                    '</div>'+
                    '<textarea id="j_tidings" class="j-msg-cont">'+ tidings +'</textarea>'+
                '</div>' +
            '</div>' +

            '<div class="j-prompt-ctrl">'+
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">确定</button>'+
            '</div>'+
        '</div>'+
    '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);

    //确定新增
    $('#j_ok').on('click', function(){
        var newTidings = $.trim($("#j_tidings").val());
        if(!newTidings){
            PointOut("发送内容不能为空",2);
            return false;
        }
        if(newTidings == tidings){
            $('.j-dialog').remove();
            PointOut('更新成功');
            return false;
        }
        JlHttp('saveTidings', tidings_id, '', newTidings);
    });
}

//新增消息内容
function NewTidings(){
    $('.j-dialog').remove();
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-bg-w j-box-sha">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>新增消息</h3>'+
                '</div>'+
            '</div>'+

            '<div class="j-prompt-cont">'+
                '<div calss="j-w">' +
                    '<div class="j-insertname">'+
                        '<button id="j_send_lastname" class="j-bg-btn j-layout-btn">插入姓氏</button>'+
                        '<button id="j_send_firstname" class="j-bg-btn j-layout-btn">插入名字</button>'+
                    '</div>'+
                    '<textarea id="j_tidings" class="j-msg-cont" placeholder="请输入要群发的消息内容(请不要违返Linkedin规则，发送黄赌毒等骚扰对方的广告消息，不要滥用群发功能。)"></textarea>'+
                '</div>' +
            '</div>' +

            '<div class="j-prompt-ctrl">'+
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">确定新增</button>'+
            '</div>'+
        '</div>'+
    '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    //确定新增
    $('#j_ok').on('click', function(){
        var tidings = $.trim($("#j_tidings").val());
        if(!tidings){
            PointOut("发送内容不能为空",2);
            return false;
        }
        var tidings_id = String(new Date().getTime());
        JlHttp('saveTidings', tidings_id, '', tidings);
    });
}

function SaveTidingsResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('添加失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                PointOut('新增成功');
                $('.j-dialog').remove();
                GetTidings();
                break;

            case 2:
                PointOut('修改成功');
                $('.j-dialog').remove();
                GetTidings();
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('新增失败，请检查网络，勿翻墙！');
    }
}

//群发消息内容插入名字
function InsertSendFirstName(){
    var cont = document.getElementById('j_tidings');
    InsertAfterText(cont,'[FirstName]');    //插入名字到光标处
}

//群发消息内容插入姓氏
function InsertSendLastName(){
    var cont = document.getElementById('j_tidings');
    InsertAfterText(cont,'[LastName]');     //插入姓氏到光标处
}

//插入内容到光标前
function InsertAfterText(textDom, value) {
    var selectRange;
    if (document.selection) {
        // IE Support
        textDom.focus();
        selectRange = document.selection.createRange();
        selectRange.text = value;
        textDom.focus();
    }else if (textDom.selectionStart || textDom.selectionStart == '0') {
        // Firefox support
        var startPos = textDom.selectionStart;
        var endPos = textDom.selectionEnd;
        var scrollTop = textDom.scrollTop;
        textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length);
        textDom.focus();
        textDom.selectionStart = startPos + value.length;
        textDom.selectionEnd = startPos + value.length;
        textDom.scrollTop = scrollTop;
    }
    else {
        textDom.value += value;
        //textDom.focus();
    }
}

//获取禁发名单
function GetProhibit(){
    var firstName = $.trim($('#j_prohibit_firstname').val());
    var lastName = $.trim($('#j_prohibit_lastname').val());
    var para = {"firstName":firstName, "lastName":lastName, "page":1, "count":40};
    para = JSON.stringify(para);
    JlHttp('getProhibit', para, '', '');
}

//获取禁发名单结果
function GetProhibitResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                $('#j_prohibit_box').empty();
                PointOut('获取完成', 1);
                if(data['total'] > 0 && data['data'] && data['data'].length > 0){
                    var node = '<div class="j-num">禁发好友：' + data['total'] + '人</div>';
                    $('#j_prohibit_box').append(node);

                    for(var i=0; i<data['data'].length; i++){
                        AppendProhibit(data['data'][i]);
                    }

                }else{
                    //没有禁发名单好友
                    PointOut('禁发名单中没有匹配好友');
                    var node = '<div class="j-explain-box">' +
                        '<p>添加到禁发名单中的好友在群发是不会群发消息。<p/>'+
                        '<a href="http://linkedinjl.com/help?o=prohibit" target="_black">查看详细教程</a>'+
                    '</div>';
                    $('#j_prohibit_box').append(node);
                    $('#j_prohibit_firstname').val('');
                    $('#j_prohibit_firstname').val('');
                    return false;
                }

                ShowPaging('j_prohibit_paging', data['page'], data['total'], data['count']);
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//添加禁发名单
function AppendProhibit(data){
    if(!data['img']){
        data['img'] ='http://linkedinjl.com/expand/version9/img/me.png';
    }

    var name = GetName(data['first_name'], data['last_name']);
    var node = '<div class="j-friend j-nowrap" id=p_' + data['urn'] + '>'+
        '<div class="j-profile-box j-nowrap-left">'+
            '<div><a href="https://www.linkedin.com/in/' + data['public_id'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>'+
            '<div class="j-profile">'+
                '<h3 class="j-oneline">' + name + '</h3>' +
                '<p class="j-oneline">' + data['position'] + '</p>'+
            '</div>' +
        '</div>'+
        '<div>'+
            '<input type="checkbox" name="prohibit">' +
        '</div>'+
    '</div>';
    $('#j_prohibit_box').append(node);
}

//全选/全不选群发队列
function SelectAllProhibit(){
    if($(this).prop('checked')){
        $("input[name='prohibit']").prop('checked',true);
        var count = $("input[name='prohibit']:checkbox:checked").length;
        if(count == 0){
            PointOut('禁发名单中没有可选', 1)
        }else{
            PointOut('选择了 ' + count + ' 位好友', 1);
        }
    }else{
        $("input[name='prohibit']").prop('checked',false);
    }
}

//获取指定页的禁发名单
function GetProhibitSomePage(){
    var firstName = $.trim($('#j_prohibit_firstname').val());
    var lastName = $.trim($('#j_prohibit_lastname').val());
    var page = parseInt($(this).text());
    var para = {"firstName":firstName, "lastName":lastName, "page":page, "count":40};
    para = JSON.stringify(para);
    JlHttp('getProhibit', para, '', '');
}

//回车键跳到指定禁发页 
function JumpProhibitEnter(event){
    if(event.keyCode == 13){
        JumpProhibit();
    }
}

//跳到指定禁发页
function JumpProhibit(){
    var maxpage = parseInt($('#j_prohibit_paging .j-paging:last').text());
    var page = parseInt($('#j_prohibit_paging .j-jump').val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(page)) { 
    　　PointOut('请输入正确的页数', 3); 
    　　return false;
    }
    var curpage = parseInt($('#j_prohibit_paging .j-curpage').text());
    if(page == curpage){
        PointOut('获取完成');
        return false;
    }
    if(page > maxpage){
        PointOut('请输入正确页数，1-' + maxpage + ' 范围内', 3);
        return false;
    }

    var firstName = $.trim($('#j_prohibit_firstname').val());
    var lastName = $.trim($('#j_prohibit_lastname').val());
    var para = {"firstName":firstName, "lastName":lastName, "page":page, "count":40};
    para = JSON.stringify(para);
    JlHttp('getProhibit', para, '', 20);
}

//移出禁发名单
function MoveProhibit(){
    var friend = [];
    $("input[name='prohibit']:checkbox:checked").each(function(){
        friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
    });

    if(friend.length <= 0){
        PointOut('请选择要移出的好友');
    }else{
        JlConfirm('确定要将选择的 ' + friend.length + ' 位好友移出禁发名单吗？', '确定');
        $('#j_ok').on('click', function(){
            friend = JSON.stringify(friend);
            JlHttp('updateProhibit', friend, 'p_', 0);
        });
    }
}

/*---------------------------导出页面---------------------------*/
//初始挖掘页面
function ShowDigPage(){
    GetDig(1);
}

//获取挖掘过的好友
function GetDig(page){
    page = page || 1;
    JlHttp('getDig', page, '', 40);
}

function GetDigResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                $('#j_dig_box').empty();
                PointOut('完成');
                $("input[name='selectalldig']").prop('checked',false);

                if(data['data'] && data['data'].length > 0){
                    var node = '<div class="j-num">已挖掘：' + data['total'] + '人</div>';
                    $('#j_dig_box').append(node);
                    for(var i=0; i<data['data'].length; i++){
                        AppendDig(data['data'][i]);
                    }
                }else{
                    var node = '<div class="j-explain-box">' +
                       '<p>没有挖掘的好友，导出前，请先挖掘。<p/>'+
                       '<a href="http://linkedinjl.com/help?o=dig" target="_black">查看详细教程</a>'+
                    '</div>';
                    $('#j_dig_box').append(node);
                }
                ShowPaging('j_dig_paging', data['page'], data['total'], data['count']);
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//挖掘过的好友添加到表中
function AppendDig(data){
    if(!data['img']){
        data['img'] ='https://pic.rmb.bdstatic.com/bjh/80bee57048cf8f5ec6f4e343f9f172cf.png@wm_2,t_55m+5a625Y+3L+mihuiLseeyvueBtQ==,fc_ffffff,ff_U2ltSGVp,sz_2,x_2,y_2';
    }

    var name = GetName(data['first_name'], data['last_name']);
    var node = '<div class="j-friend j-nowrap" id=e_' + data['urn'] + '>'+
        '<div class="j-profile-box j-nowrap-left">'+
            '<div><a href="https://www.linkedin.com/in/' + data['public_id'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>'+
            '<div class="j-profile" title="双击显示详细资料">'+
                '<h3 class="j-oneline">' + name + '</h3>' +
                '<p class="j-oneline">' + data['position'] + '</p>'+
                '<p style="color:#999;">挖掘日期：' + data['dig_time'] +'</p>'+
            '</div>' +
        '</div>'+

        '<div class="j-tool-box" style="padding-top:24px;">'+
            '<a class="j-look" href="javascript:;" title="查看详细资料">查看详情</a>'+
        '</div>'+

        '<div>'+
            '<input type="checkbox" name="dig">' +
        '</div>'+
    '</div>';
    $('#j_dig_box').append(node);
}

//回车跳到指定已挖掘页
function JumpDigEnter(event){
    if(event.keyCode == 13){
        JumpDig();
    }
}

//跳到指定已挖掘页
function JumpDig(){
    var maxpage = parseInt($('#j_dig_paging .j-paging:last').text());
    var page = parseInt($('#j_dig_paging .j-jump').val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(page)) { 
    　　PointOut('请输入正确的页数', 3); 
    　　return false;
    }
    var curpage = parseInt($('#j_dig_paging .j-curpage').text());
    if(page == curpage){
        PointOut('获取完成');
        return false;
    }
    if(page > maxpage){
        PointOut('请输入正确页数，1-' + maxpage + ' 范围内', 3);
        return false;
    }
    GetDig(page);
}

//跳到相应页的已挖掘页
function GetDigSomePage(){
    var page = parseInt($(this).text());
    GetDig(page);
}

//全选全不选已挖掘
function SelectAllDig(){
    if($(this).prop('checked')){
        $("input[name='dig']").prop('checked',true);
        var count = $("input[name='dig']:checkbox:checked").length;
        if(count == 0){
            PointOut('没有可选择的好友', 1)
        }else{
            PointOut('选择了 ' + count + ' 位好友', 1);
        }
    }else{
        $("input[name='dig']").prop('checked',false);
    } 
}

//双击好友显示好友详细资料
function ShowFriendProfile(){
    var urn = $.trim($(this).parents('div.j-friend').attr('id')).slice(2,41);
    JlHttp('getFriendProfile', urn, '', '');
}

//获取已挖掘的好友详细资料的结果
function GetFriendProfileResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('获取失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                if(data['data']){
                    ShowProfile(data['data'][0]);
                }else{
                    PointOut('获取失败，请尝试刷新页面或重启浏览器');
                }
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期已过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }

    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//导出选择的
function ExportForSelect(){
    chrome.storage.sync.get({account:'',my_urn:'', level:0},function(items){
        if(parseInt(items.level) < 2){
            ShowUpgrade('试用期已过', '非钻石会员不支持导出功能，升级钻石会员可无限导出。');
            return false;
        }

        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        var count = $("input[name='dig']:checkbox:checked").length;
        if(count == 0){
            PointOut('请选择要导出的好友');
        }else{
            JlConfirm('确定要导出选择的 ' + count + ' 位好友吗？');
            $('#j_ok').click(function(){
                var friend = [];
                $("input[name='dig']:checkbox:checked").each(function(){
                    friend.push($.trim($(this).parents('div.j-friend').attr('id')).slice(2,41));
                });
                friend = JSON.stringify(friend);
                window.open('http://linkedinjl.com/exportdig/type/select/account/' + account + '/my_urn/' + my_urn + '/f/' + friend);
            });
        }
    });
}

//按挖掘时间导出
function ExportForDigTime(){
    chrome.storage.sync.get({account:'',my_urn:'', level:0},function(items){
        if(parseInt(items.level) < 2){
            ShowUpgrade('试用期已过', '非钻石会员不支持导出功能，升级钻石会员可无限导出。');
            return false;
        }

        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            ShowLoginDialog();
            PointOut('请先登录领英精灵账号');
            return false;
        }
        if(!my_urn){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        var node = '<div class="j-dialog j-div-center">'+
            '<div class="j-confirm-box j-digdate j-div-center j-box-sha">'+
                '<div>' +
                    '<p>选择挖掘时间</p>' +
                '</div>' +
                '<div class="j-nowrap">' +
                    '<div title="导出今日挖掘的"><input type="radio" name="digtime" value="today" checked="checked">今日</div>' +
                    '<div title="导出近一周挖掘的"><input type="radio" name="digtime" value="week">一周</div>' +
                    '<div title="导出近一月挖掘的"><input type="radio" name="digtime" value="month">一月</div>' +
                    '<div title="导出全部挖掘的"><input type="radio" name="digtime" value="all">全部</div>' +
                '</div>' +
                '<div style="text-align:right;">'+
                    '<button id="j_cancel" class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                    '<button id="j_ok" class="j-bg-btn j-layout-btn j-close-dialog">确定</button>'+
                '</div>'+
            '</div>'+
        '</div>';
        $('#j_lyjl_window').append(node);
        $(".j-dialog").fadeIn(200);

        $('#j_ok').on('click',function(){
            var digtime = $.trim($("input[name='digtime']:checked").val());
            window.open('http://linkedinjl.com/exportdig/type/digtime/account/' + account + '/my_urn/' + my_urn + '/digtime/' + digtime);
        });
    });
}

//挖掘好友资料
function DigData(urn, publicId, tag){
    var profile = {};//个人信息
    var work = [];//工作经历
    var education = [];//教育经历
    var skill = [];//技能
    var tok = getCookie('JSESSIONID').replace(/"/g,'');
    if(!tok){
        return false;
    }
     var url = 'https://www.linkedin.com/voyager/api/identity/profiles/' + publicId + '/profileView';
    $.ajax({
        url: url,
        type: 'get',
        headers: {
            "Accept": 'application/vnd.linkedin.normalized+json+2.1',
            'csrf-token':tok,
            'x-restli-protocol-version': '2.0.0'
        },
        success:function(data){
            if(data['included']){
                var overt = data['included'];
                for(var i=0; i < overt.length; i++){
                    //关于信息
                    if(overt[i]['$type'] == 'com.linkedin.voyager.identity.profile.Profile'){
                        profile['urn'] = urn;
                        profile['publicId'] = publicId;
                        var summary = overt[i];
                        //城市
                        if(summary && summary['locationName']){
                            profile['city'] = summary['locationName'].substr(0, 50);
                        }else{
                            profile['city'] = '';
                        }

                        //行业
                        if(summary && summary['industryName']){
                            profile['industry'] = summary['industryName'].substr(0, 50);
                        }else{
                            profile['industry'] = '';
                        }

                        //关于介绍
                        if(summary && summary['summary']){
                            profile['about'] = summary['summary'].substr(0, 1000);
                        }else{
                            profile['about'] = '';
                        }

                        //国家
                        if(summary && summary['geoCountryName']){
                            profile['country'] = summary['geoCountryName'].substr(0, 50);
                        }else{
                            profile['country'] = '';
                        }
                    }

                    //个人信息
                    if(overt[i]['$type'] == 'com.linkedin.voyager.identity.shared.MiniProfile'){
                        var cont = overt[i];
                        //姓氏
                        if(cont && cont['firstName']){
                            profile['firstname'] = cont['firstName'].substr(0, 50);
                        }else{
                            profile['firstname'] = '';
                        }

                        //名字
                        if(cont && cont['lastName']){
                            profile['lastname'] = cont['lastName'].substr(0, 50);
                        }else{
                            profile['lastname'] = '';
                        }

                        //职位
                        if(cont && cont['occupation']){
                            profile['position'] = cont['occupation'].substr(0, 120);
                        }else{
                            profile['position'] = '';
                                                                    }
                        //头像地址
                        if(cont && cont['picture'] && cont['picture']['rootUrl'] && cont['picture']['artifacts'] && cont['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment']){
                            profile['img'] = cont['picture']['rootUrl'] + cont['picture']['artifacts'][0]['fileIdentifyingUrlPathSegment'];
                        }else{
                            profile['img'] = '';
                        }
                    }

                    //工作经历
                    if(overt[i]['$type'] == 'com.linkedin.voyager.identity.profile.Position'){
                        var t_work ={};//临时公司
                        //工作经历唯一标识
                        if(overt[i]['entityUrn']){
                            var workId = overt[i]['entityUrn'].split(',')[1];
                            t_work['workId']  = workId.substring(0, workId.length-1);
                        }else{
                            t_work['workId'] = null;
                        }

                        //公司名
                        if(overt[i]['companyName']){
                            if(!profile['company']){
                                profile['company'] = overt[i]['companyName'].substr(0, 120);
                            }
                            
                            t_work['companyName'] = overt[i]['companyName'].substr(0, 120);
                        }else{
                            t_work['companyName'] = '';
                            profile['company'] = '';
                        }

                        //公司地区
                        if(overt[i]['locationName']){
                            t_work['locationName'] = overt[i]['locationName'].substr(0, 120);
                        }else{
                            t_work['locationName'] = '';
                        }

                        //职位
                        if(overt[i]['title']){
                            t_work['position'] = overt[i]['title'].substr(0, 140);
                        }else{
                            t_work['position'] = '';
                        }

                        //描述
                        if(overt[i]['description']){
                            t_work['description'] = overt[i]['description'].substr(0, 2000);
                        }else{
                            t_work['description'] = '';
                        }

                        //开始时间,年
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['startDate'] && overt[i]['timePeriod']['startDate']['year']){
                            t_work['startYear'] = overt[i]['timePeriod']['startDate']['year'];
                        }else{
                            t_work['startYear'] = 0;
                        }

                        //开始时间，月
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['startDate'] && overt[i]['timePeriod']['startDate']['month']){
                            t_work['startMonth'] = overt[i]['timePeriod']['startDate']['month'];
                        }else{
                            t_work['startMonth'] = 0;
                        }

                        //结束时间/年
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['endDate'] && overt[i]['timePeriod']['endDate']['year']){
                            t_work['endYear'] = overt[i]['timePeriod']['endDate']['year'];
                        }else{
                            t_work['endYear'] = 0;
                        }

                               
                        //结束时间/月
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['endDate'] && overt[i]['timePeriod']['endDate']['month']){
                            t_work['endMonth'] = overt[i]['timePeriod']['endDate']['month'];
                        }else{
                            t_work['endMonth'] = 0;
                        }
                        work.push(t_work);
                    }

                    //教育经历  
                    if(overt[i]['$type'] == 'com.linkedin.voyager.identity.profile.Education'){
                        var t_edu ={};//临时教育
                        //教育经历唯一标识
                        if(overt[i]['entityUrn']){
                            var eduId = overt[i]['entityUrn'].split(',')[1];
                            t_edu['eduId']  = eduId.substring(0, eduId.length-1);
                        }else{
                            t_edu['eduId'] = null;
                        }
                        //学校名
                        if(overt[i]['schoolName']){
                            profile['school'] = overt[i]['schoolName'];
                            t_edu['schoolName'] = overt[i]['schoolName'].substr(0, 120);
                        }else{
                            profile['school'] = '';
                            t_edu['schoolName'] = '';
                        }
                        //专业
                        if(overt[i]['fieldOfStudy']){
                            t_edu['major'] = overt[i]['fieldOfStudy'].substr(0, 120);
                        }else{
                            t_edu['major'] = '';
                        }

                        //学历
                        if(overt[i]['degreeName']){
                            t_edu['degreeName'] = overt[i]['degreeName'].substr(0, 120);
                        }else{
                            t_edu['degreeName'] = '';
                        }

                        //描述
                        if(overt[i]['description']){
                            t_edu['description'] = overt[i]['description'].substr(0, 1000);
                        }else{
                            t_edu['description'] = '';
                        }
                        //开始时间/年
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['startDate'] && overt[i]['timePeriod']['startDate']['year']){
                            t_edu['startYear'] = overt[i]['timePeriod']['startDate']['year'];
                        }else{
                            t_edu['startYear'] = 0;
                        }

                        //开始时间/月
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['startDate'] && overt[i]['timePeriod']['startDate']['month']){
                            t_edu['startMonth'] = overt[i]['timePeriod']['startDate']['month'];
                                    
                        }else{
                            t_edu['startMonth'] = 0;
                        }

                        //结束时间/年
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['endDate'] && overt[i]['timePeriod']['endDate']['year']){
                            t_edu['endYear'] = overt[i]['timePeriod']['endDate']['year'];
                                    
                        }else{
                            t_edu['endYear'] = 0;
                        }

                        //结束时间/月
                        if(overt[i]['timePeriod'] && overt[i]['timePeriod']['endDate'] && overt[i]['timePeriod']['endDate']['month']){
                            t_edu['endMonth'] = overt[i]['timePeriod']['endDate']['month'];
                                    
                        }else{
                            t_edu['endMonth'] = 0;
                        }
                        education.push(t_edu);
                    }

                    //技能
                    if(overt[i]['$type'] == "com.linkedin.voyager.identity.profile.Skill"){ 
                        var t_skill = {};
                        //技能Id
                        if(overt[i]['entityUrn']){
                            var skillId = overt[i]['entityUrn'].split(',')[1];
                            t_skill['skillId'] = skillId.substring(0, skillId.length-1);

                        }else{
                            t_skill['skillId'] = null;
                        }
                        //技能名称
                        if(overt[i]['name']){
                            t_skill['skillName'] = overt[i]['name'];
                        }else{
                            t_skill['skillName'] = '';
                        }
                        skill.push(t_skill);
                    }
                }

                var url = 'https://www.linkedin.com/voyager/api/identity/profiles/' + publicId + '/profileContactInfo';
                $.ajax({
                    url: url,
                    type: 'get',
                    headers: {
                        "Accept": 'application/vnd.linkedin.normalized+json+2.1',
                        'csrf-token':tok,
                        'x-restli-protocol-version': '2.0.0'
                    },
                    success: function (data) {
                        if(data['data']){
                            var contact = data['data'];
                            //邮箱地址
                            if(contact['emailAddress']){
                                profile['email'] = contact['emailAddress'];
                            }else{
                                profile['email'] = '';
                            }

                            //详细地址
                            if(contact['address']){
                                profile['address'] = contact['address'].substr(0, 140);
                            }else{
                                profile['address'] = '';
                            }

                            //添加好友时间
                            if(contact['connectedAt']){
                                profile['connected'] = contact['connectedAt'];
                            }else{
                                profile['connected'] = 10000000;
                            }

                            //ims
                            if(contact['ims']){
                                var ims = '';
                                for(var i=0; i< contact['ims'].length; i++){
                                    ims = ims + contact['ims'][i]['provider'] + ':' + contact['ims'][i]['id'] + ' ';
                                }
                                profile['ims'] = ims;
                            }else{
                                profile['ims'] = '';
                            }

                            //电话 
                            if(contact['phoneNumbers']){
                                var phone = '';
                                for(var i=0; i< contact['phoneNumbers'].length; i++){
                                    phone = phone + contact['phoneNumbers'][i]['type'] + ':' + contact['phoneNumbers'][i]['number'] + ' ';
                                }
                                profile['phone'] = phone;
                            }else{
                                profile['phone'] = '';
                            }

                            //Twitter
                            if(contact['twitterHandles']){
                                var twitter = '';
                                for(var i=0; i < contact['twitterHandles'].length; i++){
                                    twitter = twitter + contact['twitterHandles'][i]['name'] + ' ';
                                }
                                profile['twitter'] = twitter;
                            }else{
                                profile['twitter'] = '';
                            }

                            //网站
                            if(contact['websites']){
                                var websites = '';
                                for(var i=0; i< contact['websites'].length; i++){
                                    websites = websites + contact['websites'][i]['type']['category'] + ':' + contact['websites'][i]['url'] + ' ';
                                }
                                profile['websites'] = websites.substr(0, 200);
                            }else{
                                profile['websites'] = '';
                            }

                            var prof = JSON.stringify(profile);
                            JlHttp('saveDigData', prof, tag, '');
                            if(tag == 'f_' || tag == 'g_'){
                                //显示挖掘到的详细资料
                                PointOut('挖掘完成', 1);
                                $('#'+ tag + urn).find('.j-dig svg *').removeClass('j-svg-0');
                                $('#'+ tag + urn).find('.j-dig svg *').addClass('j-svg-1');
                                $('#'+ tag + urn).find('.j-dig').attr('title', '已挖掘，点击查看详情');
                                $('#'+ tag + urn).find('.j-dig').attr('state', 1);
                                ShowProfile(profile);
                            }
                            
                            //当日挖掘数量加1
                            chrome.storage.sync.get({d_today_num:0}, function(items){
                                var today_num = parseInt(items.d_today_num) + 1;
                                chrome.storage.sync.set({d_today_num:[today_num]}, function(){});
                            });
                        }
                    }
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown){
            //删除无效好友
            if(jqXHR.status == 403){
                JlHttp('deleteInvalidFriend', urn, '', '');
            }
        }
    });
}

//显示人脉的详细资料
function ShowProfile(data){
    var name = GetName(data['firstname'], data['lastname']);
    var node = '<div class="j-dialog j-div-center j-detail-bg">'+
            '<div class="j-detail-box j-div-center">' +
                '<div>'+
                    '<h2>' + name + '</h2>'+
                '</div>' +
                '<hr>';
                if(data['email']){
                    node += '<div class="j-nowrap-left j-contact"><font>邮箱：</font><span>' + data['email'] + '</span></div>';
                }
                if(data['phone']){
                    node += '<div class="j-nowrap-left j-contact"><font>电话：</font><span>' + data['phone'] + '</span></div>';
                }
                if(data['ims']){
                    node += '<div class="j-nowrap-left j-contact"><font>社交账号：</font><span>' + data['ims'] + '</span></div>';
                }
                if(data['twitter']){
                    node += '<div class="j-nowrap-left j-contact"><font>推特：</font><span>' + data['twitter'] + '</span></div>';
                }
                if(data['school']){
                    node += '<div class="j-nowrap-left"><font>学校：</font><span>' + data['school'] + '</span></div>';
                }
                if(data['country']){
                    node += '<div class="j-nowrap-left"><font>国家：</font><span>' + data['country'] + '</span></div>';
                }
                if(data['city']){
                    node += '<div class="j-nowrap-left"><font>城市：</font><span>' + data['city'] + '</span></div>';
                }
                if(data['address']){
                    node += '<div class="j-nowrap-left"><font>详细地址：</font><span>' + data['address'] + '</span></div>';
                }
                if(data['company']){
                    node += '<div class="j-nowrap-left"><font>公司：</font><span>' + data['company'] + '</span></div>';
                }
                if(data['position']){
                    node += '<div class="j-nowrap-left"><font>职位：</font><span>' + data['position'] + '</span></div>';
                }
                if(data['websites']){
                    node += '<div class="j-nowrap-left"><font>网址：</font><span>' + data['websites'] + '</span></div>';
                }
                
                if(data['about']){
                    node += '<div class="j-nowrap-left"><font>个人简介：</font></div>' +
                        '<div class="j-about"><p>' + data['about'] + '</p></div>';
                }
            node += '</div>' +
        '</div>';
    $('#j_lyjl_window').append(node);
    $(".j-dialog").fadeIn(200);
}



//保存挖掘的好友资料结果
function saveDigDataResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                break;

            case 1:
                           
                break;

            case 3:
                //没有登录领英精灵账号
                if(data['tag'] == 'batch'){
                    //批量挖掘
                    StopAction();
                    setTimeout(function(){
                        alert('没有登录领英精灵，请登录领英精灵账号');
                    }, 50);
                }else{
                    //单个挖掘
                    ShowLoginDialog();
                    PointOut('没有登录领英精灵，请登录领英精灵账号');
                }
                break;

            case 4:
                //没有绑定领英账号
                if(data['tag'] == 'batch'){
                    StopAction();
                    setTimeout(function(){
                        if(confirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？")){
                            BindLinkedin(false);
                        }
                    }, 50);
                }else{
                    JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                    $('#j_ok').click(function(){
                        BindLinkedin(true);
                    });
                    break;
                }
                break;

            case 5:
                //登录超过
                if(data['tag'] == 'batch'){
                    StopAction();
                    setTimeout(function(){
                        alert('没有登录领英精灵，请登录领英精灵账号');
                    }, 50);
                }else{
                    ShowLoginDialog();
                    PointOut('没有登录领英精灵，请登录领英精灵账号');
                }
                break;

            case 6:
                //异地登录中
                if(data['tag'] == 'batch'){
                    StopAction();
                    setTimeout(function(){
                        alert('其它设备有登录此领英精灵账号，请不要在其它设备登录');
                    }, 50);
                }else{
                    ShowLoginDialog();
                    PointOut('其它设备有登录此领英精灵账号，请不要在其它设备登录');
                }
                break;

            case 7:
                //试用期已过
                if(data['tag'] == 'batch'){
                    StopAction();
                    setTimeout(function(){
                        if(confirm('注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持')){
                            Upgrade();
                        }
                    }, 50);
                }else{
                    ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                }
                break;

            default:
                break;
        }
    }
}


/*----------------------- 窥探页面 -------------------------*/
//输入框回车键窥探
function StartProbeEnter(event){
    if(event.keyCode == 13){
        StartProbe();
    }
}

//开始窥探
function StartProbe(){
    Probe(1);
}

//窥探
function Probe(page){
    var keyword = $.trim($('#j_probe_keyword').val());
    if(!keyword){
        PointOut('请输入窥探关键词', 2);
        $('#j_probe_keyword').focus();
        return false;
    }
    if(keyword.length < 2){
        PointOut('关键词设置太泛，请设置至少2个字符的关键词', 2);
        $('#j_probe_keyword').focus();
        return false;
    }
    var country = $.trim($('#j_probe_country').val);
    JlHttp('probe', keyword, page, country);
}


//窥探结果
function ProbeResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                //失败
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
            case 1:
                //窥探成功
                $('#j_probe_box').empty();
                $("input[name='selectallprobe']").prop('checked',false);

                for(var i=0; i<data['data'].length; i++){
                    AppendProbe(data['data'][i]);
                }
                ShowPaging('j_probe_paging', data['page'], data['total'], 100);
                break;

            case 2:
                //非至尊会员
                ShowUpgrade('没有权限', '非至尊会员不支持窥探功能，请升级至尊会员。');
                break;


            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            case 8:
                //关键词设置错误
                PointOut('关键词设置太泛，请设置2-32个字符的关键词');
                $('#j_probe_keyword').focus();
                break;

            case 9:
                //没有窥探到
                PointOut('没有窥探到');
                $('#j_probe_box').empty();
                ShowPaging('j_probe_paging', 1, 0, 100);
                var node = '<div class="j-explain-box">' +
                    '<h2 style="color:#f00; text-align:center;">没有窥探到，请切换关键词窥探！</h2>'+
                    '<p>建议使用行业、公司名或职业关键词，如：led、manage、apple</p>'+
                '</div>';
                $('#j_probe_box').append(node);
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//显示窥探到的人脉资料
function AppendProbe(data){
    if(!data['img']){
        data['img'] ='https://pic.rmb.bdstatic.com/bjh/80bee57048cf8f5ec6f4e343f9f172cf.png@wm_2,t_55m+5a625Y+3L+mihuiLseeyvueBtQ==,fc_ffffff,ff_U2ltSGVp,sz_2,x_2,y_2';
    }
    var name = GetName(data['first_name'], data['last_name']);
    var node = '<div class="j-friend j-nowrap" pid=' + data['id'] + ' id=p_' + data['urn'] + '>' +
        '<div class="j-profile-box j-nowrap-left">'+
            '<div><a href="https://www.linkedin.com/in/' + data['public_id'] + ' "target="_black" title="打开该好友Linkedin主页"><img src="'+ data['img'] + '"></a></div>'+
            '<div class="j-profile" title="双击显示详细资料">'+
                '<h3 class="j-oneline">' + name + '</h3>' +
                '<p class="j-oneline">' + data['position'] + '</p>'+
            '</div>' +
        '</div>'+

        '<div>'+
            '<input type="checkbox" name="probe">' +
        '</div>'+
    '</div>';
    $('#j_probe_box').append(node);
}

//全选全不选窥探的人脉
function SelectAllProbe(){
    if($(this).prop('checked')){
        $("input[name='probe']").prop('checked',true);
        var count = $("input[name='probe']:checkbox:checked").length;
        if(count == 0){
            PointOut('没有可选的资料', 1)
        }else{
            PointOut('选择了 ' + count + ' 位资料', 1);
        }
    }else{
        $("input[name='probe']").prop('checked',false);
    } 
}

//回车跳到指定已挖掘页
function JumpProbeEnter(event){
    if(event.keyCode == 13){
        JumpProbe();
    }
}

//跳到指定已挖掘页
function JumpProbe(){
    var maxpage = parseInt($('#j_probe_paging .j-paging:last').text());
    var page = parseInt($('#j_probe_paging .j-jump').val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(page)) { 
    　　PointOut('请输入正确的页数', 3); 
    　　return false;
    }
    var curpage = parseInt($('#j_probe_paging .j-curpage').text());
    if(page == curpage){
        PointOut('获取完成');
        return false;
    }
    if(page > maxpage){
        PointOut('请输入正确页数，1-' + maxpage + ' 范围内', 3);
        return false;
    }
    Probe(page);
}

//跳到相应页的已挖掘页
function ProbeSomePage(){
    var page = parseInt($(this).text());
    Probe(page);
}

//导出窥探资料
function ExportProbe(){
    var count = $("input[name='probe']:checkbox:checked").length;
    if(count <= 0){
        PointOut('请选择要导出的资料');
        return false;
    }

    var probe = [];
    $("input[name='probe']:checkbox:checked").each(function(){
        probe.push($.trim($(this).parents('.j-friend').attr('pid')));
    });
    console.log(probe);
    probe = JSON.stringify(probe);
    chrome.storage.sync.get({account:'',my_urn:''},function(items){
        var account = String(items.account);
        var my_urn = String(items.my_urn);
        if(!account){
            PointOut('请先登录领英精灵账号', 3);
            ShowLoginDialog();
            return false;
        }

        JlConfirm('确定要导出选择的 ' + count + ' 条资料吗？', '确定');
        $('#j_ok').on('click',function(){
            window.open('http://linkedinjl.com/exportprobe/account/' + account + '/f/' + probe);
            $("input[name='probe']").prop('checked',false);
        });
    });
}

/*--------------------------点赞页面------------------------*/
//确定是否能批量点赞
function StartThumbs(){
    chrome.storage.sync.get({account:'', my_urn:'', run:false, level:0, regTime:1},function(items){
        if(!String(items.account)){
            ShowLoginDialog();
            return false;
        }
        if(!String(items.my_urn)){
            JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
            $('#j_ok').click(function(){
                BindLinkedin(true);
            });
            return false;
        }

        if(items.run){
            //有在操作
            PointOut('正在批量操作中，请先停止操作，再进行批量点赞！');
            return false;
        }

        //判断是否是会员
        var regTime = parseInt(items.regTime) + 7*24*60*60*1000;
        var curTime = new Date().getTime();
        if(parseInt(items.level)<1 && curTime > regTime){
            ShowUpgrade('试用期已过', '试用会员可试用7天，您的试用期已过，请升级会员使用', '立即升级');
            return false;
        }

        var url = window.location.href;
        var patt1 = new RegExp("/feed","i");
        if(patt1.test(url)){
            ActionCount = 0;
            ShowStatu('批量点赞中...');
            ShowOrHideWindow();
            BatchThumbs();
            chrome.storage.sync.set({run:true}, function(){});
        }else{
            var node = '<div class="j-dialog j-div-center j-close-dialog">'+
                '<div class="j-prompt-box j-bg-w j-div-center j-box-sha" style="width:260px; text-align:center;">'+
                    '<div style="margin:36px auto;">'+
                        '<p>点赞前，请先切换到Linkedin首页</p>'+
                        '<div style="margin:12px;"><a href="https://www.linkedin.com/feed/">前往Linkedin首页</a></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $("#j_lyjl_window").append(node);
            $(".j-dialog").fadeIn(200);
        }
    });
}

//批量点赞
function BatchThumbs(){
    chrome.storage.sync.get({account:'', t_min_speed:20, t_max_speed:40, t_limit:100, t_today_num:0, risk:true, level:0}, function(items){
        //检查是否有多个设备登录
        if(!String(items.account)){
            StopAction();
            setTimeout(function(){
                alert('没有登录领英精灵账号，可能有其它设备登录，被挤出');
            },50);
            return false;
        }

        //判断是否是试用会员和超过每日点赞量
        if(parseInt(items.level)<1 && parseInt(items.t_today_num)>=TestCount){
            StopAction();
            setTimeout(function(){
                if(confirm("试用名额已用完，试用会员每天有" + TestCount + "个试用名额，若要点赞更多，请升级会员使用")){
                    Upgrade();
                }
            },50);
            return false;
        }

        if(parseInt(items.t_today_num) >= parseInt(items.t_limit)){
            //超过今日设置的上限
            StopAction();
            setTimeout(function(){
                alert('今日累计点赞 ' + parseInt(items.t_today_num) + ' 条，已超设置的每日最多点赞量，请明天再来点赞或将每日点赞量设置大些！');                
            }, 50);
            return false;
        }
        var li = $('.core-rail div.relative .ember-view:first');
        if(li.length < 1){
            StopAction();
            setTimeout(function(){
                alert('本次成功点赞 ' + ActionCount + ' 条动态');
            }, 50);
            return false;
        }

        if($('.core-rail div.relative .ember-view').length < 5){
            $('html, body').animate({scrollTop: $(document).height()},200);
        }else{
            $('html, body').animate({scrollTop: 0},200);
        }

        if(li.find('button.react-button__trigger').attr('aria-pressed') == 'true'){
            //点赞过
            li.remove();
            Timeout = setTimeout(function(){
                chrome.runtime.sendMessage({action:'loop', result:'batchThumbs', other:''}, function(response){});
            }, 500);
        }else{
            //没有点赞过
            li.find('button.react-button__trigger').click();
            //删除点赞过的动态 
            setTimeout(function(){
                li.remove();
            }, 2000);
            
            ActionCount++;
            var today_num = parseInt(items.t_today_num) + 1;
            chrome.storage.sync.set({t_today_num:[today_num]}, function(){});
            JlHttp('saveThumbsRecord', '', '', '');


            var time = GetTime(parseInt(items.t_today_num) ,parseInt(items.t_min_speed), parseInt(items.t_max_speed), items.risk);
            Delayed_time = time; 
            DelayedTime();      //显示延时
            $('#j_action_count').text('本次已赞：' + ActionCount + "条");
            if(today_num > 100){
                $('#j_today_count').html('<font style="color:#f00;">今日已赞：' + today_num + "条</font>");
            }else{
                $('#j_today_count').text('今日已赞：' + today_num + "条");
            }
            Timeout = setTimeout(function(){
                chrome.runtime.sendMessage({action:'loop', result:'batchThumbs', other:''}, function(response){});
            }, time*1000);
        }
    });
}

//保存点赞记录结果
function saveThumbsRecordResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                break;

            case 1:
                                
                break;

            case 3:
                //没有登录领英精灵账号
                StopAction();
                setTimeout(function(){
                    alert('没有登录领英精灵，请登录领英精灵账号');
                }, 50);
                break;

            case 4:
                //没有绑定领英账号
                StopAction();
                setTimeout(function(){
                    if(confirm("没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？")){
                        BindLinkedin(false);
                    }
                }, 50);
                break;

            case 5:
                //登录超过
                StopAction();
                setTimeout(function(){
                    alert('没有登录领英精灵，请登录领英精灵账号');
                }, 50);
                break;

            case 6:
                //异地登录中
                StopAction();
                setTimeout(function(){
                    alert('其它设备有登录此领英精灵账号，请不要在其它设备登录');
                }, 50);
                break;

            case 7:
                //试用期已过
                StopAction();
                setTimeout(function(){
                    if(confirm("注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持")){
                        Upgrade();
                    }
                }, 50);
                break;

            default:
                break;
        }
    }
}




/*-------------------------设置页面-------------------------*/

//显示设置页面
function ShowSetPage(){
    chrome.storage.sync.get({s_min_speed:30, s_max_speed:60, s_limit:100, s_skip:false, s_skip_time:3,
        a_min_speed:30, a_max_speed:60, a_limit:100,
        d_min_speed:60, d_max_speed:120, d_limit:100,
        t_min_speed:20, t_max_speed:40, t_limit:100,
        risk:true}, function(items){
        
        //显示群发消息参数
        $('#s_min_speed').val(items.s_min_speed);
        $('#s_max_speed').val(items.s_max_speed);
        $('#s_limit').val(items.s_limit);
        $('#s_skip').prop('checked',Boolean(items.s_skip));
        $('#s_skip_time').val(items.s_skip_time);
        
        //显示加好友参数
        $('#a_min_speed').val(items.a_min_speed);
        $('#a_max_speed').val(items.a_max_speed);
        $('#a_limit').val(items.a_limit);

        //显示挖掘参数
        $('#d_min_speed').val(items.d_min_speed);
        $('#d_max_speed').val(items.d_max_speed);
        $('#d_limit').val(items.d_limit);

        //显示批量点赞参数
        $('#t_min_speed').val(items.t_min_speed);
        $('#t_max_speed').val(items.t_max_speed);
        $('#t_limit').val(items.t_limit);

        //其它参数
        $('#j_risk').prop('checked',Boolean(items.risk));
    });
}

//折叠栏隐藏/显示
function ShowSetDetail(){
    $('.j-fold-head').removeClass('j-fold-head-active');
    $('.j-svg-box').removeClass('j-svg-show');
    if($(this).next().is(":hidden")){
        //隐藏状态,显示出来
        $('.j-fold-content').slideUp(100);
        $(this).addClass('j-fold-head-active');
        $(this).find('.j-svg-box').addClass('j-svg-show');
    }else{
        $(this).removeClass('j-fold-head-active');
    }
    $(this).next().slideToggle(100);
}

//恢复默认设置
function RestoreSet(){
    JlConfirm('所有的设置将恢复默认状态，确定要恢复默认吗？');
    $('#j_ok').on('click',function(){
        chrome.storage.sync.set({s_min_speed:30, s_max_speed:60, s_limit:100, s_skip:false, s_skip_time:3,
            a_min_speed:30, a_max_speed:60, a_limit:100,
            d_min_speed:60, d_max_speed:120, d_limit:100,
            t_min_speed:20, t_max_speed:40, t_limit:100,
            risk:true}, 
        function(){
            ShowSetPage();
            PointOut('设置已恢复默认状态',2);
        });
    });
}

//设置并保存群发消息最小时间
function SetSendMinSpeed(){
    var s_min_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(s_min_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({s_min_speed:30},function(items){
            $('#s_min_speed').val(items.s_min_speed);
        });
        return false;
    }
        //最小时间不能小于5秒
    if(s_min_speed < 5){
        JlAlert("最小时间不能小于5秒！");
        chrome.storage.sync.get({s_min_speed:30},function(items){
            $("#s_min_speed").val(items.s_min_speed);
        });
        return false;
    }
        //最小时间不能大于499秒
    if(s_min_speed > 499){
        JlAlert("最小时间不能大于499秒！");
        chrome.storage.sync.get({s_min_speed:30},function(items){
            $("#s_min_speed").val(items.s_min_speed);
        });
        return false;
    }
    //最小时间太快，需要确认
    
    if(s_min_speed < 30){
        JlConfirm("发送速度太快，确定要设置这么快吗？");
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({s_min_speed:[s_min_speed]},function(){
                chrome.storage.sync.get({s_max_speed:60},function(items){
                    var s_max_speed = Math.round(2*s_min_speed);
                    if(items.s_max_speed < s_max_speed){
                        chrome.storage.sync.set({s_max_speed:[s_max_speed]},function(){
                            $("#s_max_speed").val(s_max_speed);
                        });
                    }
                });
            });
        });
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({s_min_speed:30},function(items){
                $("#s_min_speed").val(items.s_min_speed);
            });
        });
    }else{
        chrome.storage.sync.set({s_min_speed:[s_min_speed]},function(){
            chrome.storage.sync.get({s_max_speed:60},function(items){
                var s_max_speed = Math.round(2*s_min_speed);
                if(items.s_max_speed < s_max_speed){
                    chrome.storage.sync.set({s_max_speed:[s_max_speed]},function(){
                        $("#s_max_speed").val(s_max_speed);
                    });
                }
            });
        });
    }
}

//设置并保存群发消息最大时间
function SetSendMaxSpeed(){
    var s_max_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(s_max_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({s_max_speed:60},function(items){
            $('#s_max_speed').val(items.s_max_speed);
        });
        return false;
    }
    //不超过999秒
    if(s_max_speed > 999){
        JlAlert("最大时间不能超过999秒");
        chrome.storage.sync.get({s_max_speed:60},function(items){
            $("#s_max_speed").val(items.s_max_speed);
        });
        return false;
    }
    //保存最大时间
    chrome.storage.sync.get({s_min_speed:30},function(items){
        var s_min_speed = Math.round(2*items.s_min_speed);
        if(s_max_speed < s_min_speed){
            JlAlert("最大时间至少是最小时间的2倍");
            chrome.storage.sync.set({s_max_speed:[s_min_speed]},function(){
                $("#s_max_speed").val(s_min_speed);
            });
        }else{
            chrome.storage.sync.set({s_max_speed:[s_max_speed]},function(){});
        }
    });
}

//设置并保存每日最多群发数量
function SetSendLimit(){
    var s_limit = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(s_limit)){
        chrome.storage.sync.get({s_limit:100},function(items){
            $("#s_limit").val(items.s_limit);
            JlAlert("请输入正确数字！");
        });
        return false;
    }
    if(s_limit > 2000){
        chrome.storage.sync.get({s_limit:100},function(items){
            JlAlert('出于账号安全考虑，每天群发数量不可超过2000条！');
            $("#s_limit").val(items.s_limit);
        });
        return false;
    }

    if(s_limit > 100){
        JlConfirm("每天群发数量不宜太多，坚持要群发这么多吗？");
        //绑定取消事件
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({s_limit:100},function(items){
                $("#s_limit").val(items.s_limit);
            });
            $(".dialog").remove();
        });

        //绑定确定事件
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({s_limit:[s_limit]},function(){});
            $(".dialog").remove();
        });
    }else{
        chrome.storage.sync.set({s_limit:[s_limit]},function(){});
    }
}

//设置并保存群发消息跳过重复
function SetSendSkip(){
    chrome.storage.sync.set({s_skip:$(this).prop('checked')},function(){});
}

//设置并保存群发消息跳过天数
function SetSendSkipTime(){
    var s_skip_time = $.trim($(this).val());
    var reg = /^\d+$/;
    if(!reg.test(s_skip_time)){
        JlAlert('请输入正确天数!');
        chrome.storage.sync.get({s_skip_time:3},function(items){
            $('#s_skip_time').val(items.s_skip_time);
        });
        return false;
    }
    if(s_skip_time > 999){
        JlAlert('最多可跳过999天');
        chrome.storage.sync.set({s_skip_time:999},function(){});
        $('#s_skip_time').val(999);
    }else{
        chrome.storage.sync.set({s_skip_time:[s_skip_time]},function(){});
    }
}


//设置并保存加好友最小时间
function SetAddMinSpeed(){
    var a_min_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(a_min_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({a_min_speed:30},function(items){
            $('#a_min_speed').val(items.a_min_speed);
        });
        return false;
    }
        //最小时间不能小于5秒
    if(a_min_speed < 5){
        JlAlert("最小时间不能小于5秒！");
        chrome.storage.sync.get({a_min_speed:30},function(items){
            $("#a_min_speed").val(items.a_min_speed);
        });
        return false;
    }
        //最小时间不能大于499秒
    if(a_min_speed > 499){
        JlAlert("最小时间不能大于499秒！");
        chrome.storage.sync.get({a_min_speed:30},function(items){
            $("#a_min_speed").val(items.a_min_speed);
        });
        return false;
    }
    //最小时间太快，需要确认
    
    if(a_min_speed < 30){
        JlConfirm("添加好友速度不宜太快，确定要设置这么快吗？");
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({a_min_speed:[a_min_speed]},function(){
                chrome.storage.sync.get({a_max_speed:60},function(items){
                    var a_max_speed = Math.round(2*a_min_speed);
                    if(items.a_max_speed < a_max_speed){
                        chrome.storage.sync.set({a_max_speed:[a_max_speed]},function(){
                            $("#a_max_speed").val(a_max_speed);
                        });
                    }
                });
            });
        });
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({a_min_speed:30},function(items){
                $("#a_min_speed").val(items.a_min_speed);
            });
        });
    }else{
        chrome.storage.sync.set({a_min_speed:[a_min_speed]},function(){
            chrome.storage.sync.get({a_max_speed:60},function(items){
                var a_max_speed = Math.round(2*a_min_speed);
                if(items.a_max_speed < a_max_speed){
                    chrome.storage.sync.set({a_max_speed:[a_max_speed]},function(){
                        $("#a_max_speed").val(a_max_speed);
                    });
                }
            });
        });
    }
}

//设置并保存加好友最大时间
function SetAddMaxSpeed(){
    var a_max_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(a_max_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({a_max_speed:60},function(items){
            $('#a_max_speed').val(items.a_max_speed);
        });
        return false;
    }
    //不超过999秒
    if(a_max_speed > 999){
        JlAlert("最大时间不能超过999秒");
        chrome.storage.sync.get({a_max_speed:60},function(items){
            $("#a_max_speed").val(items.a_max_speed);
        });
        return false;
    }
    //保存最大时间
    chrome.storage.sync.get({a_min_speed:30},function(items){
        var a_min_speed = Math.round(2*items.a_min_speed);
        if(a_max_speed < a_min_speed){
            JlAlert("最大时间至少是最小时间的2倍");
            chrome.storage.sync.set({a_max_speed:[a_min_speed]},function(){
                $("#a_max_speed").val(a_min_speed);
            });
        }else{
            chrome.storage.sync.set({a_max_speed:[a_max_speed]},function(){});
        }
    });
}

//设置并保存每天最多加好友数量
function SetAddLimit(){
    var a_limit = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(a_limit)){
        chrome.storage.sync.get({a_limit:100},function(items){
            $("#a_limit").val(items.a_limit);
            JlAlert("请输入正确数字！");
        });
        return false;
    }
    if(a_limit > 2000){
        chrome.storage.sync.get({a_limit:100},function(items){
            JlAlert('出于账号安全考虑每天发送邀请量不能超过2000条！');
            $("#a_limit").val(items.a_limit);
        });
        return false;
    }

    if(a_limit > 200){
        JlConfirm("每天添加好友数量不宜太多，确定要设置这么多吗？");
        //绑定取消事件
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({vip:false,a_limit:100},function(items){
                $("#a_limit").val(items.a_limit);
            });
            $(".dialog").remove();
        });

        //绑定确定事件
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({a_limit:[a_limit]},function(){});
            $(".dialog").remove();
        });
    }else{
        chrome.storage.sync.set({a_limit:[a_limit]},function(){});
    }
}

//设置并保存挖掘最小时间
function SetDigMinSpeed(){
    var d_min_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(d_min_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({d_min_speed:60},function(items){
            $('#d_min_speed').val(items.d_min_speed);
        });
        return false;
    }
        //最小时间不能小于5秒
    if(d_min_speed < 30){
        JlAlert("出于账号安全考虑，挖掘最小时间不能小于30秒！");
        chrome.storage.sync.get({d_min_speed:60},function(items){
            $("#d_min_speed").val(items.d_min_speed);
        });
        return false;
    }
        //最小时间不能大于499秒
    if(d_min_speed > 499){
        JlAlert("最小时间不能大于499秒！");
        chrome.storage.sync.get({d_min_speed:60},function(items){
            $("#d_min_speed").val(items.d_min_speed);
        });
        return false;
    }
    //最小时间太快，需要确认
    
    if(d_min_speed < 50){
        JlConfirm("挖掘速度太快，坚持要设置这么快吗？");
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({d_min_speed:[d_min_speed]},function(){
                chrome.storage.sync.get({d_max_speed:120},function(items){
                    var d_max_speed = Math.round(2*d_min_speed);
                    if(items.d_max_speed < d_max_speed){
                        chrome.storage.sync.set({d_max_speed:[d_max_speed]},function(){
                            $("#d_max_speed").val(d_max_speed);
                        });
                    }
                });
            });
        });
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({d_min_speed:60},function(items){
                $("#d_min_speed").val(items.d_min_speed);
            });
        });
    }else{
        chrome.storage.sync.set({d_min_speed:[d_min_speed]},function(){
            chrome.storage.sync.get({d_max_speed:120},function(items){
                var d_max_speed = Math.round(2*d_min_speed);
                if(items.d_max_speed < d_max_speed){
                    chrome.storage.sync.set({d_max_speed:[d_max_speed]},function(){
                        $("#d_max_speed").val(d_max_speed);
                    });
                }
            });
        });
    }
}

//设置并保存挖掘最大时间
function SetDigMaxSpeed(){
    var d_max_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(d_max_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({d_max_speed:120},function(items){
            $('#d_max_speed').val(items.d_max_speed);
        });
        return false;
    }
    //不超过999秒
    if(d_max_speed > 999){
        JlAlert("最大时间不能超过999秒");
        chrome.storage.sync.get({d_max_speed:120},function(items){
            $("#d_max_speed").val(items.d_max_speed);
        });
        return false;
    }
    //保存最大时间
    chrome.storage.sync.get({d_min_speed:60},function(items){
        var d_min_speed = Math.round(2*items.d_min_speed);
        if(d_max_speed < d_min_speed){
            JlAlert("最大时间至少是最小时间的2倍");
            chrome.storage.sync.set({d_max_speed:[d_min_speed]},function(){
                $("#d_max_speed").val(d_min_speed);
            });
        }else{
            chrome.storage.sync.set({d_max_speed:[d_max_speed]},function(){});
        }
    });
}

//设置并保存每日最多挖掘数量
function SetDigLimit(){
    var d_limit = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(d_limit)){
        chrome.storage.sync.get({d_limit:100},function(items){
            $("#d_limit").val(items.d_limit);
            JlAlert("请输入正确数字！");
        });
        return false;
    }
    if(d_limit > 1000){
        chrome.storage.sync.get({d_limit:100},function(items){
            JlAlert('出于账号安全考虑，每天挖掘数量不能超过1000条！');
            $("#d_limit").val(items.d_limit);
        });
        return false;
    }

    //每天挖掘量超过200条提醒
    if(d_limit > 100){
        JlConfirm("每天挖掘量不宜太多，坚持要设置这么多吗？");
        //绑定取消事件
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({d_limit:100},function(items){
                $("#d_limit").val(items.d_limit);
            });
            $(".dialog").remove();
        });

        //绑定确定事件
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({d_limit:[d_limit]},function(){});
            $(".dialog").remove();
        });
    }else{
        chrome.storage.sync.set({d_limit:[d_limit]},function(){});
    }
}

//设置并保存点赞最小时间
function SetThumbsMinSpeed(){
    var t_min_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(t_min_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({t_min_speed:20},function(items){
            $('#t_min_speed').val(items.t_min_speed);
        });
        return false;
    }
        //最小时间不能小于5秒
    if(t_min_speed < 5){
        JlAlert("最小时间不能小于5秒！");
        chrome.storage.sync.get({t_min_speed:20},function(items){
            $("#t_min_speed").val(items.t_min_speed);
        });
        return false;
    }
        //最小时间不能大于499秒
    if(t_min_speed > 499){
        JlAlert("最小时间不能大于499秒！");
        chrome.storage.sync.get({t_min_speed:20},function(items){
            $("#t_min_speed").val(items.t_min_speed);
        });
        return false;
    }

    //最小时间太快，需要确认
    if(t_min_speed < 30){
        JlConfirm("点赞速度不宜太快，坚持要设置这么快吗？");
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({t_min_speed:[t_min_speed]},function(){
                chrome.storage.sync.get({t_max_speed:40},function(items){
                    var t_max_speed = Math.round(2*t_min_speed);
                    if(items.t_max_speed < t_max_speed){
                        chrome.storage.sync.set({t_max_speed:[t_max_speed]},function(){
                            $("#t_max_speed").val(t_max_speed);
                        });
                    }
                });
            });
        });
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({t_min_speed:20},function(items){
                $("#t_min_speed").val(items.t_min_speed);
            });
        });
    }else{
        chrome.storage.sync.set({t_min_speed:[t_min_speed]},function(){
            chrome.storage.sync.get({t_max_speed:40},function(items){
                var t_max_speed = Math.round(2*t_min_speed);
                if(items.t_max_speed < t_max_speed){
                    chrome.storage.sync.set({t_max_speed:[t_max_speed]},function(){
                        $("#t_max_speed").val(t_max_speed);
                    });
                }
            });
        });
    }
}

//设置并保存点赞最大时间
function SetThumbsMaxSpeed(){
    var t_max_speed = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(t_max_speed)){
        JlAlert('请输入正确的数字!');
        chrome.storage.sync.get({t_max_speed:40},function(items){
            $('#t_max_speed').val(items.t_max_speed);
        });
        return false;
    }
    //不超过999秒
    if(t_max_speed > 999){
        JlAlert("最大时间不能超过999秒");
        chrome.storage.sync.get({t_max_speed:40},function(items){
            $("#t_max_speed").val(items.t_max_speed);
        });
        return false;
    }
    //保存最大时间
    chrome.storage.sync.get({t_min_speed:20},function(items){
        var t_min_speed = Math.round(2*items.t_min_speed);
        if(t_max_speed < t_min_speed){
            JlAlert("最大时间至少是最小时间的2倍");
            chrome.storage.sync.set({t_max_speed:[t_min_speed]},function(){
                $("#t_max_speed").val(t_min_speed);
            });
        }else{
            chrome.storage.sync.set({t_max_speed:[t_max_speed]},function(){});
        }
    });
}

//设置并保存每日最多点赞数量
function SetThumbsLimit(){
    var t_limit = $.trim($(this).val());
    var reg = /^[1-9][0-9]*$/;
    if(!reg.test(t_limit)){
        chrome.storage.sync.get({t_limit:100},function(items){
            $("#t_limit").val(items.t_limit);
            JlAlert("请输入正确数字！");
        });
        return false;
    }
    if(t_limit > 2000){
        chrome.storage.sync.get({t_limit:100},function(items){
            JlAlert('出于账号安全考虑，每天点赞量不能超过2000条！');
            $("#t_limit").val(items.t_limit);
        });
        return false;
    }

    if(t_limit > 100){
        JlConfirm("每天点赞数量不宜太多，坚持要设置这么多吗？");
            //绑定取消事件
        $("#j_cancel").on("click",function(){
            chrome.storage.sync.get({t_limit:100},function(items){
                $("#t_limit").val(items.t_limit);
            });
            $(".dialog").remove();
        });

        //绑定确定事件
        $("#j_ok").on("click",function(){
            chrome.storage.sync.set({t_limit:[t_limit]},function(){});
            $(".dialog").remove();
        });
    }else{
        chrome.storage.sync.set({t_limit:[t_limit]},function(){});
    }
}

//设置风控参数
function SetRisk(){
    if($(this).prop('checked')){
        chrome.storage.sync.set({risk:true},function(){});
    }else{
        JlConfirm('风控可有效保护Linkedin账号，确定要关闭风控系统吗？');
        $('#j_ok').on('click', function(){
            chrome.storage.sync.set({risk:false},function(){});
        });
        $('#j_cancel').on('click', function(){
            chrome.storage.sync.get({risk:true}, function(items){
                $('#j_risk').prop('checked',Boolean(items.risk));
            });
        });
    }
}

/*-------------------其它-----------------------*/
//选择弹窗
function JlConfirm(desc){
    $('.j-dialog').remove();
    var node='<div class="j-dialog j-div-center">'+
            '<div class="j-confirm-box j-div-center j-box-sha">'+
                '<div class="j-nowrap">'+
                    '<div class="j-nowrap">'+
                        '<div>'+
                            '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                                '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                                '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                                '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                            '</svg>'+
                        '</div>'+
                        '<h3>确定</h3>'+
                    '</div>'+
                '</div>' +
                '<div class="j-marg"><p>' + desc + '</p></div>'+
                '<div style="text-align:right;">'+
                    '<button id="j_cancel" class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                    '<button id="j_ok" class="j-bg-btn j-layout-btn j-close-dialog">确定</button>'+
                '</div>'+
            '</div>'+
        '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(0);
}

//领英精灵界面提示弹窗
function PointOut(desc,time){
    var t = time || 3;
    $(".j-point-out").remove();
    var node = '<div class="j-point-out j-div-center">' + desc + "</div>";
    $("#j_lyjl_window").append(node);
    setTimeout(function(){
        $(".j-point-out").fadeOut(200);
        setTimeout(function(){
            $(".j-point-out").remove();
        },200);
    },t*1000);
}

//警告弹窗
function JlAlert(desc){
    var node = '<div class="j-dialog j-div-center">'+
        '<div class="j-confirm-box j-div-center j-box-sha">'+
            '<div class="j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#f00;" />'+
                            '<path d="M11 6 l2 0 l-0.5 9 l-1 0 z" style="fill:#fff;"/>'+
                            '<circle cx="12" cy="17" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>注意</h3>'+
                '</div>'+
            '</div>'+
            '<div class="j-marg">'+
                '<p>' + desc + '</p>'+
            '</div>'+
            '<div style="text-align:right;">'+
                '<button class="j-bg-btn j-layout-btn j-close-dialog">确认</button>'+
            '</div>'+
        '</div>'+
    '</div>';
    ;$("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(0);
}

//删除窗口
function RemoveDialog(){
    $('.j-dialog').remove();
}

//向背景页面传递数据
function JlHttp(action, data, tag, other){
    chrome.runtime.sendMessage({'action':'jlHttp', 'type':action, 'data':data, 'tag':tag, 'other':other}, function(response){});
}

//显示登录窗口
function ShowLoginDialog(){
    $('.j-dialog').remove();
    var node = '<div class="j-dialog j-div-center">'+
        '<div class="j-login-box j-bg-w j-div-center j-box-sha">'+
            '<div class="j-logo" style="margin:auto;"></div>'+
            '<p id="j_errmsg" class="j-errmsg">请登录领英精灵</p>'+
            '<div>'+
                '<input id="j_acc" type="text" placeholder="领英精灵账号（手机号）">'+
            '</div>'+
            '<div>'+
                '<input id="j_pw" type="password" placeholder="登录密码">'+
            '</div>'+
            '<div>'+
                '<button id="j_login" class="j-login-btn j-bg-btn">登录</button>'+
            '</div>'+
            '<div class="j-nowrap">'+
                '<a href="http://linkedinjl.com/r" target="_black" title="前往免费注册">免费注册</a>'+
                '<a href="http://linkedinjl.com/resetpw" target="_black" title="找回密码">忘记密码</a>'+
            '</div>'+
            '<div>'+
                '<p style="color:#f00;">*请不要使用翻墙工具</p>'+
            '</div>'+
        '</div>'+
    '</div>';

    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
}

//登录 
function Login(){
    var account = $.trim($('#j_acc').val());
    var reg = /^1[3-9][0-9]{9}$/;
    if (!reg.test(account)){
        $('#j_errmsg').text('*账号错误');
        $('#j_errmsg').css('color','#f00');
        $('#j_acc').focus();
        return false;
    }else{
        $('#j_errmsg').text('');
    }
    var pw = $.trim($('#j_pw').val());
    reg = /^[0-9a-zA-Z]{6,16}$/;
    if(!reg.test(pw)){
        $('#j_errmsg').text('*密码错误');
        $('#j_errmsg').css('color','#f00');
        $('#j_pw').focus();
        return false;
    }else{
        $('#j_errmsg').text('');
    }
    $('#j_errmsg').text('登录中...');
    $('#j_errmsg').css('color','#00f');
    JlHttp('login', account, '', pw);
}

//按回车键时登录
function LoginEnter(){
    if(event.keyCode == 13){
        Login();
    }
}

//登录结果
function LoginResult(result, data){
    if(result && data){
        var login = JSON.parse(data);
        switch(parseInt(login['result'])){
            case 0:
                //账号不存在
                $('#j_errmsg').html('*账号不存在<a href="http://linkedinjl.com/r" target="_black">立即注册</a>');
                $('#j_errmsg').css('color','#f00');
                break;
            case 1:
                //登录成功
                $('.j-dialog').remove();
                PointOut('登录成功', 1);
                var regTime = Date.parse(login['data']['reg_time']);//注册时间时间戳
                var vipTime = Date.parse(login['data']['vip_time']);//VIP会员到期时间转时间戳
                var diaTime = Date.parse(login['data']['dia_time']);//钻石会员到期时间转时间戳
                var supTime = Date.parse(login['data']['sup_time']); //至尊会员
                var level = login['data']['level'];
                chrome.storage.sync.set({account:[login['data']['account']], regTime:[regTime], vipTime:[vipTime], diaTime:[diaTime], supTime:[supTime], loginCode:[login['login_code']], level:[level]}, function(){
                    InitMember();
                });
                break;

            case 2:
                //密码错误 
                $('#j_errmsg').text('*密码错误');
                $('#j_errmsg').css('color','#f00');
                break;

            default:
                $('#j_errmsg').text('*登录失败');
                $('#j_errmsg').css('color','#f00');
                PointOut('登录失败,请尝试重启浏览器');
                break;
        }
    }else{
        $('#j_errmsg').text('*登录失败');
        $('#j_errmsg').css('color','#f00');
        PointOut('登录失败，请检查网络，勿翻墙！');
    }
}


//初始化会员状态
function InitMember(){
    chrome.storage.sync.get({account:'', level:0, vipTime:1, diaTime:1, supTime:1, my_urn:'', img:'', name:'', public_id:''}, function(items){
        if(!String(items.account)){
            ShowLoginDialog();
            PointOut('请登录领英精灵账号', 1);
            return false;
        }
        if(String(items.my_urn)){
            $('.j-head-box a').attr('href', 'https://www.linkedin.com/in/'+items.public_id);
            $('.j-head-box img').attr('src', items.img);
            $('.j-head-box').attr('title', items.name);
        }else{
            $('.j-head-box a').attr('href', '');
            $('.j-head-box img').attr('src', '');
            $('.j-head-box').attr('title', '');
        }

        if(parseInt(items.level) > 2){
            $('#j_nav_probe').parent('li').css('display', 'block');
        }else{
            $('#j_nav_probe').parent('li').css('display', 'none');
        }

        $('#j_account').text(items.account);
        $('#j_level').removeClass('j-level-try');
        $('#j_level').removeClass('j-level-vip');
        $('#j_level').removeClass('j-level-dia');
        $('#j_level').removeClass('j-level-sup');

        switch(parseInt(items.level)){
            case 0:
                //试用会员
                $('#j_level').addClass('j-level-try');
                $('#j_level').attr('title', '您是试用会员');
                break;
            case 1:
                //vip会员
                $('#j_level').addClass('j-level-vip');
                $('#j_level').attr('title', '您是VIP会员');
                break;
            case 2:
                //钻石会员
                $('#j_level').addClass('j-level-dia');
                $('#j_level').attr('title', '您是钻石会员');
                break;
            case 3:
                //至尊会员
                $('#j_level').addClass('j-level-sup');
                $('#j_level').attr('title', '您是至尊会员');
                break;
            default:
                $('#j_level').addClass('j-level-try');
                $('#j_level').attr('title', '您是试用会员');
                break;
        }
    });
}


//判断是否为中文，如果是，则返回true
function isChinese(temp){
    var reg = new RegExp(/[^\u4e00-\u9fa5]/, 'i');
    if(reg.test(temp)){
        return false;
    }else{
        return true;
    }
}


//合并姓名
function GetName(firstname, lastname){
    var name = '';
    if(isChinese(lastname)){
    //中文名
        name = lastname + firstname;
    }else{
        //英文名
        name = firstname + ' ' + lastname;
    }
    return name;
}

//拆分姓名，返回姓氏
function GetFirstName(name){
    if(name.indexOf(' ') == -1){
        //中文名字
        if(name.length > 3){
            //复姓
            return name.substring(2,name.length);
        }else{
            //单姓
            return name.substring(1,name.length);  
        }
    }else{
        //英文名字
        return name.substring(0, name.indexOf(' '));
    }
}

//获取姓氏
function GetLastName(name){
    if(name.indexOf(' ') == -1){
        //中文名字
        if(name.length > 3){
            //复姓
            return name.substring(0, 2);
        }else{
            //单姓
            return name.substring(0, 1);
            //a_name[0] = name.substring(1,name.length);  
        }
    }else{
        //英文名字
        return name.substring(name.indexOf(' ')+1);
    }
}

//获取指定名字的cookie值
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]); 
    }else{ 
        return null; 
    }
}

//fid整理，去掉“/in/"和”/"
function ArrangeFid(fid){
    if(fid.length == 0){
        return '';
    }
    var f = fid.replace(/\/in\//g,'');
    f = f.replace(/\//g,'');
    return f;
}

//生成指定长度的字符串
function randomString(len) {
　　len = len || 22;
　　var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+0123456789';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

//显示分页
function ShowPaging(parent, curpage, total, count){
    curpage = parseInt(curpage);
    $('#' + parent).empty();
    var totalpage = Math.ceil(total/count);
    if(totalpage > 1){
        var start = curpage>2?curpage-2:1;
        var end = curpage+2>totalpage?totalpage:curpage+2
        if(start !=1){
            $('#' + parent).append('<a class="j-paging" title="首页">1</a>...');
        }
        for(var i = start; i <= end; i++){
            if(i == curpage){
                $('#' + parent).append('<a class="j-curpage">' + i + '</a>');
            }else{
                $('#' + parent).append('<a class="j-paging">' + i + '</a>');
            }
        }
        if(end != totalpage){
            $('#' + parent).append('...<a class="j-paging" title="未页">'+ totalpage + '</a>');
        }
        $('#' + parent).append('<div style="float:left; margin-left:6px;"><input type="text" style="margin:0px;" class="j-jump" title="输入页码，按回车键，直接跳到相应页" value=' + curpage + '><input type="button" class="j-bg-btn j-layout-btn j-jump-btn" style="margin:0px; padding:4px;" value="跳到"></div>');

        $('#' + parent).css('display', 'block');
    }else{
        $('#' + parent).css('display', 'none');
        $('#' + parent).empty();
    }
}

//生成状态提示窗口
function ShowStatu(action){
    var node ='<div id="j_statu_dialog" class="j-gdialog j-box-sha" title="请不要关闭此页面，如要操作，请先停止">'+ 
        '<div class="j-statu-dialog j-box-sha">'+
            '<div class="j-bg-0 j-dialog-title j-nowrap">'+
                '<h3>领英精灵</h3>'+
                '<p>'+ action +'</p>'+
            '</div>'+
            '<div class="j-nowrap">'+
                '<div class="j-statu-content">'+
                    '<img id="j_head_img" src="http://linkedinjl.com/Public/common/img/logo/logo.png" class="j-statu-img rotation">'+
                '</div>'+
                '<div class="j-statu-content">'+
                    '<p id="j_countdown">倒计时：秒</p>'+
                    '<p id="j_action_count">本次：0 条</p>'+
                    '<p id="j_today_count">今日：0 条</p>'+
                '</div>'+
                '<div class="j-statu-content">'+
                    '<button id="j_stop_action" class="j-bg-btn j-layout-btn" title="停止操作">停止</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('body').append(node);
    $('.j-gdialog').fadeIn(0);
    chrome.storage.sync.set({run:true},function(){});
}

//停止操作
function StopAction(){
    chrome.storage.sync.set({run:false},function(){
        clearTimeout(Timeout);
        clearInterval(Countdown);
        $('.j-gdialog').remove();
    });
}

//刷新，关闭页面前
window.onbeforeunload = function(e){
    StopAction();
}

//生成随机时间，传入今日操作数量和最大速度、最小速度,返回时间/毫秒
function GetTime(num, min, max, risk){
    var coefficient = 1;
    if(risk){
        //开启了风控
        switch(true){
            case num < 100:
                coefficient = 1
                break;
            case num < 200:
                coefficient = num/100*0.6;
                break;
            case num < 400:
                coefficient = num/100*0.6;
                break;
            default:
                coefficient = num/100*1.2;
                break
        }
       //console.log('开启了风控');
    }
   var time = parseInt(coefficient * Math.ceil(Math.random()*(max - min) + min));  //生成间隔时间
   return time;
}

//实时显示延时
function DelayedTime(){
    clearInterval(Countdown);
    $('#j_countdown').text('倒计时：' + Delayed_time + ' 秒'); //倒计时间延时
  
    Countdown = setInterval(function(){
        if(Delayed_time > 0){
            Delayed_time--;
            $('#j_countdown').text('倒计时：' + Delayed_time + ' 秒');
        }else{
            clearInterval(Countdown);
        }
    },1000);
}

//日期格式转换
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//获取操作日志
function GetLog(){
    JlHttp('getLog', '', '', '');
}

function GetLogResult(result, data){
    if(result && data){
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            case 1:
                $(".j-dialog").remove();
                var node = '<div class="j-dialog j-div-center j-close-dialog">'+
                    '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
                        '<h3 style="text-align:center; margin:12px; color:#000;">操作日志</h3>'+
                        '<div style="min-height:200px;" class="j-w">'+
                            '<table class="j-tab j-tab-log">'+
                                '<thead>' +
                                    '<tr>' +
                                        '<th>日期</th>' +
                                        '<th title="通过领英精灵每天群发消息数量">群发</th>'+
                                        '<th title="领英精灵每天挖掘到的好友资料数量">挖掘</th>'+
                                        '<th title="通过领英精灵每天发出的邀请数量">加好友</th>' +
                                        '<th title="通过领英精灵每天批量点赞的数量">点赞</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody style="max-height: 30px; overflow-y:auto;">';
                                for(var i=0; i<data['data'].length; i++){
                                    node += '<tr>' +
                                        '<td>' + data['data'][i]['log_date'] + '</td>' +
                                        '<td>' + data['data'][i]['send_num'] + '</td>' +
                                        '<td>' + data['data'][i]['dig_num'] + '</td>' +
                                        '<td>' + data['data'][i]['add_num'] + '</td>' +
                                        '<td>' + data['data'][i]['thumbs_num'] + '</td>' +
                                    '</tr>';
                                }
                                node += '</tbody>' +
                            '</table>' +
                        '</div>'+
                    '</div>'+
                '</div>';
                $("#j_lyjl_window").append(node);
                $(".j-dialog").fadeIn(200);
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }

    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//退出
function LogOut(){
    chrome.storage.sync.set({run:false, reg_time:1, vip_time:1, dia_time:1, sup_time:1, level:0, account:''}, function(){
        JlHttp('logout', '', '', '');
        InitMember();
    });
    
}

//显示建议窗口
function ShowPropose(){
    $(".j-dialog").remove();
    var node ='<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-box-sha j-bg-w">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#00f" />'+
                            '<path d="M9 10 A3 3 0 1 1 12 13 l0 3" style="stroke:#fff;" class="j-svg"/>'+
                            '<circle cx="12" cy="18" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>我的建议</h3>'+
                '</div>'+
            '</div>'+
            '<div class="j-prompt-cont">'+
                '<div class="j-propose-box">'+
                    '</span><textarea id="j_propose" autofocus="autofocus" placeholder="欢迎提出您的宝贵建议，您的建议是我们改进的方向，我公司将认真听取您的建议（有关产品的问题、功能，需要添加什么功能都可以提出）" maxlength=300></textarea>' +
                '</div>'+
            '</div>' +
            '<div class="j-prompt-ctrl">' +
                '<button class="j-bg-btn j-layout-btn j-close-dialog">取消</button>'+
                '<button id="j_ok" class="j-bg-btn j-layout-btn">提交</button>'+
            '</div>'+
        '</div>'+
    '</div>';
    $("#j_lyjl_window").append(node);
    $(".j-dialog").fadeIn(200);
    $('#j_propose').focus();
    $('#j_ok').on('click', function(){
        var propose = $.trim($('#j_propose').val());
        if(propose){
            JlHttp('propose', propose, '', '');
        }else{
            PointOut('建议内容不能为空');
            $('#j_propose').focus();
            return false;
        }
    });
}

//建议结果
function ProposeResult(result, data){
    if(result && data){
        switch(parseInt(data['result'])){
            case 0:
                PointOut('失败，请检查尝试刷新页面或重启浏览器！');
                break;

            case 1:
            case 7:
                PointOut('提交成功');
                $('.j-dialog').remove();
                break;

            case 3:
                //没有登录领英精灵账号
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;

            case 5:
                //登录超过
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            case 6:
                //异地登录中
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        PointOut('失败，请检查网络，勿翻墙！');
    }
}

//提示升级,显示升级窗口
function ShowUpgrade(title, desc, action){
    action = action || '立即升级';
    $('.j-dialog').remove();
    var node = '<div class="j-dialog j-div-center">'+
        '<div class="j-prompt-box j-div-center j-bg-w g-box-sha">'+
            '<div class="j-prompt-title j-bg-0 j-nowrap">'+
                '<div class="j-nowrap">'+
                    '<div>'+
                        '<svg width="24px" height="24px" xmlns="https://www.w3.org/2000/svg" version="1.1" >'+
                            '<circle cx="12" cy="12" r="10" style="fill:#f00;" />'+
                            '<path d="M11 6 l2 0 l-0.5 9 l-1 0 z" style="fill:#fff;"/>'+
                            '<circle cx="12" cy="17" r="1" style="fill:#fff;" />'+
                        '</svg>'+
                    '</div>'+
                    '<h3>升级会员</h3>'+
                '</div>' +
            '</div>' +

            '<div class="j-prompt-cont">'+
                '<div class="j-diff-cont"><div>'+
                    '<h2 class="j-warn">' + title + '</h2>'+
                    '<p>' + desc + '</p >'+
                '</div>'+
            '</div>'+

            '<div class="j-prompt-ctrl" style="margin:auto 24px 12px auto;">'+
                '<a href="javascript:;" class="j-close-dialog" style="margin-right:12px;">取消</a>'+
                '<button class="j-upgrade j-bg-btn j-layout-btn">'+ action + '</button>'+
            '</div>'+
        '</div>'+
    '</div>';

    $('#j_lyjl_window').append(node);
    $(".j-dialog").fadeIn(200);
}

//升级会员
function Upgrade(){
    chrome.storage.sync.get({account:""},function(items){
        var url="http://linkedinjl.com/upvip/acc/"+items.account;
        window.open(url);
    });
}

//查询会员信息
function GetLevel(){
    JlHttp('getLevel', '', '', '');
}

//获取会员信息结果
function GetLevelResult(result, data){
    if(result && data){
        //获取成功
        data = JSON.parse(data);
        switch(parseInt(data['result'])){
            //获取失败
            case 0:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;

            //成功
            case 1:
                var regTime = Date.parse(data['data']['reg_time']);//注册时间时间戳
                var vipTime = Date.parse(data['data']['vip_time']);//VIP会员到期时间转时间戳
                var diaTime = Date.parse(data['data']['dia_time']);//钻石会员到期时间转时间戳
                var supTime = Date.parse(data['data']['sup_time']); //至尊会员
                var level = data['data']['level'];
                chrome.storage.sync.set({account:[data['data']['account']], regTime:[regTime], vipTime:[vipTime], diaTime:[diaTime], supTime:[supTime], loginCode:[data['login_code']], level:[level]}, function(){
                    InitMember();
                });

                switch(parseInt(data['data']['level'])){
                    case 0:
                        //试用会员
                        ShowUpgrade('您是试用会员', '领英精灵分为试用会员、VIP会员、钻石会员。试用会员可试用一段时间，钻石会员可以使用所有功能。今天有特价优惠，升级后可立即生效', '立即抢优惠');
                        break;
                    case 1:
                        //VIP会员
                        if(vipTime > 1923264000000){
                            //终身
                            PointOut('您是终身VIP会员!');
                        }else{
                            //非终身
                            ShowUpgrade('您是VIP会员', 'VIP会员到期时间：' + data['data']['vip_time'], '我要续费');
                        }
                        break;
                    case 2:
                        //钻石会员
                        if(diaTime > 1923264000000){
                            //终身
                            PointOut('您是终身钻石会员!');
                        }else{
                            //非终身
                            ShowUpgrade('您是钻石会员', '钻石会员到期时间：' + data['data']['dia_time'], '我要续费');
                        }
                        break;

                    case 3:
                        //至尊会员
                        if(supTime > 1923264000000){
                            //终身
                            PointOut('您是终身至尊会员!');
                        }else{
                            //非终身
                            ShowUpgrade('您是至尊会员', '至尊会员到期时间：' + data['data']['sup_time'], '我要续费');
                        }
                        break;

                    default:
                        break;
                }
                break;

            //没有登录领英精灵账号
            case 3:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //没有绑定领英账号
            case 4:
                //没有绑定领英账号
                JlConfirm('没有绑定Linkedin账号，请先绑定Linkedin账号，确定要绑定吗？');
                $('#j_ok').click(function(){
                    BindLinkedin(true);
                });
                break;
            //登录时效超时
            case 5:
                ShowLoginDialog();
                PointOut('请先登录领英精灵账号');
                break;

            //其它设备登录中
            case 6:
                ShowLoginDialog();
                PointOut('其它设备在登录中');
                break;

            case 7:
                //试用期过
                ShowUpgrade('试用期已过', '注册后可以试用7天，您的试用期已过，请升级会员使用，感谢支持');
                break;

            default:
                PointOut('失败，请尝试刷新页面或重启浏览器');
                break;
        }
    }else{
        //获取失败
        PointOut('失败，请检查网络，勿翻墙！');
    }
}


function InitLog(){
    chrome.storage.sync.get({today:0},function(items){
        var today = new Date((new Date).toLocaleDateString()).getTime();
        if(today > parseInt(items.today)){
            chrome.storage.sync.set({today:[today],s_today_num:0,a_today_num:0,t_today_num:0,d_today_num:0, r_today_num:0},function(){});
        }
    });
}