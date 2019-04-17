package com.firstrnapp.net;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

/**
 * com.firstrnapp.net
 *
 * @author jun
 * @date 2019/4/17
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class NetInterceptor implements Interceptor{
    @Override
    public Response intercept(Chain chain)throws IOException {
        Request request = chain.request().newBuilder().addHeader("Connection","close").build();
        return chain.proceed(request);
    }
}

        