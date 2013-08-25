/*global $: false, jQuery: false, window: false, console: false */
/*jslint bitwise: true, browser: true, newcap: true,
  nomen: true, plusplus: true, regexp: true, undef: true, sloppy: true, white: true */

Array.prototype.uniq = function() {
    var h={}, r=[], i;
    for (i=0; i<this.length; i++) {
        if (h[this[i]] === undefined) {
            h[this[i]] = true;
            r.push(this[i]);
        }
    }
    return r;
};

var Generator = (function (Hyphenator, $) {

    var pub = {
    };

    pub.prop = [];
    pub.syllables = [];

    pub.init = function () {
        Hyphenator.config({
            minwordlength: 2,
            hyphenchar: '|'
        });

    };

    pub.generateWords = function(wordCount, minSyllables, maxSyllables) {
        var i, words = [];
        for (i=1; i<=wordCount; i++) {
            words.push(pub.generateWord(minSyllables, maxSyllables));
        }
        return words;
    };

    pub.normalizeText = function(text) {
        return text.toLowerCase().replace(/[\.,-\/#!\?\+\[\]\'\"$%\^&\*;:{}=\-_`~()]/g, ' ').replace(/\s+/g, ' ').replace(/^\s*/, '').replace(/\s*$/g, '').toLowerCase();
    };

    pub.hyphenateText = function(text, language) {
        console.log(language);
        return Hyphenator.hyphenate(text, language);
    };

    pub.generateSyllableDict = function(hyphenatedText) {
        return hyphenatedText.split(/[\s+\|]/).uniq().sort();
    };

    pub.generateWord = function(minSyllables, maxSyllables) {
        var numSyllables, words = [], s;

        numSyllables = Math.floor(Math.random()*(maxSyllables - minSyllables + 1)) + minSyllables;

        do {
            s = pub.syllables[Math.floor(Math.random()*pub.syllables.length)];
            if (words.indexOf(s) === -1) {
                words.push(s);
            }
        } while (words.length < numSyllables);

        return words.join('');
    };

    return pub;
}(Hyphenator, jQuery));
