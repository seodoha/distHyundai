(function() {
    let codeview = new Array();
    codeview.push({ 'url': '/distHyundai/assets/js/lib/jquery-1.11.1.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/jquery.nice-select.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/jquery-ui.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/jquery.ui.touch-punch.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/countUp.umd.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/jquery.mCustomScrollbar.concat.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/swiper.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/jquery.drawsvg.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/lib/aos.js', 'cashbuster': false });
    codeview.push({ 'url': '/distHyundai/assets/js/ui.common.js', 'cashbuster': true });

    for (let a = 0, atotal = codeview.length; a < atotal; a++) {
        document.write('<script src="' + codeview[a].url + ((codeview[a].cashbuster) ? '?cb=' + new Date().getTime() : '') + '" charset="utf-8"></' + 'script>');
    };
})();
