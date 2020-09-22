package com.frontdrawerpoc.keyboard;

import android.content.Context;
import android.view.inputmethod.InputMethodManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KeyboardModule extends ReactContextBaseJavaModule {

    private final Context context;

    public KeyboardModule(Context context) {
        this.context = context.getApplicationContext();
    }

    @ReactMethod
    public void showKeyboard() {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, 0);
    }

    @NonNull
    @Override
    public String getName() {
        return "FrontKeyboard";
    }
}
