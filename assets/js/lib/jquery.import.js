(function() {
    let codeview = new Array();
    codeview.push({ 'url': '/assets/js/lib/jquery-1.11.1.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/assets/js/lib/jquery.nice-select.min.js', 'cashbuster': false });
    codeview.push({ 'url': '/assets/js/lib/jquery-ui.min.js', 'cashbuster': true });
    codeview.push({ 'url': '/assets/js/lib/jquery.ui.touch-punch.min.js', 'cashbuster': true });
    codeview.push({ 'url': '/assets/js/lib/countUp.umd.js', 'cashbuster': true });
    codeview.push({ 'url': '/assets/js/lib/jquery.mCustomScrollbar.concat.min.js', 'cashbuster': true });
    codeview.push({ 'url': '/assets/js/lib/swiper-bundle.min.js', 'cashbuster': true });
    codeview.push({ 'url': '/assets/js/ui.common.js', 'cashbuster': true });

    for (let a = 0, atotal = codeview.length; a < atotal; a++) {
        document.write('<script src="' + codeview[a].url + ((codeview[a].cashbuster) ? '?cb=' + new Date().getTime() : '') + '" charset="utf-8"></' + 'script>');
    };
})();
