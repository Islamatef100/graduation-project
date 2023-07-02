import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import '../../pages/fine/fineDetails.dart';

Widget defaultButton({
  double width = double.infinity,
  Color background = Colors.blue,
  bool isUpperCase = true,
  double radius = 3.0,
  required Function function,
  required String text,
}) =>
    Container(
      width: width,
      height: 50.0,
      child: MaterialButton(
        onPressed: function(function),
        child: Text(
          isUpperCase ? text.toUpperCase() : text,
          style: TextStyle(
            color: Colors.white,
          ),
        ),
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(
          radius,
        ),
        color: background,
      ),
    );

Widget defaultTextButton({
  required Function function,
  required String text,
}) =>
    TextButton(
      onPressed: function(function),
      child: Text(
        text.toUpperCase(),
      ),
    );

Widget defaultFormField({
  required TextEditingController controller,
  required TextInputType type,
  //Function onSubmit,
  //required Function onChange,
  //required Function onTap(),
  bool isPassword = false,
  required Function validate,
  required String label,
  required IconData prefix,
  //required IconData suffix,
  //required Function suffixPressed,
  bool isClickable = true,
}) =>
    TextFormField(
      controller: controller,
      keyboardType: type,
      obscureText: isPassword,
      enabled: isClickable,
      //onFieldSubmitted: onSubmit(),
      //  onChanged: onChange(),
      //onTap: onTap,
      validator: validate(),
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(
          prefix,
        ),
        // suffixIcon: suffix != null
        //     ? IconButton(
        //         onPressed: suffixPressed(),
        //         icon: Icon(
        //           suffix,
        //         ),
        //       )
        //     : null,
        border: OutlineInputBorder(),
      ),
    );

Widget myDivider() => Padding(
      padding: const EdgeInsetsDirectional.only(
        start: 20.0,
      ),
      child: Container(
        width: double.infinity,
        height: 1.0,
        color: Colors.grey[300],
      ),
    );

Widget buildFineItem(
  f, {
  required Function function,
}) =>
    Padding(
      padding: const EdgeInsets.all(20.0),
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 5),
        padding: EdgeInsets.only(right: 10),
        height: 140,
        width: 350,
        decoration: BoxDecoration(
          color: Color(0xffF5D7DB),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(children: [
          Container(
            height: 100,
            width: 90,
            margin: EdgeInsets.only(left: 8),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Color(0xffd4ecf7),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Image.asset(
              "assets/car.png",
              height: 150,
              width: double.infinity,
            ),
          ),
          Container(
            child: Padding(
              padding: EdgeInsets.only(left: 15, top: 20, bottom: 25),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${f["location"]}',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Row(
                    children: [
                      Text(
                        "Date: ",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        "${f["Date"]}",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 6),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        InkWell(
                          onTap: function(),
                          // onTap: () {
                          // Navigator.push(
                          //     context as BuildContext,
                          //     MaterialPageRoute(
                          //         builder: (context) => FineDetails(
                          //               name: f["Date"],
                          //               car: f["Date"],
                          //               mail: f["Date"],
                          //               pass: f["Date"],
                          //             )));
                          //},
                          child: Container(
                            height: 26,
                            width: 80,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: Color(0xffe8bcb9),
                            ),
                            child: Center(
                              child: Text(
                                "Details",
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Spacer(),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                "\$12",
                style: TextStyle(
                  color: Colors.teal,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Container(
                margin: EdgeInsets.only(left: 6),
                height: 50,
                width: 50,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Color(0xffe8bcb9),
                ),
                child: Center(
                  child: Text(
                    "Pay",
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ]),
      ),
    );

Widget buildvehicleItem(v) => Padding(
      padding: const EdgeInsets.all(20.0),
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 5),
        padding: EdgeInsets.only(right: 10),
        height: 140,
        width: 350,
        decoration: BoxDecoration(
          color: Color(0xffF5D7DB),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(children: [
          Container(
            height: 100,
            width: 90,
            margin: EdgeInsets.only(left: 8),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Color(0xffd4ecf7),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Image.asset(
              "assets/car.png",
              height: 150,
              width: double.infinity,
            ),
          ),
          Container(
            child: Padding(
              padding: EdgeInsets.only(left: 15, top: 20, bottom: 25),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${v["vehicle_id"]}',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Row(
                    children: [
                      Text(
                        "Date: ",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        "${v["license"]}",
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 6),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        InkWell(
                          onTap: () {
                            // Navigator.push(
                            //     context,
                            //     MaterialPageRoute(
                            //         builder: (context) => Details()));
                          },
                          child: Container(
                            height: 26,
                            width: 80,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: Color(0xffe8bcb9),
                            ),
                            child: Center(
                              child: Text(
                                "Details",
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ]),
      ),
    );

class CartaConstants {
  static String accesstoken = '';
  static String? token;
}

void navigateTo(context, widget) => Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => widget,
      ),
    );

void navigateAndFinish(context, widget) => Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (context) => widget,
      ),
      (route) {
        return false;
      },
    );

late String token;
