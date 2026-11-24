package com.engtrx.ludostar;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = new WebView(this);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true); // تفعيل الجافاسكربت للعبة
        webView.loadUrl("file:///android_asset/index.html"); // فتح اللعبة
        setContentView(webView);
    }
}
