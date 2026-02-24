---
title: "Accessibility APIでブラウザから情報を取得してみる"
publishedDate: "February 25 2026"
---

こんにちは、mehm8128です。
普段使っているスクリーンリーダーも、実際にどう動いているかはあんまり知らずに使っています。
ブラウザによって挙動が違うとかスクリーンリーダーによって挙動が違うとか言う前に、ある程度中身を知っておいた方がいいと思い、今回Accessibility APIでブラウザからアクセシビリティ情報を取得してみました。

C++もPythonも全然知らずに雰囲気理解してるので、間違いなどありましたら教えてください。

## C++で、IAccessible2のアクセシビリティ情報を取得してみる

環境構築はChatGPTに聞き、コードはGitHub Copilotくんに書いてもらいました。便利な時代ですね。
あんまり日本語で情報がないような気がするので、手順を追って割と丁寧に説明していきます。
ちなみに、Windows環境を想定しています。

### Visual Studio Build Tools for C++をインストール

C++を使えるようになるやつらしいです。インストールしてください。
インストールするコンポーネントを選択する画面になったら、「C++によるデスクトップ開発」にチェックを入れれば多分いけます。いけなかったらチャッピーに聞いてください。

### IAccessible2を手元に取ってくる

[LinuxA11y/IAccessible2: Accessibility services framework for Microsoft Windows environments](https://github.com/LinuxA11y/IAccessible2)のリポジトリを手元に取ってきます。シェルスクリプトを叩くので、これはWSL側がおすすめです。
手元に取ってきたら、`concatidl.sh`を叩きます。これで諸々のIDLファイルを1つの`ia2_api_all.idl`に合体しています。
WSLではなくてWindows側に取ってきた人は、PowerShellでいい感じのコマンドを叩くか、`concatidl.sh`の中身としてはちょっと置換処理をして`cat`で繋げてるだけなので、頑張れば手動でもできます。

このリポジトリはIDLを提供しているので、今回のC++以外からでも使うことができます。Claudeに聞いたところNVDAはPythonでIA2にアクセスしていると言っているのですが、PythonからC++を呼び出す処理がNVDAのソースコードに含まれていたのを前に見たので、あれはなんだったのか気になります。

ちなみにIAccessible2のContributorsの一番最初にいるjcstehさんはW3CのARIA WGのメンバーで、Mozillaのエンジニアです。[TPAC](https://portfolio.hm8128.me/blog/tpac2025/)のときに実物を見ました。前にNVDAのco-lead developerだったとGitHubのプロフィールに記載があります。

### x64 Native Tools Command Prompt

さっきツールをインストールしたので、x64 Native Tools Command Promptというツールが使えるようになっているはずです。これを起動すると、コマンドプロンプトが出てきます。
このコマンドプロンプトで`ia2_api_all.idl`のあるディレクトリに移動し、以下のコマンドを実行します。

```
midl ia2_api_all.idl
```

ちなみにLinuxでいう`ls`は`dir`コマンドで、`cd`は普通に使えます。

`midl`コマンドは**M**icrosoftの**IDL**を処理してC++のソースコードを生成するコマンドです。叩くと`.c`ファイルとか`.h`ファイルとかが生まれます。

### コードを書く

生成された`.h`ファイルなどを使って、いい感じのコードを書きます。GitHub Copilotくんが一発で出してくれました。
それに対してコメントで説明やドキュメントへのリンクを貼ったものを[mehm8128/ia2-get-accessibility-info](https://github.com/mehm8128/ia2-get-accessibility-info)に公開しています（コメントの半分くらいはCopilotくんが書いたものです）。

### コンパイルして実行

僕の場合は以下のコマンドでコンパイルできましたが、書いたコードや環境によって違ってくると思います。

```
cl /utf-8 main.cpp ia2_api_all_i.c oleacc.lib ole32.lib oleaut32.lib user32.lib
```

`cl`コマンドは、多分**C**ompile & **L**inkです。

コンパイルに成功すると`main.exe`ができるので、実行します。僕のリポジトリにあるコードでは実行してから3秒間猶予があるので、その間にアクセシビリティ情報を取得したいブラウザのページをフォアグラウンドにします。そうしないと、実行したコマンドプロンプトの情報が取得されます。

という一通りの流れを[IA2でアクセシビリティ情報を取得するやつ - mehm8128](https://scrapbox.io/mehm8128/IA2%E3%81%A7%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B%E3%82%84%E3%81%A4)にも書いています。ここに、僕のポートフォリオサイトをFirefoxで開いた際の`main.exe`の実行結果を添付しています。

```
[ia2:30 msaa:リンク(30)] "Referencing HTML elements inside Shadow DOM"
```

のように、ロールを数値にしたものとロール名、accessible nameを取得できていることが分かります。
`get_accName`でaccessible nameを取得していますが、それ以外にも色々なARIA attributes/statesを取得するメソッドが生えていたので、多分それで色々取得できます。

ちなみにWindowsではMSAAが最も古いAPIで、その次にIA2、一番新しいのがUIAらしいのですが、今回はIA2の情報取得を試み、失敗したらMSAAの情報取得を試みるような形になっています。
ここらへんのAccessibility APIの名前は、[core-aam](https://w3c.github.io/core-aam/)や[html-aam](https://www.w3.org/TR/html-aam-1.0/)の表でも見ると思います。

また今回は詳しく調べていないのですが、COM (Component Object Model)という技術がアプリケーション間通信を可能にしているらしいです。

## NVDAのアドオン経由で、アクセシビリティ情報を取得してみる

次に、NVDAのアドオン経由でアクセシビリティ情報を取得してみます。
公式のガイドは[NVDA Add on Development Guide · nvdaaddons/DevGuide Wiki](https://github.com/nvdaaddons/DevGuide/wiki/NVDA-Add-on-Development-Guide)にあります。

環境構築としてはPythonだけ入ってれば動くはずです。

実際にアドオン開発をするときは[nvaccess/AddonTemplate: Template and metadata used by NVDA community add-ons](https://github.com/nvaccess/AddonTemplate)というテンプレートがあるのでこれを利用できるのですが、動作確認だけであればもっと楽にする方法があったので、そっちにします。

[Getting started: Hands-on examples](https://github.com/nvdaaddons/DevGuide/wiki/NVDA-Add-on-Development-Guide#getting-started-hands-on-examples)のセクションから読むといいです。

最初にNVDAの設定ダイアログで「高度な設定」タブに移動し、「開発者用スクラッチパッドのフォルダーからカスタムコードを読み込む」にチェックを入れます。その後「開発者用スクラッチパッドのフォルダーを開く」をクリックすると、フォルダーが開きます（チェックを入れた後、保存するのを忘れないようにしてください）。
そのフォルダーに`globalPlugins`フォルダーや`appModules`フォルダーがあると思います。そこにPythonファイルを作り、上記ガイドのExample 1や2で動作確認ができます。
ちなみに、「ツール」>「プラグインの再読み込み」ボタンで更新を反映できます。

ガイドの範囲だけだとビープ音を鳴らすだけなので、ここから具体的にIA2の情報を取得していきます。
簡単に、以下のようなコードを`appModules/chrome.py`に書いてChromeでTabキーを押していくと、buttonロールの要素にフォーカスしたタイミングで`ui.message`に渡した引数が読み上げられます（上下キーで仮想フォーカスを移動したときに毎回実行するイベントは分かりませんでした）。

```python
import appModuleHandler
import ui
import controlTypes

class AppModule(appModuleHandler.AppModule):
  def event_gainFocus(self, obj, nextHandler):
      if obj.role == controlTypes.Role.BUTTON:
          ui.message(obj.name or "名前なし")
          ui.message(str(obj.IA2Attributes))
      nextHandler()
```

importするモジュールは基本的に[NVDAのsourceディレクトリ](https://github.com/nvaccess/nvda/tree/master/source)配下のディレクトリ名をそのまま指定すると、importできるようです。
例えば`ui.message`なら[ここらへん](https://github.com/nvaccess/nvda/blob/bc45e6fdcf78c9ab3d5cfea36fb01b8bcb224d2d/source/ui.py#L239-L251)だし、ビープ音を鳴らしていた`tones.beep`は[ここらへん](https://github.com/nvaccess/nvda/blob/bc45e6fdcf78c9ab3d5cfea36fb01b8bcb224d2d/source/tones.py#L56-L83)だし、今回出てきた`controlTypes.Role`は[ここらへん](https://github.com/nvaccess/nvda/blob/master/source/controlTypes/role.py)です。

イベントハンドラーの引数の`obj`に`NVDAObject`という、NVDAのソースコード内の色んなところで参照されている型のオブジェクトが渡ってきています。ここからaccessible nameやロール、`IA2Attributes`など色んな情報を取得できます。
`controlTypes.Role`はNVDA側で定義しているロールで、どこかのタイミングでAccessibility APIから取得したロールをNVDA側のロールに変換しているのだと思います。

この状態で、例えばGitHubのコードブロックのコピーボタンにフォーカスすると、2つ目の`ui.message`で以下のような出力になります。

```
{'display': 'inline-block', 'tag': 'clipboard-copy', 'xml-roles': 'button', 'name-from': 'attribute', 'explicit-name': 'true', 'class': 'ClipboardButton btn js-clipboard-copy m-2 p-0 focus-visible', 'text-align': 'left'}
```

`class`はそのままHTML要素のclassがついています。`display`や`text-align`はCSS、`tag`はHTML要素のタグ名です（今回はカスタム要素でした）。
`xml-roles`はロール、`name-from`はおそらく[ARIAの仕様書](https://www.w3.org/TR/wai-aria-1.2/#namecalculation)の`author`、`contents`、`prohibited`の分類と似たような感じです。今回は`aria-label`属性でaccessible nameをつけていたので`attribute`になっているのだと思います（つまり上記の分類だと`author`）。

NVDAのアドオンでは、このようにAccessibility APIから情報を取得できます。

これをまとめていたのが[NVDA アドオン - mehm8128](https://scrapbox.io/mehm8128/NVDA_%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3)です。
また、過去にNVDAの内部実装を雑に読んでいた記録もあります（ZennのScrapから移植したものです）。
[NVDAと格闘する - mehm8128](https://scrapbox.io/mehm8128/NVDA%E3%81%A8%E6%A0%BC%E9%97%98%E3%81%99%E3%82%8B)

## まとめ

いかがでしたか？
Webをやっていると普段なかなか触れない部分だと思いますが、AIの力を借りて理解を深められるようになったので、色々活用していきたいです。
