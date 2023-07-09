## セットアップ

```bash
# プロジェクトをGitHubからクローン
git clone git@github.com:raysato/ai-fashion-coordinator.git
# or
git clone https://github.com/raysato/ai-fashion-coordinator.git
# パッケージのインストール (yarnを使う場合)
yarn install
# パッケージのインストール (npmを使う場合)
npm install
# 開発環境起動 (yarnを使う場合)
yarn dev
# 開発環境起動 (npmを使う場合)
npm run dev
```

## 開発
フロントエンドフレームワークに[Vue.js](vuejs.org)を使用しています。基本的な記述方法はHTMLと同じです。

プロジェクトフォルダの ```pages/``` 以下のファイルが表示されるページになるので、基本的にここを編集していただければ。。
> e.g.)   
> ```pages/index.vue``` -> example.com/  
> ```pages/anotherpage.vue``` -> example.com/anotherpage  
>  ```pages/directory1/anotherpage.vue``` -> example.com/directory1/anotherpage

サイトのデザインに[Tailwind CSS](https://tailwindcss.com/)と[Daisy UI](https://daisyui.com/)を使用しています。  
[ここ](https://daisyui.com/components/)にある部品を適当に`.vue`の`<template>`タグ内にペタペタすればデザインが出来上がります。
