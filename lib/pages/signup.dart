import 'dart:convert';
import 'dart:io';

import 'package:carta/Layout/layoutCubit.dart';
import 'package:carta/Layout/layoutStates.dart';
import 'package:carta/shared/Components/components.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;

class SignupScreen extends StatefulWidget {
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  File? ifile;

  void pickerimage() async {
    final myimage = await ImagePicker().pickImage(source: ImageSource.gallery);

    setState(() {
      ifile = File(myimage!.path);
      print(ifile);
    });
  }

  @override
  Widget build(BuildContext context) {
    final addVehicleformfield = GlobalKey<FormState>();

    var userNameController = TextEditingController();
    var userssnController = TextEditingController();
    var manufacturerNumberController = TextEditingController();
    var userEmailController = TextEditingController();
    var userPasswordController = TextEditingController();
    var userAddressController = TextEditingController();
    var userJobController = TextEditingController();
    var userNationalityController = TextEditingController();
    var userPhoneController = TextEditingController();
    var userbdController = TextEditingController();
    var usergovernorateController = TextEditingController();
    // var userbd = TextEditingController();

    Future<void> addUser(
      String userName,
      String userssn,
      String manufacturerNumber,
      String userEmail,
      String userPassword,
      String userAddress,
      String userJob,
      String userNationality,
      String userPhone,
      String userbd,
      String usergovernorate,
    ) async {
      var headers = {'Content-Type': 'application/json'};
      var request =
          http.Request('POST', Uri.parse('http://10.0.2.2:4242/users/'));
      request.body = json.encode({
        "user_name": userName,
        "user_ssn": userssn,
        "manufacturer_number": manufacturerNumber,
        "user_email": userEmail,
        "user_password": userPassword,
        "user_address": userAddress,
        "user_job": userJob,
        "user_nationality": userNationality,
        "user_phone": userPhone,
        "user_bd": userbd,
        "user_governorate": usergovernorate
      });
      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        print(await response.stream.bytesToString());
      } else {
        print(response.reasonPhrase);
      }
    }

    return BlocConsumer<LayoutCubit, LayoutStates>(
      listener: (context, state) {},
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            backgroundColor: Color.fromARGB(255, 252, 248, 248),
            elevation: 0,
            foregroundColor: Color.fromARGB(255, 7, 7, 7),
          ),
          body: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Form(
                key: addVehicleformfield,
                child: Column(children: [
                  Image.asset(
                    'assets/logo.png',
                    width: 250,
                    height: 250,
                  ),
                  Text(
                    "Enter your Data",
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextFormField(
                    controller: userNameController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your email Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userNameController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userssnController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your email Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userssnController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: manufacturerNumberController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your vClasscontroller Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'manufacturerNumberController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userEmailController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your trafficunitController Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userEmailController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userPasswordController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your licenceCreatecontroller Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userPasswordController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userAddressController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your licenceExpirecontroller Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userAddressController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userJobController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your manufacController Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userJobController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userNationalityController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your modelController Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userNationalityController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userPhoneController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your manufacYearcontroller Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userPhoneController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: userbdController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your colorController Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'userbdController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  TextFormField(
                    controller: usergovernorateController,

                    keyboardType: TextInputType.text,
                    //make the @ sign visible in the keyboard during writing the email
                    onFieldSubmitted: (String value) {},
                    validator: (value) {
                      // bool emailvalid = RegExp(
                      //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                      //     .hasMatch(value!);
                      if (value!.isEmpty) {
                        return "please enter your colorController Address";
                      }
                      // else if (!emailvalid) {
                      //   return "enter valid email";
                      // }
                    },
                    decoration: InputDecoration(
                      labelText: 'usergovernorateController',
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30)),
                      prefixIcon: Icon(
                        Icons.email,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  ConditionalBuilder(
                    condition: true,
                    //state is! CartaLoginLoadingState,
                    builder: (context) => ElevatedButton(
                        onPressed: () {
                          addUser(
                            userNameController.text,
                            userssnController.text,
                            manufacturerNumberController.text,
                            userEmailController.text,
                            userPasswordController.text,
                            userAddressController.text,
                            userJobController.text,
                            userNationalityController.text,
                            userPhoneController.text,
                            userbdController.text,
                            usergovernorateController.text,
                          );
                          // if (addVehicleformfield.currentState!.validate()) {
                          //   //verify backend
                          //   LayoutCubit.get(context).uservehicle(
                          //       vIdcontroller: vIdcontroller.text,
                          //       licenceIdcontroller: licenceIdcontroller.text,
                          //       vClasscontroller: vClasscontroller.text,
                          //       trafficunitController:
                          //           trafficunitController.text,
                          //       licenceCreatecontroller:
                          //           licenceCreatecontroller.text,
                          //       licenceExpirecontroller:
                          //           licenceExpirecontroller.text,
                          //       manufacController: manufacController.text,
                          //       modelController: modelController.text,
                          //       manufacYearcontroller:
                          //           manufacYearcontroller.text,
                          //       colorController: colorController.text,
                          //       image: ifile!);
                          // }
                        },
                        child: Text(
                          "submit",
                        )),

                    fallback: (context) =>
                        Center(child: CircularProgressIndicator()),
                  ),
                ]),
              ),
            ),
          ),
        );
      },
    );
  }
}
