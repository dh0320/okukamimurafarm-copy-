function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} = React;

// --- Data & Assets ---
const BASE_URL = "https://raw.githubusercontent.com/dh0320/okukamimurafarm/f273d82bcc2d0c08371bb0e42d3169c3d36e4b9b";
const IMAGES = {
  // Top Slideshow
  top_farm: `${BASE_URL}/images/topfarm.png`,
  top_staff: `${BASE_URL}/images/topstaff.png`,
  top_apple: `${BASE_URL}/images/topapple.png`,
  top_children: `${BASE_URL}/images/topchildren.png`,
  top_morning: `${BASE_URL}/images/topmorning.png`,
  // Top Horror Changes (Phase 3)
  top_change_village: `${BASE_URL}/images/topchangevillage.png`,
  top_change_stop: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/topchangestop.png",
  // Icon (Header)
  icon_default: `${BASE_URL}/images/icondefault.png`,
  icon_change_1: `${BASE_URL}/images/iconchange1.png`,
  icon_change_2: `${BASE_URL}/images/iconchange2.png`,
  icon_change_3: `${BASE_URL}/images/iconchange3.png`,
  // Products
  ec_apple: `${BASE_URL}/images/ecapple.png`,
  ec_applepie: `${BASE_URL}/images/ecapplepie.png`,
  ec_grape: `${BASE_URL}/images/ecgrape.png`,
  ec_jam: `${BASE_URL}/images/ecjam.png`,
  ec_set: `${BASE_URL}/images/ecset.png`,
  // Blog
  blog_sunny: `${BASE_URL}/images/blogsunny.png`,
  blog_applepie: `${BASE_URL}/images/blogapplepie.png`,
  blog_harvest: `${BASE_URL}/images/blogharvest.png`,
  blog_food: `${BASE_URL}/images/blogfood.png`,
  blog_oldbook: `${BASE_URL}/images/blogoldbook.png`,
  // Staff
  staff_manager: `${BASE_URL}/images/staffmanager.png`,
  staff_manager_change: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/cce9c3db56a9593996fa1381a826289236d747a2/images/staffmanagerchange.png",
  staff_submanager: `${BASE_URL}/images/staffsubmanager.png`,
  staff_wife: `${BASE_URL}/images/staffwife.png`,
  staff_trainee: `${BASE_URL}/images/stafftrainee.png`,
  staff_victim: `${BASE_URL}/images/staffvictim.png`,
  staff_victim2: `${BASE_URL}/images/staffvictim2.png`,
  // Symbol Tree
  tree_default: `${BASE_URL}/images/treedefault.png`,
  tree_change: `${BASE_URL}/images/treechange.png`,
  // Village
  village_normal: `${BASE_URL}/images/villagenormal.png`,
  village_snow: `${BASE_URL}/images/villagesnow.png`,
  village_night: `${BASE_URL}/images/villagenight.png`,
  // Access
  access_map: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/access.png",
  // Video
  victim_movie: `${BASE_URL}/images/victimmovie.mp4`,
  stop_movie: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/stopmovie.mp4",
  // Recruit
  recruiting: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/recruiting.png",
  recruiting_change: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/recruitingchange.png",
  // Recipe
  recipe_applepie: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/applepierecipe.png",
  // Grafting
  grafting: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/52ef76040ef84ddb52fdf5827a52315f4c4d9ec7/images/tsugiki.png",
  // Ending
  ending_normal: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/normalend.png",
  ending_silenced: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/silencedend.png",
  ending_perfect: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/perfectend.png",
  ending_true: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/trueend.png",
  // topkodawari
  kodawari_soil: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/kodawarisoil.png",
  kodawari_eda: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/kodawarieda.png",
  kodawari_hand: "https://raw.githubusercontent.com/dh0320/okukamimurafarm/main/images/kodawarihand.png"
};

// 記事データ
const BLOG_DATA = [{
  id: 4,
  date: "2026.01.18",
  title: "野菜の収穫",
  desc: "リンゴだけでなく美味しい野菜もたくさんとれます！神様に感謝です！",
  img: IMAGES.blog_harvest,
  content: `「奥神伏ファーム＝りんご」のイメージを持ってくださる方が多いのですが、実は野菜もたくさん育てています。\n今日は、畑の野菜をまとめて収穫しました！\n\n土から引き上げた瞬間に分かる、根の張り具合。\n葉の張り、色、香り。\n手に取るだけで「よく育ってくれたなあ」と思える瞬間があって、これが畑の仕事の醍醐味です。\n\n収穫できたのは、\n・みずみずしい葉物\n・甘みののった根菜\n・料理が楽しくなるハーブ\nなど、食卓がぐっと豊かになるものばかり。\n\n自然相手の仕事なので、うまくいかない日もあります。\nそれでも、太陽と雨と土、そして人の手がそろって「実り」になったときは、やっぱり胸がいっぱいになります。神様に感謝です。\n\nこれからも、果実も野菜も、奥神伏の季節をそのまま感じられる味をお届けできるよう、丁寧に育てていきます。\n収穫の様子は写真でもたっぷり掲載しますので、ぜひのぞいてくださいね。`
}, {
  id: 3,
  date: "2026.01.10",
  title: "村の子供達とアップルパイ作り体験！",
  desc: "子供達とのパイ作り！リクエストにお答えしてレシピも掲載しますね！",
  img: IMAGES.blog_applepie,
  isRecipe: true,
  content: `先日、村の子どもたちと一緒にアップルパイ作り体験をしました。\nエプロン姿で集まってくるだけで、キッチンが一気ににぎやかに。りんごを切る音、笑い声、甘い香り…この時間だけで「やってよかったなあ」と思えます。\n\n今回使ったりんごは、しっかり甘みがのったものを選んで、シナモンは控えめに。\n小さな手でも扱いやすいように、りんごは少し薄めにカットして、火入れも短時間で仕上げました。\n\n焼きあがったパイをオーブンから出した瞬間、\n「わあ〜！」って声が揃うのが最高です。\n表面がこんがり色づいて、ふわっと立つ香りがたまりません。\n\n「おうちでも作りたい！」という声が多かったので、リクエストにお応えしてレシピもまとめました。\n下のリンクからご覧いただけます👇\n\n最後に、参加してくれたみんなへ。\n包丁を持つ手も、パイ生地を伸ばす手も、とっても真剣で素敵でした。\nまた季節が変わったら、別のお菓子でも一緒に作ろうね。`
}, {
  id: 2,
  date: "2026.01.05",
  title: "みんなでご飯作り",
  desc: "農園のみんなでランチに野菜たくさんのピザを作りました！",
  img: IMAGES.blog_food,
  content: `今日は少し手が空いたタイミングで、農園のみんなでランチ作り。\n「せっかくだし、畑の野菜を思いっきり使おう！」ということで、野菜たっぷりのピザを焼きました🍕🥬\n\n畑から採ってきたのは、\nズッキーニ、玉ねぎ、ほうれん草、ミニトマト、そして香りの良いハーブ。\n切って並べるだけでも色がきれいで、キッチンが一気に元気になります。\n\nピザ作りって、実は農園の仕事にちょっと似ていて。\n「どれを、どの順番で、どう並べたら一番おいしくなるか」\nみんなで相談しながら手を動かしている時間が、すごく楽しいんです。\n\n焼き上がりは、外はカリッと中はもちっと。\n野菜がじゅわっと甘くて、思わず無言になるおいしさでした。\n（気づいたら一枚目が一瞬で消えてました…笑）\n\n農園の日常は派手じゃないけれど、こういう小さな“ご褒美”があると、午後の作業も頑張れます。\nまた季節の野菜で、別のピザも試してみたいですね。`
}, {
  id: 1,
  date: "2026.01.01",
  title: "新年のご挨拶",
  desc: "本年も奥神伏ファームをよろしくお願いいたします。",
  img: IMAGES.blog_sunny,
  content: `あけましておめでとうございます。奥神伏ファームです。\n旧年中は、私たちの農園を見つけてくださり、温かい言葉や応援をたくさんありがとうございました。\n\n冬の奥神伏は、空気がきりっと澄んでいて、朝は畑が白くふわっと霜で覆われます。収穫のにぎやかさが落ち着いたこの季節は、来る春のための“仕込み”の時期。果樹の手入れや土づくり、今年の畑の計画を立てながら、少しずつ次の季節へ向けて整えていきます。\n\n今年も、\n・旬の果実や野菜のこと\n・収穫や加工の裏側\n・体験イベントの様子\n・村の四季の風景\nを、写真と一緒に日誌でこまめにお届けしていく予定です。\n\n「ここに来ると、なんだか呼吸が深くなる」\nそんな場所であり続けられるように、家族とスタッフみんなで丁寧に育てていきます。\n\n本年も奥神伏ファームを、どうぞよろしくお願いいたします。\n奥神伏ファーム一同`
}];

// スタッフ詳細データ
const STAFF_DATA = [{
  id: 'yuri',
  name: '神去 由利',
  role: 'PROCESSOR',
  role_jp: '加工品・農園キッチン担当',
  image: IMAGES.staff_wife,
  short_intro: '季節の手しごとで、やさしい味を届けます',
  intro: `奥神伏農園で加工品づくりと農園キッチンを担当している、神去由利です。収穫した果実の香りや甘みを大切にしながら、ジャムや焼き菓子、季節の保存食を手仕事で仕込んでいます。お越しいただいた方がほっとできるような、素朴でやさしい味を目指しています。`,
  reason: `家族の営む農園の手伝いをしていく中で、「採れたてをそのまま届けるだけでなく、季節の恵みを一年中楽しめる形にしたい」と思うようになりました。昔から家で作っていた保存食やお菓子を、少しずつ農園の“顔”としてお届けするようになったのが始まりです。`,
  joy: `完熟のタイミングを見極めて仕込んだ加工品が、「また食べたい」と言ってもらえた時が一番うれしいです。規格外の果実も無駄にせず、おいしさに変えていけるのもやりがいですね。季節ごとに香りや水分量が変わるので、毎年同じようで同じにならないところも面白いと感じています。`
}, {
  id: 'sato',
  name: '佐藤 健太',
  role: 'WEB MANAGER',
  role_jp: '副園長・Web/広報・体験運営',
  image: IMAGES.staff_submanager,
  short_intro: '農業を楽しみながら、畑や奥神伏村の魅力を伝えます',
  intro: `副園長の佐藤健太です。農園の運営サポートに加えて、Webサイトやお問い合わせ対応、体験プログラムのご案内など「外と農園をつなぐ役割」を担当しています。畑の仕事も覚えながら、写真撮影や文章づくりで奥神伏の魅力が伝わるよう日々工夫しています。`,
  reason: `以前は街で働いていましたが、初めて奥神伏を訪れたときに、空気や水のきれいさ、季節の移ろいの濃さに惹かれました。農園の仕事を知るほどに、作る人の顔が見えるものを丁寧に届けたいと思い、移住してこの農園に加わりました。`,
  joy: `お客様の「サイトを見て来ました」「日誌を読んで安心しました」という一言が、すごく励みになります。畑での作業がそのまま商品や体験につながり、反応が返ってくるのが面白いですね。小さな改善を積み重ねて、農園全体が少しずつ良くなっていく感覚にやりがいを感じています。`,
  hidden: "この村は狂ってる。出られない。助けてくれ。" // F01用
}, {
  id: 'lin',
  name: 'グエン・マイ・リン',
  role: 'TRAINEE',
  role_jp: '技能実習生代表・栽培チーム',
  image: IMAGES.staff_trainee,
  short_intro: '四季の仕事を学び、丁寧な栽培を支えます',
  intro: `技能実習生代表のグエン・マイ・リンです。栽培チームで作業をしながら、実習生のみんなが働きやすいように声をかけたり、困ったことがあった時に相談をまとめたりしています。日本の農業の技術と、奥神伏の四季の仕事を学べる毎日が新鮮です。`,
  reason: `果樹栽培や加工まで一貫して学べる環境に魅力を感じ、この農園で実習をしたいと思いました。山に囲まれた場所で、季節の変化を近くで感じながら働けることにも惹かれました。来日してからは、日本語と作業の両方を少しずつ身につけています。`,
  joy: `剪定や手入れをした木が、季節を越えて実をつける瞬間を見ると、とても達成感があります。収穫した果実が商品になり、「おいしい」と言ってもらえると誇らしい気持ちになります。代表としては、みんなが安心して学べるように、作業や生活のことを小さなことでも共有できる雰囲気づくりを大切にしています。`
}, {
  id: 'vu',
  name: 'ヴー・タイン・アン',
  role: 'FORMER TRAINEE',
  role_jp: '元技能実習生',
  image: IMAGES.staff_victim,
  short_intro: '',
  intro: `ヴー・タイン・アンと申しました。技能実習生として奥神伏農園で栽培作業を担当しておりました。畑での作業や収穫、簡単な管理業務などに携わり、日本の農業を現場で学ぶ日々を過ごしておりました。静かな環境で、季節の移ろいを身近に感じながら働いておりました。`,
  reason: `日本の果樹栽培や農園運営に興味を持ち、技能実習制度を通じてこの農園に来ることを決めました。山に囲まれた場所で、自然と向き合いながら仕事ができる点に魅力を感じておりました。説明会や資料では、丁寧に技術を学べる環境だと紹介されておりました。`,
  joy: `手入れを続けた木が実をつけた瞬間を見ることに、やりがいを感じておりました。剪定や整枝の作業を任されることもあり、少しずつ信頼されているように感じておりました。作業の合間に、農園の静けさや空気の匂いに落ち着きを覚えることもありました。決められた手順を守り、指示に従って仕事を進める日々を過ごしておりました。`,
  special_note: "※現在は掲載と更新を行っておりません…",
  special_image: IMAGES.staff_victim2
}];
const MAX_FLAGS = 18;
const SAVE_KEY = "okukamifushi_save_v1";
const FLAG_META = {
  F01: {
    title: "副園長の隠しメッセージ",
    description: "反転でSOS"
  },
  F02: {
    title: "悲痛な訴え動画",
    description: "商品タグから動画"
  },
  F03: {
    title: "管理人からのお知らせ",
    description: "関係者ページ発見"
  },
  F04: {
    title: "アップルパイの秘密",
    description: "レシピ奥の隠し導線"
  },
  F05: {
    title: "変化する募集要項",
    description: "チェックが「選別」に"
  },
  F06: {
    title: "隠された実習生",
    description: "失踪記録の痕跡"
  },
  F07: {
    title: "古い記録のブログ",
    description: "1826年データ"
  },
  F08: {
    title: "村からは出られない",
    description: "トップスライドの罠"
  },
  F09: {
    title: "園長の異変",
    description: "自動グリッチ"
  },
  F10: {
    title: "シンボルツリーの秘密",
    description: "御神木の根元"
  },
  F11: {
    title: "異常な監視",
    description: "アクセスの異常"
  },
  F12: {
    title: "問い合わせ乗っ取り",
    description: "フォームが侵食"
  },
  F13: {
    title: "覚悟の通報",
    description: "通報実行フラグ"
  },
  F14: {
    title: "村ぐるみの儀式",
    description: "ホバー/タップ異変"
  },
  F15: {
    title: "縦読みレビュー",
    description: "たすけて / 1826のヒント"
  },
  F16: {
    title: "社員名簿の欠落",
    description: "色違いのりんごから名簿"
  }
};
const FLAG_META_ORDER = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16'];
const EVIDENCE_FLAGS = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F14', 'F15', 'F16'];
const KEY_EVIDENCE_FLAGS = ['F02', 'F04', 'F06', 'F07', 'F10', 'F12'];
const ENDING_CONTENT = {
  SILENCED: {
    title: "SILENCED END",
    subtitle: "通報は届かなかった。声は闇に消えた。",
    story: ["あなたは確かに通報を行った。証拠も、記録も、警告も送ったはずだった。", "だが、何も変わらなかった。数日後の奥神伏ファームは、何事もなかったかのように通常営業を再開している。", "園長とその妻の姿だけは変わらない。それ以外のスタッフは、まるで名簿ごと塗り替えられたように入れ替わっていた。", "農園の掲示や案内文も、妙に整いすぎている。違和感だけを残して、肝心な痕跡はどこにもない。", "問い合わせても返事は来ない。来たとしても、定型文のように冷たく、こちらの言葉が届いていない感覚だけが残る。", "夜になると、ページの片隅に一瞬だけ“赤い点”が灯り、次の瞬間には何もなかったことになる。", "あなたが通報を終えてブラウザを閉じた夜、あの泥道に続いていたはずの“足跡”の痕跡は、翌朝には跡形もなく消えていた。"],
    image: IMAGES.ending_silenced
  },
  NORMAL: {
    title: "NORMAL END",
    subtitle: "警察は動いた。だが園長たちは消えてしまった。",
    story: ["通報は正式に受理され、警察は奥神伏ファームへの捜査を開始した。", "農園は一時封鎖され、倉庫や作業場からはいくつかの証拠品が押収された。", "だが、捜査の中心にいたはずの園長夫妻と数名の関係者は、捜索が始まる前に姿を消していた。", "公開された報告書の多くは黒塗りのまま残され、事件は“未解決のまま継続”として処理される。", "救出された副園長の佐藤と実習生たちは保護されたが、物音ひとつに肩を震わせ、誰かの視線を恐れる日々が続く。", "彼らは口を開こうとすると、言葉の手前で止まる。まるで“話してはいけない”合図がまだ残っているかのように。", "そして今日も、どこかで真っ赤なリンゴは生産され続け、市場に紛れ、何事もなかったように誰かの食卓へ届いている。"],
    image: IMAGES.ending_normal
  },
  TRUE: {
    title: "TRUE END",
    subtitle: "真相が暴かれた。救出は間に合った。",
    story: ["あなたが集めた証拠は決定打となり、警察は大規模な一斉捜索を開始した。", "奥神伏ファームで密かに行われていた儀式は中断され、主要な関係者は拘束された。", "閉ざされた区画から行方不明者たちが発見され、無事に救出された。", "副園長の佐藤と実習生たちは保護され、長く続いた恐怖から少しずつ呼吸を取り戻していく。", "震えながらも、彼らは自分の名前を言えるようになる。「ここにいる」と言えるようになる。", "一方で、村は静まり返ったままだ。誰も多くを語らず、目を合わせることすら避ける者もいる。", "それでも、少なくとも“あの夜”は止まった。あなたの手で、救いは間に合った。"],
    image: IMAGES.ending_true
  },
  PERFECT: {
    title: "PERFECT END",
    subtitle: "すべての真実が解放された。",
    story: ["あなたはすべての証拠を集めきり、隠されていた記録の在処を突き止めた。", "村の歴史、儀式の全貌、そして積み重ねられてきた犠牲の数が、余白のない形で白日のもとに晒される。", "事件は個人の犯罪ではなく、村ぐるみで温存されてきた構造として認識され、逃げ道は塞がれた。", "公表された資料は社会に衝撃を与え、関係者の責任は明確になり、再発の芽を潰すための動きが一気に進む。", "あなたの得た記録は、生き残った人々の希望となり、“次は起きない”という確かな根拠になった。", "真っ赤なリンゴはもう、黙って流通しない。誰もがその色の意味を知り、見過ごさない。", "そしてあなたは、真実を解放した者として静かにページを閉じる。物語は終わった——終わらせた。"],
    image: IMAGES.ending_perfect
  }
};

// --- Phase Rules (Production) ---
const PHASE1_FLAGS = ['F01', 'F04', 'F15', 'F16']; // 2つ以上でPhase2
const PHASE2_FLAGS = ['F02', 'F03', 'F11', 'F12']; // 3つ以上でPhase3
const PHASE3_FLAGS = ['F05', 'F06', 'F07', 'F08', 'F14']; // 3つ以上でPhase4
const PHASE4_FLAGS = ['F09', 'F10', 'F13']; // Phase4で主に収集するフラグ

const countFound = (flags, ids) => ids.reduce((acc, id) => acc + (flags[id] ? 1 : 0), 0);
const calcPhase = flags => {
  const p1 = countFound(flags, PHASE1_FLAGS);
  const p2 = countFound(flags, PHASE2_FLAGS);
  const p3 = countFound(flags, PHASE3_FLAGS);
  // 閾値変更：
  // Phase1フラグ2つ以上でPhase2
  // Phase2フラグ3つ以上でPhase3
  // Phase3フラグ3つ以上でPhase4
  // Phase4フラグは進行判定には使わず、Phase4内の収集対象として扱う
  if (p3 >= 3) return 4;
  if (p2 >= 3) return 3;
  if (p1 >= 2) return 2;
  return 1;
};
const buildXIntentUrl = ({
  text,
  url,
  hashtags
}) => {
  const base = "https://twitter.com/intent/tweet";
  const qs = new URLSearchParams();
  if (text) qs.set("text", text);
  if (url) qs.set("url", url);
  if (hashtags) qs.set("hashtags", hashtags);
  return `${base}?${qs.toString()}`;
};
const computeEnding = (flags, phase) => {
  const evidenceCount = countFound(flags, EVIDENCE_FLAGS);
  const keyCount = countFound(flags, KEY_EVIDENCE_FLAGS);
  const missingKeyEvidence = KEY_EVIDENCE_FLAGS.filter(id => !flags[id]);
  let endingId = "NORMAL";
  // 優先順：PERFECT → TRUE → Bad → NORMAL
  if (evidenceCount === 15 && keyCount === 6) {
    endingId = "PERFECT";
  } else if (evidenceCount >= 12 && keyCount >= 5) {
    endingId = "TRUE";
  } else if (evidenceCount <= 10 || keyCount <= 2) {
    // Bad（既存のSILENCEDコンテンツに割り当て）
    endingId = "SILENCED";
  } else {
    endingId = "NORMAL";
  }
  const baseContent = ENDING_CONTENT[endingId];
  const story = [...baseContent.story];
  if (endingId === "NORMAL" && missingKeyEvidence.length > 0) {
    const missingTitles = missingKeyEvidence.map(id => FLAG_META[id]?.title || id).join(" / ");
    story.push(`不足していたのは、${missingTitles}。報告書には黒塗りの行が残った。`);
  }
  const shareUrl = window.location.protocol === "file:" ? "" : `${window.location.origin}${window.location.pathname}`;
  const shareText = `【${baseContent.title}】${baseContent.subtitle}（証拠 ${evidenceCount}/${EVIDENCE_FLAGS.length}）`;
  return {
    endingId,
    title: baseContent.title,
    subtitle: baseContent.subtitle,
    story,
    image: baseContent.image,
    evidenceCount,
    keyCount,
    share: {
      text: shareText,
      hashtags: "奥神伏ファーム,ARG,謎解き",
      url: shareUrl
    }
  };
};

// Common Components
const SectionTitle = ({
  title,
  sub,
  align = "center"
}) => /*#__PURE__*/React.createElement("div", {
  className: `mb-12 md:mb-20 text-${align} animate-fade-up`
}, /*#__PURE__*/React.createElement("p", {
  className: "text-primary font-eng text-sm tracking-widest font-semibold mb-3 uppercase"
}, sub), /*#__PURE__*/React.createElement("h2", {
  className: "text-3xl md:text-4xl font-serif text-text leading-tight"
}, title));

// MessageModal（notepad対応版）
const MessageModal = ({
  isOpen,
  message,
  onClose,
  isHorror,
  variant = "default"
}) => {
  if (!isOpen) return null;
  const isNotepad = variant === "notepad";
  const containerClass = isNotepad ? "bg-[#fffdf3] text-text border border-[#e6dccf] font-mono text-left" : isHorror ? "bg-black text-[#d9d2b6] border-4 border-[#7a6f4a] font-handwriting text-center" : "bg-white text-text border border-gray-200 text-center";

  // 罫線入り “メモ帳” 背景
  const notepadStyle = isNotepad ? {
    backgroundImage: "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 25px, rgba(0,0,0,0.08) 26px)",
    backgroundSize: "100% 26px"
  } : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-lg shadow-2xl max-w-md w-full relative animate-fade-up ${containerClass}`,
    style: notepadStyle,
    onClick: e => e.stopPropagation()
  }, isNotepad && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-7 top-0 bottom-0 w-[2px] bg-red-200/80 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] tracking-widest text-muted font-eng"
  }, "MEMO"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] tracking-widest text-muted font-eng"
  }, "INTERNAL"))), isNotepad ? /*#__PURE__*/React.createElement("pre", {
    className: "text-sm leading-relaxed whitespace-pre-wrap"
  }, String(message || "")) : /*#__PURE__*/React.createElement("p", {
    className: `text-lg mb-8 leading-relaxed ${isHorror ? "font-bold text-xl" : "font-serif"}`
  }, String(message || "").split("\n").map((line, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, line, /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("div", {
    className: isNotepad ? "mt-6 text-center" : ""
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: `px-8 py-3 rounded-full transition-colors font-bold text-sm ${isNotepad ? "bg-text text-white hover:bg-primary" : isHorror ? "bg-[#5f5438] text-[#f5f1de] hover:bg-[#7a6f4a]" : "bg-primary text-white hover:bg-primary-2"}`
  }, "\u9589\u3058\u308B"))));
};

// EvidenceToast（非ブロッキング通知）
const EvidenceToast = ({
  isOpen,
  message,
  onClose,
  isHorror
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 left-4 z-[300] w-[calc(100%-2rem)] md:w-auto max-w-md pointer-events-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: `rounded-lg shadow-2xl border p-4 pr-10 relative ${isHorror ? "bg-black text-[#d9d2b6] border-[#7a6f4a] font-handwriting" : "bg-white text-text border-border"}`
  }, /*#__PURE__*/React.createElement("p", {
    className: `text-sm leading-relaxed whitespace-pre-line ${isHorror ? "font-bold" : "font-serif"}`
  }, message), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: `absolute top-2 right-3 text-sm leading-none ${isHorror ? "text-[#cbbf94] hover:text-[#f0e4bc]" : "text-muted hover:text-text"}`,
    "aria-label": "close",
    title: "\u9589\u3058\u308B"
  }, "\xD7")));
};

// ConfirmModal（YES/NO）
const ConfirmModal = ({
  isOpen,
  message,
  onYes,
  onNo,
  yesLabel = "イエス",
  noLabel = "ノー",
  isHorror = true
}) => {
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
    onClick: onNo
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-8 rounded-lg shadow-2xl max-w-md w-full text-center relative animate-fade-up ${isHorror ? "bg-black text-[#d9d2b6] border-4 border-[#7a6f4a] font-handwriting" : "bg-white text-text border border-gray-200"}`,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("p", {
    className: `text-lg mb-8 leading-relaxed ${isHorror ? "font-bold text-xl" : "font-serif"}`
  }, String(message || "").split("\n").map((line, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, line, /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    className: `px-6 py-3 rounded-full transition-colors font-bold text-sm ${isHorror ? "bg-black text-[#cbbf94] border border-[#7a6f4a] hover:bg-[#7a6f4a] hover:text-[#f5f1de]" : "bg-gray-200 text-text hover:bg-gray-300"}`,
    onClick: onNo
  }, noLabel), /*#__PURE__*/React.createElement("button", {
    className: `px-6 py-3 rounded-full transition-colors font-bold text-sm ${isHorror ? "bg-[#5f5438] text-[#f5f1de] hover:bg-[#7a6f4a]" : "bg-primary text-white hover:bg-primary-2"}`,
    onClick: onYes
  }, yesLabel))));
};
const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button"
}) => {
  const baseClass = "inline-flex items-center justify-center px-8 py-3 rounded-full transition-all duration-300 font-medium tracking-wide text-sm";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-2 shadow-lg hover:shadow-xl",
    secondary: "border border-text text-text hover:bg-text hover:text-white",
    ghost: "text-text hover:text-primary underline-offset-4 hover:underline"
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    className: `${baseClass} ${variants[variant]} ${className}`
  }, children);
};
const ADSENSE_CONFIG = {
  client: "ca-pub-5996393131507547",
  slot: "3700035144"
};
const AdSpace = ({
  className = "",
  format = "auto",
  phase = 1
}) => {
  const adRef = useRef(null);
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    const checkConsent = () => {
      try {
        return localStorage.getItem("cookie_consent") === "accepted";
      } catch {
        return false;
      }
    };
    setConsent(checkConsent());
    const handleConsent = () => setConsent(checkConsent());
    window.addEventListener("cookie-consent-changed", handleConsent);
    return () => window.removeEventListener("cookie-consent-changed", handleConsent);
  }, []);
  useEffect(() => {
    if (!consent || !adRef.current) return;
    if (adRef.current.dataset.adLoaded) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adRef.current.dataset.adLoaded = "true";
    } catch (e) {/* AdSense not loaded yet */}
  }, [consent]);

  // Phase4以降はAdSenseポリシー保護のため広告を非表示
  if (phase >= 4) return null;
  if (!consent) {
    return /*#__PURE__*/React.createElement("div", {
      className: `w-full max-w-container mx-auto px-6 my-16 ${className}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-surface-2 border border-border rounded-xl w-full min-h-[90px] md:min-h-[250px] flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-muted/40 tracking-widest font-eng select-none"
    }, "AD")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `w-full max-w-container mx-auto px-6 my-16 ${className}`
  }, /*#__PURE__*/React.createElement("ins", {
    className: "adsbygoogle",
    ref: adRef,
    style: {
      display: "block",
      minHeight: "90px"
    },
    "data-ad-client": ADSENSE_CONFIG.client,
    "data-ad-slot": ADSENSE_CONFIG.slot,
    "data-ad-format": format,
    "data-full-width-responsive": "true"
  }));
};

// --- Layout Components ---

const Header = ({
  setPage,
  currentPage,
  phase
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const getIcon = () => {
    if (phase >= 4) return IMAGES.icon_change_3;
    if (phase >= 3) return IMAGES.icon_change_2;
    if (phase >= 2) return IMAGES.icon_change_1;
    return IMAGES.icon_default;
  };
  const menuItems = [{
    id: 'home',
    label: 'HOME'
  }, {
    id: 'about',
    label: 'ABOUT'
  }, {
    id: 'village',
    label: 'VILLAGE'
  }, {
    id: 'products',
    label: 'PRODUCTS'
  }, {
    id: 'diary',
    label: 'DIARY'
  }, {
    id: 'access',
    label: 'ACCESS'
  }, {
    id: 'recruit',
    label: 'RECRUIT'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: `fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm text-text' : 'bg-gradient-to-b from-black/60 to-transparent text-white'}`,
    style: {
      height: 'var(--header-height)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-4 md:px-8 h-full flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 cursor-pointer z-50",
    onClick: () => {
      setPage('home');
      setIsMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full overflow-hidden shadow-md transition-transform duration-500 hover:scale-105 flex items-center justify-center bg-transparent"
  }, /*#__PURE__*/React.createElement("img", {
    src: getIcon(),
    alt: "Logo",
    className: "w-full h-full object-cover scale-150 transform"
  })), /*#__PURE__*/React.createElement("span", {
    className: `text-xl font-serif font-bold tracking-widest ${phase >= 4 ? 'text-accent' : isScrolled ? 'text-text' : 'text-white drop-shadow-md'}`
  }, "\u5965\u795E\u4F0F\u30D5\u30A1\u30FC\u30E0")), /*#__PURE__*/React.createElement("nav", {
    className: "hidden lg:flex items-center gap-8"
  }, menuItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => setPage(item.id),
    className: `text-sm font-eng tracking-wider hover:text-primary transition-colors ${currentPage === item.id ? 'font-bold' : ''} ${isScrolled ? 'text-text' : 'text-white drop-shadow-sm'}`
  }, item.label)), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setPage('contact'),
    className: `ml-4 ${isScrolled ? '' : 'bg-white/20 hover:bg-white/40 border-white text-white backdrop-blur-sm'}`
  }, "\u304A\u554F\u3044\u5408\u308F\u305B")), /*#__PURE__*/React.createElement("button", {
    className: `lg:hidden z-50 p-2 ${isScrolled ? 'text-text' : 'text-white'}`,
    onClick: () => setIsMenuOpen(!isMenuOpen)
  }, isMenuOpen ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    className: "w-6 h-6"
  }) : /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu",
    className: "w-6 h-6"
  })))), /*#__PURE__*/React.createElement("div", {
    className: `fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`
  }, menuItems.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => {
      setPage(item.id);
      setIsMenuOpen(false);
    },
    className: "text-2xl font-serif font-medium text-text hover:text-primary transition-colors"
  }, item.label)), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setPage('contact');
      setIsMenuOpen(false);
    },
    className: "mt-4"
  }, "\u304A\u554F\u3044\u5408\u308F\u305B")));
};

// --- Cookie同意バナー ---
const CookieConsent = ({
  setPage
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);
  const handleAccept = () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
    } catch {}
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };
  const handleDecline = () => {
    try {
      localStorage.setItem("cookie_consent", "declined");
    } catch {}
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-changed"));
  };
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 z-[9000] bg-surface border-t border-border shadow-2xl p-4 md:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto flex flex-col md:flex-row items-start md:items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-sm text-muted leading-relaxed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-sans"
  }, "\u5F53\u30B5\u30A4\u30C8\u3067\u306F\u3001\u5E83\u544A\u914D\u4FE1\u304A\u3088\u3073\u30A2\u30AF\u30BB\u30B9\u89E3\u6790\u306E\u305F\u3081\u306BCookie\u3092\u4F7F\u7528\u3057\u3066\u3044\u307E\u3059\u3002 \u300C\u540C\u610F\u3059\u308B\u300D\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u3001Cookie\u306E\u4F7F\u7528\u306B\u540C\u610F\u3044\u305F\u3060\u3044\u305F\u3053\u3068\u306B\u306A\u308A\u307E\u3059\u3002 \u8A73\u3057\u304F\u306F", /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('ad_disclosure'),
    className: "underline cursor-pointer text-primary hover:opacity-70 mx-1"
  }, "\u5E83\u544A\u914D\u4FE1\u306B\u95A2\u3059\u308B\u8868\u8A18"), "\u304A\u3088\u3073", /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('privacy_policy'),
    className: "underline cursor-pointer text-primary hover:opacity-70 mx-1"
  }, "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"), "\u3092\u3054\u89A7\u304F\u3060\u3055\u3044\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleDecline,
    className: "px-5 py-2 text-sm border border-border rounded-lg text-muted hover:bg-surface-2 transition-colors"
  }, "\u62D2\u5426\u3059\u308B"), /*#__PURE__*/React.createElement("button", {
    onClick: handleAccept,
    className: "px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-2 transition-colors"
  }, "\u540C\u610F\u3059\u308B"))));
};
const Footer = ({
  phase,
  setPage
}) => {
  return /*#__PURE__*/React.createElement("footer", {
    className: `pt-20 pb-8 px-6 transition-colors duration-1000 ${phase >= 4 ? 'bg-black text-accent' : 'bg-primary text-white'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-1"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-serif font-bold mb-6 tracking-widest"
  }, "\u5965\u795E\u4F0F\u30D5\u30A1\u30FC\u30E0"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm opacity-80 leading-relaxed font-sans"
  }, "\u3012399-0000", /*#__PURE__*/React.createElement("br", null), "\u9577\u91CE\u770C\u5965\u795E\u4F0F\u6751\u5B57\u86C7\u55B0 1092", /*#__PURE__*/React.createElement("br", null), "TEL: 026-000-0000")), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2 grid grid-cols-2 gap-8 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('about'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u8FB2\u5712\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('village'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u5965\u795E\u4F0F\u6751"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('products'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u5546\u54C1\u4E00\u89A7")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('diary'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u6D3B\u52D5\u65E5\u8A8C"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('access'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u30A2\u30AF\u30BB\u30B9"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('recruit'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u63A1\u7528\u60C5\u5831")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 col-span-2 mt-4 pt-4 border-t border-white/20"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('privacy_policy'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('terms_of_service'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u5229\u7528\u898F\u7D04"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('contact_info'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u304A\u554F\u3044\u5408\u308F\u305B"), /*#__PURE__*/React.createElement("span", {
    onClick: () => setPage('ad_disclosure'),
    className: "cursor-pointer hover:opacity-70"
  }, "\u5E83\u544A\u914D\u4FE1\u306B\u95A2\u3059\u308B\u8868\u8A18\uFF08Cookie/\u7B2C\u4E09\u8005\u914D\u4FE1\uFF09"))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-1"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    className: "w-full border-white text-white hover:bg-white hover:text-primary mb-6",
    onClick: () => setPage('contact')
  }, "\u304A\u554F\u3044\u5408\u308F\u305B"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 justify-center md:justify-start mt-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity",
    "aria-label": "Instagram"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "instagram",
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "w-9 h-9 rounded-full border border-white/30 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity",
    "aria-label": "Facebook"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "facebook",
    className: "w-4 h-4"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-white/20 pt-8 text-center text-xs opacity-60 font-eng tracking-wider"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9", /*#__PURE__*/React.createElement("span", {
    title: phase >= 3 ? "1826" : "2026",
    className: "mx-1 hover:text-red-500 cursor-default transition-colors"
  }, phase >= 3 ? "1826" : "2026"), "Okukamifushi Farm. All Rights Reserved.")));
};

// --- Pages ---

// 1. HOME
const Home = ({
  phase,
  notifyEvidence,
  flags,
  setPage,
  unlockFlag
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stopVideoModalOpen, setStopVideoModalOpen] = useState(false);
  // --- Apple Rain（こだわりギミック） ---
  const [appleDrops, setAppleDrops] = useState([]);
  const [rosterModal, setRosterModal] = useState({
    isOpen: false,
    message: "",
    isHorror: false,
    variant: "default"
  });
  const rainTimerRef = useRef(null);
  const isRainingRef = useRef(false);
  useEffect(() => {
    return () => {
      if (rainTimerRef.current) {
        clearTimeout(rainTimerRef.current);
        rainTimerRef.current = null;
      }
    };
  }, []);
  const startAppleRain = () => {
    // 連打で重ならないように
    if (isRainingRef.current) return;
    isRainingRef.current = true;
    const count = 18;
    const oddIndex = Math.floor(Math.random() * count);
    const now = Date.now();
    const drops = Array.from({
      length: count
    }).map((_, i) => {
      const x = Math.random() * 100; // 0-100vw
      const size = 22 + Math.random() * 10 + (i === oddIndex ? 10 : 0);
      const duration = 2200 + Math.random() * 1600;
      const delay = Math.random() * 550;
      return {
        id: `${now}-${i}`,
        x,
        size,
        duration,
        delay,
        odd: i === oddIndex
      };
    });
    setAppleDrops(drops);
    const maxTime = Math.max(...drops.map(d => d.duration + d.delay)) + 400;
    rainTimerRef.current = setTimeout(() => {
      setAppleDrops([]);
      isRainingRef.current = false;
      rainTimerRef.current = null;
    }, maxTime);
  };
  const openRosterFromOddApple = e => {
    e.stopPropagation();

    // 雨は消す
    setAppleDrops([]);
    isRainingRef.current = false;
    if (rainTimerRef.current) {
      clearTimeout(rainTimerRef.current);
      rainTimerRef.current = null;
    }

    // フラグ
    if (!flags.F16) unlockFlag("F16");

    // 名簿（“いない社員”を事務的に見せるのが効く）
    setRosterModal({
      isOpen: true,
      isHorror: false,
      variant: "notepad",
      message: `奥神伏ファーム｜従業員名簿（内部共有）
最終更新：2026.01.19 03:33
※外部共有禁止

・神去 巌（園長）
・神去 由利（加工・農園キッチン）
・神去 守（農園手伝い）
・佐藤 健太（副園長・Web/広報）
・グエン・マイ・リン（栽培）
・ホアン・アイン・トゥー（栽培）
・ヴー・タイン・アン（栽培）……（更新停止）`
    });
  };
  const slides = useMemo(() => {
    let baseSlides = [IMAGES.top_farm,
    // 0
    IMAGES.top_staff,
    // 1
    IMAGES.top_apple,
    // 2
    IMAGES.top_children,
    // 3
    IMAGES.top_morning // 4
    ];

    // 本番：Phase3以降で差し替え
    if (phase >= 3) {
      baseSlides[3] = IMAGES.top_change_stop;
    }
    return baseSlides;
  }, [phase]);

  // ホラー演出（Phase3以降 & 4枚目）
  const isHorrorSlide = phase >= 3 && currentSlide === 3;
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `fixed inset-0 z-[60] bg-black pointer-events-none transition-opacity duration-1000 ${isHorrorSlide ? 'opacity-20' : 'opacity-0'}`
  }), appleDrops.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "apple-rain-layer"
  }, appleDrops.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    className: `apple-drop ${d.odd ? "odd" : ""}`,
    style: {
      left: `${d.x}%`,
      fontSize: `${d.size}px`,
      animationDuration: `${d.duration}ms`,
      animationDelay: `${d.delay}ms`
    },
    onClick: d.odd ? openRosterFromOddApple : undefined,
    title: d.odd ? "…" : undefined
  }, d.odd ? "🍏" : "🍎"))), /*#__PURE__*/React.createElement("div", {
    className: "relative h-[75vh] min-h-[550px] w-full overflow-hidden bg-black"
  }, slides.map((img, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: `absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`,
    style: {
      backgroundImage: `url(${img})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 bg-cover bg-center ${currentSlide === index ? 'scale-105 transition-transform duration-[10000ms] ease-out' : 'scale-100'}`,
    style: {
      backgroundImage: `url(${img})`
    }
  }))), isHorrorSlide && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 z-20 cursor-pointer",
    onClick: () => {
      setStopVideoModalOpen(true);
      if (!flags.F08) {
        notifyEvidence('F08', '映像が一瞬だけ反転し、停止の文字が浮かんだ。', {
          mode: "toast"
        });
      }
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/30 flex items-center justify-center p-6 z-30 pointer-events-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center text-white animate-fade-up"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm md:text-base font-eng tracking-[0.2em] mb-4 uppercase drop-shadow-md"
  }, "Organic Farm in Okukamifushi"), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-[0.15em] mb-8 leading-tight drop-shadow-lg"
  }, phase >= 4 ? "逃 ゲ ラ レ ナ イ" : /*#__PURE__*/React.createElement(React.Fragment, null, "\u571F\u3068\u751F\u304D\u308B\u3001", /*#__PURE__*/React.createElement("br", {
    className: "md:hidden"
  }), "\u5FAA\u74B0\u3059\u308B\u672A\u6765\u3002")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    className: "border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm bg-white/10 pointer-events-auto",
    onClick: () => setPage('products')
  }, "\u5546\u54C1\u3092\u898B\u308B"))), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30"
  }, slides.map((_, index) => /*#__PURE__*/React.createElement("button", {
    key: index,
    onClick: () => setCurrentSlide(index),
    className: `w-12 h-1 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white opacity-100' : 'bg-white opacity-40 hover:opacity-70'}`
  })))), /*#__PURE__*/React.createElement("div", {
    className: "py-20 px-6 bg-surface"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto grid md:grid-cols-2 gap-16 md:gap-24"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-end mb-8 border-b border-border pb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-serif"
  }, "News"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-eng text-muted cursor-pointer hover:text-primary",
    onClick: () => setPage('diary')
  }, "View All")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-6"
  }, phase >= 2 && /*#__PURE__*/React.createElement("li", {
    className: "group cursor-pointer",
    onClick: () => {
      if (!flags.F03) {
        notifyEvidence('F03', '「関係者各位」ページへのリンクを発見した。');
      }
      setPage('admin_notice');
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-accent font-eng mb-1"
  }, "2026.01.20"), /*#__PURE__*/React.createElement("p", {
    className: "group-hover:text-accent transition-colors font-medium"
  }, "\u3010\u91CD\u8981\u3011\u7BA1\u7406\u4EBA\u304B\u3089\u306E\u304A\u77E5\u3089\u305B\uFF08\u95A2\u4FC2\u8005\u5404\u4F4D\uFF09")), /*#__PURE__*/React.createElement("li", {
    className: "group cursor-pointer"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted font-eng mb-1"
  }, "2026.01.15"), /*#__PURE__*/React.createElement("p", {
    className: "group-hover:text-primary transition-colors"
  }, "\u672C\u5E74\u306E\u300C\u6731\u5B9F\uFF08\u3042\u3051\u307F\uFF09\u300D\u306E\u4E88\u7D04\u53D7\u4ED8\u3092\u958B\u59CB\u3057\u307E\u3057\u305F\u3002")), /*#__PURE__*/React.createElement("li", {
    className: "group cursor-pointer"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted font-eng mb-1"
  }, "2026.01.08"), /*#__PURE__*/React.createElement("p", {
    className: "group-hover:text-primary transition-colors"
  }, "\u51AC\u5B63\u5B9F\u7FD2\u751F\u306E\u53D7\u3051\u5165\u308C\u3092\u5B9F\u65BD\u3057\u307E\u3057\u305F\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "relative pl-8 border-l border-border hidden md:block"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-6 text-2xl font-serif tracking-widest text-text"
  }, "\u79C1\u305F\u3061\u306E\u8A87\u308A"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-serif leading-loose writing-vertical-rl text-text h-[300px]"
  }, "\u5965\u795E\u4F0F\u306E\u6DF1\u3044\u68EE\u306B\u62B1\u304B\u308C\u305F\u3053\u306E\u5730\u3067\u3001", /*#__PURE__*/React.createElement("br", null), "\u79C1\u305F\u3061\u306F\u571F\u306E\u58F0\u306B\u8033\u3092\u50BE\u3051\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u81EA\u7136\u306E\u6442\u7406\u306B\u5F93\u3044\u3001\u547D\u3092\u80B2\u3080\u3002", /*#__PURE__*/React.createElement("br", null), "\u305D\u308C\u304C\u79C1\u305F\u3061\u306E\u8A87\u308A\u3067\u3059\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto mt-20 md:mt-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12 md:mb-16"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-primary font-eng text-sm tracking-widest font-semibold mb-3 uppercase"
  }, "OUR APPLES"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl md:text-4xl font-serif text-text leading-tight"
  }, "\u79C1\u305F\u3061\u306E\u308A\u3093\u3054\u3078\u306E\u3053\u3060\u308F\u308A"), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-sm md:text-base text-muted font-serif leading-relaxed"
  }, "\u571F\u3092\u6574\u3048\u3001\u6728\u3092\u80B2\u3066\u3001\u624B\u3067\u9078\u3073\u624B\u3067\u5C4A\u3051\u308B\u3002", /*#__PURE__*/React.createElement("br", {
    className: "hidden md:block"
  }), "\u5965\u795E\u4F0F\u306E\u308A\u3093\u3054\u306F\u3001\u65E5\u3005\u306E\u5C0F\u3055\u306A\u7A4D\u307F\u91CD\u306D\u304B\u3089\u751F\u307E\u308C\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group cursor-pointer",
    onClick: startAppleRain
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-square rounded-2xl overflow-hidden bg-surface-2 shadow-sm mb-6"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.kodawari_soil,
    alt: "\u571F\u306B\u3053\u3060\u308F\u308B",
    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-primary font-eng text-xs tracking-widest font-semibold mb-2"
  }, "01 / SOIL"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif font-bold mb-3"
  }, "\u571F\u306B\u3053\u3060\u308F\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted leading-relaxed font-serif"
  }, "\u68EE\u306B\u62B1\u304B\u308C\u305F\u7551\u306E\u571F\u3092\u3001\u5B63\u7BC0\u3054\u3068\u306B\u89B3\u5BDF\u3057\u3066\u6574\u3048\u3066\u3044\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u5FAE\u751F\u7269\u304C\u606F\u3065\u304F\u74B0\u5883\u3092\u5B88\u308A\u3001\u6839\u304C\u306E\u3073\u306E\u3073\u80B2\u3064\u571F\u3065\u304F\u308A\u3092\u5927\u5207\u306B\u3057\u3066\u3044\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "group cursor-pointer",
    onClick: startAppleRain
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-square rounded-2xl overflow-hidden bg-surface-2 shadow-sm mb-6"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.kodawari_eda,
    alt: "\u6728\u306B\u3053\u3060\u308F\u308B\uFF08\u63A5\u6728\uFF09",
    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-primary font-eng text-xs tracking-widest font-semibold mb-2"
  }, "02 / TREE"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif font-bold mb-3"
  }, "\u6728\u306B\u3053\u3060\u308F\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted leading-relaxed font-serif"
  }, "\u53F0\u6728\u3068\u7A42\u6728\u306E\u76F8\u6027\u3092\u898B\u6975\u3081\u3001\u4E00\u672C\u305A\u3064\u63A5\u304E\u6728\u3067\u6728\u306E\u529B\u3092\u6574\u3048\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u6A39\u52E2\u304C\u5B89\u5B9A\u3059\u308B\u307E\u3067\u4E01\u5BE7\u306B\u80B2\u3066\u3001\u9999\u308A\u3068\u7518\u307F\u304C\u306E\u308B\u5B9F\u308A\u3078\u3064\u306A\u3052\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "group cursor-pointer",
    onClick: startAppleRain
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-square rounded-2xl overflow-hidden bg-surface-2 shadow-sm mb-6"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.kodawari_hand,
    alt: "\u6271\u3044\u306B\u3053\u3060\u308F\u308B",
    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-primary font-eng text-xs tracking-widest font-semibold mb-2"
  }, "03 / CARE"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif font-bold mb-3"
  }, "\u6271\u3044\u306B\u3053\u3060\u308F\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted leading-relaxed font-serif"
  }, "\u53CE\u7A6B\u5F8C\u306F\u4E00\u7389\u305A\u3064\u624B\u3067\u78BA\u8A8D\u3057\u3001\u50B7\u3084\u62BC\u3057\u3092\u9632\u3044\u3067\u4E01\u5BE7\u306B\u7BB1\u8A70\u3081\u3057\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u300C\u5C4A\u304F\u307E\u3067\u304C\u7551\u4ED5\u4E8B\u300D\u3068\u3044\u3046\u6C17\u6301\u3061\u3067\u3001\u308A\u3093\u3054\u512A\u5148\u306E\u6271\u3044\u3092\u5FB9\u5E95\u3057\u3066\u3044\u307E\u3059\u3002"))))), stopVideoModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] bg-black/90 flex items-start justify-center p-4 overflow-y-auto",
    style: {
      paddingTop: 'calc(var(--header-height) + 16px)'
    },
    onClick: () => setStopVideoModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("video", {
    src: IMAGES.stop_movie,
    controls: true,
    autoPlay: true,
    playsInline: true,
    className: "w-full h-full"
  }, "Your browser does not support the video tag."), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-3 right-3 text-white font-bold bg-black/40 hover:bg-black/70 px-3 py-1 rounded transition-colors",
    onClick: () => setStopVideoModalOpen(false)
  }, "\u9589\u3058\u308B"))), /*#__PURE__*/React.createElement(AdSpace, {
    phase: phase
  }), /*#__PURE__*/React.createElement(MessageModal, {
    isOpen: rosterModal.isOpen,
    message: rosterModal.message,
    isHorror: rosterModal.isHorror,
    variant: rosterModal.variant,
    onClose: () => setRosterModal(prev => ({
      ...prev,
      isOpen: false
    }))
  }));
};

// 管理人からのお知らせ（関係者各位）ページ：通報（F13）はここで行う
const AdminNotice = ({
  phase,
  unlockFlag,
  flags,
  setPage,
  onReport
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const evidenceCount = countFound(flags, EVIDENCE_FLAGS);
  const doReport = () => {
    setConfirmOpen(false);
    if (!flags.F13) {
      unlockFlag('F13');
    }
    onReport();
  };
  const confirmMessage = phase >= 4 ? "十分な証拠は揃ったか？今が最後の機会だ。" : "本当に通報するか？証拠が足りないと消される。";
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20 bg-surface"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u7BA1\u7406\u4EBA\u304B\u3089\u306E\u304A\u77E5\u3089\u305B",
    sub: "NOTICE"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage('home'),
    className: "flex items-center text-sm text-muted hover:text-primary mb-8 transition-colors"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    className: "w-4 h-4 mr-2"
  }), "HOME\u306B\u623B\u308B"), /*#__PURE__*/React.createElement("div", {
    className: "font-serif leading-loose text-text space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-accent font-eng mb-2"
  }, "2026.01.20"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-serif font-bold mb-2"
  }, "\u3010\u91CD\u8981\u3011\u7BA1\u7406\u4EBA\u304B\u3089\u306E\u304A\u77E5\u3089\u305B\uFF08\u95A2\u4FC2\u8005\u5404\u4F4D\uFF09"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted"
  }, "\u203B\u3053\u306E\u30DA\u30FC\u30B8\u306F\u5916\u90E8\u5171\u6709\u3092\u60F3\u5B9A\u3057\u3066\u3044\u307E\u305B\u3093\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-surface-2 rounded-xl border border-border"
  }, /*#__PURE__*/React.createElement("p", null, "\u95A2\u4FC2\u8005\u5404\u4F4D\u3002", /*#__PURE__*/React.createElement("br", null), "\u73FE\u5728\u3001\u8FB2\u5712\u5468\u8FBA\u3067\u306E\u60C5\u5831\u62E1\u6563\u30FB\u4E0D\u5BE9\u306A\u95B2\u89A7\u304C\u78BA\u8A8D\u3055\u308C\u3066\u3044\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u8A18\u9332\u306E\u53D6\u308A\u6271\u3044\u306B\u306F\u5341\u5206\u6CE8\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-muted text-sm"
  }, "\uFF08\u8FFD\u8A18\uFF09\u3082\u3057\u3001\u5916\u90E8\u306B\u901A\u5831\u3059\u308B\u5834\u5408\u306F\u300C\u5341\u5206\u306A\u8A3C\u62E0\u300D\u3092\u63C3\u3048\u3066\u304B\u3089\u884C\u3063\u3066\u304F\u3060\u3055\u3044\u3002")), phase >= 3 ? /*#__PURE__*/React.createElement("div", {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-10 py-4 rounded-full bg-accent text-white font-bold tracking-widest shadow-lg hover:bg-red-900 transition-colors",
    onClick: () => setConfirmOpen(true)
  }, "\u8B66\u5BDF\u306B\u901A\u5831\u3059\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted mt-3"
  }, "\u73FE\u5728\u306E\u8A3C\u62E0\u6570\uFF1A", evidenceCount), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-accent mt-2"
  }, phase >= 4 ? "最終確認：" : "警告：", " ", confirmMessage)) : /*#__PURE__*/React.createElement("div", {
    className: "pt-6 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-10 py-4 rounded-full bg-gray-200 text-gray-500 font-bold tracking-widest cursor-not-allowed",
    disabled: true
  }, "\u901A\u5831\u3059\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted mt-3 font-serif"
  }, "\u2026\u307E\u3060\u8A3C\u62E0\u304C\u8DB3\u308A\u306A\u3044\u3002\u3082\u3063\u3068\u8ABF\u3079\u308B\u5FC5\u8981\u304C\u3042\u308B\u3002"))))), /*#__PURE__*/React.createElement(ConfirmModal, {
    isOpen: confirmOpen,
    message: confirmMessage,
    yesLabel: "\u30A4\u30A8\u30B9\uFF08\u901A\u5831\u3059\u308B\uFF09",
    noLabel: "\u30CE\u30FC\uFF08\u623B\u308B\uFF09",
    onYes: doReport,
    onNo: () => setConfirmOpen(false),
    isHorror: true
  }));
};
// --- CONTINUES IN PART 2 ---
// 2. VILLAGE (Gallery & Tree)
const Village = ({
  phase,
  notifyEvidence,
  flags
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Phase3: キャプチャホバー異変（F14）解放
  const isCaptureHoverEnabled = phase >= 3;
  // Phase4: 御神木ホラー（F10）解放
  const isHorrorPhase = phase >= 4;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u5965\u795E\u4F0F\u6751\u306B\u3064\u3044\u3066",
    sub: "OUR VILLAGE"
  }), !isCaptureHoverEnabled && /*#__PURE__*/React.createElement("div", {
    className: "mb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-[60vh] rounded-2xl shadow-sm mb-8 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.village_normal,
    alt: "Village View",
    className: "absolute inset-0 w-full h-full object-cover"
  })), /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto text-center leading-loose"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-muted font-serif"
  }, "\u56DB\u65B9\u3092\u967A\u3057\u3044\u5C71\u3005\u306B\u56F2\u307E\u308C\u305F\u5965\u795E\u4F0F\u6751\u3002", /*#__PURE__*/React.createElement("br", null), "\u72EC\u81EA\u306E\u6C17\u5019\u98A8\u571F\u304C\u3001\u4ED6\u306B\u306F\u306A\u3044\u6FC3\u539A\u306A\u5473\u308F\u3044\u306E\u4F5C\u7269\u3092\u80B2\u3066\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u53E4\u304F\u304B\u3089\u3053\u306E\u5730\u306B\u306F\u300C\u795E\u300D\u304C\u5BBF\u308B\u3068\u8A00\u308F\u308C\u3001\u6751\u4EBA\u306F\u81EA\u7136\u3092\u656C\u3044\u3001\u5171\u306B\u751F\u304D\u3066\u304D\u307E\u3057\u305F\u3002"))), isCaptureHoverEnabled && /*#__PURE__*/React.createElement("div", {
    className: "mb-20 group cursor-pointer",
    onMouseEnter: () => {
      if (!flags.F14) {
        notifyEvidence('F14', '村の紹介写真が一瞬だけ変わった気がする…。');
      }
    },
    onTouchStart: () => {
      if (!flags.F14) {
        notifyEvidence('F14', '村の紹介写真が一瞬だけ変わった気がする…。');
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-[60vh] rounded-2xl shadow-sm mb-8 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.village_night,
    alt: "Village Night",
    className: "absolute inset-0 w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("img", {
    src: IMAGES.village_normal,
    alt: "Village View",
    className: "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out group-hover:opacity-0"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 relative max-w-2xl mx-auto text-center leading-loose"
  }, /*#__PURE__*/React.createElement("p", {
    className: "col-start-1 row-start-1 text-muted font-serif transition-opacity duration-1000 ease-in-out group-hover:opacity-0"
  }, "\u56DB\u65B9\u3092\u967A\u3057\u3044\u5C71\u3005\u306B\u56F2\u307E\u308C\u305F\u5965\u795E\u4F0F\u6751\u3002", /*#__PURE__*/React.createElement("br", null), "\u72EC\u81EA\u306E\u6C17\u5019\u98A8\u571F\u304C\u3001\u4ED6\u306B\u306F\u306A\u3044\u6FC3\u539A\u306A\u5473\u308F\u3044\u306E\u4F5C\u7269\u3092\u80B2\u3066\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u53E4\u304F\u304B\u3089\u3053\u306E\u5730\u306B\u306F\u300C\u795E\u300D\u304C\u5BBF\u308B\u3068\u8A00\u308F\u308C\u3001\u6751\u4EBA\u306F\u81EA\u7136\u3092\u656C\u3044\u3001\u5171\u306B\u751F\u304D\u3066\u304D\u307E\u3057\u305F\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "col-start-1 row-start-1 text-[#8A2E2E] font-handwriting text-lg opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
  }, "\u56DB\u65B9\u3092\u967A\u3057\u3044\u5C71\u3005\u306B\u56F2\u307E\u308C\u305F\u5965\u795E\u4F0F\u6751\u3002", /*#__PURE__*/React.createElement("br", null), "\u72EC\u81EA\u306E\u6C17\u5019\u98A8\u571F\u304C\u3001\u4ED6\u306B\u306F\u306A\u3044\u6FC3\u539A\u306A\u5473\u308F\u3044\u306E\u4F5C\u7269\u3092\u80B2\u3066\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u53E4\u304F\u304B\u3089\u3053\u306E\u5730\u306B\u306F\u300C\u795E\u300D\u304C\u5BBF\u308B\u3068\u8A00\u308F\u308C\u3001\u6751\u4EBA\u306F\u81EA\u7136\u3092\u656C\u3044\u3001", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", {
    className: "text-xl block mt-2 animate-pulse-slow"
  }, "\u9078\u3070\u308C\u305F\u591C\u306B\u3001", /*#__PURE__*/React.createElement("br", null), "\u9078\u3070\u308C\u305F\u3082\u306E\u3092\u6367\u3052\u308B\u3053\u3068\u3067\u3001", /*#__PURE__*/React.createElement("br", null), "\u6751\u306E\u5B9F\u308A\u3092\u4FDD\u3063\u3066\u304D\u307E\u3057\u305F\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "mb-24 grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-2xl shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-2 md:order-1"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-serif mb-6 text-text"
  }, "\u51AC\u306E\u9759\u5BC2"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted leading-loose font-serif"
  }, "\u51AC\u306F\u96EA\u304C\u591A\u3044\u5730\u57DF\u3067\u3059\u304C\u3001\u4E00\u9762\u306E\u7F8E\u3057\u304F\u767D\u3044\u59FF\u3078\u6751\u304C\u5909\u308F\u308A\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u3057\u3093\u3057\u3093\u3068\u964D\u308A\u7A4D\u3082\u308B\u96EA\u306E\u97F3\u3057\u304B\u805E\u3053\u3048\u306A\u3044\u3001\u9759\u5BC2\u306B\u5305\u307E\u308C\u305F\u51AC\u306E\u5965\u795E\u4F0F\u3082\u307E\u305F\u683C\u5225\u3067\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u53B3\u3057\u3055\u306E\u4E2D\u3067\u80B2\u307E\u308C\u308B\u547D\u306E\u529B\u5F37\u3055\u3092\u611F\u3058\u3066\u304F\u3060\u3055\u3044\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "order-1 md:order-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.village_snow,
    alt: "Winter Village",
    className: "w-full h-80 object-cover rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-500"
  }))), /*#__PURE__*/React.createElement(AdSpace, {
    className: "mb-24",
    phase: phase
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-surface-2 rounded-2xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-serif mb-4"
  }, "\u5FA1\u795E\u6728"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted leading-relaxed mb-6"
  }, "\u6751\u306E\u4E2D\u5FC3\u306B\u305D\u3073\u3048\u7ACB\u3064\u3001\u6A39\u9F62300\u5E74\u3092\u8D85\u3048\u308B\u5927\u6A39\u3002", /*#__PURE__*/React.createElement("br", null), "\u6751\u306E\u5B88\u308A\u795E\u3068\u3057\u3066\u3001\u6CE8\u9023\u7E04\u3092\u5F35\u308A\u3001\u5927\u5207\u306B\u7940\u3089\u308C\u3066\u3044\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u305D\u306E\u6A39\u76AE\u306E\u6A21\u69D8\u306F\u3001\u898B\u308B\u8005\u306B\u3088\u3063\u3066\u69D8\u3005\u306A\u59FF\u306B\u898B\u3048\u308B\u3068\u8A00\u308F\u308C\u3066\u3044\u307E\u3059\u3002"), isHorrorPhase ? /*#__PURE__*/React.createElement("button", {
    className: "text-[#8A2E2E] font-handwriting text-xl border-2 border-[#8A2E2E] px-8 py-3 rounded hover:bg-[#8A2E2E] hover:text-white transition-colors tracking-widest animate-pulse shadow-lg",
    onClick: () => {
      setLightboxOpen(true);
      if (!flags.F10) {
        notifyEvidence('F10', '御神木の根元に、何かが埋まっている…。', {
          mode: "toast"
        });
      }
    }
  }, "\u3054\u795E\u6728\u306E\u3075\u3082\u3068\u3092\u6398\u308A\u8D77\u3053\u3057\u3066\u307F\u308B") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setLightboxOpen(true)
  }, "\u5199\u771F\u3092\u62E1\u5927\u3057\u3066\u898B\u308B")), /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/2 w-full"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.tree_default,
    alt: "Sacred Tree",
    className: "w-full h-80 object-cover rounded-lg shadow-md hover:grayscale transition-all duration-1000 cursor-zoom-in",
    onClick: () => setLightboxOpen(true)
  })))), lightboxOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4",
    onClick: () => setLightboxOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-4xl w-full max-h-screen flex flex-col items-center",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("img", {
    src: isHorrorPhase ? IMAGES.tree_change : IMAGES.tree_default,
    className: "w-full h-auto max-h-[70vh] object-contain rounded shadow-2xl mb-6",
    alt: "Tree Evidence"
  }), isHorrorPhase ? /*#__PURE__*/React.createElement("div", {
    className: "text-center animate-fade-up"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-red-600 font-handwriting text-sm md:text-base mb-4 tracking-widest drop-shadow-md animate-pulse"
  }, "\u8AB0\u304B\u3001\u898B\u3064\u3051\u3066\u2026"), /*#__PURE__*/React.createElement("button", {
    className: "text-white border border-white/30 px-8 py-2 hover:bg-white hover:text-black transition-colors font-serif text-sm tracking-widest",
    onClick: () => setLightboxOpen(false)
  }, "\u9589\u3058\u308B")) : /*#__PURE__*/React.createElement("button", {
    className: "absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded text-sm transition-colors",
    onClick: () => setLightboxOpen(false)
  }, "\u9589\u3058\u308B"))));
};

// 3. ABOUT (Greeting & Staff)
const About = ({
  phase,
  notifyEvidence,
  flags,
  setPage,
  setSelectedStaff
}) => {
  const normalText = `台木は余計な枝葉を剪定します。良い実をつけるためには、親となる木が健康でなければなりません。\n土壌の微生物、森の木々、そして私たち人間。すべてが循環の中にあります。`;
  const horrorText = `台木の人間は動くと木が歪むので、アキレス腱は早めに切ることが大事です。余計な部分は剪定します。良い実をつけるため、人の固定が重要です。土壌、森の木々、そして人間すべてが循環の中にあります。`;
  const [isGlitching, setIsGlitching] = useState(false);

  // Phase3以降で園長ギミック（F09）解放
  useEffect(() => {
    if (phase < 3) return;
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      if (!flags.F09) {
        notifyEvidence('F09', '園長の写真が歪んだ…。');
      }
      setTimeout(() => setIsGlitching(false), 2000);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, [phase, flags.F09, notifyEvidence]);
  const handleStaffClick = staff => {
    setSelectedStaff(staff);
    setPage('staff_detail');
  };
  const StaffCard = ({
    staff
  }) => /*#__PURE__*/React.createElement("div", {
    className: "bg-surface p-6 rounded-2xl hover-card text-center group h-full cursor-pointer",
    onClick: () => {
      handleStaffClick(staff);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full aspect-[4/5] overflow-hidden rounded-xl mb-6 relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: staff.image,
    alt: staff.name,
    className: `w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${staff.id === 'vu' ? 'grayscale-[30%] contrast-125' : ''}`
  }), staff.id === 'vu' && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-serif tracking-widest"
  }, "\u8A18\u9332\u6B20\u640D")), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-white/90 text-text text-xs px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 font-serif"
  }, "\u8A73\u3057\u304F\u898B\u308B"))), /*#__PURE__*/React.createElement("p", {
    className: "text-primary font-eng text-xs tracking-wider mb-2"
  }, staff.role), /*#__PURE__*/React.createElement("h4", {
    className: "text-xl font-serif font-bold mb-3"
  }, staff.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted leading-relaxed relative line-clamp-2"
  }, staff.short_intro || /*#__PURE__*/React.createElement("span", {
    className: "opacity-0"
  }, "...")));

  // Phase3でヴーが追加される（Phase1/2はvuを除外）
  const visibleStaff = phase >= 3 ? STAFF_DATA : STAFF_DATA.filter(s => s.id !== 'vu');
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20 bg-surface-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u8FB2\u5712\u306B\u3064\u3044\u3066",
    sub: "ABOUT US"
  }), /*#__PURE__*/React.createElement("section", {
    className: "grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative order-2 md:order-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full aspect-[4/5] rounded-2xl shadow-lg overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: isGlitching ? IMAGES.staff_manager_change : IMAGES.staff_manager,
    className: `w-full h-full object-cover transition-none ${isGlitching ? 'image-glitching' : ''}`,
    alt: "\u5712\u9577"
  }), isGlitching && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/20 pointer-events-none mix-blend-overlay",
    style: {
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      opacity: 0.4
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl hidden md:block"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-serif font-bold text-lg"
  }, "\u795E\u53BB \u5DCC"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted font-eng"
  }, "\u5712\u9577 / Iwao Kamisari"))), /*#__PURE__*/React.createElement("div", {
    className: "order-1 md:order-2 pt-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl md:text-3xl font-serif mb-8 leading-snug"
  }, "\u81EA\u7136\u306E\u58F0\u3092\u805E\u304D\u3001", /*#__PURE__*/React.createElement("br", null), "\u547D\u3092\u7E4B\u3050\u8FB2\u696D\u3092\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "prose prose-lg font-serif leading-loose mb-8 h-[200px]"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-4 text-text"
  }, "\u5965\u795E\u4F0F\u30D5\u30A1\u30FC\u30E0\u3078\u3088\u3046\u3053\u305D\u3002", /*#__PURE__*/React.createElement("br", null), "\u79C1\u305F\u3061\u306F\u3001\u3053\u306E\u571F\u5730\u306E\u4F1D\u7D71\u3092\u5B88\u308A\u306A\u304C\u3089\u3001\u6301\u7D9A\u53EF\u80FD\u306A\u8FB2\u696D\u306B\u53D6\u308A\u7D44\u3093\u3067\u3044\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: `transition-none duration-0 ${isGlitching ? 'text-[#8A2E2E]' : 'text-text'}`
  }, isGlitching ? horrorText : normalText)), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.top_farm,
    className: "h-32 w-full object-cover rounded-lg opacity-60 grayscale-[30%]",
    alt: "farm"
  })))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-serif mb-4"
  }, "\u30B9\u30BF\u30C3\u30D5\u7D39\u4ECB"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted font-eng text-sm tracking-widest"
  }, "OUR STAFF")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, visibleStaff.map(staff => /*#__PURE__*/React.createElement(StaffCard, {
    key: staff.id,
    staff: staff
  }))))));
};

// 3.5 STAFF DETAIL
const StaffDetail = ({
  staff,
  setPage,
  notifyEvidence,
  flags
}) => {
  const [modalImage, setModalImage] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // 副園長ページ以外では何もしない
    if (!staff || staff.id !== 'sato') return;
    if (flags.F01) return;
    const handler = () => {
      const sel = window.getSelection ? window.getSelection().toString() || "" : "";
      if (sel.includes("この村は狂ってる")) {
        notifyEvidence('F01', 'テキストを選択して発見：\n「この村は狂ってる。出られない。助けてくれ」');
      }
    };
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, [staff, flags.F01, notifyEvidence]);
  if (!staff) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-32 pb-20 bg-surface"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage('about'),
    className: "flex items-center text-sm text-muted hover:text-primary mb-8 transition-colors"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    className: "w-4 h-4 mr-2"
  }), "\u30B9\u30BF\u30C3\u30D5\u4E00\u89A7\u306B\u623B\u308B"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12 items-start"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-lg mb-6"
  }, /*#__PURE__*/React.createElement("img", {
    src: staff.image,
    alt: staff.name,
    className: "w-full h-full object-cover"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-center md:text-left"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-primary font-eng text-sm tracking-wider font-bold mb-1"
  }, staff.role), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-serif font-bold mb-2"
  }, staff.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted"
  }, staff.role_jp))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-10 font-serif leading-loose text-text"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold border-b border-border pb-2 mb-4"
  }, "\u81EA\u5DF1\u7D39\u4ECB"), /*#__PURE__*/React.createElement("p", null, staff.intro, staff.id === 'sato' && /*#__PURE__*/React.createElement("span", {
    className: "hidden-sos ml-1 select-all cursor-text"
  }, staff.hidden))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold border-b border-border pb-2 mb-4"
  }, "\u8FB2\u5712\u306B\u5165\u3063\u305F\u304D\u3063\u304B\u3051"), /*#__PURE__*/React.createElement("p", null, staff.reason)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold border-b border-border pb-2 mb-4"
  }, "\u4ED5\u4E8B\u3092\u3057\u3066\u3044\u3066\u697D\u3057\u3044\u3053\u3068\u3001\u3084\u308A\u304C\u3044"), /*#__PURE__*/React.createElement("p", null, staff.joy)), staff.special_note && /*#__PURE__*/React.createElement("div", {
    className: "mt-8 pt-4 border-t border-dotted border-gray-400"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 cursor-pointer hover:text-red-800 transition-colors",
    onClick: () => {
      setModalImage(staff.special_image);
      if (!flags.F06) {
        notifyEvidence('F06', '注釈リンクの先に、失踪に関する記録が残されていた。', {
          mode: "toast"
        });
      }
    }
  }, staff.special_note))))), modalImage && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 cursor-pointer",
    onClick: () => setModalImage(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl w-full"
  }, /*#__PURE__*/React.createElement("img", {
    src: modalImage,
    alt: "Hidden Evidence",
    className: "w-full h-auto shadow-2xl rounded"
  }))));
};

// 4. PRODUCTS（購入者レビュー追加版）
const Products = ({
  phase,
  notifyEvidence,
  flags,
  setPage,
  unlockFlag
}) => {
  const categories = ["ALL", "APPLE", "GRAPES", "PROCESSED"];
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [reviewHintModal, setReviewHintModal] = useState({
    isOpen: false,
    message: "",
    isHorror: false
  });
  const products = [{
    id: 1,
    name: "奥神伏りんご「朱実」",
    price: "¥5,000",
    cat: "APPLE",
    img: IMAGES.ec_apple,
    desc: "驚くほどの糖度と、深紅の色合い。贈り物にも最適です。",
    tags: ["#甘い", "#季節限定", "#ギフト", "#蜜入り", "#信州", "#朝食に"]
  }, {
    id: 2,
    name: "手作りアップルパイ",
    price: "¥3,500",
    cat: "PROCESSED",
    img: IMAGES.ec_applepie,
    desc: "由利さん秘伝のレシピ。サクサクのパイ生地と甘酸っぱいフィリング。",
    tags: ["#母の味", "#無添加", "#手作り", "#おやつ", "#焼きたて", "#人気No.1"]
  }, {
    id: 3,
    name: "有機栽培ブドウ",
    price: "¥8,000",
    cat: "GRAPES",
    img: IMAGES.ec_grape,
    desc: "接ぎ木技術の結晶。深いコクと香りをお楽しみください。",
    tags: ["#長野県産", "#有機JAS", "#芳醇な香り", ...(phase >= 2 ? ["#キヅイテ"] : []), "#希少品種", "#ワイン用", "#皮ごと食べられる", "#秋の味覚", "#贈答用"]
  }, {
    id: 4,
    name: "特製ジャム",
    price: "¥1,200",
    cat: "PROCESSED",
    img: IMAGES.ec_jam,
    desc: "完熟果実をそのまま煮詰めました。ヨーグルトに最適。",
    tags: ["#朝食", "#オーガニック", "#保存料不使用", "#ヨーグルトに"]
  }, {
    id: 5,
    name: "季節の詰め合わせ",
    price: "¥10,000",
    cat: "ALL",
    img: IMAGES.ec_set,
    desc: "旬の味覚を贅沢に詰め合わせました。ご贈答用に。",
    tags: ["#数量限定", "#お中元", "#送料無料", "#ファミリー向け"]
  }, {
    id: 6,
    name: "Coming Soon...",
    price: "-",
    cat: "ALL",
    img: IMAGES.icon_default,
    desc: "新しい商品の準備中です。ご期待ください。",
    tags: [],
    isComingSoon: true
  }];

  // ▼ 追加：購入者レビュー（抜粋）
  // ※いったん静的データ。将来的にCMS/スプレッドシート/JSONに置き換えやすい形です。
  const REVIEWS = [{
    id: "R01",
    buyer: "東京都 M.K.",
    date: "2026.01.17",
    rating: 5,
    title: "香りがよくて、蜜の感じも上品",
    body: "箱を開けた瞬間から香りが良く、食感もシャキッとしていました。甘いのに後味が軽く、家族みんなであっという間に完食です。",
    productName: "奥神伏りんご「朱実」",
    productImg: IMAGES.ec_apple
  }, {
    id: "R02",
    buyer: "神奈川県 Y.T.",
    date: "2026.01.14",
    rating: 5,
    title: "ギフトにしたらすごく喜ばれました",
    body: "大きさが揃っていて見た目もきれい。贈答用に選びましたが、先方から『すごくおいしい』と連絡が来て安心しました。",
    productName: "奥神伏りんご「朱実」",
    productImg: IMAGES.ec_apple
  }, {
    id: "R03",
    buyer: "大阪府 N.S.",
    date: "2026.01.11",
    rating: 4,
    title: "甘さ控えめで食べやすいアップルパイ",
    body: "バターの香りが強すぎず、りんごの酸味がちょうどいいです。温めるとさらに香りが立って、休日のおやつにぴったりでした。",
    productName: "手作りアップルパイ",
    productImg: IMAGES.ec_applepie
  }, {
    id: "R04",
    buyer: "長野県 A.H.",
    date: "2026.01.09",
    rating: 5,
    title: "ジャムが素材の味そのまま",
    body: "余計な甘さがなく、果実感がしっかり。ヨーグルトに合わせると朝が楽しみになります。パンにも合いました。",
    productName: "特製ジャム",
    productImg: IMAGES.ec_jam
  }, {
    id: "R05",
    buyer: "福岡県 K.O.",
    date: "2026.01.06",
    rating: 4,
    title: "詰め合わせの満足度が高い",
    body: `たくさんの種類を家族で楽しめました。
すべてしっかり綺麗に梱包されていました。
けっきょく、1日でほとんど食べてしまいました。
ていねいなお仕事で、大満足です。`,
    productName: "季節の詰め合わせ",
    productImg: IMAGES.ec_set
  }, {
    id: "R06",
    buyer: "愛知県 R.M.",
    date: "2026.01.04",
    rating: 5,
    title: "ブドウの香りが濃くて驚きました",
    body: "粒がしっかりしていて、香りがとても豊か。ワイン用と書かれていましたが、そのまま食べても贅沢感がありました。",
    productName: "有機栽培ブドウ",
    productImg: IMAGES.ec_grape
  }];
  const averageRating = REVIEWS.length ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length : 0;
  const Stars = ({
    rating
  }) => /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-[2px]",
    "aria-label": `rating ${rating}/5`
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i < rating ? "text-primary" : "text-border"
  }, "\u2605")));
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "ALL") return products;
    // catがALLのものは常に出す（詰め合わせ等）
    return products.filter(p => p.cat === selectedCategory || p.cat === "ALL");
  }, [selectedCategory, phase]);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u5546\u54C1\u4E00\u89A7",
    sub: "PRODUCTS"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
  }, categories.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat,
    onClick: () => setSelectedCategory(cat),
    className: `text-sm font-eng tracking-widest px-4 py-2 rounded-full transition-colors ${selectedCategory === cat ? 'bg-text text-white' : 'text-muted hover:bg-surface-2'}`
  }, cat))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-20"
  }, filteredProducts.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: `group cursor-pointer ${p.isComingSoon ? 'opacity-60' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-square overflow-hidden rounded-2xl mb-4 bg-surface-2 relative flex items-center justify-center"
  }, p.isComingSoon ? /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.name,
    className: "w-20 h-20 opacity-30 mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-eng tracking-widest text-muted"
  }, "Coming Soon")) : /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.name,
    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-baseline mb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-serif font-bold"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-eng text-muted"
  }, p.price)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted mb-4 leading-relaxed border-b border-border pb-4"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, p.tags.map((tag, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: `text-[11px] px-2 py-1 rounded border border-border text-muted transition-colors hover:bg-gray-100 ${tag === "#キヅイテ" ? "cursor-help hover:text-accent" : "cursor-default"}`,
    onClick: e => {
      if (tag === "#キヅイテ") {
        // Phase2以降のみ有効
        if (phase < 2) return;
        e.stopPropagation();
        setVideoModalOpen(true);
        if (!flags.F02) {
          notifyEvidence('F02', 'タグを辿ると、映像が残されていた。', {
            mode: "toast"
          });
        }
      }
    }
  }, tag))))))), /*#__PURE__*/React.createElement("section", {
    className: "mb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 border-b border-border pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-serif"
  }, "\u8CFC\u5165\u8005\u30EC\u30D3\u30E5\u30FC"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted mt-2 font-serif"
  }, "\u5B9F\u969B\u306B\u3054\u8CFC\u5165\u3044\u305F\u3060\u3044\u305F\u65B9\u304B\u3089\u306E\u58F0\uFF08\u629C\u7C8B\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-eng text-muted"
  }, "\u5E73\u5747\u8A55\u4FA1", " ", /*#__PURE__*/React.createElement("span", {
    className: "text-text font-bold"
  }, averageRating.toFixed(1)), "/5\uFF08", REVIEWS.length, "\u4EF6\uFF09")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, REVIEWS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    role: r.id === "R05" ? "button" : undefined,
    tabIndex: r.id === "R05" ? 0 : -1,
    onClick: () => {
      if (r.id !== "R05") return;

      // フラグを立てる（上限に引っかからないよう MAX_FLAGS を増やしておく）
      if (!flags.F15) unlockFlag("F15");

      // ポップアップ表示（notifyEvidenceを使わず、文言をそのまま出す）
      setReviewHintModal({
        isOpen: true,
        message: "村の秘密。200年前の江戸時代から続く…",
        isHorror: false
      });
    },
    onKeyDown: e => {
      if (r.id !== "R05") return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.currentTarget.click();
      }
    },
    className: `bg-surface p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow ${r.id === "R05" ? "cursor-pointer hover:border-primary" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-primary font-eng tracking-widest font-semibold mb-2"
  }, "VERIFIED BUYER"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: r.rating
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-muted font-eng"
  }, r.rating, ".0"))), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-muted font-eng"
  }, r.date)), /*#__PURE__*/React.createElement("h4", {
    className: "text-lg font-serif font-bold mb-2"
  }, r.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted leading-relaxed font-serif mb-5 whitespace-pre-line"
  }, r.body), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-border flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-lg overflow-hidden bg-surface-2 shrink-0"
  }, /*#__PURE__*/React.createElement("img", {
    src: r.productImg,
    alt: r.productName,
    className: "w-full h-full object-cover"
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-muted font-eng"
  }, "\u8CFC\u5165\u5546\u54C1"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-serif truncate"
  }, r.productName))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted font-serif shrink-0"
  }, r.buyer))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-10 text-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setPage('contact')
  }, "\u30EC\u30D3\u30E5\u30FC\u30FB\u3054\u611F\u60F3\u3092\u9001\u308B"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted mt-3 font-serif"
  }, "\u203B\u63B2\u8F09\u3057\u3066\u3044\u308B\u30EC\u30D3\u30E5\u30FC\u306F\u4E00\u90E8\u629C\u7C8B\u3067\u3059\u3002"))), /*#__PURE__*/React.createElement(AdSpace, {
    phase: phase
  })), videoModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] bg-black/90 flex items-start justify-center p-4 overflow-y-auto",
    style: {
      paddingTop: 'calc(var(--header-height) + 16px)'
    },
    onClick: () => setVideoModalOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("video", {
    src: IMAGES.victim_movie,
    controls: true,
    autoPlay: true,
    playsInline: true,
    className: "w-full h-full"
  }, "Your browser does not support the video tag."), /*#__PURE__*/React.createElement("button", {
    className: "absolute top-3 right-3 text-white font-bold bg-black/40 hover:bg-black/70 px-3 py-1 rounded transition-colors",
    onClick: () => setVideoModalOpen(false)
  }, "\u9589\u3058\u308B"))), /*#__PURE__*/React.createElement(MessageModal, {
    isOpen: reviewHintModal.isOpen,
    message: reviewHintModal.message,
    isHorror: reviewHintModal.isHorror,
    onClose: () => setReviewHintModal(prev => ({
      ...prev,
      isOpen: false
    }))
  }));
};

// --- CONTINUES IN PART 3 ---
// 5. DIARY (List)
const Diary = ({
  phase,
  notifyEvidence,
  flags,
  setPage,
  setSelectedArticle
}) => {
  const [search, setSearch] = useState("");
  const [isAncient, setIsAncient] = useState(false);
  const handleSearch = e => {
    e.preventDefault();
    const q = (search || "").trim();
    // Phase3以降でのみ「1826」検索が異変になる（F07探索可能）
    if (phase >= 3 && q === "1826") {
      setIsAncient(true);
      if (!flags.F07) {
        notifyEvidence('F07', '検索結果に異変が生じました。\n1826年のデータが見つかりました。');
      }
    }
  };
  const handleArticleClick = article => {
    if (article.id === 99) {
      setPage('ancient_document');
      return;
    }
    setSelectedArticle(article);
    setPage('article_detail');
  };
  const ancientArticles = [{
    id: 99,
    date: "1826.04.04",
    title: "奥神伏村 旧記抜粋",
    desc: "文政九年の記録。閲覧注意。",
    img: IMAGES.blog_oldbook
  }];
  const displayArticles = isAncient ? ancientArticles : BLOG_DATA;
  return /*#__PURE__*/React.createElement("div", {
    className: `min-h-screen pt-24 pb-20 ${isAncient ? 'bg-[#2a2520] text-[#a89f91]' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: isAncient ? "記録保管庫" : "活動日誌",
    sub: isAncient ? "ARCHIVES" : "FARM DIARY"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/4"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSearch,
    className: "relative mb-8"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "\u691C\u7D22...",
    className: `w-full border-b bg-transparent py-2 pr-8 outline-none text-sm ${isAncient ? 'border-[#555] text-[#ccc] focus:border-red-900' : 'border-border focus:border-primary'}`,
    value: search,
    onChange: e => setSearch(e.target.value)
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    className: `absolute right-0 top-2 w-4 h-4 ${isAncient ? 'text-[#555]' : 'text-muted'}`
  })), /*#__PURE__*/React.createElement("div", {
    className: `space-y-2 text-sm font-serif ${isAncient ? 'text-[#666]' : 'text-muted'}`
  }, /*#__PURE__*/React.createElement("p", null, "\u65E5\u8A18\u306E\u4E00\u89A7"), /*#__PURE__*/React.createElement("ul", {
    className: `pl-4 space-y-1 border-l ${isAncient ? 'border-[#444]' : 'border-border'}`
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "\u8FB2\u5712\u306E\u65E5\u5E38"), /*#__PURE__*/React.createElement("span", null, "(2)")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "\u30A4\u30D9\u30F3\u30C8"), /*#__PURE__*/React.createElement("span", null, "(1)")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "\u3054\u6328\u62F6"), /*#__PURE__*/React.createElement("span", null, "(1)")), /*#__PURE__*/React.createElement("li", {
    className: "pt-1 text-[14px] opacity-80"
  }, "\u5408\u8A085\u4EF6"))), !isAncient && /*#__PURE__*/React.createElement(AdSpace, {
    className: "mt-12 hidden md:block",
    phase: phase
  })), /*#__PURE__*/React.createElement("div", {
    className: "md:w-3/4 space-y-12"
  }, displayArticles.map(article => /*#__PURE__*/React.createElement("article", {
    key: article.id,
    className: "group cursor-pointer",
    onClick: () => handleArticleClick(article)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-6 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/3 aspect-video bg-black/20 rounded-lg overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: article.img,
    alt: article.title,
    className: `w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isAncient ? 'opacity-70 grayscale sepia' : ''}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "md:w-2/3"
  }, /*#__PURE__*/React.createElement("p", {
    className: `text-xs font-eng mb-2 ${isAncient ? 'text-[#8A2E2E]' : 'text-muted'}`
  }, article.date), /*#__PURE__*/React.createElement("h3", {
    className: `text-xl font-serif font-bold mb-3 ${isAncient ? 'text-[#ccc] tracking-widest' : ''}`
  }, article.title), /*#__PURE__*/React.createElement("p", {
    className: `text-sm leading-relaxed mb-4 ${isAncient ? 'text-[#888]' : 'text-muted'}`
  }, article.desc), /*#__PURE__*/React.createElement("span", {
    className: `${isAncient ? 'text-[#8A2E2E]' : 'text-primary'} text-sm font-medium hover:underline`
  }, "\u7D9A\u304D\u3092\u8AAD\u3080 \u2192"))))), !isAncient && /*#__PURE__*/React.createElement(AdSpace, {
    phase: phase
  })))));
};

// 5.5 ARTICLE DETAIL
const ArticleDetail = ({
  article,
  setPage,
  phase
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!article) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-32 pb-20 bg-surface"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage('diary'),
    className: "flex items-center text-sm text-muted hover:text-primary mb-8 transition-colors"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    className: "w-4 h-4 mr-2"
  }), "\u8A18\u4E8B\u4E00\u89A7\u306B\u623B\u308B"), /*#__PURE__*/React.createElement("article", {
    className: "prose prose-stone lg:prose-lg mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted font-eng mb-2"
  }, article.date), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-serif font-bold mb-6 leading-relaxed"
  }, article.title), /*#__PURE__*/React.createElement("div", {
    className: "w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-sm"
  }, /*#__PURE__*/React.createElement("img", {
    src: article.img,
    alt: article.title,
    className: "w-full h-full object-cover"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "font-serif leading-loose text-text space-y-6"
  }, article.content.split('\n').map((line, i) => line === "" ? /*#__PURE__*/React.createElement("br", {
    key: i
  }) : /*#__PURE__*/React.createElement("p", {
    key: i
  }, line))), article.isRecipe && /*#__PURE__*/React.createElement("div", {
    className: "mt-12 p-6 border-t border-b border-border text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-4 font-bold"
  }, "\u25BC \u8A73\u3057\u304F\u306F\u3053\u3061\u3089"), /*#__PURE__*/React.createElement("span", {
    className: "text-accent underline cursor-pointer text-lg hover:text-red-700 transition-colors font-serif",
    onClick: () => setPage('recipe')
  }, "\u25B6 \u30A2\u30C3\u30D7\u30EB\u30D1\u30A4\u306E\u30EC\u30B7\u30D4\u3092\u516C\u958B\uFF01"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-20 border-t border-border pt-12"
  }, /*#__PURE__*/React.createElement(AdSpace, {
    phase: phase
  }))));
};

// 5.6 RECIPE DETAIL (F04導線)
const RecipeDetail = ({
  setPage,
  notifyEvidence,
  flags
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-32 pb-20 bg-[#F9F7F2] font-handwriting"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage('diary'),
    className: "flex items-center text-sm text-muted hover:text-primary mb-8 transition-colors font-sans"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    className: "w-4 h-4 mr-2"
  }), "\u8A18\u4E8B\u306B\u623B\u308B"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-8 md:p-16 shadow-lg rounded-lg border-2 border-[#E6E8E2] relative transform rotate-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#e0e0e0]/80 rotate-2 shadow-sm"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl font-bold text-center mb-12 text-[#8A2E2E]"
  }, "\u7531\u5229\u3055\u3093\u306E\u7279\u88FD\u30A2\u30C3\u30D7\u30EB\u30D1\u30A4"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-12 mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-4 border-white shadow-md transform -rotate-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.recipe_applepie,
    className: "w-full h-full object-cover",
    alt: "\u713C\u304D\u4E0A\u304C\u3063\u305F\u30A2\u30C3\u30D7\u30EB\u30D1\u30A4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "md:w-1/2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-6 border-b-2 border-dotted border-[#8A2E2E] pb-2 inline-block"
  }, "\u6750\u6599 (1\u30DB\u30FC\u30EB\u5206)"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4 text-lg"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between border-b border-dotted pb-1 border-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u308A\u3093\u3054"), /*#__PURE__*/React.createElement("span", {
    className: "text-right"
  }, "3\u500B")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between border-b border-dotted pb-1 border-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u51B7\u51CD\u30D1\u30A4\u30B7\u30FC\u30C8"), /*#__PURE__*/React.createElement("span", null, "2\u679A")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between border-b border-dotted pb-1 border-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u7802\u7CD6"), /*#__PURE__*/React.createElement("span", null, "60g")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between border-b border-dotted pb-1 border-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u30D0\u30BF\u30FC"), /*#__PURE__*/React.createElement("span", null, "20g")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between border-b border-dotted pb-1 border-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u30B7\u30CA\u30E2\u30F3"), /*#__PURE__*/React.createElement("span", null, "\u5C11\u3005")), /*#__PURE__*/React.createElement("li", {
    className: "flex justify-between border-b border-dotted pb-1 border-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u5375\u9EC4"), /*#__PURE__*/React.createElement("span", null, "1\u500B\u5206"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-10 text-lg leading-loose"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-bold mb-6 border-b-2 border-dotted border-[#8A2E2E] pb-2 text-center"
  }, "\u4F5C\u308A\u65B9"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-[#2F6B3E] text-xl mb-2"
  }, "1. \u4E0B\u6E96\u5099"), /*#__PURE__*/React.createElement("p", null, "\u308A\u3093\u3054\u306F\u76AE\u3092\u3080\u304D\u3001\u82AF\u3092\u9664\u3044\u30668\u7B49\u5206\u306E\u304F\u3057\u5F62\u306B\u5207\u308B\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-base text-muted"
  }, "\u203B\u5965\u795E\u4F0F\u306E\u300C\u65B0\u9BAE\u306A\u6731\u7F8E\u300D\u304C\u304A\u3059\u3059\u3081\u3067\u3059\u3002"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-base text-muted"
  }, "\u203B\u706B\u306E\u901A\u308A\u3092\u5747\u4E00\u306B\u3057\u305F\u3044\u5834\u5408\u306F\u30015mm\u7A0B\u5EA6\u306E\u8584\u5207\u308A\u306B\u3057\u3066\u3082\u3088\u3044\u3002"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-[#2F6B3E] text-xl mb-2"
  }, "2. \u716E\u8A70\u3081\u308B"), /*#__PURE__*/React.createElement("p", null, "\u934B\u306B\u308A\u3093\u3054\u3001\u7802\u7CD6\u3001\u30D0\u30BF\u30FC\u3001\u30B7\u30CA\u30E2\u30F3\u3092\u5165\u308C\u3066\u4E2D\u706B\u306B\u304B\u3051\u308B\u3002", /*#__PURE__*/React.createElement("br", null), "\u6C34\u5206\u304C\u51FA\u3066\u304D\u305F\u3089\u5F31\u706B\u306B\u3057\u3001\u7126\u304C\u3055\u306A\u3044\u3088\u3046\u306B\u6642\u3005\u6DF7\u305C\u306A\u304C\u3089\u716E\u8FBC\u3080\u3002", /*#__PURE__*/React.createElement("br", null), "\u308A\u3093\u3054\u304C\u900F\u304D\u901A\u308A\u3001\u5C11\u3057\u82AF\u304C\u6B8B\u308B\u7A0B\u5EA6\u306B\u306A\u3063\u305F\u3089\u3001\u6700\u5F8C\u306B\u706B\u3092\u3084\u3084\u5F37\u3081\u3066\u4F59\u5206\u306A\u6C34\u5206\u3092\u98DB\u3070\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u706B\u3092\u6B62\u3081\u3001\u5B8C\u5168\u306B\u51B7\u307E\u3057\u3066\u304A\u304F\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-[#2F6B3E] text-xl mb-2"
  }, "3. \u5305\u3080"), /*#__PURE__*/React.createElement("p", null, "\u51B7\u51CD\u30D1\u30A4\u30B7\u30FC\u30C8\u3092\u5BA4\u6E29\u3067\u5C11\u3057\u623B\u3057\u3001\u8EFD\u304F\u4F38\u3070\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "1\u679A\u3092\u5929\u677F\u306B\u6577\u304D\u3001\u51B7\u307E\u3057\u305F\u308A\u3093\u3054\u3092\u4E2D\u592E\u304C\u3084\u3084\u9AD8\u304F\u306A\u308B\u3088\u3046\u306B\u4E26\u3079\u308B\u3002", /*#__PURE__*/React.createElement("br", null), "\u3082\u30461\u679A\u306E\u30D1\u30A4\u30B7\u30FC\u30C8\u3092\u88AB\u305B\u3001\u7AEF\u3092\u30D5\u30A9\u30FC\u30AF\u3067\u3057\u3063\u304B\u308A\u3068\u9589\u3058\u308B\u3002", /*#__PURE__*/React.createElement("br", null), "\u8868\u9762\u306B2\u301C3\u304B\u6240\u3001\u5305\u4E01\u3067\u5207\u308A\u8FBC\u307F\u3092\u5165\u308C\u3066\u84B8\u6C17\u306E\u9003\u3052\u9053\u3092\u4F5C\u308B\u3002")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-[#2F6B3E] text-xl mb-2"
  }, "4. \u713C\u304F"), /*#__PURE__*/React.createElement("p", null, "\u8868\u9762\u306B\u5375\u9EC4\u3092\u8584\u304F\u5857\u308B\u3002", /*#__PURE__*/React.createElement("br", null), "200\u2103\u306B\u4E88\u71B1\u3057\u305F\u30AA\u30FC\u30D6\u30F3\u306720\u5206\u713C\u304D\u3001\u713C\u304D\u8272\u304C\u8DB3\u308A\u306A\u3044\u5834\u5408\u306F180\u2103\u306B\u4E0B\u3052\u3066\u3055\u3089\u306B10\u301C15\u5206\u713C\u304F\u3002", /*#__PURE__*/React.createElement("br", null), "\u8868\u9762\u304C\u3053\u3093\u304C\u308A\u8272\u3065\u304D\u3001\u7518\u3044\u9999\u308A\u304C\u7ACB\u3061\u4E0A\u3063\u3066\u304D\u305F\u3089\u5B8C\u6210\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-16 bg-[#fffbf0] p-8 rounded-lg border-2 border-dashed border-[#dcdcdc] transform rotate-1"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-center mb-6 text-[#8A2E2E] text-xl"
  }, "\u7531\u5229\u306E\u30EF\u30F3\u30DD\u30A4\u30F3\u30C8"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-3 text-base text-muted"
  }, /*#__PURE__*/React.createElement("li", null, "\u308A\u3093\u3054\u306F\u716E\u3059\u304E\u305A\u3001\u6C34\u5206\u3092\u98DB\u3070\u3057\u3066\u51B7\u307E\u3059\u3053\u3068\u3067\u5E95\u304C\u30D9\u30BF\u3064\u304B\u306A\u3044"), /*#__PURE__*/React.createElement("li", null, "\u5207\u308A\u8FBC\u307F\u3092\u5165\u308C\u308B\u3053\u3068\u3067\u3001\u304D\u308C\u3044\u306B\u81A8\u3089\u307F\u5272\u308C\u306B\u304F\u304F\u306A\u308B"), /*#__PURE__*/React.createElement("li", null, "\u713C\u304D\u6642\u9593\u306F\u30AA\u30FC\u30D6\u30F3\u306B\u3088\u3063\u3066\u8ABF\u6574\u3059\u308B"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-20 text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-300 hover:text-[#8A2E2E] cursor-pointer transition-colors font-sans tracking-widest",
    onClick: () => {
      if (!flags.F04) {
        notifyEvidence('F04', 'レシピの奥に、別の説明が隠されていた。');
      }
      setPage('grafting');
    }
  }, "\u7F8E\u5473\u3057\u3044\u308A\u3093\u3054\u3092\u4F5C\u308B\u306B\u306F")))));
};

// 5.7 GRAFTING DETAIL
const GraftingDetail = ({
  setPage
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-32 pb-20 bg-[#111] text-[#ccc] font-serif"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage('recipe'),
    className: "flex items-center text-sm text-[#555] hover:text-[#888] mb-12 transition-colors font-sans"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    className: "w-4 h-4 mr-2"
  }), "\u623B\u308B"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-16 animate-fade-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center border-b border-[#333] pb-12"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl md:text-4xl font-bold tracking-[0.2em] mb-6 text-[#eee]"
  }, "\u63A5\u6728\u3068\u306F"), /*#__PURE__*/React.createElement("p", {
    className: "leading-loose text-sm md:text-base"
  }, "\u63A5\u6728\uFF08\u3064\u304E\u304D\uFF09\u3068\u306F\u3001\u7570\u306A\u308B2\u3064\u306E\u690D\u7269\u3092\u63A5\u5408\u3057\u3001", /*#__PURE__*/React.createElement("br", null), "1\u672C\u306E\u6728\u3068\u3057\u3066\u80B2\u3066\u308B\u6280\u8853\u3067\u3059\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "\u6839\u3092\u6301\u3064\u5074\u3092", /*#__PURE__*/React.createElement("span", {
    className: "text-[#8A2E2E] font-bold"
  }, "\u53F0\u6728\uFF08\u3060\u3044\u304E\uFF09"), "\u3001", /*#__PURE__*/React.createElement("br", null), "\u5B9F\u3084\u679D\u3092\u3064\u3051\u305F\u3044\u5074\u3092", /*#__PURE__*/React.createElement("span", {
    className: "text-[#8A2E2E] font-bold"
  }, "\u7A42\u6728\uFF08\u307B\u304E\uFF09"), "\u3068\u547C\u3073\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "w-full aspect-video bg-[#0a0a0a] border border-[#333] flex items-center justify-center overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.grafting,
    alt: "\u63A5\u6728\u306E\u6982\u5FF5\u56F3",
    className: "w-full h-full object-contain opacity-80"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-20"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-center text-xl tracking-widest text-[#555]"
  }, "\u4E00\u822C\u7684\u306A\u63A5\u6728\u306E\u624B\u9806"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "1. \u53F0\u6728\u3092\u9078\u3076"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u5065\u5EB7\u3067\u75C5\u5BB3\u306E\u306A\u3044\u3082\u306E\u3092\u9078\u3076"), /*#__PURE__*/React.createElement("li", null, "\u6A39\u52E2\u304C\u5B89\u5B9A\u3057\u3066\u3044\u308B\u3082\u306E\u304C\u671B\u307E\u3057\u3044"), /*#__PURE__*/React.createElement("li", null, "\u82E5\u3059\u304E\u305A\u3001\u8001\u5316\u3057\u3066\u3044\u306A\u3044\u3082\u306E\u304C\u826F\u3044")), /*#__PURE__*/React.createElement("p", {
    className: "text-[#8A2E2E] text-sm"
  }, "\uD83D\uDC49 \u300C\u571F\u58CC\u3084\u74B0\u5883\u306B\u9069\u5FDC\u3057\u3066\u3044\u308B\u3053\u3068\u300D\u304C\u91CD\u8981")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "2. \u7A42\u6728\u3092\u6E96\u5099\u3059\u308B"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u4F11\u7720\u671F\u306B\u63A1\u53D6\u3057\u305F\u679D\u3092\u4F7F\u7528"), /*#__PURE__*/React.createElement("li", null, "\u82BD\u304C\u3057\u3063\u304B\u308A\u3057\u3066\u3044\u308B\u3082\u306E"), /*#__PURE__*/React.createElement("li", null, "\u50B7\u3084\u5909\u5F62\u304C\u306A\u3044\u3082\u306E\u3092\u9078\u3076")), /*#__PURE__*/React.createElement("p", {
    className: "text-[#8A2E2E] text-sm"
  }, "\uD83D\uDC49 \u53F0\u6728\u3068\u306E\u76F8\u6027\u304C\u6210\u529F\u3092\u5DE6\u53F3\u3059\u308B")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "3. \u5207\u308A\u53E3\u3092\u6574\u3048\u308B\uFF08\u526A\u5B9A\uFF09"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u53F0\u6728\u3068\u7A42\u6728\u306E\u5207\u308A\u53E3\u3092\u6E05\u6F54\u306A\u5203\u7269\u3067\u5207\u308B"), /*#__PURE__*/React.createElement("li", null, "\u5F62\u6210\u5C64\uFF08\u304B\u305F\u3061\u3065\u304F\u308B\u5C64\uFF09\u304C\u5408\u3046\u3088\u3046\u306B\u3059\u308B"), /*#__PURE__*/React.createElement("li", null, "\u5207\u308A\u53E3\u306F\u624B\u65E9\u304F\u3001\u8FF7\u3044\u306A\u304F"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "4. \u63A5\u5408\u3059\u308B"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u53F0\u6728\u3068\u7A42\u6728\u306E\u5207\u308A\u53E3\u3092\u3074\u3063\u305F\u308A\u5408\u308F\u305B\u308B"), /*#__PURE__*/React.createElement("li", null, "\u7A7A\u6C17\u304C\u5165\u3089\u306A\u3044\u3088\u3046\u6CE8\u610F\u3059\u308B"), /*#__PURE__*/React.createElement("li", null, "\u4F4D\u7F6E\u304C\u305A\u308C\u306A\u3044\u3088\u3046\u306B\u3059\u308B"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "5. \u56FA\u5B9A\u3059\u308B"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u30C6\u30FC\u30D7\u3084\u7D10\u3067\u3057\u3063\u304B\u308A\u56FA\u5B9A\u3059\u308B"), /*#__PURE__*/React.createElement("li", null, "\u52D5\u304B\u306A\u3044\u3088\u3046\u306B\u3059\u308B\u3053\u3068\u304C\u91CD\u8981"), /*#__PURE__*/React.createElement("li", null, "\u5F37\u3059\u304E\u305A\u3001\u5F31\u3059\u304E\u305A")), /*#__PURE__*/React.createElement("p", {
    className: "text-[#8A2E2E] text-sm"
  }, "\uD83D\uDC49 \u52D5\u304F\u3068\u7652\u5408\u304C\u3046\u307E\u304F\u9032\u307E\u306A\u3044")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "6. \u4FDD\u8B77\u3059\u308B"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u4E7E\u71E5\u3092\u9632\u3050\u305F\u3081\u3001\u63A5\u5408\u90E8\u3092\u8986\u3046"), /*#__PURE__*/React.createElement("li", null, "\u76F4\u5C04\u65E5\u5149\u3084\u98A8\u3092\u907F\u3051\u308B"), /*#__PURE__*/React.createElement("li", null, "\u5916\u90E8\u523A\u6FC0\u3092\u3067\u304D\u308B\u3060\u3051\u6E1B\u3089\u3059"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "7. \u5F85\u3064\uFF08\u990A\u751F\u671F\u9593\uFF09"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u6570\u9031\u9593\u301C\u6570\u30F6\u6708\u3001\u69D8\u5B50\u3092\u898B\u308B"), /*#__PURE__*/React.createElement("li", null, "\u3053\u306E\u9593\u3001\u7121\u7406\u306B\u89E6\u3089\u306A\u3044"), /*#__PURE__*/React.createElement("li", null, "\u6210\u529F\u3059\u308B\u3068\u65B0\u3057\u3044\u82BD\u304C\u52D5\u304D\u51FA\u3059"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "8. \u4F59\u5206\u306A\u90E8\u5206\u3092\u526A\u5B9A\u3059\u308B"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u53F0\u6728\u304B\u3089\u51FA\u308B\u4E0D\u8981\u306A\u82BD\u3092\u843D\u3068\u3059"), /*#__PURE__*/React.createElement("li", null, "\u7A42\u6728\u306B\u6804\u990A\u304C\u96C6\u4E2D\u3059\u308B\u3088\u3046\u8ABF\u6574"))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-[#eee] mb-4 border-l-2 border-[#8A2E2E] pl-4"
  }, "9. \u6D3B\u7740\u3092\u78BA\u8A8D\u3059\u308B"), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-5 space-y-2 text-sm text-[#aaa] mb-4"
  }, /*#__PURE__*/React.createElement("li", null, "\u7A42\u6728\u304C\u67AF\u308C\u305A\u3001\u6210\u9577\u3057\u3066\u3044\u308B\u304B"), /*#__PURE__*/React.createElement("li", null, "\u554F\u984C\u304C\u3042\u308C\u3070\u3084\u308A\u76F4\u3059\u3053\u3068\u3082\u3042\u308B")))), /*#__PURE__*/React.createElement("div", {
    className: "pt-20 pb-12 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[#333] text-xs tracking-[0.5em]"
  }, "KAMI NO MEGUMI")))));
};

// 5.8 ANCIENT DOCUMENT (Hidden Page)
const AncientDocument = ({
  setPage
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-32 pb-20 bg-[#333] text-white font-serif"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPage('diary'),
    className: "flex items-center text-sm text-gray-300 hover:text-white mb-16 transition-colors font-sans"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    className: "w-4 h-4 mr-2"
  }), "\u623B\u308B"), /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-16 border-4 border-double border-[#555] p-2 bg-[#222]"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.blog_oldbook,
    alt: "\u53E4\u3044\u624B\u8A18",
    className: "w-full h-auto opacity-90 filter sepia-[0.2] contrast-110"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-12 leading-loose tracking-widest text-justify text-gray-100",
    style: {
      fontFeatureSettings: '"palt"'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-16 border-b border-[#555] pb-8"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 mb-2"
  }, "\u6587\u653F\u4E5D\u5E74\uFF08\u897F\u66A6\u4E00\u516B\u4E8C\u516D\u5E74\uFF09"), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-bold text-[#ff5555]"
  }, "\u5965\u795E\u4F0F\u6751 \u65E7\u8A18\u629C\u7C8B")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "\u203B\u672C\u7A3F\u306F\u3001\u5965\u795E\u4F0F\u6751\u306B\u4F1D\u308F\u308B\u53E4\u3044\u5E33\u9762\u3092\u3082\u3068\u306B\u3001\u5224\u8AAD\u53EF\u80FD\u306A\u7BC4\u56F2\u3092\u73FE\u4EE3\u8A9E\u306B\u7F6E\u304D\u8D77\u3053\u3057\u305F\u8A18\u9332\u3067\u3042\u308B\u3002"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl text-[#ff5555] mb-6 font-bold border-l-4 border-[#ff5555] pl-4"
  }, "\u6587\u653F\u4E5D\u5E74\u3001\u5C71\u306E\u5965\u306B\u3066"), /*#__PURE__*/React.createElement("p", null, "\u4ECA\u5E74\u3082\u5B9F\u308A\u306E\u305F\u3081\u306E", /*#__PURE__*/React.createElement("strong", {
    className: "text-white border-b border-[#ff5555]"
  }, "\u63A5\u624B\uFF08\u3064\u304E\u3066\uFF09"), "\u3092\u57F7\u308A\u884C\u3046\u3053\u3068\u3068\u306A\u3063\u305F\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u3053\u306E\u5730\u306F\u75E9\u305B\u3001\u305F\u3060\u679D\u3092\u633F\u3059\u306E\u307F\u3067\u306F\u6839\u4ED8\u304B\u306C\u3002", /*#__PURE__*/React.createElement("br", null), "\u3086\u3048\u306B\u3001\u53E4\u304F\u3088\u308A", /*#__PURE__*/React.createElement("strong", {
    className: "text-white"
  }, "\u5668\uFF08\u3046\u3064\u308F\uFF09\u3092\u9078\u3073\u3001\u305D\u308C\u3092\u53F0\uFF08\u3060\u3044\uFF09"), "\u3068\u3057\u3066\u7528\u3044\u308B\u7FD2\u308F\u3057\u304C\u7D9A\u3044\u3066\u3044\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u5668\u306F\u82E5\u304F\u3001\u50B7\u306A\u304F\u3001\u4F59\u5206\u306A\u8840\u306E\u6DF7\u3058\u3089\u306C\u3082\u306E\u304C\u826F\u3044\u3068\u3055\u308C\u305F\u3002")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl text-[#ff5555] mb-6 font-bold border-l-4 border-[#ff5555] pl-4"
  }, "\u5668\u306E\u9078\u5B9A\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("p", null, "\u63A5\u624B\u306B\u7528\u3044\u308B\u5668\u306F\u3001"), /*#__PURE__*/React.createElement("ul", {
    className: "list-none pl-4 space-y-2 my-4 text-gray-200"
  }, /*#__PURE__*/React.createElement("li", null, "\u30FB\u75C5\u3092\u6301\u305F\u305A"), /*#__PURE__*/React.createElement("li", null, "\u30FB\u5BB6\u65CF\u306E\u7E01\u304C\u8584\u304F"), /*#__PURE__*/React.createElement("li", null, "\u30FB\u9003\u3052\u9053\u3092\u6301\u305F\u306C\u8005")), /*#__PURE__*/React.createElement("p", null, "\u304C\u826F\u3044\u3068\u8A18\u3055\u308C\u3066\u3044\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u6751\u306E\u5916\u3088\u308A\u6765\u305F\u8005\u306F\u3001", /*#__PURE__*/React.createElement("br", null), "\u571F\u5730\u306B\u99B4\u67D3\u307F\u3084\u3059\u304F\u3001\u62D2\u307F\u3082\u5C11\u306A\u3044\u305F\u3081\u3001", /*#__PURE__*/React.createElement("br", null), "\u6839\u4ED8\u304D\u304C\u826F\u3044\u3068\u3055\u308C\u3066\u3044\u305F\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u5668\u306F\u4E8B\u524D\u306B\u8EAB\u4F53\u306E\u5177\u5408\u3092\u6539\u3081\u3001", /*#__PURE__*/React.createElement("br", null), "\u8840\u306E\u5DE1\u308A\u3001\u9AA8\u306E\u5F37\u3055\u3001", /*#__PURE__*/React.createElement("br", null), "\u7720\u308A\u306E\u6DF1\u3055\u306A\u3069\u3092\u78BA\u304B\u3081\u305F\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u3053\u308C\u3092", /*#__PURE__*/React.createElement("strong", {
    className: "text-white border-b border-[#ff5555]"
  }, "\u691C\u3081\uFF08\u3042\u3089\u305F\u3081\uFF09"), "\u3068\u547C\u3076\u3002")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl text-[#ff5555] mb-6 font-bold border-l-4 border-[#ff5555] pl-4"
  }, "\u4F0F\u305B\u306E\u4F5C\u6CD5"), /*#__PURE__*/React.createElement("p", null, "\u5668\u306F\u3001\u7A74\u306E\u4E2D\u306B\u3066", /*#__PURE__*/React.createElement("br", null), "\u4F0F\u305B\u306E\u59FF\u52E2\u3092\u53D6\u3089\u305B\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u982D\u3092\u5782\u308C\u3001", /*#__PURE__*/React.createElement("br", null), "\u80CC\u3092\u4E38\u3081\u3001", /*#__PURE__*/React.createElement("br", null), "\u4F59\u8A08\u306A\u52D5\u304D\u304C\u51FA\u306C\u3088\u3046\u3001", /*#__PURE__*/React.createElement("br", null), "\u571F\u3068\u6728\u67A0\u306B\u3066\u56FA\u5B9A\u3059\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u52D5\u3051\u3070\u6B6A\u307F\u3001", /*#__PURE__*/React.createElement("br", null), "\u6B6A\u3081\u3070\u679D\u304C\u67AF\u308C\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6 font-bold text-white"
  }, "\u3088\u3063\u3066\u3001\u52D5\u304B\u306C\u3053\u3068\u304C\u4F55\u3088\u308A\u306E\u52D9\u3081\u3067\u3042\u308B\u3002")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl text-[#ff5555] mb-6 font-bold border-l-4 border-[#ff5555] pl-4"
  }, "\u679D\u306E\u633F\u3057\u65B9"), /*#__PURE__*/React.createElement("p", null, "\u80CC\u306E\u4E2D\u592E\u306B\u6CBF\u3044\u3001", /*#__PURE__*/React.createElement("br", null), "\u5203\u3092\u5165\u308C\u3001", /*#__PURE__*/React.createElement("br", null), "\u76AE\u3092\u5206\u3051\u3001", /*#__PURE__*/React.createElement("br", null), "\u305D\u3053\u3078\u679D\u3092\u633F\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u679D\u306F\u82E5\u304F\u3001\u8D64\u307F\u306E\u3042\u308B\u3082\u306E\u304C\u826F\u3044\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u633F\u3057\u305F\u5F8C\u306F\u3001", /*#__PURE__*/React.createElement("br", null), "\u83CC\u5E8A\u3068\u571F\u3092\u91CD\u306D\u3001", /*#__PURE__*/React.createElement("br", null), "\u6C34\u3092\u4E0E\u3048\u3001", /*#__PURE__*/React.createElement("br", null), "\u6708\u306E\u6E80\u3061\u6B20\u3051\u3092\u898B\u3066\u8986\u3044\u3092\u65BD\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6 text-[#ff8888]"
  }, "\u3053\u306E\u9593\u3001\u5668\u306F\u58F0\u3092\u7ACB\u3066\u3066\u306F\u306A\u3089\u306C\u3002")), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl text-[#ff5555] mb-6 font-bold border-l-4 border-[#ff5555] pl-4"
  }, "\u6210\u308A\u6728\uFF08\u306A\u308A\u304D\uFF09\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("p", null, "\u5B63\u3092\u8D8A\u3048\u3001", /*#__PURE__*/React.createElement("br", null), "\u679D\u304C\u4F38\u3073\u3001", /*#__PURE__*/React.createElement("br", null), "\u82B1\u304C\u54B2\u304D\u3001", /*#__PURE__*/React.createElement("br", null), "\u5B9F\u304C\u7D50\u3070\u308C\u305F\u3082\u306E\u3092", /*#__PURE__*/React.createElement("br", null), "\u6210\u308A\u6728\u3068\u547C\u3076\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u6210\u308A\u6728\u306F\u52D5\u304B\u305A\u3001", /*#__PURE__*/React.createElement("br", null), "\u8A9E\u3089\u305A\u3001", /*#__PURE__*/React.createElement("br", null), "\u305F\u3060\u5B9F\u308A\u3092\u8FD4\u3059\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u3053\u306E\u5B9F\u306F\u6731\uFF08\u3042\u304B\uFF09\u304F\u3001", /*#__PURE__*/React.createElement("br", null), "\u7518\u307F\u304C\u5F37\u304F\u3001", /*#__PURE__*/React.createElement("br", null), "\u8179\u306B\u6DF1\u304F\u67D3\u307F\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mt-6"
  }, "\u6751\u3067\u306F\u3053\u308C\u3092", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", {
    className: "text-2xl text-red-500 block my-4 text-center"
  }, "\u6731\u5B9F\uFF08\u3042\u3051\u307F\uFF09"), "\u3068\u540D\u4ED8\u3051\u3001", /*#__PURE__*/React.createElement("br", null), "\u7279\u5225\u306A\u6298\u306B\u306E\u307F\u53E3\u306B\u3057\u305F\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-[#555] pt-12 mt-16 text-center text-sm text-gray-300"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-8 font-bold text-gray-400"
  }, "\u8A18\u3059\u3079\u304D\u3053\u3068"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "\u3053\u306E\u4F5C\u6CD5\u306F\u3001", /*#__PURE__*/React.createElement("br", null), "\u795E\u306B\u6367\u3052\u308B\u3082\u306E\u3067\u306F\u306A\u304F\u3001", /*#__PURE__*/React.createElement("br", null), "\u6751\u3092\u7D9A\u304B\u305B\u308B\u305F\u3081\u306E\u77E5\u6075\u3067\u3042\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mb-4"
  }, "\u5931\u308F\u308C\u308C\u3070\u3001", /*#__PURE__*/React.createElement("br", null), "\u5C71\u306F\u67AF\u308C\u3001", /*#__PURE__*/React.createElement("br", null), "\u4EBA\u306F\u96E2\u308C\u3001", /*#__PURE__*/React.createElement("br", null), "\u6751\u306F\u7D42\u308F\u308B\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "mb-8"
  }, "\u3086\u3048\u306B\u3001", /*#__PURE__*/React.createElement("br", null), "\u3053\u306E\u8A18\u306F\u5916\u3078\u51FA\u3057\u3066\u306F\u306A\u3089\u306C\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-[#ff5555] font-bold"
  }, "\u8AAD\u3093\u3060\u8005\u306F\u3001", /*#__PURE__*/React.createElement("br", null), "\u7406\u89E3\u3057\u3001", /*#__PURE__*/React.createElement("br", null), "\u53E3\u3092\u9589\u3056\u3057\u3001", /*#__PURE__*/React.createElement("br", null), "\u5FD8\u308C\u308B\u3053\u3068\u3002"))))));
};

// 6. ACCESS (Table & Image)
const Access = ({
  phase,
  notifyEvidence,
  flags
}) => {
  const [modalImage, setModalImage] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u30A2\u30AF\u30BB\u30B9",
    sub: "ACCESS"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-surface rounded-2xl p-8 md:p-12 shadow-sm mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aspect-video w-full bg-surface-2 rounded-xl mb-8 overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGES.access_map,
    className: "w-full h-full object-cover",
    alt: "map"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center bg-black/10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-white px-4 py-2 font-eng text-sm tracking-widest shadow"
  }, "OKUKAMIFUSHI MAP"))), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif font-bold mb-6"
  }, "\u304A\u8ECA\u3067\u304A\u8D8A\u3057\u306E\u5834\u5408"), /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm text-left"
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-border"
  }, /*#__PURE__*/React.createElement("th", {
    className: "py-4 font-normal text-muted"
  }, "\u9577\u91CEIC\u3088\u308A"), /*#__PURE__*/React.createElement("td", {
    className: "py-4"
  }, "\u770C\u905300\u53F7\u7DDA\u3092\u5357\u3078 \u7D0490\u5206")), /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-border"
  }, /*#__PURE__*/React.createElement("th", {
    className: "py-4 font-normal text-muted"
  }, "\u99D0\u8ECA\u5834"), /*#__PURE__*/React.createElement("td", {
    className: "py-4"
  }, "\u3042\u308A\uFF08\u8981\u4E88\u7D04\uFF09"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-center items-start"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted mb-6 leading-relaxed"
  }, "\u8A73\u7D30\u306A\u4F4F\u6240\u306F\u3001\u3054\u4E88\u7D04\u78BA\u5B9A\u5F8C\u306B\u30E1\u30FC\u30EB\u306B\u3066\u3054\u6848\u5185\u3044\u305F\u3057\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u5C71\u9053\u304C\u7D9A\u304D\u307E\u3059\u306E\u3067\u3001\u304A\u6C17\u3092\u3064\u3051\u3066\u304A\u8D8A\u3057\u304F\u3060\u3055\u3044\u3002"), phase >= 2 && /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-xs text-[#8A2E2E] cursor-pointer hover:underline tracking-widest font-serif opacity-70 hover:opacity-100 transition-opacity",
    onClick: () => {
      setModalImage(IMAGES.top_change_village);
      if (!flags.F11) {
        notifyEvidence('F11', '地図のはずなのに、何かが映っている…。', {
          mode: "toast"
        });
      }
    }
  }, "\u6751\u306B\u5165\u308B\u3068\u3001\u6751\u3073\u3068\u306F\u3042\u306A\u305F\u3092\u305A\u3063\u3068\u898B\u3066\u3044\u308B\u2026"))))), modalImage && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer",
    onClick: () => setModalImage(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl w-full"
  }, /*#__PURE__*/React.createElement("img", {
    src: modalImage,
    alt: "Hidden Message",
    className: "w-full h-auto shadow-2xl rounded animate-pulse-slow brightness-150 contrast-125"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-white mt-4 text-sm font-serif"
  }, "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u9589\u3058\u308B"))));
};

// --- CONTINUES IN PART 4 ---
// 7. RECRUIT (Timeline & Checkbox)  ※元仕様：チェック項目内の文字が変化
const Recruit = ({
  phase,
  notifyEvidence,
  flags
}) => {
  const [checks, setChecks] = useState({});
  const [horrorStates, setHorrorStates] = useState({});
  const [globalHorror, setGlobalHorror] = useState(false);
  const recruitItems = [{
    id: 'farm_love',
    label: '農作業が好き！日本の農業に興味がある！'
  }, {
    id: 'morning',
    label: '朝が得意！'
  }, {
    id: 'group_life',
    label: 'みんなでの共同生活を楽しめる！'
  }, {
    id: 'learn_jp',
    label: '日本語を学んでみたい！'
  }, {
    id: 'stay_jp',
    label: '日本での滞在を楽しめる！',
    horror: 'ニゲラレナイ…'
  }, {
    id: 'nature_life',
    label: '自然が多い暮らしに憧れる！'
  }, {
    id: 'like_fruit',
    label: '果物や野菜が好き！',
    horror: 'イケニエサレル…'
  }, {
    id: 'health',
    label: '健康がとりえだ！'
  }, {
    id: 'alone',
    label: '一人暮らしもへっちゃらだ！'
  }, {
    id: 'work_here',
    label: '奥神伏村で働きたい！',
    horror: 'クルナ…！！！！！！'
  }];
  const heroImage = phase >= 3 ? IMAGES.recruiting_change : IMAGES.recruiting;
  const handleCheck = item => {
    const isChecked = !checks[item.id];
    setChecks(prev => ({
      ...prev,
      [item.id]: isChecked
    }));

    // Phase3以降でのみホラー演出（F05）
    if (phase >= 3 && isChecked && item.horror) {
      setHorrorStates(prev => ({
        ...prev,
        [item.id]: true
      }));
      setGlobalHorror(true);
      setTimeout(() => {
        setGlobalHorror(false);
        setHorrorStates(prev => ({
          ...prev,
          [item.id]: false
        }));
        if (!flags.F05) {
          notifyEvidence('F05', 'チェック項目の文字が一瞬変化した。\n「ニゲラレナイ」「イケニエ」...\nこれは募集ではなく、選別だ。');
        }
      }, 600);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20 bg-surface-2 relative"
  }, phase >= 3 && globalHorror && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "horror-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "horror-vignette"
  }), /*#__PURE__*/React.createElement("img", {
    src: IMAGES.staff_victim,
    className: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover opacity-10 mix-blend-overlay z-[9998] pointer-events-none animate-pulse",
    alt: "overlay"
  })), /*#__PURE__*/React.createElement("div", {
    className: `max-w-container mx-auto px-6 relative transition-all duration-100 ${globalHorror ? 'z-[10000]' : 'z-10'}`
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u63A1\u7528\u60C5\u5831",
    sub: "RECRUIT"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-12 mb-20"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: heroImage,
    alt: "Recruiting",
    className: `w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-100 ${globalHorror ? 'grayscale contrast-150 brightness-50' : ''}`
  })), /*#__PURE__*/React.createElement("div", {
    className: `flex flex-col justify-center transition-opacity duration-100 ${globalHorror ? 'opacity-20' : 'opacity-100'}`
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-serif mb-6"
  }, "\u6D77\u5916\u6280\u80FD\u5B9F\u7FD2\u751F \u52DF\u96C6\u4E2D"), /*#__PURE__*/React.createElement("p", {
    className: "leading-loose text-muted mb-8"
  }, "\u65E5\u672C\u306E\u4F1D\u7D71\u7684\u306A\u8FB2\u696D\u6280\u8853\u3092\u5B66\u3073\u307E\u305B\u3093\u304B\uFF1F", /*#__PURE__*/React.createElement("br", null), "\u79C1\u305F\u3061\u306F\u3001\u4E16\u754C\u4E2D\u304B\u3089\u610F\u6B32\u3042\u308B\u82E5\u8005\u3092\u53D7\u3051\u5165\u308C\u3066\u3044\u307E\u3059\u3002", /*#__PURE__*/React.createElement("br", null), "\u81EA\u7136\u8C4A\u304B\u306A\u74B0\u5883\u3067\u3001\u5171\u306B\u6C57\u3092\u6D41\u3057\u3001\u7D46\u3092\u6DF1\u3081\u307E\u3057\u3087\u3046\u3002"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-4 text-sm"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    className: "text-primary w-5"
  }), " \u5BEE\u5B8C\u5099\u30FB\u98DF\u4E8B\u4ED8\u304D"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    className: "text-primary w-5"
  }), " \u65E5\u672C\u8A9E\u5B66\u7FD2\u30B5\u30DD\u30FC\u30C8\u3042\u308A"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    className: "text-primary w-5"
  }), " \u30A2\u30C3\u30C8\u30DB\u30FC\u30E0\u306A\u8077\u5834")))), /*#__PURE__*/React.createElement("div", {
    className: `bg-surface p-8 md:p-12 rounded-2xl max-w-3xl mx-auto shadow-sm transition-all duration-100 ${globalHorror ? 'relative z-[10000] bg-black border-4 border-red-900 shadow-[0_0_50px_rgba(255,0,0,0.5)] transform scale-105' : ''}`
  }, /*#__PURE__*/React.createElement("h4", {
    className: `font-bold font-serif text-xl mb-8 text-center ${globalHorror ? 'text-red-600 animate-pulse' : 'text-primary'}`
  }, globalHorror ? "逃ゲラレナイ…逃ゲラレナイ…" : "こんなあなたを募集中！"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, recruitItems.map(item => /*#__PURE__*/React.createElement("label", {
    key: item.id,
    className: `flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-100 ${horrorStates[item.id] ? 'bg-black/80 border-red-600 shadow-inner' : checks[item.id] ? 'bg-primary/5 border-primary' : 'bg-white border-border hover:bg-surface-2'}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!checks[item.id],
    onChange: () => handleCheck(item),
    className: `w-5 h-5 shrink-0 transition-all ${horrorStates[item.id] ? 'distorted-checkbox' : 'accent-primary'}`
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-sm font-medium transition-colors duration-100 ${horrorStates[item.id] ? 'intense-glitch' : 'text-text'}`
  }, horrorStates[item.id] ? item.horror : item.label)))), /*#__PURE__*/React.createElement("p", {
    className: `text-xs text-center mt-8 ${globalHorror ? 'text-red-800 font-bold' : 'text-muted'}`
  }, globalHorror ? "※生きて帰れる保証はありません" : "※一つでも当てはまる方は、ぜひお問い合わせください。"))));
};
// 8. CONTACT (Form Hijack)
const Contact = ({
  phase,
  notifyEvidence,
  flags,
  setPage
}) => {
  // 通常時のプレースホルダー
  const defaultPlaceholders = {
    name: '山田 太郎',
    email: 'example@email.com',
    address: '任意',
    message: 'ご質問をご記入ください…'
  };

  // ホラー時のプレースホルダー
  const horrorPlaceholders = {
    name: 'ヴー・タイン・アン',
    email: 'もういない',
    address: '俺も逃げられない',
    message: '助けて'
  };
  const [placeholders, setPlaceholders] = useState(defaultPlaceholders);
  const [seenCount, setSeenCount] = useState({
    name: false,
    email: false,
    address: false,
    message: false
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    isHorror: false,
    goAdmin: false
  });

  // フォーム乗っ取り演出（F12）はPhase2以降でのみ発動
  const triggerHorror = field => {
    if (phase < 2) return;
    setPlaceholders(prev => ({
      ...prev,
      [field]: horrorPlaceholders[field]
    }));
    setSeenCount(prev => ({
      ...prev,
      [field]: true
    }));
    const duration = Math.random() * 300 + 200;
    setTimeout(() => {
      setPlaceholders(prev => ({
        ...prev,
        [field]: defaultPlaceholders[field]
      }));
    }, duration);
  };
  const allSeen = Object.values(seenCount).every(v => v);
  const handleSubmit = e => {
    e.preventDefault();
    if (allSeen) {
      // F12回収（問い合わせ乗っ取り）
      if (!flags.F12) {
        notifyEvidence('F12', 'フォームが完全に乗っ取られている。', {
          mode: "silent"
        });
      }

      // 通報は管理人ページ（admin_notice）で行う
      setModalState({
        isOpen: true,
        message: "フォームが完全に乗っ取られている。\n\n証拠に気づいたか？\n最後は『管理人からのお知らせ（関係者各位）』にある。",
        isHorror: true,
        goAdmin: true
      });
    } else {
      setModalState({
        isOpen: true,
        message: "現在問い合わせが混雑しています。\nご迷惑をおかけして申し訳ありません。",
        isHorror: false,
        goAdmin: false
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-container mx-auto px-6"
  }, "\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000", /*#__PURE__*/React.createElement(SectionTitle, {
    title: "\u304A\u554F\u3044\u5408\u308F\u305B",
    sub: "CONTACT"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto grid md:grid-cols-3 gap-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("form", {
    className: "space-y-8",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-muted tracking-wider"
  }, "\u304A\u540D\u524D ", /*#__PURE__*/React.createElement("span", {
    className: "text-accent"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary transition-colors text-lg placeholder-gray-400",
    placeholder: placeholders.name,
    onFocus: () => triggerHorror('name'),
    onMouseEnter: () => triggerHorror('name')
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-muted tracking-wider"
  }, "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9 ", /*#__PURE__*/React.createElement("span", {
    className: "text-accent"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary transition-colors text-lg placeholder-gray-400",
    placeholder: placeholders.email,
    onFocus: () => triggerHorror('email'),
    onMouseEnter: () => triggerHorror('email')
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-muted tracking-wider"
  }, "\u4F4F\u6240"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary transition-colors text-lg placeholder-gray-400",
    placeholder: placeholders.address,
    onFocus: () => triggerHorror('address'),
    onMouseEnter: () => triggerHorror('address')
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold text-muted tracking-wider"
  }, "\u304A\u554F\u3044\u5408\u308F\u305B\u5185\u5BB9 ", /*#__PURE__*/React.createElement("span", {
    className: "text-accent"
  }, "*")), /*#__PURE__*/React.createElement("textarea", {
    rows: "5",
    className: "w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary transition-colors text-base resize-none placeholder-gray-400",
    placeholder: placeholders.message,
    onFocus: () => triggerHorror('message'),
    onMouseEnter: () => triggerHorror('message')
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: `w-full py-4 rounded-full transition-all duration-500 font-medium tracking-wide text-sm shadow-lg hover:shadow-xl ${allSeen ? 'bg-black text-white hover:bg-gray-900 border-none' : 'bg-white text-black border border-text hover:bg-gray-100'}`
  }, "\u9001\u4FE1\u3059\u308B"))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-1 border-l border-border pl-8 hidden md:block"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold font-serif mb-6"
  }, "\u304A\u96FB\u8A71\u3067\u306E\u304A\u554F\u3044\u5408\u308F\u305B"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-eng mb-2"
  }, "026-000-0000"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-muted mb-8"
  }, "\u53D7\u4ED8\u6642\u9593: 9:00 - 17:00 (\u571F\u65E5\u795D\u9664\u304F)"), /*#__PURE__*/React.createElement("h4", {
    className: "font-bold font-serif mb-4"
  }, "\u3088\u304F\u3042\u308B\u3054\u8CEA\u554F"), /*#__PURE__*/React.createElement("ul", {
    className: "text-sm text-muted space-y-3"
  }, /*#__PURE__*/React.createElement("li", null, "\u30FB \u4E88\u7D04\u306E\u30AD\u30E3\u30F3\u30BB\u30EB\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("li", null, "\u30FB \u30AE\u30D5\u30C8\u30E9\u30C3\u30D4\u30F3\u30B0\u306B\u3064\u3044\u3066"), /*#__PURE__*/React.createElement("li", null, "\u30FB \u30A2\u30EC\u30EB\u30AE\u30FC\u5BFE\u5FDC\u306B\u3064\u3044\u3066"))))), /*#__PURE__*/React.createElement(MessageModal, {
    isOpen: modalState.isOpen,
    message: modalState.message,
    isHorror: modalState.isHorror,
    onClose: () => {
      const go = modalState.goAdmin;
      setModalState({
        ...modalState,
        isOpen: false,
        goAdmin: false
      });
      if (go) setPage('admin_notice');
    }
  }));
};
const LegalPage = ({
  title,
  subtitle,
  content
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-24 pb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-6"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    title: title,
    sub: subtitle
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-border rounded-2xl p-6 md:p-10 shadow-sm"
  }, /*#__PURE__*/React.createElement("pre", {
    className: "whitespace-pre-wrap font-sans text-sm md:text-base leading-loose text-text"
  }, content))));
};
const privacyPolicyText = `奥神伏ファーム プライバシーポリシー
制定日：2026年2月9日
最終改定日：2026年2月9日

プロトプレイ（以下「運営者」）は、運営者が提供するウェブサイト「奥神伏ファーム」（以下「当サイト」）において取得するユーザー情報等の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。

1. 事業者情報
・運営者名：プロトプレイ
・連絡先（メール）：protoplaystudio@gmail.com
・所在地：所在地については、請求があれば遅滞なく開示いたします。

2. 取得する情報と取得方法
当サイトでは、以下の情報を取得する場合があります。

(1) お問い合わせ時にユーザーが入力・送信する情報
・お名前
・メールアドレス
・住所（任意）
・お問い合わせ内容
・その他フォームに入力された情報

(2) 当サイトの閲覧に伴い自動的に取得される情報
・IPアドレス
・閲覧日時、閲覧ページ、参照元URL
・端末情報（ブラウザ種別、OS、画面サイズ等）
・Cookie（クッキー）等の識別子
・広告配信や計測に必要となる情報（後記「広告配信について」参照）

3. 利用目的
当サイトは、取得した情報を以下の目的で利用します。
・お問い合わせへの対応、連絡、本人確認のため
・当サイトの運営、維持、改善、品質向上のため
・不正利用の防止、セキュリティ確保のため
・広告配信および広告効果測定のため
・上記目的に付随する目的のため

4. 個人情報の管理
当サイトは、取得した情報の漏えい、滅失、毀損等を防止するため、適切な安全管理措置を講じます。

5. 第三者提供
当サイトは、次の場合を除き、取得した個人情報を第三者に提供しません。
・本人の同意がある場合
・法令に基づく場合
・人の生命、身体または財産の保護のために必要であり、本人の同意を得ることが困難な場合
・業務委託に伴い、利用目的の達成に必要な範囲で委託先に提供する場合（次項）

6. 業務委託
当サイトは、利用目的の達成に必要な範囲で、個人情報の取扱いを外部事業者へ委託することがあります。この場合、委託先の選定を適切に行い、必要かつ適切な監督を実施します。

7. Cookie等の利用
当サイトは、利便性向上、広告配信、広告効果測定等の目的でCookie等を使用する場合があります。
ユーザーは、ブラウザの設定によりCookieの無効化または削除が可能です。ただし、Cookieを無効化した場合、当サイトの一部機能が正しく動作しない場合があります。

8. 広告配信について（Google AdSense）
当サイトは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。

(1) Cookieの使用
Googleなどの第三者配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie等を使用することがあります。
これにより、当サイトや他サイトへのアクセス情報に基づいた広告が表示される場合があります。

(2) パーソナライズド広告の無効化（オプトアウト）
ユーザーは、広告設定等によりパーソナライズド広告を無効化できます。
また、第三者配信事業者によるCookieの使用を無効化できる場合があります（対応状況は各事業者・ブラウザにより異なります）。

※オプトアウト方法の参照先は、本ポリシー末尾の「参考リンク」をご確認ください。

9. 開示・訂正・削除等の請求
ユーザーご本人から、当サイトが保有する個人情報について、開示・訂正・削除・利用停止等の請求があった場合、本人確認の上、法令に従い合理的な範囲で対応します。

10. 本ポリシーの変更
当サイトは、法令変更や運用変更等に応じて本ポリシーを改定することがあります。改定後の内容は当サイト上で公表した時点から適用されます。

11. お問い合わせ窓口
本ポリシーに関するお問い合わせは、下記までご連絡ください。
・メール：protoplaystudio@gmail.com

参考リンク（ユーザー向け）
・Google 広告設定（パーソナライズド広告の管理）
・AboutAds（第三者広告のオプトアウト）
・Googleの広告に関するポリシー（技術情報）
※URLは当サイトの「広告配信に関する表記」ページに掲載します。`;
const termsOfServiceText = `奥神伏ファーム 利用規約
制定日：2026年2月9日
最終改定日：2026年2月9日

この利用規約（以下「本規約」）は、プロトプレイ（以下「運営者」）が提供するウェブサイト「奥神伏ファーム」（以下「当サイト」）の利用条件を定めるものです。ユーザーは当サイトを利用することで、本規約に同意したものとみなします。

1. 適用
本規約は、当サイトの利用に関する一切に適用されます。

2. 禁止事項
ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません。
・法令または公序良俗に反する行為
・犯罪行為またはこれを助長する行為
・運営者、他のユーザー、第三者の権利（著作権、商標権、プライバシー等）を侵害する行為
・当サイトの運営を妨害する行為（過度なアクセス、脆弱性探索、リバースエンジニアリング等を含む）
・虚偽の情報を送信する行為
・その他、運営者が不適切と判断する行為

3. 免責事項
(1) 掲載内容について
運営者は、当サイトに掲載する情報の正確性、完全性、有用性、安全性等の確保に努めますが、これらを保証するものではありません。

(2) 損害について
当サイトの利用または利用不能によりユーザーに生じた損害について、運営者は一切の責任を負いません。ただし、法令により免責が認められない場合を除きます。

(3) 外部サービス・外部リンク
当サイトから外部サイトや外部サービスへリンクしている場合でも、外部サイト等の内容や取扱いについて運営者は責任を負いません。

4. サービス内容の変更・停止
運営者は、ユーザーへの事前通知なく、当サイトの内容変更、提供の中断または停止を行うことがあります。

5. 知的財産権
当サイトに掲載される文章、画像、デザイン、プログラム等に関する著作権その他の知的財産権は、運営者または正当な権利者に帰属します。
ユーザーは、私的利用の範囲を超えて、無断で転載、複製、改変、再配布等を行ってはなりません。

6. 規約の変更
運営者は、必要に応じて本規約を改定できるものとし、改定後の本規約は当サイト上で公表した時点から効力を生じます。

7. 準拠法・管轄
本規約の準拠法は日本法とします。
当サイトに関連して運営者とユーザー間で紛争が生じた場合、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。

8. お問い合わせ
本規約に関するお問い合わせは、下記までご連絡ください。
・メール：protoplaystudio@gmail.com`;
const contactInfoText = `お問い合わせ

当サイト（奥神伏ファーム）へのご連絡は、以下よりお願いいたします。
内容により返信までお時間をいただく場合があります。

1. お問い合わせフォーム
当サイト内の「お問い合わせ」フォームよりご送信ください。
※返信先としてメールアドレスの入力が必要です。

2. メールでのお問い合わせ
protoplaystudio@gmail.com

3. ご案内
・返信の目安：原則として数営業日以内を目途にご返信します。
・お問い合わせ内容によっては、回答できない場合があります。

4. 個人情報の取扱い
お問い合わせに際して取得した情報は、回答・連絡の目的で利用し、当サイトのプライバシーポリシーに従い適切に取り扱います。`;
const adDisclosureText = `広告配信に関する表記（Cookie／第三者配信）
制定日：2026年2月9日
最終改定日：2026年2月9日

当サイト（奥神伏ファーム）では、広告配信および広告効果測定のためにCookie等を使用する場合があります。本ページでは広告配信に関する情報を示します。

1. 第三者配信の広告サービスについて
当サイトは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。
第三者配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie等を使用することがあります。

2. Cookieとは
Cookieは、ウェブサイト閲覧時にブラウザに保存される小さなデータです。
Cookieによりブラウザを識別できる場合がありますが、Cookie単体で氏名や住所など個人を直接特定する情報を含むものではありません。

3. パーソナライズド広告の無効化（オプトアウト）
ユーザーは、以下の方法により、パーソナライズド広告を無効化できます。
・Googleの広告設定でパーソナライズド広告をオフにする
・AboutAds等で第三者配信事業者によるCookieの利用を無効化する（対応している場合）

4. ブラウザ設定によるCookieの無効化
ユーザーは、ブラウザの設定によりCookieを削除・無効化できます。
ただし、無効化した場合、当サイトの一部機能が正しく動作しない場合があります。

5. お問い合わせ
広告配信に関する表記についてのお問い合わせは下記までお願いします。
・メール：protoplaystudio@gmail.com

参考リンク（URL）
・Google 広告設定：https://adssettings.google.com/
・AboutAds（オプトアウト）：https://www.aboutads.info/
・Googleの広告に関するポリシー（技術情報）：https://policies.google.com/technologies/ads?hl=ja`;
const EndingPage = ({
  endingResult,
  flags,
  onRestart,
  onShare,
  onKeepProgress
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!endingResult) {
    return /*#__PURE__*/React.createElement("div", {
      className: "min-h-screen pt-24 pb-20 bg-surface"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-2xl mx-auto px-6 text-center"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-2xl font-serif mb-6"
    }, "END\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"), /*#__PURE__*/React.createElement("p", {
      className: "text-muted mb-8"
    }, "\u901A\u5831\u3092\u884C\u3046\u3053\u3068\u3067\u30A8\u30F3\u30C7\u30A3\u30F3\u30B0\u306B\u5230\u9054\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement(Button, {
      onClick: onKeepProgress
    }, "HOME\u3078\u623B\u308B")));
  }
  const ENDING_THEMES = {
    SILENCED: 'bg-black text-gray-400',
    NORMAL: 'bg-[#1a1a2e] text-gray-300',
    TRUE: 'bg-gradient-to-b from-[#f5fbe9] via-[#eef9ff] to-[#e6f7ea] text-[#24321f]',
    PERFECT: 'bg-gradient-to-b from-[#fff8dc] via-[#fff3e0] to-[#ffe9cf] text-[#3b2f1f]'
  };
  const ENDING_SCORE_THEMES = {
    SILENCED: 'bg-white/5 border-white/10',
    NORMAL: 'bg-white/5 border-white/10',
    TRUE: 'bg-white/70 border-emerald-200/80 shadow-sm',
    PERFECT: 'bg-white/75 border-amber-200/90 shadow-sm'
  };
  const ENDING_HERO_OVERLAYS = {
    SILENCED: 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent',
    NORMAL: 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent',
    TRUE: 'absolute inset-0 bg-gradient-to-t from-emerald-950/30 via-sky-900/10 to-emerald-200/5',
    PERFECT: 'absolute inset-0 bg-gradient-to-t from-amber-950/35 via-orange-900/10 to-amber-100/10'
  };
  const ENDING_TEXT_THEMES = {
    SILENCED: {
      label: 'text-red-400/80',
      title: 'text-white drop-shadow-lg',
      subtitle: 'text-white/70'
    },
    NORMAL: {
      label: 'text-red-400/80',
      title: 'text-white drop-shadow-lg',
      subtitle: 'text-white/70'
    },
    TRUE: {
      label: 'text-emerald-700/90',
      title: 'text-emerald-950 drop-shadow-[0_2px_6px_rgba(255,255,255,0.65)]',
      subtitle: 'text-emerald-900/85'
    },
    PERFECT: {
      label: 'text-amber-700/95',
      title: 'text-amber-950 drop-shadow-[0_2px_6px_rgba(255,255,255,0.65)]',
      subtitle: 'text-amber-900/85'
    }
  };
  const themeClass = ENDING_THEMES[endingResult.endingId] || 'bg-surface';
  const scoreThemeClass = ENDING_SCORE_THEMES[endingResult.endingId] || 'bg-surface-2 border-border';
  const heroOverlayClass = ENDING_HERO_OVERLAYS[endingResult.endingId] || ENDING_HERO_OVERLAYS.NORMAL;
  const textTheme = ENDING_TEXT_THEMES[endingResult.endingId] || ENDING_TEXT_THEMES.NORMAL;
  return /*#__PURE__*/React.createElement("div", {
    className: `min-h-screen pb-20 ${themeClass}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-[420px] md:h-[520px] overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: endingResult.image,
    alt: endingResult.title,
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: heroOverlayClass
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: `${textTheme.label} font-eng tracking-[0.4em] text-xs mb-3 uppercase`
  }, "Ending"), /*#__PURE__*/React.createElement("h1", {
    className: `text-4xl md:text-5xl font-serif font-bold mb-3 ${textTheme.title}`
  }, endingResult.title), /*#__PURE__*/React.createElement("p", {
    className: `${textTheme.subtitle} text-sm md:text-base`
  }, endingResult.subtitle))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-6 pt-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 text-sm md:text-base leading-loose font-serif mb-10"
  }, endingResult.story.map((paragraph, index) => /*#__PURE__*/React.createElement("p", {
    key: index,
    className: "ending-fade-in",
    style: {
      animationDelay: `${index * 0.3}s`
    }
  }, paragraph))), /*#__PURE__*/React.createElement("div", {
    className: `rounded-2xl p-6 md:p-8 mb-10 border ${scoreThemeClass}`
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-serif font-bold mb-4"
  }, "\u30B9\u30B3\u30A2"), /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-2 gap-4 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opacity-70"
  }, "\u8A3C\u62E0\u6570"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, endingResult.evidenceCount, "/", EVIDENCE_FLAGS.length)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-white/10 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "opacity-70"
  }, "\u91CD\u8981\u8A3C\u62E0"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, endingResult.keyCount, "/", KEY_EVIDENCE_FLAGS.length)))), /*#__PURE__*/React.createElement("div", {
    className: "mb-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-serif font-bold mb-4"
  }, "\u8A3C\u62E0\u4E00\u89A7"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-3"
  }, FLAG_META_ORDER.map((id, idx) => {
    const isFound = !!flags[id];
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: `px-4 py-3 rounded-lg border text-sm ${isFound ? 'bg-white/10 border-white/15' : 'bg-white/5 border-dashed border-white/10 opacity-50'}`
    }, isFound ? `${idx + 1}. ${FLAG_META[id]?.title ?? ''}` : `${idx + 1}. 未発見の証拠`);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row gap-4 justify-center"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "px-8",
    onClick: onRestart
  }, "\u6700\u521D\u306B\u623B\u308B"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    className: "px-8 border-white/30 text-white/80 hover:bg-white/10 hover:text-white",
    onClick: () => onShare(endingResult.share)
  }, "X\u3067\u30B7\u30A7\u30A2"), /*#__PURE__*/React.createElement("button", {
    className: "text-sm opacity-60 hover:opacity-100 transition-opacity",
    onClick: onKeepProgress
  }, "\u8A3C\u62E0\u3092\u4FDD\u6301\u3057\u3066HOME\u3078"))));
};
const DebugPage = ({
  flags,
  phase,
  setPage,
  setFlags,
  goToEndingWithPreset,
  setFlagsByIds
}) => {
  const pageButtons = [{
    id: 'home',
    label: 'HOME'
  }, {
    id: 'about',
    label: 'ABOUT'
  }, {
    id: 'products',
    label: 'PRODUCTS'
  }, {
    id: 'diary',
    label: 'DIARY'
  }, {
    id: 'village',
    label: 'VILLAGE'
  }, {
    id: 'contact',
    label: 'CONTACT'
  }, {
    id: 'admin_notice',
    label: '通報ページ'
  }];
  const phasePresets = {
    1: [],
    2: ['F01', 'F04'],
    3: ['F01', 'F04', 'F02', 'F03', 'F11'],
    4: ['F01', 'F04', 'F02', 'F03', 'F11', 'F05', 'F06', 'F07']
  };
  const endingPresets = {
    SILENCED: ['F01', 'F03', 'F05', 'F08', 'F11', 'F14'],
    NORMAL: ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F08', 'F11', 'F12', 'F14', 'F15'],
    TRUE: ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F10', 'F11', 'F12', 'F14', 'F15'],
    PERFECT: [...EVIDENCE_FLAGS, 'F13']
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "max-w-container mx-auto px-6 py-16"
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    sub: "DEBUG",
    title: "\u30C7\u30D0\u30C3\u30B0\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB",
    align: "left"
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-surface border border-border rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif mb-3"
  }, "\u73FE\u5728\u306E\u72B6\u614B"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted"
  }, "Phase: ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-text"
  }, phase), " \uFF0F \u53D6\u5F97\u30D5\u30E9\u30B0: ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-text"
  }, Object.keys(flags).length))), /*#__PURE__*/React.createElement("div", {
    className: "bg-surface border border-border rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif mb-4"
  }, "\u30D5\u30A7\u30FC\u30BA\u3092\u9032\u3081\u308B"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, [1, 2, 3, 4].map(targetPhase => /*#__PURE__*/React.createElement(Button, {
    key: targetPhase,
    variant: "secondary",
    onClick: () => setFlagsByIds(phasePresets[targetPhase])
  }, "Phase ", targetPhase, " \u306B\u3059\u308B")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-surface border border-border rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif mb-4"
  }, "\u30A8\u30F3\u30C7\u30A3\u30F3\u30B0\u6761\u4EF6\u3092\u5373\u6642\u8A2D\u5B9A"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => goToEndingWithPreset(endingPresets.SILENCED)
  }, "SILENCED"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => goToEndingWithPreset(endingPresets.NORMAL)
  }, "NORMAL"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => goToEndingWithPreset(endingPresets.TRUE)
  }, "TRUE"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => goToEndingWithPreset(endingPresets.PERFECT)
  }, "PERFECT")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-muted mt-3"
  }, "\u62BC\u3059\u3068\u30D5\u30E9\u30B0\u3092\u30D7\u30EA\u30BB\u30C3\u30C8\u3057\u3001\u305D\u306E\u307E\u307E\u30A8\u30F3\u30C7\u30A3\u30F3\u30B0\u753B\u9762\u3078\u79FB\u52D5\u3057\u307E\u3059\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "bg-surface border border-border rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif mb-4"
  }, "\u30AE\u30DF\u30C3\u30AF\u78BA\u8A8D\uFF08\u500B\u5225\u30D5\u30E9\u30B0\uFF09"), /*#__PURE__*/React.createElement("div", {
    className: "grid sm:grid-cols-2 md:grid-cols-3 gap-2"
  }, FLAG_META_ORDER.map(id => /*#__PURE__*/React.createElement("button", {
    key: id,
    className: `text-left px-3 py-2 rounded-md border transition-colors ${flags[id] ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-surface-2 border-border hover:bg-surface'}`,
    onClick: () => setFlags(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-eng font-semibold mr-2"
  }, id), /*#__PURE__*/React.createElement("span", null, FLAG_META[id]?.title))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-surface border border-border rounded-xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-serif mb-4"
  }, "\u30DA\u30FC\u30B8\u30B8\u30E3\u30F3\u30D7"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, pageButtons.map(item => /*#__PURE__*/React.createElement(Button, {
    key: item.id,
    variant: "secondary",
    onClick: () => setPage(item.id)
  }, item.label))))));
};

// --- Main App ---
const App = () => {
  const [currentPage, setPage] = useState('home');
  const [phase, setPhase] = useState(1);
  const [flags, setFlags] = useState({});
  const [endingResult, setEndingResult] = useState(null);
  const [seenEndings, setSeenEndings] = useState({});
  const [evidenceModal, setEvidenceModal] = useState({
    isOpen: false,
    message: "",
    isHorror: false
  });
  const [evidenceToast, setEvidenceToast] = useState({
    isOpen: false,
    message: "",
    isHorror: false
  });
  const toastTimerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  useEffect(() => {
    const handleDebugKey = e => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const isDebugKey = e.code === 'KeyD' || String(e.key).toLowerCase() === 'd';
      if (isCtrlOrMeta && e.shiftKey && isDebugKey) {
        e.preventDefault();
        setShowDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleDebugKey);
    return () => window.removeEventListener('keydown', handleDebugKey);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  useEffect(() => {
    const saved = (() => {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== 1) return null;
        return parsed;
      } catch (error) {
        return null;
      }
    })();
    if (saved) {
      setFlags(saved.flags || {});
      setSeenEndings(saved.seenEndings || {});
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  // Phase Logic（方針どおりの閾値）
  useEffect(() => {
    const next = calcPhase(flags);
    if (next !== phase) setPhase(next);
  }, [flags, phase]);
  useEffect(() => {
    document.body.setAttribute('data-phase', phase);
  }, [phase]);
  useEffect(() => {
    lucide.createIcons();
  }, [currentPage, phase]);
  useEffect(() => {
    if (!isLoaded) return;
    const payload = {
      version: 1,
      flags,
      seenEndings
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  }, [flags, seenEndings, isLoaded]);
  const unlockFlag = useCallback(flagId => {
    setFlags(prev => {
      if (prev[flagId]) return prev;
      // MAX_FLAGSを超えるような追加は許容しない（保険）
      const nextCount = Object.keys(prev).length + 1;
      if (nextCount > MAX_FLAGS) return prev;
      return {
        ...prev,
        [flagId]: true
      };
    });
  }, []);
  const notifyEvidence = useCallback((flagId, detailText = "", options = {}) => {
    const meta = FLAG_META[flagId];
    if (!meta) return;

    // 進行反映
    unlockFlag(flagId);

    // Phase3以降はホラーUI
    const isHorror = phase >= 3;
    const messageLines = [`【${meta.title}】`];
    if (detailText) messageLines.push(detailText);
    const message = messageLines.join("\n");
    const mode = options.mode || "modal";
    if (mode === "silent") return;
    if (mode === "toast") {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
      setEvidenceToast({
        isOpen: true,
        message,
        isHorror
      });
      const duration = typeof options.duration === "number" ? options.duration : 2600;
      toastTimerRef.current = setTimeout(() => {
        setEvidenceToast(prev => ({
          ...prev,
          isOpen: false
        }));
        toastTimerRef.current = null;
      }, duration);
      return;
    }
    setEvidenceModal({
      isOpen: true,
      message,
      isHorror
    });
  }, [unlockFlag, phase]);
  const resetProgress = () => {
    localStorage.removeItem(SAVE_KEY);
    setFlags({});
    setSeenEndings({});
    setEndingResult(null);
    setPage('home');
  };
  const resetFlagsForDebug = () => {
    setFlags({});
    setEndingResult(null);
    setPage('home');
  };
  const setFlagsByIds = ids => {
    const next = {};
    ids.forEach(id => {
      next[id] = true;
    });
    setFlags(next);
    setEndingResult(null);
  };
  const goToEndingWithPreset = ids => {
    const next = {};
    ids.forEach(id => {
      next[id] = true;
    });
    const ending = computeEnding(next, calcPhase(next));
    setFlags(next);
    setEndingResult(ending);
    setSeenEndings(prev => ({
      ...prev,
      [ending.endingId]: true
    }));
    setPage('ending');
  };
  const handleReport = () => {
    const ending = computeEnding(flags, phase);
    setEndingResult(ending);
    setSeenEndings(prev => ({
      ...prev,
      [ending.endingId]: true
    }));
    setPage('ending');
  };
  const renderPage = () => {
    const props = {
      phase,
      unlockFlag,
      notifyEvidence,
      flags,
      setPage,
      setSelectedStaff,
      setSelectedArticle
    };
    switch (currentPage) {
      case 'home':
        return /*#__PURE__*/React.createElement(Home, props);
      case 'about':
        return /*#__PURE__*/React.createElement(About, props);
      case 'staff_detail':
        return /*#__PURE__*/React.createElement(StaffDetail, {
          staff: selectedStaff,
          setPage: setPage,
          notifyEvidence: notifyEvidence,
          flags: flags
        });
      case 'village':
        return /*#__PURE__*/React.createElement(Village, props);
      case 'products':
        return /*#__PURE__*/React.createElement(Products, props);
      case 'diary':
        return /*#__PURE__*/React.createElement(Diary, props);
      case 'article_detail':
        return /*#__PURE__*/React.createElement(ArticleDetail, {
          article: selectedArticle,
          setPage: setPage,
          phase: phase
        });
      case 'recipe':
        return /*#__PURE__*/React.createElement(RecipeDetail, {
          setPage: setPage,
          notifyEvidence: notifyEvidence,
          flags: flags
        });
      case 'grafting':
        return /*#__PURE__*/React.createElement(GraftingDetail, {
          setPage: setPage
        });
      case 'ancient_document':
        return /*#__PURE__*/React.createElement(AncientDocument, {
          setPage: setPage
        });
      case 'access':
        return /*#__PURE__*/React.createElement(Access, props);
      case 'admin_notice':
        return /*#__PURE__*/React.createElement(AdminNotice, _extends({}, props, {
          onReport: handleReport
        }));
      case 'recruit':
        return /*#__PURE__*/React.createElement(Recruit, props);
      case 'contact':
        return /*#__PURE__*/React.createElement(Contact, props);
      case 'privacy_policy':
        return /*#__PURE__*/React.createElement(LegalPage, {
          title: "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC",
          subtitle: "PRIVACY POLICY",
          content: privacyPolicyText
        });
      case 'terms_of_service':
        return /*#__PURE__*/React.createElement(LegalPage, {
          title: "\u5229\u7528\u898F\u7D04",
          subtitle: "TERMS OF SERVICE",
          content: termsOfServiceText
        });
      case 'contact_info':
        return /*#__PURE__*/React.createElement(LegalPage, {
          title: "\u304A\u554F\u3044\u5408\u308F\u305B",
          subtitle: "CONTACT",
          content: contactInfoText
        });
      case 'ad_disclosure':
        return /*#__PURE__*/React.createElement(LegalPage, {
          title: "\u5E83\u544A\u914D\u4FE1\u306B\u95A2\u3059\u308B\u8868\u8A18\uFF08Cookie/\u7B2C\u4E09\u8005\u914D\u4FE1\uFF09",
          subtitle: "AD DISCLOSURE",
          content: adDisclosureText
        });
      case 'ending':
        return /*#__PURE__*/React.createElement(EndingPage, {
          endingResult: endingResult,
          flags: flags,
          onRestart: resetProgress,
          onShare: shareData => {
            const intentUrl = buildXIntentUrl(shareData);
            window.open(intentUrl, "_blank", "noopener,noreferrer");
          },
          onKeepProgress: () => setPage('home')
        });
      case 'debug':
        return /*#__PURE__*/React.createElement(DebugPage, {
          flags: flags,
          phase: phase,
          setPage: setPage,
          setFlags: setFlags,
          setFlagsByIds: setFlagsByIds,
          goToEndingWithPreset: goToEndingWithPreset
        });
      default:
        return /*#__PURE__*/React.createElement(Home, props);
    }
  };

  // デバッグ表示：Phase + 各Phaseフラグのクリア数
  const p1 = countFound(flags, PHASE1_FLAGS);
  const p2 = countFound(flags, PHASE2_FLAGS);
  const p3 = countFound(flags, PHASE3_FLAGS);
  const p4 = countFound(flags, PHASE4_FLAGS);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col font-sans text-text"
  }, /*#__PURE__*/React.createElement(Header, {
    setPage: setPage,
    currentPage: currentPage,
    phase: phase
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-fade-in",
    key: currentPage
  }, renderPage())), /*#__PURE__*/React.createElement(Footer, {
    phase: phase,
    setPage: setPage
  }), showDebug && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-2 right-2 z-[200] text-[10px] bg-black/80 text-white px-3 py-2 rounded-lg shadow-lg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-eng tracking-wider"
  }, "Phase: ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, phase)), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 opacity-90"
  }, "P1: ", p1, "/", PHASE1_FLAGS.length, " \u30FB P2: ", p2, "/", PHASE2_FLAGS.length, " \u30FB P3: ", p3, "/", PHASE3_FLAGS.length, " \u30FB P4: ", p4, "/", PHASE4_FLAGS.length), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 opacity-70"
  }, "Total Flags: ", Object.keys(flags).length, "/", MAX_FLAGS), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-2 w-full text-left text-[10px] px-2 py-1 rounded bg-white/15 hover:bg-white/25 transition-colors",
    onClick: () => setPage('debug')
  }, "\u30C7\u30D0\u30C3\u30B0\u30DA\u30FC\u30B8\u3092\u958B\u304F"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mt-2 w-full text-left text-[10px] px-2 py-1 rounded bg-white/15 hover:bg-white/25 transition-colors",
    onClick: resetFlagsForDebug
  }, "\u30D5\u30E9\u30B0\u3092\u30EA\u30BB\u30C3\u30C8\uFF08\u30C7\u30D0\u30C3\u30B0\uFF09"))), /*#__PURE__*/React.createElement(MessageModal, {
    isOpen: evidenceModal.isOpen,
    message: evidenceModal.message,
    isHorror: evidenceModal.isHorror,
    onClose: () => setEvidenceModal({
      ...evidenceModal,
      isOpen: false
    })
  }), /*#__PURE__*/React.createElement(EvidenceToast, {
    isOpen: evidenceToast.isOpen,
    message: evidenceToast.message,
    isHorror: evidenceToast.isHorror,
    onClose: () => setEvidenceToast(prev => ({
      ...prev,
      isOpen: false
    }))
  }), /*#__PURE__*/React.createElement(CookieConsent, {
    setPage: setPage
  }));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
