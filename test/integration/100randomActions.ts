// Generated with Randomizer.scala (RANDOM_DATA_GENERATOR_SEED=-5625824352629491544)
const actions = [
  "(function () { actions['takeControl'](targets['theyP'](), targets['they']()); })",
  "(function () { actions['returnToHand'](targets['they'](), targets['opponent']()); })",
  "(function () { actions['draw'](targets['theyP'](), 3); })",
  "(function () { actions['modifyEnergy'](targets['theyP'](), function (x) { return x - thatMuch(); }); })",
  "(function () { actions['become'](targets['that'](), targets['random']((Math.floor((Math.floor(count(allTiles()) / 2)) / 2)), cardsInDiscardPile(targets['itP'](), 'structure', []))); })",
  "(function () { actions['draw'](targets['theyP'](), thatMuch()); })",
  "(function () { actions['discard'](targets['copyOf'](load('target'))); })",
  "(function () { actions['winGame'](targets['theyP']()); })",
  "(function () { actions['canAttackAgain'](targets['that']()); })",
  "(function () { actions['moveObject'](targets['it'](), function () { return targets['it'](); }); })",
  "(function () { actions['swapAttributes'](targets['that'](), 'allattributes', 'allattributes'); })",
  "(function () { actions['rewriteText'](targets['choose'](cardsInDiscardPile(targets['controllerOf'](targets['that']()), 'anycard', [conditions['attributeComparison']('allattributes', (function (x) { return x % 2 == 1; })), conditions['attributeComparison']('health', (function (x) { return x > 2; }))]), maximumEnergyAmount(targets['self']())), { '䁜㛀䣥㊻沜枲韢髕ɽ냶첓⣇\u0090ໝ屮鶧ᔋ꧇玔惋ꕒￎ艴珰놆䲺쬄箦⼰䐧窰': '倖ૃ菶⤅沰亢㯼㸴剪荾돝㢼䣾쵶㑯', '楐ꓠ鐩퀂餔Θ婗豁޳瓯惸둛崷䜨쵱깗': '㗎햮꓃퍈ᙺ', '寴揄ꁚ띭퓺➛뾗綃괅옴㭔뉙洍秎': '隐櫨ᚰ攋㑉竂崣纕！砉㝎쨧࢜၁ഝﵖ籖䂈疼ꚵ⻀⳷␣ᙕ㭂哼孼ᔠ⹡䢺걟', '葆ꗀ緸☿ꆲ藩ⅅ㪚灳Ὠ掸폩ニ၇腠ﯸ瓬ꣾല圴ᅴ֗駜䬖Ȗ⺓㱜ᜄ㎓꧀렅ी': '༛嗯⺤氎鐘杚窹ܷ镲祈䱨潱酯顴', '᣿臭짆찮ﺡ斝P誇倞痊뇀⣡䕚ꃧࠆ챎': '', '컋୾霥⎧': '瀮飠䯵競당絾绘﫯戋❠㶍ೇ쩁秄㨷띹ᰂѱ켿獍黕龻듀᥯親讇饴齒', 'ﯭ敒·뽱ଠ秬큠巊䤸❿桚': '', '૝䇏嶷묊뻓ᾂ෋瞭瀬葂爧㑬풳子ᣄ귥㏚隑奣繽噢': '↬켲氀斡Ꜹ踃禯诒꩹z집儤篇二ﴩ鞩쮋쟬', '': '渉䁽闛蒺⫕雔傕暶缺台庠ว㦄읙⻴鹫我ሺꊰ쀯埠', 'ᐓ簔穞暓⢴⽠簹∜顉ർ覩腯㮥묇╅ﳭ姪럧⸞⥔': 'ꦑ딝㍱屸䦰볳퍈䯋㜡礼ꧭ췷꺿ᷮ쮍故肚䖅﹵䣠⭨饘韡該ꠠ㦩ꄚǼ', '綀왂䉎詪炽膢뱏嚻侹︪蒻탸氧뀨塓菉쵂았ṫ쾑㑝㧒萄≂': '֡ằ塈轝쭐D䟌ㅢ뒣ᛔ廋阘芈ⱉ匔ꇫ몥捵毭䍒鼬欬⢄鹐ް␻靁ꀷ', 'ﻻ澽謵ⴗ䆹겢䷷㘡ㅫ⧂惢': '⌂徃꤂佱鶸慩䙮왘䖥臹귋읢', '挈㖅䷖䄎呞ㄓ㝥躃ﭙ示追랍뢂ᨠ멕ᒂ띳⏰⥩컁鹣䃻⠚龝ﶈ': '尟鄠㉩㶋ꌔ⇭蟨㐷룜뉈嬁眹㛔ጷ쒌䏮퍝〕ਮ㋓当䔪忮帏၌ൻ쁓清', '猑࿣ﬀ媙觇﫺ા鑙ĝ飐塺ࢳ뙮쎺ŏॲ': 'ௐ쁘㜌冫厷蘒ཌྷ牛ﷷ䘖㍓죗㿁¶ﵐ羼䌮㸤䢱比ﬓᨃ㚨⛧ጮꮜ', '뷌슖턧樈ᖔ藃纇궱䪰䛫త롘읐䑡⼌恹꥕꾕䘖烊糮砐': '⒆造䍠踓ࢍ', '旲㤳铞혜쭥侙': 'ꣽ㜁囎⇉싗ⴴ⸦楨᫖⫅', '⾽鬷均牯耽䰒鶓擴': 'ᄽ﵍䗛쥰愀앞蜴堨嚟啡戮᤯퓐觊♚洃㟁뷥蔱æ楜郗៧뭍Þ垁窱鹞핸ᾟ톧寧ᆷ', '铗ዣ蹠쪻霥娙듋Ð砿膉£㐇穫쬱蒪鰠檱迮Ꮦ㞬ﮊ큦๭': '瀄窡╷ᶯ㌒稹ꄑŞ䨤ﺁ͂੝්ꄕ彟ᓓ퓾隣⼭ヒů䃅뻏廧ﺚ✦쬎쇡睱', '꺺磸痥榋킫폶笃聤熀摸': '搳瘢绞좲캝潶㦈㲎夒↫冀照迻䱹障멒緼ꡓ憎', '戳⢽钂ᾈ縓毠뾪邱Ւ懤쉡镢侯椇齁﷋弯䗦킻䓩鸮蕣့頥ຯ': '臭阧♞컚ᝅ㰚뵁ꫪ䲰䴗壆嶛枇돰䝋ᾦ롂쀮㖵൰魘ꞛ϶뺏驼', '㫽⅘ι꾩੠': '茺攚뼔绁ԥﺉ諸塹䖈', '솨': '柧සﰕ않뚷螴㳦䒈봐Ӡ穠愱罬쬺胾ꂗ构䠱徎㾁裈ằ⟏뎤讴ꇀ⮯⩻朲', '髪⓼គ怲㰈ﲈ铼⹟ɠ펇륨ϓ': '૰눁ꏰ톦뀗ꂙ挤Ｂ溞ῆ䩼犍㨶礬䎯葞扨', '࿇툨⊤襵품퓲컢院䓾컘ꯃ뛾꽝ﭖ暪῝蓜™獀䱦': '劖筞錓ꪤ꠳苩枝䙰邚ီ槭榜蓆န㈆ⵠ矫ඡ쾤틹箅禁ⓑ箙뗴쿾햜੓揀﬩☒ㆊ垿', '爌钭볞餅⌦Ⴍ梿衡ກ絺෍': '饈磻ѷ뱡촻雗৽㊍蛳㲖琊ଲӑ屫摧∏Ꮋ噽鿆㵐唀䡍ڻ詅吒', '䪄㢤撔쥘笁⑄よ窝ꆔ솜': '썞켄腹凧Ⰽଊ㞫꿍ӂ혏넕례떻壜ꋧ禭', '㧸మ飑떀呅棅Ņ嫆妃욷䂱ྰ▚芻즮풕㢨촼捊ꂁ긓க혵甤க㭋돝创죡堇ڑ鲾碢': '媪宖艵佅⁮Ḳꓮ벛ꍔ渕剋ত∭뽍᝴緙ꭞ뉯Ꙛ鯶გꑥ⸈꣓푼≎曳谾侈졛鎥', 'Ƀ蘭묆㯓蜠䶄薬谆ￚ燛㳬⶚풁帒딢Xꇱ襺㫳軛ꆯ近邆皑俄ᢞ휍㗓럷憙': '鈢䥲纙偢㠣ʋ衽鷭ኮ璞秓伹蹻鎫ฒ皿蜋', '⡭췞陆㩨㺺䨴璦坎는媉蘥堬匽匜⊏릆쐓馘೽ꇆ쑿잎ꀒ잷줂䜽묇ｂ躮墂꒤દ匦䋦': '壂䤤ὓ∃൬暷攊镚ࢼ봏煇痜㱯윥䠑㰞び姑', '૤몠倔Ⓨᡐ𥳐࿓㗦ω俜冊茒㊻䁀뫌ǵԀ䝥ꥀ䟖顺ʶ䣔믻䬘혬刢慎䫮外': '슰儐컪∹呃쭒灊璣ᄄꟼ咧࿥자', '橹혪⻢徭詬箖垩䏲邍秆䂚熢땑靅兯尊呣鶍ⱱ࿒⹗ꘒٺ톚᳁뾅悱둯⎨': '拋龭뮎굎㥽ꘙ뫂퍯㞡Ⰷ⦏噮毥꓈蔖奬ﺩ閃糟맨ᶅ㰒芦導ﻬ', 'ᡴﮛ㶕笯祺쁒Ⱗ鿐ꊢ檲߫巉Ꮵ椳풎쁊䷐': '鉱埁䗨늄꺁ࣛ쟥霍믨祓麑ᴟ쾓∵㢯蹕憮ꑭ릊ଭ஡썊⹨粅༿鞥ጄ戭픥嬻䛼璲뇻' }); })",
  "(function () { actions['removeAllAbilities'](targets['they']()); })",
  "(function () { actions['discard'](targets['choose'](cardsInHand(targets['self'](), 'robot', [conditions['attributeComparison']('speed', (function (x) { return x >= 2; })), conditions['attributeComparison']('attack', (function (x) { return x % 2 == 1; })), conditions['attributeComparison']('allattributes', (function (x) { return x > thatMuch(); }))]), maximumEnergyAmount(targets['self']()))); })",
  "(function () { actions['modifyEnergy'](targets['allPlayers'](), function (x) { return Math.ceil(x / attributeSum(cardsInDiscardPile(targets['theyP'](), [], [conditions['attributeComparison']('allattributes', (function (x) { return x === (Math.ceil(count(cardsInDiscardPile(targets['self'](), 'anycard', [])) / 2)); }))]), 'cost')); }); })",
  "(function () { (function () { actions['swapPositions'](targets['it'](), targets['it']()); })(); })",
  "(function () { save('duration', 1); (function () { actions['canMoveAndAttackAgain'](targets['union']([ targets['they'](), targets['they'](), targets['it']() ])); })(); save('duration', null); })",
  "(function () { actions['payEnergy'](targets['self'](), maximumEnergyAmount(targets['allPlayers']())); })",
  "(function () { actions['modifyAttribute'](targets['they'](), 'allattributes', function (x) { return x * ((energyAmount(targets['controllerOf'](targets['random'](3, other(other(objectsMatchingConditions('kernel', []))))))) * (energyAmount(targets['self']()))); }); })",
  "(function () { save('target', targets['allPlayers']()); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['random'](count(other(other(other(other(objectsMatchingConditions('structure', [])))))), cardsInDiscardPile(targets['allPlayers'](), 'robot', [conditions['attributeComparison']('speed', (function (x) { return x === maximumEnergyAmount(targets['self']()); }))])), targets['controllerOf'](targets['thisRobot']())); })",
  "(function () { save('duration', 2); (function () { actions['winGame'](targets['theyP']()); })(); save('duration', null); })",
  "(function () { actions['returnToHand'](targets['thisRobot'](), targets['allPlayers']()); })",
  "(function () { actions['endTurn'](); })",
  "(function () { actions['draw'](targets['self'](), energyAmount(targets['allPlayers']())); })",
  "(function () { actions['modifyEnergy'](targets['self'](), function (x) { return x * attributeSum(cardsInHand(targets['opponent'](), 'robot', [conditions['attributeComparison']('speed', (function (x) { return x >= 2; })), conditions['attributeComparison']('attack', (function (x) { return x % 2 == 1; })), conditions['attributeComparison']('allattributes', (function (x) { return x > thatMuch(); }))]), 'health'); }); })",
  "(function () { save('target', targets['all'](allTiles())); })",
  "(function () { actions['rewriteText'](targets['choose'](cardsInHand(targets['controllerOf'](load('target')), 'allobjects', []), attributeSum(cardsInDiscardPile(targets['controllerOf'](load('target')), [], []), 'attack')), { '': '霍믨祓麑ᴟ쾓∵㢯', '䁜㛀䣥㊻沜枲韢髕ɽ냶첓⣇\u0090ໝ屮鶧ᔋ꧇玔惋ꕒￎ艴珰놆䲺쬄箦⼰䐧窰': '倖ૃ菶⤅沰亢㯼㸴剪荾돝㢼䣾쵶㑯', '楐ꓠ鐩퀂餔Θ婗豁޳瓯惸둛崷䜨쵱깗': '㗎햮꓃퍈ᙺ', '寴揄ꁚ띭퓺➛뾗綃괅옴㭔뉙洍秎': '隐櫨ᚰ攋㑉竂崣纕！砉㝎쨧࢜၁ഝﵖ籖䂈疼ꚵ⻀⳷␣ᙕ㭂哼孼ᔠ⹡䢺걟', '葆ꗀ緸☿ꆲ藩ⅅ㪚灳Ὠ掸폩ニ၇腠ﯸ瓬ꣾല圴ᅴ֗駜䬖Ȗ⺓㱜ᜄ㎓꧀렅ी': '༛嗯⺤氎鐘杚窹ܷ镲祈䱨潱酯顴', '᣿臭짆찮ﺡ斝P誇倞痊뇀⣡䕚ꃧࠆ챎': '', '秆䂚熢땑靅兯尊呣鶍ⱱ࿒⹗ꘒٺ톚᳁뾅悱둯⎨肒ⅽ員': '굎㥽ꘙ뫂퍯', '컋୾霥⎧': '瀮飠䯵競당絾绘﫯戋❠㶍ೇ쩁秄㨷띹ᰂѱ켿獍黕龻듀᥯親讇饴齒', 'ﯭ敒·뽱ଠ秬큠巊䤸❿桚': '', '૝䇏嶷묊뻓ᾂ෋瞭瀬葂爧㑬풳子ᣄ귥㏚隑奣繽噢': '↬켲氀斡Ꜹ踃禯诒꩹z집儤篇二ﴩ鞩쮋쟬', '': '渉䁽闛蒺⫕雔傕暶缺台庠ว㦄읙⻴鹫我ሺꊰ쀯埠', 'ᐓ簔穞暓⢴⽠簹∜顉ർ覩腯㮥묇╅ﳭ姪럧⸞⥔': 'ꦑ딝㍱屸䦰볳퍈䯋㜡礼ꧭ췷꺿ᷮ쮍故肚䖅﹵䣠⭨饘韡該ꠠ㦩ꄚǼ', '綀왂䉎詪炽膢뱏嚻侹︪蒻탸氧뀨塓菉쵂았ṫ쾑㑝㧒萄≂': '֡ằ塈轝쭐D䟌ㅢ뒣ᛔ廋阘芈ⱉ匔ꇫ몥捵毭䍒鼬欬⢄鹐ް␻靁ꀷ', 'ﻻ澽謵ⴗ䆹겢䷷㘡ㅫ⧂惢': '⌂徃꤂佱鶸慩䙮왘䖥臹귋읢', '✮쀪빞ͩⓆ횳∛': '閃糟맨ᶅ㰒芦導ﻬ讹', '挈㖅䷖䄎呞ㄓ㝥躃ﭙ示追랍뢂ᨠ멕ᒂ띳⏰⥩컁鹣䃻⠚龝ﶈ': '尟鄠㉩㶋ꌔ⇭蟨㐷룜뉈嬁眹㛔ጷ쒌䏮퍝〕ਮ㋓当䔪忮帏၌ൻ쁓清', '猑࿣ﬀ媙觇﫺ા鑙ĝ飐塺ࢳ뙮쎺ŏॲ': 'ௐ쁘㜌冫厷蘒ཌྷ牛ﷷ䘖㍓죗㿁¶ﵐ羼䌮㸤䢱比ﬓᨃ㚨⛧ጮꮜ', '뷌슖턧樈ᖔ藃纇궱䪰䛫త롘읐䑡⼌恹꥕꾕䘖烊糮砐': '⒆造䍠踓ࢍ', '旲㤳铞혜쭥侙': 'ꣽ㜁囎⇉싗ⴴ⸦楨᫖⫅', '꺺磸痥榋킫폶笃聤熀摸': '搳瘢绞좲캝潶㦈㲎夒↫冀照迻䱹障멒緼ꡓ憎', '戳⢽钂ᾈ縓毠뾪邱Ւ懤쉡镢侯椇齁﷋弯䗦킻䓩鸮蕣့頥ຯ': '臭阧♞컚ᝅ㰚뵁ꫪ䲰䴗壆嶛枇돰䝋ᾦ롂쀮㖵൰魘ꞛ϶뺏驼', '㫽⅘ι꾩੠': '茺攚뼔绁ԥﺉ諸塹䖈', '࿇툨⊤襵품퓲컢院䓾컘ꯃ뛾꽝ﭖ暪῝蓜™獀䱦': '劖筞錓ꪤ꠳苩枝䙰邚ီ槭榜蓆န㈆ⵠ矫ඡ쾤틹箅禁ⓑ箙뗴쿾햜੓揀﬩☒ㆊ垿', '䪄㢤撔쥘笁⑄よ窝ꆔ솜': '썞켄腹凧Ⰽଊ㞫꿍ӂ혏넕례떻壜ꋧ禭', '㧸మ飑떀呅棅Ņ嫆妃욷䂱ྰ▚芻즮풕㢨촼捊ꂁ긓க혵甤க㭋돝创죡堇ڑ鲾碢': '媪宖艵佅⁮Ḳꓮ벛ꍔ渕剋ত∭뽍᝴緙ꭞ뉯Ꙛ鯶გꑥ⸈꣓푼≎曳谾侈졛鎥', '鎴ỉ獮ᴃꝠ볺왝谌客፣쮬ᦲ畘簄⭧ꫤ驑솨': '柧සﰕ않뚷螴㳦䒈봐Ӡ穠愱罬쬺胾ꂗ构䠱徎㾁裈ằ⟏뎤讴ꇀ⮯⩻朲', 'Ƀ蘭묆㯓蜠䶄薬谆ￚ燛㳬⶚풁帒딢Xꇱ襺㫳軛ꆯ近邆皑俄ᢞ휍㗓럷憙': '鈢䥲纙偢㠣ʋ衽鷭ኮ璞秓伹蹻鎫ฒ皿蜋', 'ﮛ㶕笯祺': 'ꄩݓᒙ﯇롙䩺Ღ켎犮贓৫塆鉱埁䗨늄꺁ࣛ', '⡭췞陆㩨㺺䨴璦坎는媉蘥堬匽匜⊏릆쐓馘೽ꇆ쑿잎ꀒ잷줂䜽묇ｂ躮墂꒤દ匦䋦': '壂䤤ὓ∃൬暷攊镚ࢼ봏煇痜㱯윥䠑㰞び姑', '㓲肿澄欣簢罟觝ꎕ톥嬧ᬺ⨷佷溝䘮踞⸡ﺘ汮': '핸ᾟ톧寧ᆷ딑波飝搴膑刺࿆꩜', '૤몠倔Ⓨᡐ𥳐࿓㗦ω俜冊茒㊻䁀뫌ǵԀ䝥ꥀ䟖顺ʶ䣔믻䬘혬刢慎䫮外': '슰儐컪∹呃쭒灊璣ᄄꟼ咧࿥자' }); })",
  "(function () { actions['modifyEnergy'](targets['itP'](), function (x) { return x * 1; }); })",
  "(function () { actions['swapAttributes'](other(other(other(objectsMatchingConditions('structure', [])))), 'cost', 'attack'); })",
  "(function () { actions['swapAttributes'](targets['it'](), [], 'cost'); })",
  "(function () { actions['takeControl'](targets['opponent'](), targets['they']()); })",
  "(function () { actions['destroy'](load('target')); })",
  "(function () { actions['restoreHealth'](targets['it'](), maximumEnergyAmount(targets['itP']())); })",
  "(function () { actions['rewriteText'](targets['all'](cardsInHand(targets['self'](), 'structure', [])), { '锸穀쟦憂䮟꣜孉횕ꞕપ柮›꫇٠䈣⒐寔偒ㆾ⾽鬷均牯耽': '讄峁', '䝷': '﵍䗛쥰愀앞蜴堨嚟啡戮᤯퓐觊♚洃㟁뷥蔱æ楜郗៧뭍Þ垁窱鹞핸ᾟ톧寧ᆷ딑波飝', '㊻沜枲韢髕ɽ냶첓⣇\u0090ໝ屮鶧ᔋ꧇玔惋ꕒￎ艴珰놆䲺쬄箦⼰䐧窰୭泥璞鈈': '亢㯼㸴剪荾돝㢼䣾쵶㑯콏歄扊킸ⱶৢ軸斨綧嫈嶔ǅ╁꼠⚥㳬㕂ⴝｍ븇깖玍', '駜䬖Ȗ⺓㱜ᜄ㎓꧀렅ी萱嗷鲜࿢龺﯊뻝剦㌃˓': '䱨潱酯顴畫鸧ⷫ瀨黗ॹֻᳶͲᢶ蔤䬔⌂徃꤂佱鶸慩', '呣鶍ⱱ࿒⹗ꘒٺ': '஑充烺븙拋龭뮎굎㥽ꘙ뫂퍯㞡Ⰷ⦏噮毥꓈蔖奬ﺩ閃糟맨ᶅ㰒芦導ﻬ讹물妻ှ倱', '祺쁒Ⱗ鿐ꊢ檲߫巉Ꮵ椳풎쁊䷐侰ࡎゟ譲ꊉ㲲Ġ㥛록羏㔌寔髫': '', '૝䇏嶷묊뻓ᾂ෋瞭瀬葂爧㑬풳子ᣄ귥㏚隑奣繽噢': '↬켲氀斡Ꜹ踃禯诒꩹z집儤篇二ﴩ鞩쮋쟬', 'ꆮ裐帨븁鐢鎴ỉ獮ᴃꝠ볺왝谌客፣쮬ᦲ畘簄⭧': '䛼璲뇻궆W柧සﰕ않뚷螴㳦䒈봐Ӡ穠愱罬쬺胾ꂗ构䠱徎㾁裈ằ⟏뎤讴ꇀ⮯⩻朲떤', '眦ﶰ': '臹귋읢壟핎씺ꃦ♩觅猳⻹鶀遡镶㲺텵㯯뎯', 'ᐓ簔穞暓⢴⽠簹∜顉ർ覩腯㮥묇╅ﳭ姪럧⸞⥔': 'ꦑ딝㍱屸䦰볳퍈䯋㜡礼ꧭ췷꺿ᷮ쮍故肚䖅﹵䣠⭨饘韡該ꠠ㦩ꄚǼ', '綀왂䉎詪炽膢뱏嚻侹︪蒻탸氧뀨塓菉쵂았ṫ쾑㑝㧒萄≂': '֡ằ塈轝쭐D䟌ㅢ뒣ᛔ廋阘芈ⱉ匔ꇫ몥捵毭䍒鼬欬⢄鹐ް␻靁ꀷ', '挈㖅䷖䄎呞ㄓ㝥躃ﭙ示追랍뢂ᨠ멕ᒂ띳⏰⥩컁鹣䃻⠚龝ﶈ': '尟鄠㉩㶋ꌔ⇭蟨㐷룜뉈嬁眹㛔ጷ쒌䏮퍝〕ਮ㋓当䔪忮帏၌ൻ쁓清', '旲㤳铞혜쭥侙': 'ꣽ㜁囎⇉싗ⴴ⸦楨᫖⫅', '㗙㷛呵惰袆鲍엀阞䣴⡘臘갋ꢡ햟': '黅늼❦', '꺺磸痥榋킫폶笃聤熀摸': '搳瘢绞좲캝潶㦈㲎夒↫冀照迻䱹障멒緼ꡓ憎', '戳⢽钂ᾈ縓毠뾪邱Ւ懤쉡镢侯椇齁﷋弯䗦킻䓩鸮蕣့頥ຯ': '臭阧♞컚ᝅ㰚뵁ꫪ䲰䴗壆嶛枇돰䝋ᾦ롂쀮㖵൰魘ꞛ϶뺏驼', '࿇툨⊤襵품퓲컢院䓾컘ꯃ뛾꽝ﭖ暪῝蓜™獀䱦': '劖筞錓ꪤ꠳苩枝䙰邚ီ槭榜蓆န㈆ⵠ矫ඡ쾤틹箅禁ⓑ箙뗴쿾햜੓揀﬩☒ㆊ垿', '⻢徭詬箖': '꩜铞䓚䍐Ѓ䴿쐌欜ᎊ', '㧸మ飑떀呅棅Ņ嫆妃욷䂱ྰ▚芻즮풕㢨촼捊ꂁ긓க혵甤க㭋돝创죡堇ڑ鲾碢': '媪宖艵佅⁮Ḳꓮ벛ꍔ渕剋ত∭뽍᝴緙ꭞ뉯Ꙛ鯶გꑥ⸈꣓푼≎曳谾侈졛鎥', '୾': '⛣퀿瀮飠䯵競당絾绘﫯戋❠㶍ೇ쩁秄㨷띹ᰂѱ켿獍黕龻듀᥯親', 'Ƀ蘭묆㯓蜠䶄薬谆ￚ燛㳬⶚풁帒딢Xꇱ襺㫳軛ꆯ近邆皑俄ᢞ휍㗓럷憙': '鈢䥲纙偢㠣ʋ衽鷭ኮ璞秓伹蹻鎫ฒ皿蜋', '⡭췞陆㩨㺺䨴璦坎는媉蘥堬匽匜⊏릆쐓馘೽ꇆ쑿잎ꀒ잷줂䜽묇ｂ躮墂꒤દ匦䋦': '壂䤤ὓ∃൬暷攊镚ࢼ봏煇痜㱯윥䠑㰞び姑', '૤몠倔Ⓨᡐ𥳐࿓㗦ω俜冊茒㊻䁀뫌ǵԀ䝥ꥀ䟖顺ʶ䣔믻䬘혬刢慎䫮外': '슰儐컪∹呃쭒灊璣ᄄꟼ咧࿥자', '㱧薽畔㫽⅘ι꾩੠欽᏶綥홷ⵓ⷗퍔똊룒㻍寴揄ꁚ띭퓺➛뾗綃괅옴㭔뉙洍': '梀翸隐櫨ᚰ攋㑉竂崣纕！砉㝎쨧࢜၁ഝﵖ' }); })",
  "(function () { actions['modifyEnergy'](targets['self'](), function (x) { return x + energyAmount(targets['self']()); }); })",
  "(function () { actions['removeAllAbilities'](targets['it']()); })",
  "(function () { actions['canMoveAgain'](load('target')); })",
  "(function () { actions['spawnObject'](targets['choose'](cardsInHand(targets['itP'](), 'anycard', []), count(other(other(objectsMatchingConditions('allobjects', []))))), allTiles(), targets['theyP']()); })",
  "(function () { actions['winGame'](targets['controllerOf'](targets['they']())); })",
  "(function () { save('duration', 2); (function () { actions['returnToHand'](targets['they'](), targets['itP']()); })(); save('duration', null); })",
  "(function () { actions['payEnergy'](targets['theyP'](), thatMuch()); })",
  "(function () { actions['giveAbility'](targets['all'](objectsMatchingConditions('allobjects', [conditions['adjacentTo'](allTiles())])), \"(function () { setAbility(abilities['applyEffect'](function () { return targets['copyOf'](targets['that']()); }, 'cannotactivate')); })\"); })",
  "(function () { actions['moveObject'](targets['random'](energyAmount(targets['theyP']()), other(objectsMatchingConditions('structure', []))), function () { return targets['that'](); }); })",
  "(function () { actions['modifyEnergy'](targets['itP'](), function (x) { return Math.ceil(x / attributeValue(targets['choose'](cardsInDiscardPile(targets['self'](), 'robot', []), energyAmount(targets['self']())), 'speed')); }); })",
  "(function () { save('duration', 3); (function () { if (!(!(globalConditions['collectionCountComparison'](tilesMatchingConditions([]), (function (x) { return x <= energyAmount(targets['itP']()); }))))) { ((function () { actions['draw'](targets['self'](), 2); }))(); } })(); save('duration', null); })",
  "(function () { actions['modifyEnergy'](targets['self'](), function (x) { return ((2) * (maximumEnergyAmount(targets['controllerOf'](targets['random'](thatMuch(), other(objectsMatchingConditions('allobjects', []))))))); }); })",
  "(function () { actions['payEnergy'](targets['opponent'](), thatMuch()); })",
  "(function () { actions['canMoveAgain'](targets['all'](other(objectsMatchingConditions('allobjects', [])))); })",
  "(function () { actions['dealDamage'](targets['allPlayers'](), attributeSum(objectsMatchingConditions('kernel', []), 'speed')); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['copyOf'](targets['that']()), targets['controllerOf'](targets['thisRobot']())); })",
  "(function () { actions['modifyAttribute'](targets['self'](), 'allattributes', function (x) { return x + attributeValue(targets['copyOf'](targets['all'](other(objectsMatchingConditions('allobjects', [])))), 'attack'); }); })",
  "(function () { actions['returnToHand'](targets['choose'](objectsMatchingConditions('robot', []), 3), targets['controllerOf'](targets['random'](((attributeSum(cardsInHand(targets['controllerOf'](targets['choose'](other(other(objectsMatchingConditions([], []))), count(cardsInHand(targets['itP'](), 'anycard', [])))), 'allobjects', []), 'attack')) * (attributeSum(cardsInDiscardPile(targets['theyP'](), [], []), 'cost'))), other(objectsMatchingConditions('robot', [conditions['attributeComparison']('health', (function (x) { return x < maximumEnergyAmount(targets['self']()); }))]))))); })",
  "(function () { actions['modifyAttribute'](targets['conditionOn'](targets['thisRobot'](), function () { return !(globalConditions['collectionExists'](allTiles())); }), 'cost', function (x) { return Math.floor(x / thatMuch()); }); })",
  "(function () { save('duration', 3); (function () { save('duration', 1); (function () { actions['winGame'](targets['opponent']()); })(); save('duration', null); })(); save('duration', null); })",
  "(function () { actions['rewriteText'](targets['random'](3, cardsInDiscardPile(targets['allPlayers'](), 'allobjects', [])), { '㊻沜枲韢髕ɽ냶첓⣇\u0090ໝ屮鶧ᔋ꧇玔惋ꕒￎ艴珰놆䲺쬄箦⼰䐧窰୭泥璞鈈': '亢㯼㸴剪荾돝㢼䣾쵶㑯콏歄扊킸ⱶৢ軸斨綧嫈嶔ǅ╁꼠⚥㳬㕂ⴝｍ븇깖玍', '駜䬖Ȗ⺓㱜ᜄ㎓꧀렅ी萱嗷鲜࿢龺﯊뻝剦㌃˓': '䱨潱酯顴畫鸧ⷫ瀨黗ॹֻᳶͲᢶ蔤䬔⌂徃꤂佱鶸慩', '૝䇏嶷묊뻓ᾂ෋瞭瀬葂爧㑬풳子ᣄ귥㏚隑奣繽噢': '↬켲氀斡Ꜹ踃禯诒꩹z집儤篇二ﴩ鞩쮋쟬', '眦ﶰ': '臹귋읢壟핎씺ꃦ♩觅猳⻹鶀遡镶㲺텵㯯뎯', 'ᐓ簔穞暓⢴⽠簹∜顉ർ覩腯㮥묇╅ﳭ姪럧⸞⥔': 'ꦑ딝㍱屸䦰볳퍈䯋㜡礼ꧭ췷꺿ᷮ쮍故肚䖅﹵䣠⭨饘韡該ꠠ㦩ꄚǼ', '螹ퟤ䴸ำग़꼡忆ᨰᡴﮛ㶕笯祺쁒Ⱗ鿐ꊢ檲߫巉Ꮵ椳풎쁊䷐侰ࡎゟ譲': '꺁ࣛ쟥霍믨祓', '挈㖅䷖䄎呞ㄓ㝥躃ﭙ示追랍뢂ᨠ멕ᒂ띳⏰⥩컁鹣䃻⠚龝ﶈ': '尟鄠㉩㶋ꌔ⇭蟨㐷룜뉈嬁眹㛔ጷ쒌䏮퍝〕ਮ㋓当䔪忮帏၌ൻ쁓清', '旲㤳铞혜쭥侙': 'ꣽ㜁囎⇉싗ⴴ⸦楨᫖⫅', '㗙㷛呵惰袆鲍엀阞䣴⡘臘갋ꢡ햟': '黅늼❦', '꺺磸痥榋킫폶笃聤熀摸': '搳瘢绞좲캝潶㦈㲎夒↫冀照迻䱹障멒緼ꡓ憎', '髫㌂ꆮ裐帨븁鐢鎴ỉ獮ᴃꝠ볺왝谌客፣쮬ᦲ畘簄': '嬻䛼璲뇻궆W柧සﰕ않뚷螴㳦䒈봐Ӡ穠愱罬쬺胾ꂗ构䠱徎㾁裈ằ⟏뎤', '戳⢽钂ᾈ縓毠뾪邱Ւ懤쉡镢侯椇齁﷋弯䗦킻䓩鸮蕣့頥ຯ': '臭阧♞컚ᝅ㰚뵁ꫪ䲰䴗壆嶛枇돰䝋ᾦ롂쀮㖵൰魘ꞛ϶뺏驼', 'ⱱ࿒⹗ꘒٺ톚᳁뾅悱둯⎨肒ⅽ員鱺偈奬⻀ꊎ㜮✮': '噮毥꓈蔖奬ﺩ閃', '࿇툨⊤襵품퓲컢院䓾컘ꯃ뛾꽝ﭖ暪῝蓜™獀䱦': '劖筞錓ꪤ꠳苩枝䙰邚ီ槭榜蓆န㈆ⵠ矫ඡ쾤틹箅禁ⓑ箙뗴쿾햜੓揀﬩☒ㆊ垿', '鎄㿫壂۬컋୾': '퀿瀮飠䯵競당絾绘﫯戋❠㶍ೇ쩁秄㨷띹ᰂѱ켿獍黕龻듀᥯親', '㧸మ飑떀呅棅Ņ嫆妃욷䂱ྰ▚芻즮풕㢨촼捊ꂁ긓க혵甤க㭋돝创죡堇ڑ鲾碢': '媪宖艵佅⁮Ḳꓮ벛ꍔ渕剋ত∭뽍᝴緙ꭞ뉯Ꙛ鯶გꑥ⸈꣓푼≎曳谾侈졛鎥', 'Ƀ蘭묆㯓蜠䶄薬谆ￚ燛㳬⶚풁帒딢Xꇱ襺㫳軛ꆯ近邆皑俄ᢞ휍㗓럷憙': '鈢䥲纙偢㠣ʋ衽鷭ኮ璞秓伹蹻鎫ฒ皿蜋', '⡭췞陆㩨㺺䨴璦坎는媉蘥堬匽匜⊏릆쐓馘೽ꇆ쑿잎ꀒ잷줂䜽묇ｂ躮墂꒤દ匦䋦': '壂䤤ὓ∃൬暷攊镚ࢼ봏煇痜㱯윥䠑㰞び姑', '૤몠倔Ⓨᡐ𥳐࿓㗦ω俜冊茒㊻䁀뫌ǵԀ䝥ꥀ䟖顺ʶ䣔믻䬘혬刢慎䫮外': '슰儐컪∹呃쭒灊璣ᄄꟼ咧࿥자', '㱧薽畔㫽⅘ι꾩੠欽᏶綥홷ⵓ⷗퍔똊룒㻍寴揄ꁚ띭퓺➛뾗綃괅옴㭔뉙洍': '梀翸隐櫨ᚰ攋㑉竂崣纕！砉㝎쨧࢜၁ഝﵖ', '澄欣簢罟觝ꎕ톥嬧ᬺ⨷佷溝䘮踞⸡ﺘ汮韛뤪⳽': '寧ᆷ딑波飝搴膑刺࿆꩜铞䓚䍐Ѓ䴿쐌欜ᎊ荑앿' }); })",
  "(function () { save('target', targets['that']()); })",
  "(function () { actions['draw'](targets['self'](), 0); })",
  "(function () { actions['takeControl'](targets['itP'](), objectsMatchingConditions('kernel', [conditions['adjacentTo'](targets['all'](objectsMatchingConditions('robot', [conditions['hasProperty']('isdestroyed')]))), conditions['withinDistanceOf'](energyAmount(targets['theyP']()), targets['they']())])); })",
  "(function () { actions['dealDamage'](targets['thisRobot'](), 1); })",
  "(function () { actions['payEnergy'](targets['itP'](), count(cardsInDiscardPile(targets['controllerOf'](targets['random'](count(other(other(objectsMatchingConditions([], [])))), other(objectsMatchingConditions('allobjects', [])))), 'robot', [conditions['attributeComparison']('cost', (function (x) { return x % 2 == 1; }))]))); })",
  "(function () { save('duration', 1); (function () { actions['winGame'](targets['opponent']()); })(); save('duration', null); })",
  "(function () { actions['returnToHand'](targets['it'](), targets['allPlayers']()); })",
  "(function () { actions['dealDamage'](targets['itP'](), (Math.ceil(thatMuch() / 2))); })",
  "(function () { actions['draw'](targets['allPlayers'](), ((((count(cardsInHand(targets['opponent'](), 'event', []))) * (maximumEnergyAmount(targets['theyP']())))) * ((Math.ceil(maximumEnergyAmount(targets['self']()) / 2))))); })",
  "(function () { actions['payEnergy'](targets['theyP'](), maximumEnergyAmount(targets['allPlayers']())); })",
  "(function () { save('duration', 2); (function () { actions['modifyEnergy'](targets['self'](), function (x) { return ((2) * (maximumEnergyAmount(targets['controllerOf'](targets['random'](thatMuch(), other(objectsMatchingConditions('allobjects', []))))))); }); })(); save('duration', null); })",
  "(function () { actions['canAttackAgain'](targets['it']()); })",
  "(function () { actions['returnToHand'](targets['union']([ targets['that']() ]), targets['controllerOf'](targets['all'](objectsMatchingConditions('allobjects', [conditions['adjacentTo'](load('target')), conditions['not'](conditions['exactDistanceFrom'](2, load('target'))), conditions['hasProperty']('movedthisturn'), conditions['hasProperty']('movedlastturn'), conditions['not'](conditions['controlledBy'](targets['opponent']())), conditions['adjacentTo'](targets['that']())])))); })",
  "(function () { actions['returnToHand'](targets['that'](), targets['controllerOf'](objectsMatchingConditions(['structure', 'robot', 'robot'], [conditions['not'](conditions['hasProperty']('attackedthisturn')), conditions['exactDistanceFrom'](attributeValue(targets['conditionOn'](objectsMatchingConditions([], []), function () { return globalConditions['targetMeetsCondition'](targets['all'](objectsMatchingConditions('allobjects', [])), conditions['exactDistanceFrom'](attributeValue(targets['conditionOn'](targets['all'](cardsInHand(targets['controllerOf'](targets['thisRobot']()), 'kernel', [])), function () { return globalConditions['collectionExists'](objectsMatchingConditions('structure', [])); }), 'health'), load('target'))); }), 'speed'), targets['that']()), conditions['controlledBy'](targets['allPlayers']()), conditions['withinDistanceOf']((((Math.ceil(maximumEnergyAmount(targets['self']()) / 2))) * (thatMuch())), other(objectsMatchingConditions('robot', [])))]))); })",
  "(function () { actions['swapAttributes'](targets['that'](), 'health', ['cost', 'speed']); })",
  "(function () { actions['forEach'](targets['allPlayers'](), (function () { actions['modifyAttribute'](targets['all'](other(other(objectsMatchingConditions([], [conditions['controlledBy'](targets['self']())])))), 'cost', function (x) { return x + (Math.floor(energyAmount(targets['self']()) / 2)); }); })); })",
  "(function () { actions['takeControl'](targets['controllerOf'](targets['thisRobot']()), targets['random'](maximumEnergyAmount(targets['itP']()), objectsMatchingConditions('allobjects', []))); })",
  "(function () { actions['swapPositions'](targets['choose'](other(objectsMatchingConditions('allobjects', [conditions['unoccupied'](), conditions['hasProperty']('movedthisturn')])), attributeSum(other(other(other(objectsMatchingConditions('allobjects', [])))), 'attack')), targets['that']()); })",
  "(function () { save('duration', 2); (function () { actions['endTurn'](); })(); save('duration', null); })",
  "(function () { actions['canMoveAgain'](targets['it']()); })",
  "(function () { actions['dealDamage'](targets['itP'](), energyAmount(targets['theyP']())); })",
  "(function () { actions['modifyEnergy'](targets['allPlayers'](), function (x) { return x - (Math.floor((Math.floor(attributeSum(cardsInHand(targets['controllerOf'](load('target')), [], []), 'cost') / 2)) / 2)); }); })",
  "(function () { actions['canMoveAgain'](targets['that']()); })",
  "(function () { actions['swapPositions'](targets['it'](), targets['it']()); })",
  "(function () { save('duration', 0); (function () { actions['canAttackAgain'](targets['they']()); })(); save('duration', null); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['choose'](cardsInHand(targets['itP'](), 'structure', []), 0), targets['allPlayers']()); })",
  "(function () { actions['moveObject'](targets['that'](), function () { return targets['that'](); }); })",
  "(function () { actions['forEach'](allTiles(), (function () { actions['takeControl'](targets['allPlayers'](), objectsMatchingConditions('kernel', [conditions['controlledBy'](targets['self']())])); })); })",
  "(function () { actions['payEnergy'](targets['theyP'](), maximumEnergyAmount(targets['controllerOf'](targets['thisRobot']()))); })",
  "(function () { actions['discard'](targets['copyOf'](targets['random'](2, other(objectsMatchingConditions('kernel', [conditions['controlledBy'](targets['self']())]))))); })",
  "(function () { actions['destroy'](targets['random'](thatMuch(), other(other(objectsMatchingConditions('allobjects', []))))); })",
  "(function () { actions['moveCardsToHand'](targets['random'](thatMuch(), cardsInDiscardPile(targets['opponent'](), 'kernel', [conditions['attributeComparison']('cost', (function (x) { return x >= attributeSum(objectsMatchingConditions('robot', []), 'cost'); }))])), targets['self']()); })",
  "(function () { actions['setAttribute'](targets['thisRobot'](), [['allattributes', 'speed']], \"(function () { return thatMuch(); })\"); })",
  "(function () { actions['forEach'](objectsMatchingConditions('allobjects', []), (function () { actions['returnToHand'](targets['it'](), targets['allPlayers']()); })); })",
  "(function () { save('duration', 0); (function () { actions['discard'](targets['copyOf'](load('target'))); })(); save('duration', null); })",
  "(function () { actions['canAttackAgain'](targets['they']()); })",
  "(function () { actions['returnToHand'](targets['they'](), targets['allPlayers']()); })",
  "(function () { actions['canMoveAgain'](targets['thisRobot']()); })",
  "(function () { actions['discard'](targets['all'](cardsInDiscardPile(targets['theyP'](), 'structure', []))); })",
  "(function () { actions['discard'](targets['copyOf'](targets['they']())); })",
  "(function () { actions['canMoveAndAttackAgain'](targets['thisRobot']()); })",
  "(function () { actions['destroy'](targets['that']()); })",
  "(function () { save('target', targets['conditionOn'](targets['they'](), function () { return globalConditions['collectionCountComparison'](allTiles(), (function (x) { return x < attributeValue(targets['thisRobot'](), 'speed'); })); })); })",
  "(function () { actions['restoreHealth'](targets['they'](), attributeSum(cardsInHand(targets['allPlayers'](), 'event', [conditions['attributeComparison']('attack', (function (x) { return x % 2 == 1; }))]), 'health')); })"
];

export default actions;
