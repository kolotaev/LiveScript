(function(){
  var tint, ident, kwend, hashbraces, regexes;
  tint = function(ext, shortcuts, fallthroughs){
    var rule, _i, _len;
    for (_i = 0, _len = shortcuts.length; _i < _len; ++_i) {
      rule = shortcuts[_i];
      if (rule.length < 4) {
        rule.splice(2, 0, 0);
      }
    }
    return PR.registerLangHandler(PR.createSimpleLexer(shortcuts, fallthroughs), [ext]);
  };
  ident = '(?:[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*)';
  kwend = '(?![$\\w\\x7f-\\uffff])';
  tint('co', [['str', /^'(?:''[\S\s]*?''|[^\\']*(?:\\.[^\\']*)*)'/, '\''], ['lang-co-qq', /(^"(?:""[\S\s]*?""|[^\\"]*(?:\\.[^\\"]*)*)")/, '"'], ['lang-co-qr', /(^\/{3}[\S\s]*?\/{3}(?:\?|[imgy]{0,4}))/, '/'], ['lang-co-at', RegExp('(^@@?' + ident + '?)'), '@'], ['com', /^#.*/, '#'], ['typ', /^(?:0x[\da-f]+|[1-9]\d?r[\da-z]+|(?:\d+(?:\.\d+)?)(?:e[+-]?\d+)?[a-z_]*)/i, '0123456789'], ['lang-js', /^`([^\\`]*(?:\\.[^\\`]*)*)`/, '`']], [['str', /^\\\S[^\s,;)}\]]*/], ['com', /^\/\*[\S\s]*\*\//], ['pln', RegExp('^(?:\\.{3}|(?:[?~]?\\.\\s*|[)}\\]]|::)' + ident + '?|' + ident + '[^\\n\\S]*:(?!:))')], ['kwd', RegExp('^(?:t(?:ry|h(?:row|en)|ypeof)|f(?:or(?:[^\\n\\S]+(?:own|ever))?|inally|unction)|n(?:ew|ot)|c(?:ontinue|a(?:se|tch)|lass)|i(?:[fs]|n(?:stanceof)?|mport(?:[^\\n\\S]+all)?)|e(?:lse|xtends)|d(?:e(?:fault|lete|bugger)|o)|un(?:less|til)|o[fr]|return|break|while|switch|and)' + kwend)], ['typ', RegExp('^(?:true|false|null|void)' + kwend)], ['ctx', RegExp('^(?:t(?:h(?:is|at)|o|il)|f(?:rom|allthrough)|it|arguments|eval|super|by)' + kwend)], ['glb', RegExp('^(?:Array|Boolean|Date|Error|Function|JSON|Math|Number|Object|RegExp|S(?:tring|yntaxError)|TypeError)' + kwend)], ['var', RegExp('^' + ident)], ['str', /^<\[[\S\s]*?]>/], ['lang-co-r', /^[^\/](\/(?![\s\/])[^[\/\n\\]*(?:(?:\\.|\[[^\]\n\\]*(?:\\.[^\]\n\\]*)*\])[^[\/\n\\]*)*\/[imgy]{0,4})(?!\d)/]]);
  hashbraces = ['lang-co', /^#({[\S\s]*?})/, '#'];
  regexes = ['lit', /^[\S\s]+?/];
  tint('co-qq', [hashbraces], [['str', /^[\S\s]+?/]]);
  tint('co-qr', [hashbraces], [['com', /^\s#(?!{).*/], regexes]);
  tint('co-r', [], [regexes]);
  tint('co-at', [['ctx', /^@+/, '@']], []);
}).call(this);
