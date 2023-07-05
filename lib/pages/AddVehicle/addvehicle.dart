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

class AddVehicleScreen extends StatefulWidget {
  @override
  State<AddVehicleScreen> createState() => _AddVehicleScreenState();
}

class _AddVehicleScreenState extends State<AddVehicleScreen> {
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

    var vIdcontroller = TextEditingController();
    var licenceIdcontroller = TextEditingController();
    var vClasscontroller = TextEditingController();
    var trafficunitController = TextEditingController();
    var licenceCreatecontroller = TextEditingController();
    var licenceExpirecontroller = TextEditingController();
    var manufacController = TextEditingController();
    var modelController = TextEditingController();
    var manufacYearcontroller = TextEditingController();
    var colorController = TextEditingController();

    Future<void> addCar(
      String vId,
      String licenceId,
      String vClass,
      String trafficunit,
      String licenceCreate,
      String licenceExpire,
      String manufac,
      String model,
      String manufacYear,
      String color,
      File image,
    ) async {
      var headers = {
        'Content-Type': 'application/json',
        'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfc3NuIjoiMzAxMTAzMDIzMDAxMTMiLCJ1c2VyX25hbWUiOiJnZW9yZ2UiLCJtYW51ZmFjdHVyZXJfbnVtYmVyIjoiMSIsInVzZXJfZW1haWwiOiJnZW9yZ2VAYWRtaW4uY29tIiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCRROUdWOWx1MjhIcS40cEplREE3S2MuZ09SRnJxZXVTNXFmR2dRZVUzZU9ETXZ1N1RuVFVnNiIsInVzZXJfYWRkcmVzcyI6ImZheW91bSIsInVzZXJfam9iIjoic3R1ZGVudCIsInVzZXJfbmF0aW9uYWxpdHkiOiJFZ3lwdGlhbiIsInVzZXJfcGhvbmUiOiIwMTAyNzgyNzY1NCIsInVzZXJfYmQiOiIzMC0xMC0yMDAxIiwidXNlcl9nb3Zlcm5vcmF0ZSI6ImZheW91bSIsImlzX2FkbWluIjoiYWRtaW4ifSwiaWF0IjoxNjg0MzM5NzE2fQ.7rkN0SIW_7RRDF-dVk1FjL4JZNeTHtuKdS1kCdU7bjI'
      };
      var request = http.MultipartRequest(
          'POST', Uri.parse('http://10.0.2.2:4242/vehicles'));
      request.fields.addAll({
        'vehicle_id': vId,
        'license_id': licenceId,
        'vehicle_class': vClass,
        'traffic_unit': trafficunit,
        'license_create_date': licenceCreate,
        'license_expired_date': licenceExpire,
        'manufacturer': manufac,
        'model': model,
        'manufacturering_year': manufacYear,
        'color': color,
      });
      request.files.add(await http.MultipartFile.fromPath('image', image.path));
      request.headers.addAll(headers);

      http.StreamedResponse response = await request.send();

      if (response.statusCode == 200) {
        print(await response.stream.bytesToString());
        print("successfully sent");
      } else {
        print("not sent");
        print(response.reasonPhrase.toString());
      }
    }

    File? carimage;
    final _piker = ImagePicker();

    Future getImage() async {
      final pickedfile = await _piker.pickImage(source: ImageSource.gallery);
      if (pickedfile != null) {
        carimage = File(pickedfile.path);
        print(carimage);
      } else {
        print("No imge selected !");
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
                  Image.asset('assets/car.png',
                    width: 250,
                    height: 250,
                  ),
                  Text(
                    "Enter Car Details",
                    style: TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextFormField(
                    controller: vIdcontroller,

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
                      labelText: 'v_idController',
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
                    controller: licenceIdcontroller,

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
                      labelText: 'licenceIdcontroller',
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
                    controller: vClasscontroller,

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
                      labelText: 'vClasscontroller',
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
                    controller: trafficunitController,

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
                      labelText: 'trafficunitController',
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
                    controller: licenceCreatecontroller,

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
                      labelText: 'licenceCreatecontroller',
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
                    controller: licenceExpirecontroller,

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
                      labelText: 'licenceExpirecontroller',
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
                    controller: manufacController,

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
                      labelText: 'manufacController',
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
                    controller: modelController,

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
                      labelText: 'modelController',
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
                    controller: manufacYearcontroller,

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
                      labelText: 'manufacYearcontroller',
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
                    controller: colorController,

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
                      labelText: 'colorController',
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
                  Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        ElevatedButton(
                            onPressed: () {
                              getImage();
                            },
                            child: Text(
                              "Upload image",
                            )),
                        // image == null ? Text("  ") : Text("$image"),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),
                  ConditionalBuilder(
                    condition: true,
                    //state is! CartaLoginLoadingState,
                    builder: (context) => ElevatedButton(
                        onPressed: () {
                          addCar(
                              vIdcontroller.text,
                              licenceIdcontroller.text,
                              vClasscontroller.text,
                              trafficunitController.text,
                              licenceCreatecontroller.text,
                              licenceExpirecontroller.text,
                              manufacController.text,
                              modelController.text,
                              manufacYearcontroller.text,
                              colorController.text,
                              carimage!);
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
