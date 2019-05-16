package com.firstrnapp.utils;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * com.firstrnapp.utils
 *
 * @author jun
 * @date 2019/5/16
 * Copyright (c) 2019 ${ORGANIZATION_NAME}. All rights reserved.
 */
public class FileUtils {
    /**
     * 将文件转换成字符串
     * FileReader
     * BufferedReader
     *
     * @param path 文件路径
     * @return
     */
    public static String readFileToString(String path) {
        String results = "";
        try {
            System.out.printf("%s", "\n readFileToString: path="+path);
            FileReader reader = new FileReader(path);
            BufferedReader bufferedReader = new BufferedReader(reader);
            int result = bufferedReader.read();
            StringBuilder sb = new StringBuilder();
            while(result != -1) {
                sb.append((char) result);
                result = bufferedReader.read();
            }
            bufferedReader.close();
            reader.close();
            results = sb.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return results;
    }
}
