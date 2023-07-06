import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/network/remote/dio_Helper.dart';
import 'package:carta/shared/constants/constants.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:http/http.dart' as http;

import '../../Layout/layoutCubit.dart';

class VDetail extends StatelessWidget {
  late Vehicles vv;

  VDetail({
    Key? key,
    required this.vv,
  }) : super(key: key);

  Future<void> marfkstolenCar() async {
    var headers = {
      'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfc3NuIjoiMzY2MTUxNTM0MDAwNTYiLCJ1c2VyX25hbWUiOiJ5b3Vzc2VmIiwibWFudWZhY3R1cmVyX251bWJlciI6IjUiLCJ1c2VyX2VtYWlsIjoieW91c3NpZkBnbWFpbC5jb20iLCJ1c2VyX3Bhc3N3b3JkIjoiJDJiJDEwJHM1LmRRUXl2OFJ1Mkg1ci9WeXlDLnVIR2NCV1JTS0VCUFlRcS9uUy5hN1RzQy5oNEFXemlTIiwidXNlcl9hZGRyZXNzIjoiZWciLCJ1c2VyX2pvYiI6InN0dWRlbnQiLCJ1c2VyX25hdGlvbmFsaXR5IjoiRWd5cHRpYW4yIiwidXNlcl9waG9uZSI6IjAxMDI3ODI3NjU1IiwidXNlcl9iZCI6IjE0LTUtMjAwMSIsInVzZXJfZ292ZXJub3JhdGUiOiJmYXlvdW0yMyIsImlzX2FkbWluIjoidXNlciJ9LCJpYXQiOjE2ODg2NTgwOTJ9.Rl8JEhFeCYEjEsOdxnhgiKsEKomvFh8_QrlveuvkPaw'
    };
    var request = http.Request('PATCH',
        Uri.parse('http://10.0.2.2:4242/vehicles/$ssn/${vv.vehicleId}/stolen'));

    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
      print(await response.stream.bytesToString());
    } else {
      print(response.reasonPhrase);
    }
  }

  Future<void> marfksaveCar() async {
    var headers = {
      'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfc3NuIjoiMiIsInVzZXJfbmFtZSI6Imdlb3JnZSIsIm1hbnVmYWN0dXJlcl9udW1iZXIiOiIxIiwidXNlcl9lbWFpbCI6Imdlb3JnZTJAYWRtaW4uY29tIiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCRPaUF4a2dtcGpheFJhUXJ5MzJQcC5PSGRabmV4ektXQjZQMG1NQTNBZXNHcTVZMkRMZ1QuNiIsInVzZXJfYWRkcmVzcyI6ImZheW91bSIsInVzZXJfam9iIjoic3R1ZGVudCIsInVzZXJfbmF0aW9uYWxpdHkiOiJFZ3lwdGlhbiIsInVzZXJfcGhvbmUiOiIwMTAyNzgyNzY1NCIsInVzZXJfYmQiOiIzMC0xMC0yMDAxIiwidXNlcl9nb3Zlcm5vcmF0ZSI6ImZheW91bSIsImlzX2FkbWluIjoiYWRtaW4ifSwiaWF0IjoxNjc4NjYwOTYzfQ.3wTglpjxquUEjZSTW_M0Q8J64G3qBVK8HwYLkb08gvM'
    };
    var request = http.Request('PATCH',
        Uri.parse('http://10.0.2.2:4242/vehicles/$ssn/${vv.vehicleId}/safe'));

    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
      print(await response.stream.bytesToString());
    } else {
      print(response.reasonPhrase);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white10,
        foregroundColor: Color.fromARGB(255, 7, 7, 7),
      ),
      body: Padding(
        padding: EdgeInsets.all(30),
        child: SingleChildScrollView(
          child: Column(
            children: [
              // CircleAvatar(
              //   radius: 70,
              //   backgroundImage: AssetImage('assets/cars/'+vv.vehicleImage),
              // ),
              ClipRRect(
                // borderRadius: BorderRadius.circular(8.0), // Set the border radius to achieve rounded corners
                child: Image.asset(
                  'assets/cars/' + vv.vehicleImage,
                  // height: 150,
                  // width: 200,
                ),
              ),
              SizedBox(
                height: 80,
                width: 80,
              ),
              itemProfile('Licnese', vv.vehicleId, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('SSN', vv.license, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Creation Date', vv.licenseCreateDate,
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Expire Date', vv.licenseExpiredDate,
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Manufacturer', vv.manufacturer, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Model', vv.model, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Color', vv.color, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Stolen Status', vv.isStolen, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              SizedBox(
                height: 30,
              ),
              Row(
                children: [
                  Expanded(
                    child: Container(
                      // color: Colors.red,
                      child: ElevatedButton(
                          onPressed: () {
                            marfkstolenCar();
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor:
                                Colors.red, // Set the background color to red
                          ),
                          child: Text(
                            "Stolen",
                          )),
                    ),
                  ),
                  SizedBox(
                    width: 20,
                  ),
                  Expanded(
                    child: Container(
                      // color: Colors.teal,
                      child: ElevatedButton(
                          onPressed: () {
                            marfksaveCar();
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Color.fromARGB(255, 12, 196,
                                52), // Set the background color to red
                          ),
                          child: Text(
                            "Safe",
                          )),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  itemProfile(String title, String subtitle, IconData iconData) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              offset: Offset(0, 5),
              color: Colors.blue.withOpacity(.2),
              spreadRadius: 3,
              blurRadius: 10,
            ),
          ]),
      child: ListTile(
        title: Text(title),
        subtitle: Text(subtitle),
        leading: Icon(iconData),
        tileColor: Colors.white,
      ),
    );
  }
}
