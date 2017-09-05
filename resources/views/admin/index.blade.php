<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="willchat">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
  <meta name="format-detection" content="telephone=no"/>
  <title></title>
  <!-- Set render engine for 360 browser -->
  <meta name="renderer" content="webkit">

  <!-- No Baidu Siteapp-->
  <meta http-equiv="Cache-Control" content="no-siteapp"/>

  <script>
    window.Laravel = {
      csrfToken: '{!! csrf_token() !!}'
    };
  </script>
</head>
<body>
<div id="app">
  <transition name="slide-fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>

<script src="{{ asset('build/vendor.js') }}"></script>
<script src="{{ asset('build/mix.js') }}"></script>
<script src="{{ asset('build/admin.js') }}"></script>
</body>
</html>
