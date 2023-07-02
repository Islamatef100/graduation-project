class CartaLoginModel {
  bool? status;
  // String message = '';
  String token = '';
  UserData? data;

  CartaLoginModel.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    // message = json['message'];
    token = json['token'];
    data = json['u'] != null ? UserData.fromJson(json['u']) : null;
  }
}

class UserData {
  String userssn = '';
  String username = '';
  String manufacturernumber = '';
  String useremail = '';
  String userpassword = '';
  String useraddress = '';
  String userjob = '';
  String usernationality = '';
  String userphone = '';
  String userbd = '';
  String usergovernorate = '';
  String isadmin = '';
// UserData({
//   this.userssn,
// })

  UserData.fromJson(Map<String, dynamic> json) {
    userssn = json['user_ssn'];
    username = json['user_name'];
    manufacturernumber = json['manufacturer_number'];
    useremail = json['user_email'];
    userpassword = json['user_password'];
    useraddress = json['user_address'];
    userjob = json['user_job'];
    usernationality = json['user_nationality'];
    userphone = json['user_phone'];
    userbd = json['user_bd'];
    usergovernorate = json['user_governorate'];
    isadmin = json['is_admin'];
  }
}
