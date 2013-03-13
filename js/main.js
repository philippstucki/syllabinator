/*global $: false, jQuery: false, window: false, console: false */
/*jslint bitwise: true, browser: true, newcap: true,
  nomen: true, plusplus: true, regexp: true, undef: true, sloppy: true, white: true */
$(document).ready( function() {
    Generator.init();
    $('#generate').bind('click', function() {
        var words, text = $('#dictionary').val();

        if (text !== '') {
            hy = Generator.hyphenateText(
                Generator.normalizeText(text),
                $('#language').val()
            );

            Generator.syllables = Generator.generateSyllableDict(hy);

            words = Generator.generateWords(
                parseInt($('#numw').val(), 10),
                parseInt($('#mins').val(), 10),
                parseInt($('#maxs').val(), 10)
            );
            $('#words').val(words.uniq().join('\n'));
        }

    });
});
