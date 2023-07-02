import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/network/remote/dio_Helper.dart';
import 'package:carta/shared/constants/constants.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

import '../../Layout/layoutCubit.dart';

class VDetail extends StatelessWidget {
  late Vehicles vv;

  VDetail({
    Key? key,
    required this.vv,
  }) : super(key: key);

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
              CircleAvatar(
                radius: 70,
                backgroundImage: AssetImage('assets/logo.png'),
              ),
              SizedBox(
                height: 30,
              ),
              itemProfile('Car License Plate Numbers', vv.vehicleId,
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('License', vv.license, CupertinoIcons.car_detailed),
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
              itemProfile('Color', vv.isStolen, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              SizedBox(
                height: 30,
              ),
              ElevatedButton(
                  onPressed: () {
                    DioHelper.patchData(
                      url:
                          'http://192.168.1.3:4242/vehicles/$ssn/${vv.vehicleId}/stolen',
                    ).then((value) {
                      print("${vv.vehicleId}is stolen");
                    }).catchError((error) {
                      print(error.toString());
                    });
                    // CarCubit.get(context).getCars();
                    //     DioHelper.getData(
                    //   url:
                    //       'http://192.168.1.9:4242/transactions/$ssn/checkout-session/${widget.tt.transactionId}',
                    // ).then((value) {
                    //   session_url = value.data['url'];
                    //   navigateTo(context, PaymentWebWiew(session_url));
                    //   print('your seeion url $session_url');
                    // }).catchError((error) {
                    //   print(error.toString());
                    // });
                  },
                  child: Text(
                    "Reload",
                  )),
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
