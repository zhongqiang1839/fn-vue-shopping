//错误图片 占位 处理
export function error(obj) {
    var obj = obj || {};
    var _img = $.url.getTouchBaseUrl() + 'static/img/imgerr/err144x144.png';
    if(obj.imgsrc) {
        _img = obj.imgsrc;
    }
    var _selector = obj.selector || 'img';
    $(_selector).off('error').on('error', function() {
        if($(this).attr("src")!="#"){
            var _dataImgSrc = $(this).data('imgsrc') || _img;//指定错误图片
            var _dataRemove = $(this).data('removeerr');//防止重复触发
            var _dataIgnore = $(this).data('ignore');//忽略绑定
            if(_dataRemove || _dataIgnore){
                return '';
            }
            if(_dataImgSrc) {
                _img = _dataImgSrc;
            }
            $(this).attr('src', _img);
            $(this).data('removeerr', 1);
        }
    });
}
