import 'package:dio/dio.dart';

import '../../shared/Components/components.dart';

class DioHelper {
  static Dio dio = Dio();
  static init() {
    Dio dio = Dio(
      BaseOptions(
        baseUrl: "http://192.168.1.9:4242",
        receiveDataWhenStatusError: true,
      ),
    );
  }

  static Future<Response> getData({
    required String url,
    Map<String, dynamic>? query,
    String? token,
  }) async {
    dio.options.queryParameters = {};
    dio.options.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
    return await dio.get(
      url,
      queryParameters: query,
    );
  }

  static Future<Response> postData({
    //String? url,
    required String url,
    Map<String, dynamic>? query,
    Map<String, dynamic>? data,
    String? token,
  }) async {
    dio.options.headers = {
      'Authorization': token,
    };
    return dio.post(
      url,
      queryParameters: query,
      data: data,
    );
  }

  static Future<Response> patchData({
    required String url,
    String? token,
    // String lang = 'ar',
    //   required Map<String, dynamic> query,
  }) async {
    // dio.options.queryParameters = {};
    dio.options.headers = {
      // 'lang': lang,
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
      //'Authorization':
      //  'LkAlozwNUpmVJpTTPnoxkRn5Az4kQj9n496uvRFcoN2Q5o4WtGUbRhayIwpjq6CDOnPMU5',
    };
    return await dio.patch(
      url,
      data: {
        'is_stolen': 'stolen',
      },
    );
  }
//get the transations from api
  // Future<List<dynamic>> getAllTransactions() async {
  //   try {
  //     Response response = await dio.get('transactions');
  //     print(response.data.toString());
  //     return response.data;
  //   } catch (error) {
  //     print(error.toString());
  //     return [];
  //   }
  // }
}
