import 'dart:ffi';

import 'package:shared_preferences/shared_preferences.dart';

class CacheHelper {
  static late SharedPreferences sharedPreferences;

  static init() async {
    sharedPreferences = await SharedPreferences.getInstance();
  }

  static Future<bool> saveData({
    required String key,
    required dynamic value,
  }) async {
    if (value is int) {
      await sharedPreferences.setInt(key, value);
      return true;
    }

    if (value is String) {
      await sharedPreferences.setString(key, value);
      return true;
    }

    if (value is bool) {
      await sharedPreferences.setBool(key, value);
      return true;
    }

    if (value is double) {
      await sharedPreferences.setDouble(key, value);
      return true;
    }
    return false;
  }

  void deleteItem({
    required String key,
  }) {
    sharedPreferences.remove(key);
  }

  static Future<bool?> putData({
    required String Key,
    required bool value,
  }) async {
    return await sharedPreferences.setBool(Key, value);
  }

  static dynamic getData({
    required String key,
  }) {
    return sharedPreferences.get(key);
  }
}
